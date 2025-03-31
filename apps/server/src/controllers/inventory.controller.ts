import { Request, Response } from "express";
import { errorMessage } from "../utils/ApiError";
import { createProductValidator, getProductsValidator } from "@oms/types/product.validator";
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

// ADMIN can see their products in inventory
export const getProducts = async (req: Request, res: Response) => {
  try {
    const validator = getProductsValidator.safeParse(req.body);

    //check if input is valid
    if (!validator.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validator.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get data from request body
    const { adminId, skipCount, takeCount } = validator.data;

    //get all products from the inventory
    const products = await prisma.product.findMany({
      where: { adminId },
      skip: skipCount || 0,
      take: takeCount || 10,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // successful
    res.status(Status.Success).json({
      StatusMessages: StatusMessages[Status.Success],
      message: "get products successfully",
      products,
    });
    return;
  } catch (error) {
    errorMessage("Error while Showing All Products in inventory", res, error);
  }
};

/* TODO -> 
need if we have additional data in db respect to the product
for example, reviews, detail descriptionetc
*/
// ADMIN can see their product by id
export const getProduct = (req: Request, res: Response) => {
  try {

  } catch (error) {
    errorMessage("error message", res, error);
  }
};
