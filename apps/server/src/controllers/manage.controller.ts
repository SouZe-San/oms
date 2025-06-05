import { Request, Response } from "express";
import { errorMessage } from "../utils/ApiError";
import { Status, StatusMessages } from "../statusCode/response";
import { manageOrderStatus, managePaymentStatus } from "@oms/types/manage.validator";
import prisma from "@oms/db/prisma";

export const manageOrder = async (req: Request, res: Response) => {
  try {
    //get orderId from url
    const orderId = req.params.id;
    if (!orderId) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: "OrderId is required",
      });
      return;
    }

    //get order from db
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
    if (!order) {
      res.status(Status.NotFound).json({
        status: Status.NotFound,
        statusMessage: StatusMessages[Status.NotFound],
        message: "Order not found!",
      });
      return;
    }

    //order was cancelled
    if (order.status === manageOrderStatus.CANCELLED) {
      res.status(Status.Forbidden).json({
        status: Status.Forbidden,
        statusMessage: StatusMessages[Status.Forbidden],
        message: "Order was cancelled, can't process the order!",
      });
      return;
    }

    // shipped the order
    if (order.status === manageOrderStatus.CONFIRMED) {
      const updateOrder = await prisma.order.update({
        where: { id: order.id },
        data: { status: manageOrderStatus.SHIPPED },
        include: { payment: true },
      });

      res.status(Status.Success).json({
        status: Status.Success,
        statusMessage: StatusMessages[Status.Success],
        message: "Order is shipped",
        order: updateOrder,
      });
      return;
    }

    // deliver the order
    if (order.status === manageOrderStatus.SHIPPED) {
      const updateOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: manageOrderStatus.DELIVERED,
          payment: {
            update: {
              status: managePaymentStatus.COMPLETED,
            },
          },
        },
        include: { payment: true },
      });

      res.status(Status.Success).json({
        status: Status.Success,
        statusMessage: StatusMessages[Status.Success],
        message: "Order is Delivered",
        order: updateOrder,
      });
      return;
    }

    //order was delivered
    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Order was Delivered",
      order: order,
    });
    return;
  } catch (error) {
    errorMessage("Error while manage order: ", res, error);
  }
};
