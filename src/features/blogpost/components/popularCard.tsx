import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/shared/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";

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

export default function PopularCard({
  title,
  content,
  likes,
  comments,
}: BlogCardProps) {
  return (
    <Card className="w-screen xs:w-90.25 sm:w-full gap-3 lg:gap-4 h-full">
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <article className="text-ellipsis line-clamp-2 text-neutral-900 text-cs-xs text-wrap">
          {content}
        </article>
      </CardContent>
      <div className="grid grid-cols-3 h-7 gap-3 lg:gap-5 w-37.25 items-center">
        <div className="gap-1.5 flex items-center">
          <ThumbsUp size={20} />
          <p className="text-neutral-600 text-cs-xs lg:text-cs-sm">{likes}</p>
        </div>
        <div className="gap-1.5 flex items-center">
          <MessageSquare size={20} />
          <p className="text-neutral-600 text-cs-xs lg:text-cs-sm">
            {comments}
          </p>
        </div>
      </div>
    </Card>
  );
}
