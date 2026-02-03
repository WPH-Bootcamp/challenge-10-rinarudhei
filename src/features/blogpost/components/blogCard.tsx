import { Badge } from "@/shared/components/ui/badge";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/shared/components/ui/card";
import { Dot, MessageSquare, ThumbsUp } from "lucide-react";
import { generateAvatarFallback } from "@/shared/lib/utils";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

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
}: BlogCardProps) {
  return (
    <div className="flex gap-6 justify-start">
      <div className="w-60 lg:w-76 xl:w-85 h-64.5 hidden md:block relative my-2.25">
        <Image
          src={imageUrl as string}
          alt="blog post image"
          fill
          placeholder="empty"
        />
      </div>
      <Card className="h-full gap-3 lg:gap-4">
        <CardContent className="w-screen xs:w-90.25 sm:w-full md:w-90 xl:w-110.75 gap-2 lg:gap-3">
          <CardTitle className="lg:text-cs-xl">{title}</CardTitle>
          {tags && (
            <div className="flex gap-2 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-7">
              {tags.map((t, i) => (
                <Badge
                  key={i}
                  className="px-2 py-1 rounded-md bg-white border border-neutral-300 text-cs-xs text-neutral-900"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}
          <article className="text-ellipsis line-clamp-2 text-neutral-900 text-cs-xs text-wrap">
            {content}
          </article>
        </CardContent>
        <div className="flex gap-3 justify-start items-center">
          <div className="flex gap-2 justify-start items-center">
            <Avatar className="w-7.5 h-7.5 lg:w-10 lg:h-10">
              <AvatarImage sizes="30 30" src={""} alt="" />
              <AvatarFallback className="rounded-full w-7.5 h-7.5 lg:w-10 lg:h-10 flex justify-center items-center border-2 border-neutral-500 text-cs-md lg:text-cs-xl text-neutral-500 bg-neutral-100">
                <p>{generateAvatarFallback(author || "XX")}</p>
              </AvatarFallback>
            </Avatar>
            <p className="text-neutral-900 text-cs-xs lg:text-cs-sm">
              {author}
            </p>
          </div>
          <Dot size={4} className="bg-neutral-400 rounded-full" />
          <p className="text-neutral-900 text-cs-xs lg:text-cs-sm">
            {dayjs(createdAt).format("DD MMMM YYYY")}
          </p>
        </div>
        <CardFooter>
          <div className="gap-1.5 flex">
            <ThumbsUp size={20} />
            <p className="text-neutral-600 text-cs-xs lg:text-cs-sm">{likes}</p>
          </div>
          <div className="gap-1.5 flex">
            <MessageSquare size={20} />
            <p className="text-neutral-660 text-cs-xs lg:text-cs-sm">
              {comments}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
