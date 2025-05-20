import { Request, Response } from "express";
import { errorMessage } from "../utils/ApiError";
import {
  createProductValidator,
  deleteProductValidator,
  getProductsValidator,
  updateProductValidator,
} from "@oms/types/product.validator";
import { Status, StatusMessages } from "../statusCode/response";
import prisma from "@oms/db/prisma";

// @alfaarghya
// ADMIN can create a product in store
export const createProduct = async (req: Request, res: Response) => {
  try {
    const validator = createProductValidator.safeParse(req.body);

    //check if input is valid
    if (!validator.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validator.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get data from validator
    const { adminId, name, description, price, stock } = validator.data;

    //TODO -> need to find if the product is present -- NOT REQUIRED(@SouZe-San)
    // ^ reason: we are creating a new product, so it will not be present in the inventory : if admin create it , it's responsible to maintain it
    // We does't make name unique, so that admin can create multiple products with same name

    //create a product
    await prisma.product.create({
      data: {
        adminId,
        name,
        description,
        price,
        stock,
      },
    });

    res.send(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Product created successfully",
    });
    return;
  } catch (error) {
    errorMessage("error message", res, error);
  }
};

// ADMIN can see their products in inventory
export const getProducts = async (req: Request, res: Response) => {
  try {
    const adminId = req.body.user.userId;
    const skip = parseInt(req.query.skip as string) || 0;
    const take = 10;

    //get all products from the inventory
    const products = await prisma.product.findMany({
      where: { adminId },
      skip: skip * take,
      take,
      select: {
        id: true,
        name: true,
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

//@alfaarghya
// ADMIN can see their product by id
export const getProduct = async (req: Request, res: Response) => {
  try {
    const adminId = req.body.user.userId;
    const productId = req.params.id;

    //productId is not present
    if (!productId) {
      res.status(Status.InvalidInput).json({
        statusMessage: StatusMessages[Status.InvalidInput],
        message: "Product id is not present",
      });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id: productId, adminId },
      include: {
        OrderProduct: {
          include: {
            order: {
              include: {
                payment: true,
                user: {
                  include: {
                    addresses: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    //no product found
    if (!product) {
      res.status(Status.NotFound).json({
        statusMessage: StatusMessages[Status.NotFound],
        message: "product not found",
      });
      return;
    }

    //mapping the data
    const result = {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
      orders: product.OrderProduct.map((op) => ({
        orderId: op.order.id,
        quantity: op.quantity,
        price: op.price,
        date: op.order.createdAt,
        status: op.order.status,
        payment: op.order.payment?.status ?? "PENDING",
        address: (() => {
          const addr =
            op.order.user.addresses.find((a) => a.type === "CURRENT") ??
            op.order.user.addresses.find((a) => a.type === "PERMANENT");

          return addr
            ? {
              street: addr.street,
              city: addr.city,
              state: addr.state,
              country: addr.country,
              zipCode: addr.zipCode,
              type: addr.type,
            }
            : null;
        })(),
      })),
    };

    //response
    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "product successfully found",
      product: result.product,
      orders: result.orders
    })
    return
  } catch (error) {
    errorMessage("error while fetching product details from inventory", res, error);
  }
};

// ADMIN can update their product by id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const validator = updateProductValidator.safeParse({
      productId: req.params.id,
      ...req.body,
    });

    //check if input is valid
    if (!validator.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validator.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get data from validator
    const { adminId, productId, updateName, updateDescription, updatePrice, updateStock } = validator.data;

    // Prepare update data dynamically
    const updateData: Record<string, any> = {};
    if (updateName) updateData.name = updateName;
    if (updateDescription) updateData.description = updateDescription;
    if (updatePrice !== undefined) updateData.price = parseFloat(updatePrice.toFixed(2)); // Ensure price has 2 decimal places
    if (updateStock !== undefined) updateData.stock = updateStock;

    // If there's nothing to update, return early
    if (Object.keys(updateData).length === 0) {
      res.status(Status.NoContent).json({
        statusMessage: StatusMessages[Status.NoContent],
        message: "No valid fields to update",
      });
      return;
    }

    // Update only provided fields
    const updatedProduct = await prisma.product.update({
      where: { id: productId, adminId },
      data: updateData,
    });

    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Product updated successfully",
      updatedProduct,
    });
    return;
  } catch (error) {
    errorMessage("error message", res, error);
  }
};

// ADMIN can remove their product store
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const validator = deleteProductValidator.safeParse({
      productId: req.params.id,
      ...req.body,
    });

    //check if input is valid
    if (!validator.success) {
      res.status(Status.InvalidInput).json({
        status: Status.InvalidInput,
        statusMessage: StatusMessages[Status.InvalidInput],
        message: validator.error.errors.map((err) => err.path + " " + err.message).join(", "),
      });
      return;
    }

    //get data from validator
    const { adminId, productId } = validator.data;

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId, adminId },
    });

    if (!product) {
      res.status(Status.NotFound).json({
        statusMessage: StatusMessages[Status.NotFound],
        message: "Product not found",
      });
      return;
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: productId },
    });

    res.status(Status.Success).json({
      statusMessage: StatusMessages[Status.Success],
      message: "Product deleted successfully",
    });
    return;
  } catch (error) {
    errorMessage("error message", res, error);
  }
};
