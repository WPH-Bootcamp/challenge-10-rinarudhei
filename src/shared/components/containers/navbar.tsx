"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/components/ui/navigation-menu";
import Logo from "./logo";
import { useGetMe } from "@/features/user/hooks/useGetMe";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, PenLine, Search, UserRound, X } from "lucide-react";
import { generateAvatarFallback } from "@/shared/lib/utils";
import { useLogout } from "@/features/auth/hooks/useLogout";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Field } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import React from "react";

export function Navbar() {
  const { data, isPending, isError } = useGetMe();
  const { logout } = useLogout();
  const [searchText, setSearchText] = React.useState("");
  const router = useRouter();

  const handleClickRegister = () => {
    router.push("/register");
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/?query=${searchText}&page=1&limit=5`);
      setSearchText("");
      event.preventDefault();
    }
  };

  return (
    <NavigationMenu className="min-w-80 max-w-360 mx-auto border-b border-neutral-300 border-box">
      <NavigationMenuList className="h-16 min-w-72 w-screen px-4 py-5 sm:max-w-150 md:max-w-175 lg:max-w-231 xl:max-w-305">
        <NavigationMenuItem>
          <Link href="/">
            <Logo />
          </Link>
        </NavigationMenuItem>
        <Field className="hidden lg:inline max-w-93.25">
          <InputGroup className="flex h-12 rounded-xl py-2 px-3 lg:py-3 lg:px-4 bg-base-white justify-start items-center">
            <Search size={24} className="text-neutral-300" />
            <InputGroupInput
              className="text-sm leading-7 md:text-base md:leading-7.5  tracking-tight text-neutral-600"
              value={searchText}
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
          </InputGroup>
        </Field>
        {data && !isPending && !isError ? (
          <>
            <NavigationMenuList className="w-fit sm:w-65 h-10 px-3">
              <NavigationMenuItem className="hidden sm:inline">
                <Link
                  href="/login"
                  className="text-primary-300 font-semibold underline text-sm leading-7 tracking-tight cursor-pointer flex gap-2"
                >
                  <PenLine />
                  <span>Write Post</span>
                </Link>
              </NavigationMenuItem>
              <div className="h-5.75 hidden sm:inline">
                <Separator orientation="vertical" />
              </div>
              <NavigationMenuItem>
                <Popover>
                  <PopoverTrigger>
                    <div className="flex gap-4 items-center cursor-pointer">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={data.avatarUrl} alt="user avatar" />
                        <AvatarFallback>
                          <div className="rounded-full w-10 h-10 flex justify-center items-center border-2 border-neutral-500 text-lg md:text-xl lg:text-2xl text-neutral-500 bg-neutral-100">
                            <p>{generateAvatarFallback(data.name)}</p>
                          </div>
                        </AvatarFallback>
                      </Avatar>
                      <p className="hidden sm:inline text-neutral-950 text-sm leading-7">
                        {data.name}
                      </p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="border border-neutral-300 mt-2 mr-18.75 rounded-xl w-45.5 p-0 m-0">
                    <div className="flex gap-2 w-full h-full px-4 py-2">
                      <UserRound></UserRound>
                      <p className="text-neutral-950 text-sm leading-7">
                        Profile
                      </p>
                    </div>
                    <div
                      className="flex gap-2 px-4 py-2 cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut></LogOut>
                      <p className="text-neutral-950 text-sm leading-7">
                        Logout
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </NavigationMenuItem>
            </NavigationMenuList>
          </>
        ) : (
          <>
            <NavigationMenuItem className="inline sm:hidden">
              <NavigationMenuList className="flex justify-between items-center gap-6">
                <NavigationMenuItem>
                  <Search />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Menu />
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="w-screen min-w-80 h-full [&>button:first-of-type]:hidden"
                    >
                      <SheetHeader>
                        <div className="flex justify-between items-center mt-2">
                          <SheetTitle>
                            <Logo />
                          </SheetTitle>
                          <SheetClose>
                            <X />
                          </SheetClose>
                        </div>
                      </SheetHeader>
                      <Separator />
                      <div className="flex flex-col justify-between items-center gap-4 w-53.5 mx-auto mt-9.75">
                        <Link
                          href="/login"
                          className="text-primary-300 font-semibold underline text-sm leading-7 tracking-tight cursor-pointer"
                        >
                          Login
                        </Link>
                        <Button
                          className="text-sm leading-7 tracking-tight text-neutral-25 font-semibold gap-2 p-2 rounded-full bg-primary-300 h-11 w-full cursor-pointer"
                          onClick={handleClickRegister}
                        >
                          Register
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:inline h-full">
              <div className="flex items-center gap-6 h-full">
                <Link
                  href="/login"
                  className="text-primary-300 font-semibold underline text-sm leading-7 tracking-tight cursor-pointer"
                >
                  Login
                </Link>
                <Separator orientation="vertical" className="h-full w-full" />
                <Button
                  className="text-sm leading-7 tracking-tight text-neutral-25 font-semibold gap-2 p-2 rounded-full bg-primary-300 h-11 w-45.5 cursor-pointer"
                  onClick={handleClickRegister}
                >
                  Register
                </Button>
              </div>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
