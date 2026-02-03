"use client";

import { useParams } from "next/navigation";
import { useGetBlogDetail } from "../../../../features/blogpost/hooks/useBlogposts";
import { Spinner } from "@/shared/components/ui/spinner";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { generateAvatarFallback } from "@/shared/lib/utils";
import dayjs from "dayjs";
import { Dot, MessageSquare, ThumbsUp } from "lucide-react";
import { Separator } from "@/shared/components/ui/separator";

export default function DetailBlogContent() {
  const params = useParams<{ id: string }>();
  const { data, isPending, isError } = useGetBlogDetail({ id: params.id });

  return (
    <div className="mx-auto mt-16 gap-3 p-4 sm:mt-24 md:mt-28 lg:mt-32 lg:p-0 lg:gap-4 xs:max-w-98.25 sm:max-w-120 md:max-w-150 lg:max-w-200">
      {isError ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
          </div>
        </div>
      ) : isPending ? (
        <Spinner className="mx-auto mt-20">Loading...</Spinner>
      ) : (
        data && (
          // Header
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <h1 className="text-display-sm text-neutral-900 lg:text-display-lg font-bold">
                {data.title}
              </h1>

              {data.tags && (
                <div className="flex gap-2 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-7">
                  {data.tags.map((t, i) => (
                    <Badge
                      key={i}
                      className="px-2 py-1 rounded-md bg-white border border-neutral-300 text-cs-xs text-neutral-900"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-start items-center">
              <div className="flex gap-2 justify-start items-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage sizes="40 40" src={""} alt="" />
                  <AvatarFallback className="rounded-full w-10 h-10 flex justify-center items-center border-2 border-neutral-500 text-cs-md lg:text-cs-xl text-neutral-500 bg-neutral-100">
                    <p>{generateAvatarFallback(data.author.name || "XX")}</p>
                  </AvatarFallback>
                </Avatar>
                <p className="text-neutral-900 text-cs-xs lg:text-cs-sm font-medium">
                  {data.author.username}
                </p>
              </div>
              <Dot size={4} className="bg-neutral-400 rounded-full" />
              <p className="text-neutral-900 text-cs-xs lg:text-cs-sm">
                {dayjs(data.createdAt).format("DD MMMM YYYY")}
              </p>
            </div>
            <Separator />
            <div className="flex gap-3">
              <div className="gap-1.5 flex">
                <ThumbsUp size={20} />
                <p className="text-neutral-600 text-cs-xs lg:text-cs-sm">
                  {data.likes}
                </p>
              </div>
              <div className="gap-1.5 flex">
                <MessageSquare size={20} />
                <p className="text-neutral-600 text-cs-xs lg:text-cs-sm">
                  {data.comments}
                </p>
              </div>
            </div>
            <Separator />
          </div>
        )
      )}
    </div>
  );
}
