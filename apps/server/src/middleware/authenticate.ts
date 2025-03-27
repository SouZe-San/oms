import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Status, StatusMessages } from "../statusCode/response";

// authenticate users using JWT token
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    //get the JWT token from cookies -- this for bearer token
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    //check if token is provided
    if (!token) {
      res.status(Status.Unauthorized).json({
        status: Status.Unauthorized,
        statusMessage: StatusMessages[Status.Unauthorized],
        message: "Authentication required. Please Sign up/Sign in.",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT secret is not provided.");
    }
    //verify the token
    const decode = jwt.verify(token, jwtSecret) as JwtPayload;

    // check if all data present in token
    if (decode && decode.id && decode.email && decode.role) {
      // @ In general, i prefer to passe it in as One Object in req body
      // req.body = {
      //   // Attach user details to the request
      //   userId: decode.id,
      //   email: decode.email,
      //   role: decode.role,
      //   ...req.body // Keep rest of request body
      // };

      // Create a user object and attach it to the request
      const user = {
        userId: decode.id,
        email: decode.email,
        role: decode.role,
      };

      req.body = {
        user,
        ...req.body,
      };

      // // we can also pass user in req object not in Request body

      next(); //Proceed to the next middleware or route handler
    } else {
      res.status(Status.Unauthorized).json({
        status: Status.Unauthorized,
        statusMessage: StatusMessages[Status.Unauthorized],
        message: "Invalid token. Please log in again.",
      });
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error. Please try again later.",
    });
  }
};

export default authenticate;
