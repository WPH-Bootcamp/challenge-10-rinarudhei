"use client";
import { Button } from "@/shared/components/ui/button";
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
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import useLogin from "../hooks/useLogin";

type Inputs = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isEye, setIsEye] = useState(false);
  const { mutate } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    mutate({
      email,
      password,
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
                This field is required
              </span>
            )}
          </Field>
        </FieldContent>
      </FieldGroup>
      <Button
        type="submit"
        className="text-sm leading-7 tracking-tight text-neutral-25 font-semibold gap-2 p-2 rounded-full bg-primary-300"
      >
        Login
      </Button>
      <p className="text-sm leading-7 tracking-tight text-neutral-950 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="cursor-pointer">
          <span className="font-bold text-primary-300">Register</span>
        </Link>
      </p>
    </form>
  );
}
