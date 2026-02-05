"use client";
import { Spinner } from "@/shared/components/ui/spinner";
import { useGetComments } from "../hooks/commentHooks";
import { generateAvatarFallback } from "@/shared/lib/utils";
import { Field, FieldTitle } from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import React, { ChangeEvent } from "react";
import dayjs from "dayjs";
import { useAddComment } from "../hooks/commentMutationHooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { X } from "lucide-react";

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
  const [commentText, setCommentText] = React.useState("");
  const [commentPopupText, setCommentPopupText] = React.useState("");
  const { mutate, isPending: isPendingComment } = useAddComment();
  const [seeAll, setSeeAll] = React.useState(false);
  const handleSubmitComment = () => {
    mutate({ content: commentText, postId });
    setCommentText("");
  };
  const handleSubmitCommentPopUp = () => {
    mutate({ content: commentText, postId });
    setCommentPopupText("");
  };

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
                <Avatar className="w-10 h-10 relative rounded-full">
                  <AvatarImage
                    sizes="40 40"
                    src={meAvatar || ""}
                    alt="current user avatar"
                    className="absolute object-cover"
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
              value={commentText}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setCommentText(event.target.value)
              }
            ></Textarea>
          </Field>
          <Button
            className="md:w-51 md:self-end"
            onClick={handleSubmitComment}
            disabled={isPendingComment}
          >
            {isPendingComment ? <Spinner /> : "Submit"}
          </Button>
          <div className="flex flex-col gap-3">
            {data
              .sort((a, b) => b.id - a.id)
              .slice(0, 3)
              .map((cm, i) => (
                <React.Fragment key={i}>
                  <Separator />
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex gap-2 lg:gap-3 items-center">
                      <Avatar className="w-10 h-10 lg:w-12 lg:h-12 relative rounded-full border-none">
                        <AvatarImage
                          src={cm.author.avatarUrl}
                          alt="commentor avatar"
                          className="w-10 h-10 lg:w-12 lg:h-12 absolute object-cover border-none m-auto p-auto"
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
          <span
            className="text-primary-300 h-7 font-semibold text-cs-xs lg:text-cs-sm underline cursor-pointer"
            onClick={() => setSeeAll((prev) => !prev)}
          >
            See All Comments
          </span>
          {seeAll && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 sm:p-16 z-49">
              <div className="bg-white z-50 flex flex-col gap-4 px-6 py-4 w-screen h-screen max-w-[613px] max-h-[658px] lg:max-h-[903px] rounded-2xl">
                <div className="h-fit w-full flex justify-between items-center">
                  <h2 className="text-cs-md font-bold lg:text-cs-xl h-7.5 lg:h-8.5 text-neutral-900">
                    Comments({data.length})
                  </h2>
                  <X
                    onClick={() => setSeeAll((prev) => !prev)}
                    size={24}
                    className="cursor-pointer"
                  />
                </div>
                <Field>
                  <FieldTitle>Give your Comments</FieldTitle>
                  <Textarea
                    className="text-neutral-950 h-11xl w-full"
                    placeholder="Enter your comment"
                    value={commentPopupText}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      setCommentPopupText(event.target.value)
                    }
                  ></Textarea>
                </Field>
                <Button
                  className="md:w-51 md:self-end"
                  onClick={handleSubmitCommentPopUp}
                  disabled={isPendingComment}
                >
                  {isPendingComment ? <Spinner /> : "Submit"}
                </Button>
                <div className="flex flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {data
                    .sort((a, b) => b.id - a.id)
                    .map((cm, i) => (
                      <React.Fragment key={i}>
                        <Separator />
                        <div key={i} className="flex flex-col gap-2">
                          <div className="flex gap-2 lg:gap-3 items-center">
                            <Avatar className="w-10 h-10 lg:w-12 lg:h-12 relative rounded-full border-none">
                              <AvatarImage
                                src={cm.author.avatarUrl}
                                alt="commentor avatar"
                                className="w-10 h-10 lg:w-12 lg:h-12 absolute object-cover border-none m-auto p-auto"
                              />
                              <AvatarFallback className="rounded-full w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center border-2 border-neutral-500 text-cs-md lg:text-cs-xl text-neutral-500 bg-neutral-100">
                                <p>
                                  {generateAvatarFallback(
                                    cm.author.name || "XX",
                                  )}
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
                          <p className="text-cm-xs lg:text-cs-sm">
                            {cm.content}
                          </p>
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
