import { NextFunction, Request, Response } from "express";
import { errorMessage } from "../utils/ApiError";
import { Status, StatusMessages } from "../statusCode/response";
import prisma from "@oms/db/prisma";

// This route will use after authenticate middleware
//only ADMIN will pass
const inventoryAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //role -> to validate user type
    const role: string = req.body.user.role;

    //when it's ADMIN only process to next
    if (role === "ADMIN") {
      const userId = req.body.user.id;
      const admin = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });

      //Admin is not present in db
      if (!admin) {
        res.status(Status.NotFound).json({
          statusMessage: StatusMessages[Status.NotFound],
          message: "Admin Not found"
        });
        return;
      }

      //ADMIN found -> send the body to next route
      req.body = {
        adminId: admin.id,
        ...req.body // keep rest of the body
      }
      next();//Proceed to the next middleware or route handler
    } else {
      res.status(Status.Unauthorized).json({
        statusMessage: StatusMessages[Status.Unauthorized],
        message: "Only ADMIN can access the inventory"
      })
      return;
    }
  } catch (error) {
    errorMessage("Internal server error. Please try again later. : \n", res, error);
  }
}

export default inventoryAccess;