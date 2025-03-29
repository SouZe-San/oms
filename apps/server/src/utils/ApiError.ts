import { Response } from "express";
import { Status, StatusMessages } from "../statusCode/response";

export const errorMessage = (message: string, res: Response, error: unknown) => {
  console.error(message, error);

  let errorMessaged = "Something went wrong!!";
  if (error instanceof Error) {
    errorMessaged = error.message;
  }
  // Send response - if error occurs
  res.status(Status.InternalServerError).json({
    statusMessage: StatusMessages[Status.InternalServerError],
    message: errorMessaged,
  });
};
