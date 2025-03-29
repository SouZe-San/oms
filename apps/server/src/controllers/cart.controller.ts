import prisma from "@oms/db/prisma";
import { Request, Response } from "express";
import { Cart_reqBody, CartAdvance_req_body } from "@oms/types/cart.validator";
import { Status, StatusMessages } from "../statusCode/response";
import { errorMessage } from "../utils/ApiError";
import { Carts } from "@oms/types/cart.type";

// ! Create a new Cart
// @SouZe-San
// @description: Create/add a new cart
// @route: POST /api/customer/cart
export const createCart = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const req_validation = await CartAdvance_req_body.safeParseAsync(req.body);
    if (!req_validation.success) {
      res.status(Status.Forbidden).json({
        StatusMessages: StatusMessages[Status.Forbidden],
        message: req_validation.error.errors.map((err) => err.message).join(", "),
      });
      return;
    }

    // Destructure user and products
    const { user, products } = req_validation.data;

    // Create a new cart
    const cart = await prisma.cart.create({
      data: {
        userId: user.userId,
        cartProducts: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
    });

    if (!cart) {
      throw new Error("Cart not created");
    }

    // Send response
    res.status(Status.Created).json({
      statusMessage: StatusMessages[Status.Created],
      message: "Cart created successfully",
      data: cart,
    });
  } catch (error) {
    errorMessage("Error While creating Cart: ", res, error);
  }
};

// ! update cartProducts -- no route will be creating for this
// Delete a single cartProduct --
const deleteCartProduct = async (cartProductId: string) => {
  try {
    const cartProducts = await prisma.cartProduct.delete({
      where: {
        id: cartProductId,
      },
    });

    return cartProducts;
  } catch (error) {
    console.error("Error while deleting cartProduct: ", error);
    throw new Error("Error while deleting cartProduct");
  }
};

// Delete cartProducts that are linked to this cart
const deleteCartProducts = async (cartId: string) => {
  try {
    const cartProducts = await prisma.cartProduct.deleteMany({
      where: {
        cartId: cartId,
      },
    });

    return cartProducts;
  } catch (error) {
    console.error("Error while deleting cartProducts: ", error);
    throw new Error("Error while deleting cartProducts");
  }
};

// update quantities of cartProducts --
const updateCartProduct = async (productId: string, quantity: number) => {
  try {
    const cartProducts = await prisma.cartProduct.update({
      where: {
        id: productId,
      },
      data: {
        quantity: quantity,
      },
    });

    return cartProducts;
  } catch (error) {
    console.error("Error while updating cartProduct: ", error);
    throw new Error("Error while updating cartProduct");
  }
};

// ! Add items in cart (Update Cart)
// @SouZe-San
// @description: Update cart
// @route: PUT /api/customer/cart
export const updateCart = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const req_validation = await CartAdvance_req_body.safeParseAsync(req.body);
    if (!req_validation.success) {
      res.status(Status.Forbidden).json({
        StatusMessages: StatusMessages[Status.Forbidden],
        message: req_validation.error.errors.map((err) => err.message).join(", "),
      });
      return;
    }

    // Destructure products from body
    const { products } = req_validation.data;

    // collect cartId from params
    const cartId = req.params.id;
    if (!cartId) {
      res.status(Status.InvalidInput).json({
        StatusMessages: StatusMessages[Status.InvalidInput],
        message: "Cart ID is required",
      });
      return;
    }

    // Find the  carts
    const cart: Carts = await prisma.cart.findUniqueOrThrow({
      where: {
        id: cartId,
      },
      include: {
        cartProducts: true,
      },
    });

    // old and new products
    const previousProducts = cart.cartProducts;
    const upComingProducts = products;

    // 1. Find the products that are already in the cart
    const alreadyInCart = previousProducts.filter((oldProduct) =>
      upComingProducts.some((newProduct) => newProduct.productId === oldProduct.productId)
    );

    // 2. Update the quantities of the products that are already in the cart
    alreadyInCart.forEach(async (oldProduct) => {
      const newProduct = upComingProducts.find((product) => product.productId === oldProduct.productId);
      if (newProduct) {
        await updateCartProduct(oldProduct.id, newProduct.quantity);
      }
    });

    // ---------------------------------------------------------------------------    //
    // 3. Find the products that are not in the cart
    const notInCart = upComingProducts.filter(
      (newProduct) => !alreadyInCart.some((oldProduct) => oldProduct.productId === newProduct.productId)
    );

    // 4. Add the products that are not in the cart
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        cartProducts: {
          create: notInCart.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
    });

    // ---------------------------------------------------------------------------    //

    // 5. Delete the products that are in the cart but not in the request
    const removeProducts = previousProducts.filter(
      (oldProduct) => !upComingProducts.some((newProduct) => newProduct.productId === oldProduct.productId)
    );

    // 6. delete cartProducts those are removed from cart
    removeProducts.forEach(async (product) => {
      await deleteCartProduct(product.id);
    });

    // ---------------------------------------------------------------------------    //

    // Send response
    res.status(Status.Created).json({
      statusMessage: StatusMessages[Status.Created],
      message: "Successfully cart UPDATED",
    });
  } catch (error) {
    errorMessage("Error While updating Cart: ", res, error);
  }
};

