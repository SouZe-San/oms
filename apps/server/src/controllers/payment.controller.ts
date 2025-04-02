import { Request, Response } from "express";
import { Status, StatusMessages } from "../statusCode/response";
import { errorMessage } from "../utils/ApiError";
import { protected_reqBody } from "@oms/types/user.validator";
import prisma from "@oms/db/prisma";
import { Order, PaymentStatus } from "@oms/types/order.type";

// @SouZe-San
// @desc: Update payment status
// NOTE : NOT Completed yet
export const updatePayment = async (req: Request, res: Response) => {
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

    const { id, status } = req.params;

    // check if data comes or not
    if (!id || !status) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: "Invalid input || url",
      });
      return;
    }

    // ----------------------------------- check if status is valid -----------------
    if (!["failed", "completed"].includes(status.toLowerCase())) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: "Invalid status",
      });
      return;
    }

    // ------------------------------- check if order exists -----------------
    const order: Order | null = await prisma.order.findFirst({
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

    //---------------------------- check if order is already delivered -----------------
    if (order?.status === "DELIVERED") {
      res.status(Status.Conflict).json({
        statusMessage: StatusMessages[Status.Conflict],
        message: "Order already delivered",
      });
      return;
    }

    //   check if payment exists
    if (order?.payment === null) {
      res.status(Status.NoContent).json({
        statusMessage: StatusMessages[Status.NoContent],
        message: "Payment not found",
      });
      return;
    }

    //------------------ check if payment is already confirmed --------------------
    if (order?.payment?.status === "COMPLETED") {
      res.status(Status.Conflict).json({
        statusMessage: StatusMessages[Status.Conflict],
        message: "Payment already confirmed",
      });
      return;
    }

    // check if payment is already cancelled
    if (order?.payment?.status === "FAILED") {
      res.status(Status.Conflict).json({
        statusMessage: StatusMessages[Status.Conflict],
        message: "Payment already cancelled",
      });
      return;
    }

    // ---------------------- check if payment is completed ------------
    const updatedOrder = await prisma.payment.update({
      where: {
        id: order?.payment?.id,
      },
      data: {
        status: status.toUpperCase() as PaymentStatus,
      },
      include: {
        order: true,
      },
    });

    console.log(updatedOrder);

    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Payment updated successfully",
    });
  } catch (err) {
    errorMessage("Error From Payment : ", res, err);
  }
};
