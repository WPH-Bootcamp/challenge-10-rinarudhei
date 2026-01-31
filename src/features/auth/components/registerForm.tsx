"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import useRegister from "../hooks/useRegister";
import { useForm, SubmitHandler } from "react-hook-form";
import { MINIMUM_PASSWORD_LENGTH } from "@/shared/lib/constant";
import Link from "next/link";

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
  const { mutate } = useRegister();

  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      setError(
        "confirmPassword",
        {
          message: "mismatch confirm password field",
          type: "manual",
        },
        { shouldFocus: false },
      );
    }

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      setError(
        "password",
        { message: "Password must be at least 8 characters", type: "length" },
        { shouldFocus: true },
      );
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
      className="flex flex-col w-[345px] lg:w-100 h-fit rounded-xl border p-6 gap-5 bg-white border-neutral-200 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-bold tracking-tight leading-8.5 text-neutral-950">
        Sign Up
      </h1>
      <FieldGroup>
        <FieldContent>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Field>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs tracking-tight leading-6 text-[#ee1d52]">
                This field is required
              </span>
            )}
          </Field>
        </FieldContent>
        <FieldContent>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Field>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs tracking-tight leading-6 text-[#ee1d52]">
                This field is required
              </span>
            )}
          </Field>
        </FieldContent>
        <FieldContent>
          <FieldLabel htmlFor="password">Password</FieldLabel>
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
                  <Eye className="font-extrabold text-neutral-950"></Eye>
                ) : (
                  <EyeClosed className="font-extrabold text-neutral-950"></EyeClosed>
                )}
              </InputGroupAddon>
            </InputGroup>
            {errors.password && (
              <span className="text-xs tracking-tight leading-6 text-[#ee1d52]">
                {errors.password.type === "length"
                  ? "Password must be at least 8 characters"
                  : "This field is required"}
              </span>
            )}
          </Field>
        </FieldContent>
        <FieldContent>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
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
            {errors.confirmPassword && (
              <span className="text-xs tracking-tight leading-6 text-[#ee1d52]">
                {errors.confirmPassword.type === "manual"
                  ? errors.confirmPassword.message
                  : "This field is required"}
              </span>
            )}
          </Field>
        </FieldContent>
      </FieldGroup>
      <Button
        type="submit"
        className="text-sm leading-7 tracking-tight text-neutral-25 font-semibold gap-2 p-2 rounded-full bg-primary-300"
      >
        Register
      </Button>
      <p className="text-sm leading-7 tracking-tight text-neutral-950 text-center">
        Already have an account?{" "}
        <Link href="/login" className="cursor-pointer">
          <span className="font-bold text-primary-300">Log In</span>
        </Link>
      </p>
    </form>
  );
}
