"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { signinStart, signinSuccess, signinFailure } from "@oms/store/signin";
import { useEffect } from "react";
import { toast } from "sonner";
import { SignInInput, SignInSchema } from "@oms/types/auth.validator";
import api from "@oms/utils/api";
import { Role } from "@oms/types/user.type";
import { setUser } from "@oms/store/auth";
import { useRouter } from "next/navigation";
import { axiosErrorHandler } from "@oms/utils/handlers";

const SigninPage = ({ role }: { role: Role }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.signin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      role, // set role from props
    },
  });

  const onSubmit = async (data: SignInInput) => {
    dispatch(signinStart());
    try {
      const res = await api.post("/auth/signin", { ...data, role });

      if (res.status === 200) {
        const user = res.data.user;
        dispatch(setUser(user));
        dispatch(signinSuccess());
        toast.success("Signin successful!");
        router.push("/");
      }
    } catch (err: any) {
      axiosErrorHandler(err, "Signin Page - onSubmit");
      const message = err?.response?.data?.message || "Signin failed";
      dispatch(signinFailure(message));
      toast.error(message);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div
      className="min-w-sm mx-auto mt-10 p-6 shadow-xl rounded-2xl flex flex-col gap-5"
      style={{
        background: "#ffffff1c",
      }}
    >
      <h1 className="text-2xl font-semibold text-center mb-4">Signin</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* <div>
          <input {...register('primaryMobile')} placeholder="Mobile (optional)" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.primaryMobile && <p className="text-red-500 text-sm">{errors.primaryMobile.message}</p>}
        </div> */}

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded-lg hover:bg-blue-700 high-btn-bg"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Don&apos;t have account?{" "}
        <a href="/auth/signup" className="text-blue-600 hover:underline">
          Create here
        </a>
      </p>
    </div>
  );
};

export default SigninPage;
