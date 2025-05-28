"use client";

import { useState, useEffect } from "react";
import Input from "../components/auth/Input";
import { Role } from "@oms/types/user.type";
import Link from "next/link";
import { toast } from "sonner";
import api from "@oms/utils/api";
import { signupStart, signupSuccess, signupFailure } from "@oms/store/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInput, SignUpSchema } from "@oms/types/auth.validator";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "@oms/store/auth";
import { axiosErrorHandler, errorMessageHandler } from "@oms/utils/handlers";

const SignUp = ({ role }: { role: Role }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.signup);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      role,
    },
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: SignUpInput) => {
    console.log("Registration completed:", data);
    dispatch(signupStart());
    try {
      const res = await api.post("/auth/signup", { ...data, role }); // Adjust API path as needed
      if (res.status === 200) {
        const user = res.data.user;
        dispatch(setUser(user));
        dispatch(signupSuccess());
        toast.success("Signup successful!");
        router.push("/auth/signin");
        reset();
      }
    } catch (err: unknown) {
      axiosErrorHandler(err, "SignUp Page - onSubmit");
      const message = errorMessageHandler(err);
      dispatch(signupFailure(message));
      toast.error(message);
    }
  };
  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${currentStep >= 1 ? "text-white font-semibold" : "text-gray-500"}`}>
              Personal Info
            </span>
            <span className={`text-sm font-medium ${currentStep >= 2 ? "text-white" : "text-gray-500"}`}>
              Address Info
            </span>
          </div>
          <div className="w-full bg-white/40 rounded-full h-2  shadow-inner overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-600 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{
            background: "#ffffff1c",
          }}
        >
          <div className="relative">
            {/* Step 1: Personal Information */}
            <div
              className={`p-8 transition-all duration-500 ease-in-out ${
                currentStep === 1
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0 absolute top-0 left-0 w-full"
              }`}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold  mb-2">Create Account</h2>
                <p className="text-white/60">Let&rsquo;s start with your personal information</p>
              </div>

              <Input type="text" placeholder="First Name" {...register("firstName")} error={errors.firstName} />
              <Input type="text" placeholder="Last Name" {...register("lastName")} error={errors.lastName} />

              <Input type="email" placeholder="Email,  eg:@gmail.com" {...register("email")} error={errors.email} />

              <Input
                type="tel"
                placeholder="Phone number"
                {...register("primaryMobile")}
                error={errors.primaryMobile}
              />

              <Input type="password" placeholder="Password" {...register("password")} error={errors.password} />

              <button
                onClick={handleNext}
                type="button"
                className="w-full high-btn-bg text-white py-3 px-6 rounded-lg font-semibold  transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Next Step
              </button>
            </div>

            {/* Step 2: Address Information */}
            <div
              className={`p-8 transition-all duration-500 ease-in-out ${
                currentStep === 2
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 absolute top-0 left-0 w-full"
              }`}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Address Information</h2>
                <p className="text-white/60">Tell us where you&rsquo;re located</p>
              </div>

              <Input
                type="text"
                placeholder="Street address"
                {...register("address.street")}
                error={errors.address?.street}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" placeholder="City" {...register("address.city")} error={errors.address?.city} />

                <div className="mb-4">
                  <select
                    {...register("address.AddressType")}
                    defaultValue={"PERMANENT"}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.address?.type ? "border-red-500 bg-black/20" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="PERMANENT" className="bg-white50 text-black">
                      Permanent
                    </option>
                    <option value="CURRENT" className="bg-white50 text-black">
                      Current
                    </option>
                    <option value="OTHER" className="bg-white50 text-black">
                      Other
                    </option>
                  </select>
                  {errors.address?.AddressType && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.address.AddressType.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Country"
                  {...register("address.country")}
                  error={errors.address?.country}
                />

                <Input
                  type="text"
                  placeholder="Zip code"
                  {...register("address.zipCode")}
                  error={errors.address?.zipCode}
                />
              </div>
              <div className="mb-6">
                <Input type="text" placeholder="State" {...register("address.state")} error={errors.address?.state} />
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full high-btn-bg text-white py-3 px-6 rounded-lg font-semibold  transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Complete Registration"}
                </button>

                <button
                  onClick={handleBack}
                  type="button"
                  disabled={isLoading}
                  className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 cursor-pointer"
                >
                  Back to Personal Info
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
