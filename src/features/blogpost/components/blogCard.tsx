import { Badge } from "@/shared/components/ui/badge";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/shared/components/ui/card";
import { Dot, MessageSquare, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { generateAvatarFallback } from "@/shared/lib/utils";
import { Separator } from "@/shared/components/ui/separator";
import Image from "next/image";

type BlogCardProps = {
  title: string;
  tags?: string[];
  avatar?: string;
  content: string;
  author?: string;
  createdAt?: string;
  likes: number;
  comments: number;
  imageUrl?: string | undefined;
  isLast?: boolean;
};

export default function BlogCard({
  title,
  tags,
  content,
  author,
  createdAt,
  likes,
  comments,
  imageUrl,
  isLast,
}: BlogCardProps) {
  return (
    <Card className="flex flex-col justify-start items-start p-4 m-0 border-0 border-none shadow-none w-screen min-w-72 sm:max-w-150 md:max-w-175 lg:min-w-full lg:w-full">
      <div className="flex gap-6 h-full w-full">
        {imageUrl && (
          <div className="w-60 h-auto lg:w-60 lg:h-auto xl:w-85 xl:h-67 hidden md:inline relative">
            <Image
              src={imageUrl as string}
              fill
              className="rounded-sm absolute"
              alt="blog post image"
            />
          </div>
        )}
        <div className="flex flex-col h-full w-full lg:w-110.75">
          <CardTitle className="w-full h-full text-start text-neutral-900 mb-2 lg:mb-3 lg:text-xl text-wrap">
            {title}
          </CardTitle>
          {tags && (
            <div className="mb-2 lg:mb-3 flex gap-2 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {tags.map((t, i) => (
                <Badge
                  key={i}
                  className="px-2 py-1 rounded-md bg-white border border-neutral-300 text-xs text-neutral-900"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}
          <CardContent className="mb-3 lg:mb-4 w-full h-full p-0 mt-0 mx-0">
            <article className="text-ellipsis line-clamp-2 mb-3 lg:mb-3 lg:text-md">
              {content}
            </article>
            {author && (
              <div className="flex gap-3 justify-start items-center h-full">
                <Avatar className="w-7.5 h-7.5 lg:w-10 lg:h-10">
                  <AvatarImage sizes="30 30" src={""} alt="" />
                  <AvatarFallback>
                    <div className="rounded-full w-7.5 h-7.5 lg:w-10 lg:h-10 flex justify-center items-center border-2 border-neutral-500 text-md lg:text-xl text-neutral-500 bg-neutral-100">
                      <p>{generateAvatarFallback(author)}</p>
                    </div>
                  </AvatarFallback>
                </Avatar>
                <p className="text-neutral-900 text-xs lg:text-sm">{author}</p>
                <Dot size={4} className="bg-neutral-400 rounded-full" />
                <p className="text-neutral-900 text-xs lg:text-sm">
                  {dayjs(createdAt).format("DD MMMM YYYY")}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="gap-3 lg:gap-5 p-0 m-0 h-full w-full">
            <div className="gap-1.5 flex">
              <ThumbsUp />
              <p className="text-neutral-900 text-xs lg:text-sm">{likes}</p>
            </div>
            <div className="gap-1.5 flex">
              <MessageSquare />
              <p className="text-neutral-900 text-xs lg:text-sm">{comments}</p>
            </div>
          </CardFooter>
        </div>
      </div>
      {!isLast && <Separator className="my-4" />}
    </Card>
  );
}
