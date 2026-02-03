"use client";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import useRegister from "../hooks/useRegister";
import { useForm, SubmitHandler } from "react-hook-form";
import { MINIMUM_PASSWORD_LENGTH } from "@/shared/lib/constant";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [isEye, setIsEye] = useState(false);
  const { mutate, isPending } = useRegister();

  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(
        "email",
        {
          message: "invalid email",
          type: "manual",
        },
        { shouldFocus: true },
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "confirmPassword",
        {
          message: "mismatch confirm password field",
          type: "manual",
        },
        { shouldFocus: false },
      );

      return;
    }

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      setError(
        "password",
        { message: "Password must be at least 8 characters", type: "length" },
        { shouldFocus: true },
      );

      return;
    }
    mutate({
      name,
      email,
      password,
      username: name.split(" ").slice(0, 2).join("").toLowerCase(),
    });
  };
  const toggleEye = () => {
    setIsEye((prev) => !prev);
  };
  return (
    <form
      className="flex flex-col w-86.25 lg:w-100 h-fit rounded-xl outline p-6 gap-5 bg-white border-neutral-200 shadow-[0px_0px_24px_0px_#CDCCCC]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl h-8.5 font-bold text-neutral-950 w-full">
        Sign Up
      </h1>
      <FieldGroup>
        <FieldContent>
          <FieldLabel
            htmlFor="name"
            className="font-semibold text-sm w-full h-7"
          >
            Name
          </FieldLabel>
          <Field>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
          </Field>
          {errors.name && (
            <span className="text-xs text-[#ee1d52] h-6">
              This field is required
            </span>
          )}
        </FieldContent>
        <FieldContent>
          <FieldLabel
            htmlFor="email"
            className="font-semibold text-sm w-full h-7"
          >
            Email
          </FieldLabel>
          <Field>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
          </Field>
          {errors.email && (
            <span className="text-xs leading-6 text-[#ee1d52] h-6">
              {`${errors.email.type === "manual" ? "Invalid email" : "This field is required"}`}
            </span>
          )}
        </FieldContent>
        <FieldContent>
          <FieldLabel
            htmlFor="password"
            className="font-semibold text-sm w-full h-7"
          >
            Password
          </FieldLabel>
          <Field>
            <InputGroup>
              <InputGroupInput
                id="password"
                type={isEye ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <InputGroupAddon align="inline-end" onClick={toggleEye}>
                {isEye ? (
                  <Eye
                    size={20}
                    className="font-extrabold text-neutral-950 w-5 h-5"
                  ></Eye>
                ) : (
                  <EyeClosed
                    size={20}
                    className="font-extrabold text-neutral-950"
                  ></EyeClosed>
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>
          {errors.password && (
            <span className="text-xs text-[#ee1d52] h-6">
              {errors.password.type === "length"
                ? "Password must be at least 8 characters"
                : "This field is required"}
            </span>
          )}
        </FieldContent>
        <FieldContent>
          <FieldLabel
            htmlFor="confirm-password"
            className="font-semibold text-sm w-full h-7"
          >
            Confirm Password
          </FieldLabel>
          <Field>
            <InputGroup>
              <InputGroupInput
                id="confirm-password"
                type={isEye ? "text" : "password"}
                placeholder="Enter your confirm password"
                {...register("confirmPassword", { required: true })}
              />
              <InputGroupAddon align="inline-end" onClick={toggleEye}>
                {isEye ? (
                  <Eye className="font-extrabold text-neutral-950"></Eye>
                ) : (
                  <EyeClosed className="font-extrabold text-neutral-950"></EyeClosed>
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>
          {errors.confirmPassword && (
            <span className="text-xs text-[#ee1d52] h-6">
              {errors.confirmPassword.type === "manual"
                ? errors.confirmPassword.message
                : "This field is required"}
            </span>
          )}
        </FieldContent>
      </FieldGroup>
      <Button type="submit" disabled={isPending}>
        {isPending ? <Spinner /> : "Register"}
      </Button>
      <div className="h-7 flex justify-center items-center gap-0.5">
        <p className="text-sm text-neutral-950 text-center ">
          Already have an account?{" "}
        </p>
        <Link href="/register" className="cursor-pointer">
          <span className="text-sm font-bold text-primary-300 text-center">
            Register
          </span>
        </Link>
      </div>
    </form>
  );
}
