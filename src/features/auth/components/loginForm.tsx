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
import { Spinner } from "@/shared/components/ui/spinner";

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
  const { mutate, isPending } = useLogin();

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
      className="flex flex-col w-86.25 lg:w-90 h-fit rounded-xl outline p-6 gap-5 bg-white border-neutral-200 shadow-[0px_0px_24px_0px_#CDCCCC]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl h-8.5 font-bold text-neutral-950 w-full">
        Sign In
      </h1>
      <FieldGroup>
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
            <span className="text-xs text-[#ee1d52] h-6">
              This field is required
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
              <InputGroupAddon
                align="inline-end"
                onClick={toggleEye}
                className="h-fit w-fit"
              >
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
              This field is required
            </span>
          )}
        </FieldContent>
      </FieldGroup>
      <Button
        type="submit"
        className="text-sm text-neutral-25 font-semibold gap-2 p-2 rounded-full bg-primary-300"
        disabled={isPending}
      >
        {isPending ? <Spinner /> : "Login"}
      </Button>
      <div className="h-7 flex justify-center items-center gap-0.5">
        <p className="text-sm text-neutral-950 text-center ">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="cursor-pointer">
            <span className="font-bold text-primary-300">Register</span>
          </Link>
        </p>
      </div>
    </form>
  );
}
