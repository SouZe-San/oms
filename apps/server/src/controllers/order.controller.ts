import prisma from "@oms/db/prisma";
import { Order } from "@oms/types/order.type";
import { OrderCreate_bodySchema } from "@oms/types/order.validator";
import { Status, StatusMessages } from "../statusCode/response";
import { Request, Response } from "express";

// !Order Create
// @SouZe-San
// @params: req, res
// @desc: Create a new Order
// @access: Authenticated Customers
export const createOrder = async (req: Request, res: Response) => {
  // validate req body by zod
  try {
    const validation = await OrderCreate_bodySchema.safeParseAsync(req.body);

    if (!validation.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validation.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    const { cartId, user } = validation.data;

    //   Find cart in database
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
    });

    //   If cart not found in database
    if (!cart) {
      res.status(Status.NotFound).json({
        statusMessage: StatusMessages[Status.NotFound],
        message: "Cart not found",
      });
      return;
    }

    //create order object

    const order: Order = {
      id: "",
      userId: user.userId,
      status: "PENDING",
      totalAmount: 94,
      payment: "PENDING",
    };

    //   Create order in database

    // delete cart from database

    // send response

    res.status(201).json({
      statusMessage: "Created",
      message: "Order created successfully 👍🏻",
    });
  } catch (error) {
    console.error("Error in createOrder:", error);

    let errorMessaged = "Something went wrong!!";
    if (error instanceof Error) {
      errorMessaged = error.message;
    }
    res.status(Status.InternalServerError).json({
      statusMessage: StatusMessages[Status.InternalServerError],
      message: errorMessaged,
    });
  }
};

// Order Updates

// Order Delete

// Get all Orders

// Get Single Order details
