import { Spinner } from "@/shared/components/ui/spinner";
import { useGetComments } from "../hooks/commentHooks";
import { generateAvatarFallback } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Field, FieldTitle } from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import React from "react";
import dayjs from "dayjs";

type CommentForm = {
  postId: number;
  mePending: boolean;
  meName: string | undefined;
  meAvatar: string | undefined;
  meUserName: string | undefined;
};
export default function CommentForm({
  postId,
  mePending,
  meName,
  meAvatar,
  meUserName,
}: CommentForm) {
  const { data, isPending, isError } = useGetComments({ postId });
  return (
    <div className="flex flex-col gap-3">
      {isError ? (
        <div className="flex justify-center items-center h-20">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
          </div>
        </div>
      ) : isPending ? (
        <Spinner className="mx-auto">Loading...</Spinner>
      ) : (
        <>
          <h2 className="text-cs-xl lg:text-display-xs font-bold h-8.5 lg:h-9 text-neutral-900">
            Comments({data.length})
          </h2>
          <div className="flex gap-2 lg:gap-3 justify-start items-center">
            {mePending ? (
              <Spinner />
            ) : (
              <>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    sizes="40 40"
                    src={meAvatar || ""}
                    alt="current user avatar"
                  />
                  <AvatarFallback className="rounded-full w-10 h-10 flex justify-center items-center border-2 border-neutral-500 text-cs-md lg:text-cs-xl text-neutral-500 bg-neutral-100">
                    <p>{generateAvatarFallback(meName || "XX")}</p>
                  </AvatarFallback>
                </Avatar>
                <p className="text-neutral-900 text-cs-xs lg:text-cs-sm font-medium">
                  {meUserName || ""}
                </p>
              </>
            )}
          </div>
          <Field>
            <FieldTitle>Give your Comments</FieldTitle>
            <Textarea
              className="text-neutral-950 h-11xl w-full"
              placeholder="Enter your comment"
            ></Textarea>
          </Field>
          <Button className="md:w-51 md:self-end">Send</Button>
          <div className="flex flex-col gap-3">
            {data
              .reverse()
              .slice(0, 3)
              .map((cm, i) => (
                <React.Fragment key={i}>
                  <Separator />
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex gap-2 lg:gap-3 items-center">
                      <Avatar className="w-10 h-10 lg:w-12 lg:h-12 py-px">
                        <AvatarImage
                          src={cm.author.avatarUrl}
                          alt="commentor avatar"
                          className="w-10 h-10 lg:w-12 lg:h-12"
                        />
                        <AvatarFallback className="rounded-full w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center border-2 border-neutral-500 text-cs-md lg:text-cs-xl text-neutral-500 bg-neutral-100">
                          <p>
                            {generateAvatarFallback(cm.author.name || "XX")}
                          </p>
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-start h-11 lg:h-12 relative">
                        <p className="text-neutral-900 text-cs-xs lg:text-cs-sm font-semibold absolute top-0">
                          {cm.author.username}
                        </p>
                        <p className="text-neutral-600 text-cs-xs lg:text-cs-sm absolute bottom-0 w-19.75 lg:w-23.25 text-nowrap">
                          {dayjs(cm.createdAt).format("DD MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <p className="text-cm-xs lg:text-cs-sm">{cm.content}</p>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </>
      )}
      <span className="text-primary-300 h-7 font-semibold text-cs-xs lg:text-cs-sm underline">
        See All Comments
      </span>
    </div>
  );
}
