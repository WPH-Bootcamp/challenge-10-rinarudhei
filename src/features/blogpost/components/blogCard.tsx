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
    <Card className={`${author && tags && createdAt && "h-58.5"}`}>
      {imageUrl && (
        <div
          className={
            "w-60 h-auto lg:w-60 lg:h-full xl:w-85 xl:h-67 hidden md:inline relative"
          }
        >
          <Image
            src={imageUrl as string}
            fill
            className="rounded-sm absolute"
            alt="blog post image"
          />
        </div>
      )}
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {tags && (
          <div className="mb-2 lg:mb-3 flex gap-2 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-7">
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
        <article className="text-ellipsis line-clamp-2 text-neutral-900 text-cs-xs text-wrap max-w-90.25">
          {content}
        </article>
        {author && (
          <div className="flex gap-3 justify-start items-center">
            <Avatar className="w-7.5 h-7.5 lg:w-10 lg:h-10">
              <AvatarImage sizes="30 30" src={""} alt="" />
              <AvatarFallback className="rounded-full w-7.5 h-7.5 lg:w-10 lg:h-10 flex justify-center items-center border-2 border-neutral-500 text-cs-md lg:text-cs-xl text-neutral-500 bg-neutral-100">
                <p>{generateAvatarFallback(author)}</p>
              </AvatarFallback>
            </Avatar>
            <p className="text-neutral-900 text-cs-xs lg:text-cs-sm">
              {author}
            </p>
            <Dot size={4} className="bg-neutral-400 rounded-full" />
            <p className="text-neutral-900 text-cs-xs lg:text-cs-sm">
              {dayjs(createdAt).format("DD MMMM YYYY")}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="gap-1.5 flex">
          <ThumbsUp size={20} />
          <p className="text-neutral-900 text-cs-xs lg:text-cs-sm">{likes}</p>
        </div>
        <div className="gap-1.5 flex">
          <MessageSquare size={20} />
          <p className="text-neutral-900 text-cs-xs lg:text-cs-sm">
            {comments}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
