import { Response, Request } from "express";
import { errorMessage } from "../utils/ApiError";
import prisma from "@oms/db/prisma";
import { getProduct_reqSchema } from "@oms/types/product.validator";
import { Status, StatusMessages } from "../statusCode/response";
import { ProductsResponse } from "@oms/types/api.type";
// ^ This is the controller for the customer product routes.

// ! Show All Products
// @SouZe-San
// @route GET /api/customer/products
// @access Public
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const req_validation = await getProduct_reqSchema.safeParseAsync(req.body);

    if (!req_validation.success) {
      res.status(Status.Forbidden).json({
        StatusMessages: StatusMessages[Status.Forbidden],
        message: req_validation.error.errors.map((err) => err.message).join(", "),
      });
      return;
    }

    // Get the skipCount and takeCount from the request body
    const { skipPage, takeCount = 10 } = req_validation.data;

    // Get all products from the database
    const products = await prisma.product.findMany({
      skip: (skipPage || 0) * takeCount,
      take: takeCount || 10,
      select: {
        id: true,
        name: true,
        description: true,
        images: true,
        category: true,
        price: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // trimmed description to 10 words
    const cleanedData: ProductsResponse[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      createdAt: product.createdAt,
      description: product.description
        ? product?.description.split(" ").slice(0, 10).join(" ") + " ..."
        : product.description,
      imageUrl: product.images.length > 0 ? product.images[0]?.url : null,
    }));

    res.status(Status.Success).json({
      StatusMessages: StatusMessages[Status.Success],

      products: cleanedData,
    });
  } catch (error) {
    errorMessage("Error Comes while Showing All Products to Customer : \n", res, error);
  }
};

// ! Show Single Product - with full details
// @SouZe-San
// @route GET /api/customer/product/:id
// @access Public
/* TODO -> 
need if we have additional data in db respect to the product
for example, reviews, detail description etc.
CUZ, in getAllProducts we retrieve all data of a product
*/
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    // get the product id from the request params
    const { id } = req.params;

    // Get the product from the database
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        images: true,
        category: true,
        price: true,
        stock: true,
        createdAt: true,
      },
    });

    // Check if the product exists if not return 404
    if (!product) {
      res.status(Status.NotFound).json({
        StatusMessages: StatusMessages[Status.NotFound],
        message: "Product id might be wrong CAUSE product not found",
      });
      return;
    }

    // Return the product in response
    res.status(Status.Success).json({
      StatusMessages: StatusMessages[Status.Success],
      product,
    });
  } catch (error) {
    errorMessage("Error Comes while Showing Single Product to Customer : \n", res, error);
  }
};

// ! Show All Products by Name
// @SouZe-San
// @route GET /api/customer/products/:name
// @access Public

export const getAllProductsByName = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const req_validation = await getProduct_reqSchema.safeParseAsync(req.body);
    const productName = req.params.name;

    if (!productName) {
      res.status(Status.Forbidden).json({
        StatusMessages: StatusMessages[Status.Forbidden],
        message: "Product name is required",
      });
      return;
    }

    if (!req_validation.success) {
      res.status(Status.Forbidden).json({
        StatusMessages: StatusMessages[Status.Forbidden],
        message: req_validation.error.errors.map((err) => err.message).join(", "),
      });
      return;
    }

    // Get the skipCount and takeCount from the request body
    const { skipPage, takeCount = 10 } = req_validation.data;

    // Get all products from the database
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: req.params.name,
        },
      },
      skip: (skipPage || 0) * takeCount,
      take: takeCount || 10,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        category: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (products.length === 0) {
      res.status(Status.NotFound).json({
        StatusMessages: StatusMessages[Status.NotFound],
        message: "No products found",
        products,
      });
      return;
    }

    // trimmed description to 10 words
    const cleanedData: ProductsResponse[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      createdAt: product.createdAt,
      description: product.description
        ? product?.description.split(" ").slice(0, 10).join(" ") + " ..."
        : product.description,
      imageUrl: product.images.length > 0 ? product.images[0]?.url : null,
    }));

    res.status(Status.Success).json({
      StatusMessages: StatusMessages[Status.Success],
      products: cleanedData,
    });
  } catch (error) {
    errorMessage("Error Comes while Finding Product bases on NAME : \n", res, error);
  }
};
