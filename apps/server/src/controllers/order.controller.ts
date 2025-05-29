import prisma from "@oms/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { Request, Response } from "express";
import { CartProductWithDetails } from "@oms/types/cart.type";
import { calculateTotalAmount, calculateTotalItems, checkIfOrderPossible, stockUpdate } from "../utils/functions";
import { protected_reqBody } from "@oms/types/user.validator";
import { deleteCartProducts } from "./cart.controller";
import { errorMessage } from "../utils/ApiError";
import { Order, type OrderStatus } from "@oms/types/order.type";
import { order_reqValidator, createOrder_reqValidator, singleOrder_reqValidator } from "@oms/types/order.validator";

// !Order Create
// @SouZe-San
// @desc: Initialize a new Order ( this is Not Complete Order Process,Payment is Pending)
// @access: Authenticated Customers
// @route: POST /api/customer/order
export const createOrder = async (req: Request, res: Response) => {
  // validate req body by zod
  try {
    const validation = await createOrder_reqValidator.safeParseAsync(req.body);

    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    const { user, isOnlinePayment } = validation.data;

    //   find all cart products
    const cartProducts: CartProductWithDetails[] = await prisma.cartProduct.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        product: true,
      },
    });

    const dbUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.userId,
      },
      include: {
        addresses: true,
      },
    });

    // ------------------ 1. Before order check if order is possible -----------------

    const isOrderPossible = await checkIfOrderPossible(cartProducts);

    if (!isOrderPossible) {
      res.status(Status.NoContent).json({
        statusMessage: StatusMessages[Status.NoContent],
        message: "Order not possible, Out of stock !!",
      });
      return;
    }

    // ---------------------------------2. Order Process---------------------------------

    // calculate total amount of order
    const totalAmount: number = calculateTotalAmount(cartProducts);
    const totalItems = calculateTotalItems(cartProducts);

    //   Create order in database
    await prisma.order.create({
      data: {
        userId: user.userId,
        status: "CONFIRMED",
        totalAmount,
        totalItems,
        shippingAddressId: dbUser.addresses[0]!.id,
        orderProducts: {
          create: cartProducts.map((item) => ({
            name: item.name,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
        payment: {
          create: {
            amount: totalAmount,
            status: isOnlinePayment ? "COMPLETED" : "PENDING",
          },
        },
      },
    });

    // update stock in database
    await stockUpdate(prisma, cartProducts);

    // delete cartProducts from database (all Ordered)
    await deleteCartProducts(user.userId);

    //  -------------------------- 3. Send Response --------------------------
    // send response
    res.status(Status.Created).json({
      statusMessage: StatusMessages[Status.Created],
      message: "Order Initialize successfully 👍🏻",
    });
  } catch (error) {
    errorMessage("Error while creating order: ", res, error);
  }
};

// !Order a Single Item
// @desc: Order a Single Item
// @access: Authenticated Customers
// @route: POST /api/customer/order/single
export const orderSingleItem = async (req: Request, res: Response) => {
  try {
    const validation = await singleOrder_reqValidator.safeParseAsync(req.body);

    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    const { user, productId, quantity, isOnlinePayment } = validation.data;

    // find product
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
    });

    // need user address id
    const dbUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.userId,
      },
      include: {
        addresses: true,
      },
    });

    // check if product is in stock
    if (product.stock < quantity) {
      res.status(Status.NoContent).json({
        statusMessage: StatusMessages[Status.NoContent],
        message: "Product out of stock",
      });
    }

    // calculate total amount of order
    const totalAmount = product.price * quantity;

    // create order in database
    await prisma.order.create({
      data: {
        userId: user.userId,
        status: "CONFIRMED",
        totalAmount,
        shippingAddressId: dbUser.addresses[0]!.id,
        totalItems: quantity,
        orderProducts: {
          create: [{ name: product.name, productId, quantity, price: product.price }],
        },
        payment: {
          create: {
            amount: totalAmount,
            status: isOnlinePayment ? "COMPLETED" : "PENDING",
          },
        },
      },
    });

    // update stock in database
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    //  -------------------------- 3. Send Response --------------------------
    // send response
    res.status(Status.Created).json({
      statusMessage: StatusMessages[Status.Created],
      message: "Order Initialize successfully 👍🏻",
    });
  } catch (error) {
    errorMessage("Error while ordering single item: ", res, error);
  }
};