// ! DELETE cart
// @SouZe-San
// @description: Delete a cart
// @route: DELETE /api/customer/cart/:id
export const deleteCart = async (req: Request, res: Response) => {
  try {
    // Validate the request body -- {I think it's not required *_* GONe in few days}
    const req_validation = await Cart_reqBody.safeParseAsync(req.body);
    if (!req_validation.success) {
      res.status(Status.Forbidden).json({
        StatusMessages: StatusMessages[Status.Forbidden],
        message: req_validation.error.errors.map((err) => err.message).join(", "),
      });
      return;
    }

    // take cartId from params
    const cartId = req.params.id;
    if (!cartId) {
      res.status(Status.InvalidInput).json({
        StatusMessages: StatusMessages[Status.InvalidInput],
        message: "Cart ID is required",
      });
      return;
    }

    // delete cartProducts that are linked to this cart
    await deleteCartProducts(cartId);

    // delete the cart
    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });

    // Send response
    res.status(200).json({
      statusMessage: "Deleted",
      message: "Cart deleted successfully",
    });
  } catch (error) {
    errorMessage("Error From getting all Carts: ", res, error);
  }
};

// ! Get all carts
// @SouZe-San
// @description: Get all carts
// @route: GET /api/customer/carts
export const getAllCarts = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const req_validation = await Cart_reqBody.safeParseAsync(req.body);
    if (!req_validation.success) {
      res.status(Status.InvalidInput).json({
        StatusMessages: StatusMessages[Status.InvalidInput],
        message: `${req_validation.error.errors.map((err) => err.message).join(", ")}`,
      });
      return;
    }

    // Destructure user from body
    const { user } = req_validation.data;

    // Fetching all carts
    const carts = await prisma.cart.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        cartProducts: true,
      },
    });

    // Check if carts are not found (it never actually happens)
    if (!carts) {
      throw new Error("It's Developer's Thought, *_~ ");
    }

    // Send response
    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Successfully fetched all carts",
      carts,
    });
  } catch (error) {
    console.error("Error From getting all Carts: ", error);

    let errorMessaged = "Something went wrong!!";
    if (error instanceof Error) {
      errorMessaged = error.message;
    }
    // Send response - if error occurs
    res.status(Status.InternalServerError).json({
      statusMessage: StatusMessages[Status.InternalServerError],
      message: errorMessaged,
    });
  }
};

// ! Get a single cart
// @SouZe-San
// @description: Get a single cart
// @route: GET /api/customer/cart/:id
export const getSingleCart = async (req: Request, res: Response) => {
  try {
    // get cartId from params
    const cartId = req.params.id;
    if (!cartId) {
      res.status(Status.InvalidInput).json({
        StatusMessages: StatusMessages[Status.InvalidInput],
        message: "Cart ID is Missing",
      });

      return;
    }

    // Fetching a single cart
    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        cartProducts: true,
      },
    });

    // Check if cart is not found
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Send response
    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Successfully fetched cart",
      cart,
    });
  } catch (error) {
    errorMessage("Error From getting all Carts: ", res, error);
  }
};
