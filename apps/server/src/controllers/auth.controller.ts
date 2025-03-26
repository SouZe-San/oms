import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignUpSchema } from "@oms/types/auth.type"
import prisma from "@oms/db/prisma";
import { Status, StatusMessages } from "../statusCode/response";
import { COOKIE_OPTIONS } from "../utils/cookieOptions";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const JWT_SECRET = process.env.JWT_SECRET as string;

// sign up controller
export const signupController = async (req: Request, res: Response) => {
  //validate req body by zod
  const validation = SignUpSchema.safeParse(req.body);

  // check if req parse successfully or not
  if (!validation.success) {
    res.status(Status.InvalidInput).json({
      status: Status.InvalidInput,
      statusMessage: StatusMessages[Status.InvalidInput],
      message: validation.error.errors.map(err => err.path + " " + err.message).join(", "),
    });
    return;
  }

  try {
    const { firstName, lastName, email, password, primaryMobile, dob, role } = validation.data;

    //check if email or primaryMobile already exists 
    if (await prisma.user.findFirst({ where: { OR: [{ email }, { primaryMobile }] } })) {
      res.status(Status.Conflict).json({
        status: Status.Conflict,
        statusMessage: StatusMessages[Status.Conflict],
        message: "email or mobile already exists",
      });
      return;
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create new user
    let newUser;
    if (role === "ADMIN") {
      newUser = await prisma.user.create({
        data: { firstName, lastName, email, primaryMobile, dob, role, password: hashedPassword }
      });
    } else { //role will be CUSTOMER
      newUser = await prisma.user.create({
        data: { firstName, lastName, email, primaryMobile, dob, password: hashedPassword }
      });
    }

    //Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    //set token in cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    //send the response
    res.status(Status.Success).json({
      status: Status.Success,
      statusMessage: StatusMessages[Status.Success],
      message: "Account created successfully",
    });
    return;
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(Status.InternalServerError).json({
      status: Status.InternalServerError,
      statusMessage: StatusMessages[Status.InternalServerError],
      message: "Internal server error, please try again later",
    });
    return;
  }
}