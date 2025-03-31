import { Request, Response } from "express";
import { errorMessage } from "../utils/ApiError";
import { createProductValidator } from "@oms/types/product.validator";
import { Status, StatusMessages } from "../statusCode/response";
import prisma from "@oms/db/prisma";

// ADMIN can create a product in store
export const createProduct = async (req: Request, res: Response) => {
  try {
    const validator = createProductValidator.safeParse(req.body);

    if (!validator.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validator.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    const { adminId, name, description, price, stock } = validator.data;

    //TODO -> need to find if the product is present

    //create a product
    const product = await prisma.product.create({
      data: {
        adminId,
        name,
        description,
        price,
        stock
      }
    });

    res.send(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Product created successfully",
    })
    return;
  } catch (error) {
    errorMessage("error message", res, error);
  }
};
