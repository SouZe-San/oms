import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Status, StatusMessages } from "../statusCode/response";

// authenticate users using JWT token
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    //get the JWT token from cookies
    const token = req.cookies?.token;

    //check if token is provided
    if (!token) {
      res.status(Status.Unauthorized).json({
        status: Status.Unauthorized,
        statusMessage: StatusMessages[Status.Unauthorized],
        message: "Authentication required. Please Sign up/Sign in.",
      });
      return;
    }

    //verify the token
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

    // check if all data present in token
    if (decode && decode.id && decode.email && decode.role) {
      req.body = {
        // Attach user details to the request
        userId: decode.id,
        email: decode.email,
        role: decode.role,
        ...req.body // Keep rest of request body
      };

      next(); //Proceed to the next middleware or route handler
    } else {
      res.status(Status.Unauthorized).json({
        status: Status.Unauthorized,
        statusMessage: StatusMessages[Status.Unauthorized],
        message: "Invalid token. Please log in again.",
      });
      return;
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error. Please try again later.",
    });
    return;
  }
};

export default authenticate;