//! Order Updates - it will be used for order status update
// @desc: Update Order Status
// @access: Authenticated Customers
// @route: PUT /api/customer/order/:id
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const validation = await order_reqValidator.safeParseAsync({
      id: req.params.id,
      ...req.body,
    });

    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    const { id, status } = validation.data;

    //-------------------1. check if order exists -----------------

    const order: Order | null = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        payment: true,
      },
    });

    if (order === null) {
      res.status(Status.NoContent).json({
        statusMessage: StatusMessages[Status.NoContent],
        message: "Order not found",
      });
    }

    // ------------------------ 2.check if order is already delivered -----------------
    if (order?.status === "DELIVERED") {
      res.status(Status.Conflict).json({
        statusMessage: StatusMessages[Status.Conflict],
        message: "Order already delivered",
      });
      return;
    }

    // check if order is cancelled
    if (order?.status === "CANCELLED") {
      res.status(Status.Conflict).json({
        statusMessage: StatusMessages[Status.Conflict],
        message: "Order already cancelled",
      });
      return;
    }

    // check if payment is completed
    if (order?.payment?.status === "FAILED" || order?.payment?.status === "PENDING") {
      res.status(Status.Conflict).json({
        statusMessage: StatusMessages[Status.Conflict],
        message: "Payment is Not Completed, Order can't be processed",
      });
      return;
    }

    // ---------------------- 3. Update Order Status ----------------------
    const orderStatus = status as OrderStatus;
    console.log(orderStatus);
    // update order status

    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: orderStatus,
        payment: {
          update: {
            status: orderStatus === "DELIVERED" ? "COMPLETED" : "PENDING",
          },
        },
      },
    });

    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Order status updated successfully",
    });
  } catch (error) {
    errorMessage("Error while updating order: ", res, error);
  }
};

//! Order Delete - order cancellation
// @desc: Delete Order
// @access: Authenticated Customers
// @route: DELETE /api/customer/order/:id
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const validation = await protected_reqBody.safeParseAsync(req.body);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    // ----------------------- 1.order id -------------------------
    const { id } = req.params;

    if (!id) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: "Invalid input || url",
      });
      return;
    }

    // ---------------------2. find order -------------------------
    const order: Order | null = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (order === null) {
      res.status(Status.NoContent).json({
        statusMessage: StatusMessages[Status.NoContent],
        message: "Order not found",
      });
    }

    // ---------------------3. check if order is already delivered -------------------------
    const deleteOrder = await prisma.order.delete({
      where: {
        id,
      },
    });

    if (deleteOrder) {
      throw new Error("Error while deleting order");
    }

    // ---------------------4. Send Response -------------------------
    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Order deleted successfully",
    });
  } catch (error) {
    errorMessage("Error while deleting order: ", res, error);
  }
};

//! Get all Orders
// @desc: Get all Orders of a Customer
// @access: Authenticated Customers
// @route: GET /api/customer/orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const validation = await protected_reqBody.safeParseAsync(req.body);
    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }
    const { user } = validation.data;
    const orders = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
    });

    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    errorMessage("Error while getting orders: ", res, error);
  }
};

//! Get Single Order details
// @desc: Get Single Order details
// @access: Authenticated Customers
// @route: GET /api/customer/order/:id
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: "Invalid input || url",
      });
      return;
    }

    const order: Order | null = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        payment: true,
        orderProducts: true,
        shippingAddress: true,
      },
    });

    if (order === null) {
      res.status(Status.NoContent).json({
        statusMessage: StatusMessages[Status.NoContent],
        message: "Order not found",
      });
    }

    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    errorMessage("Error while getting order: ", res, error);
  }
};
