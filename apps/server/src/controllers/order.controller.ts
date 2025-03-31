import prisma from "@oms/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { Request, Response } from "express";
import { CartProductWithDetails } from "@oms/types/cart.type";
import { calculateTotalAmount, calculateTotalItems, checkIfOrderPossible, stockUpdate } from "../utils/functions";
import { protected_reqBody } from "@oms/types/user.validator";
import { deleteCartProducts } from "./cart.controller";
import { errorMessage } from "../utils/ApiError";

// !Order Create
// @SouZe-San
// @desc: Initialize a new Order ( this is Not Complete Order Process,Payment is Pending)
// @access: Authenticated Customers
// @route: POST /api/customer/order
export const createOrder = async (req: Request, res: Response) => {
  // validate req body by zod
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

    //   find all cart products
    const cartProducts: CartProductWithDetails[] = await prisma.cartProduct.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        product: true,
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
    const totalAmount = calculateTotalAmount(cartProducts);
    const totalItems = calculateTotalItems(cartProducts);

    //   Create order in database
    await prisma.order.create({
      data: {
        userId: user.userId,
        status: "PENDING",
        totalAmount,
        totalItems,
        orderProducts: {
          create: cartProducts.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
        payment: {
          create: {
            amount: totalAmount,
            status: "PENDING",
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

//! Order Updates

//! Order Delete - order cancellation

//! Get all Orders

//! Get Single Order details
