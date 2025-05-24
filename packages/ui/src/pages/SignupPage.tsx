"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInput, SignUpSchema } from "@oms/types/auth.validator";
import api from "@oms/utils/api";
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { signupStart, signupSuccess, signupFailure } from "@oms/store/signup";
import { useEffect } from "react";
import { toast } from "sonner";
import { Role } from "@oms/types/user.type";
import { setUser } from "@oms/store/auth";
import { useRouter } from "next/navigation";

const SignupPage = ({ role }: { role: Role }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector((state) => state.signup);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      role, // set role from props
    },
  });

  const onSubmit = async (data: SignUpInput) => {
    dispatch(signupStart());
    try {
      const res = await api.post("/auth/signup", { ...data, role }); // Adjust API path as needed
      if (res.status === 200) {
        const user = res.data.user;
        dispatch(setUser(user));
        dispatch(signupSuccess());
        toast.success("Signup successful!");
        router.push("/");
        reset();
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      dispatch(signupFailure(message));
      toast.error(message);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div
      className="min-w-sm mx-auto mt-10 p-6  shadow-xl rounded-2xl flex flex-col gap-5"
      style={{
        background: "#ffffff1c",
      }}
    >
      <h1 className="text-2xl font-semibold mb-6 text-center">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <input
            {...register("primaryMobile")}
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.primaryMobile && <p className="text-red-500 text-sm">{errors.primaryMobile.message}</p>}
        </div>

        <div>
          <input
            {...register("dob")}
            type="date"
            placeholder="Date of Birth (YYYY-MM-DD)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded-lg hover:bg-blue-700 high-btn-bg"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Have a account?{" "}
        <a href="/auth/signin" className="text-blue-600 hover:underline">
          Signin here
        </a>
      </p>
    </div>
  );
};

export default SignupPage;
