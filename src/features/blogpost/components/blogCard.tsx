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
    <Card className="flex flex-col justify-start items-start p-4 m-0 border-0 border-none shadow-none w-screen hmin-w-72 sm:max-w-150 md:max-w-175 lg:max-w-231 xl:max-w-305">
      <CardTitle className="w-full h-full text-start text-neutral-900 mb-2">
        {title}
      </CardTitle>
      {tags && (
        <div className="mb-2 flex gap-2 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tags.map((t, i) => (
            <Badge
              key={i}
              className="p-2 rounded-md bg-white border border-neutral-300 text-xs tracking-tight leading-6 text-neutral-900"
            >
              {t}
            </Badge>
          ))}
        </div>
      )}
      <CardContent className="mb-3 w-full h-full p-0 m-0">
        <article className="text-ellipsis line-clamp-3 mb-3">{content}</article>
        {author && (
          <div className="flex gap-3 justify-start items-center">
            <Avatar className="w-7.5 h-7.5">
              <AvatarImage sizes="30 30" src={""} alt="" />
              <AvatarFallback>
                <div className="rounded-full w-7.5 h-7.5 flex justify-center items-center border-2 border-neutral-500 text-base md:text-lg lg:text-xl text-neutral-500 bg-neutral-100">
                  <p>{generateAvatarFallback(author)}</p>
                </div>
              </AvatarFallback>
            </Avatar>
            <p className="text-neutral-900 text-xs leading-6 tracking-tight">
              {author}
            </p>
            <Dot size={4} className="bg-neutral-400 rounded-full" />
            <p className="text-neutral-900 text-xs leading-6 tracking-tight">
              {dayjs(createdAt).format("DD MMMM YYYY")}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-3 p-0 m-0 h-full w-full">
        <div className="gap-1.5 flex">
          <ThumbsUp />
          <p className="text-neutral-900 text-xs leading-6 tracking-tight">
            {likes}
          </p>
        </div>
        <div className="gap-1.5 flex">
          <MessageSquare />
          <p className="text-neutral-900 text-xs leading-6 tracking-tight">
            {comments}
          </p>
        </div>
      </CardFooter>

      {!isLast && <Separator className="my-4" />}
    </Card>
  );
}
