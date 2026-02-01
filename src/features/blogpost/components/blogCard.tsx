import { Badge } from "@/shared/components/ui/badge";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Dot, MessageSquare, ThumbsUp } from "lucide-react";

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
}: BlogCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {tags && (
          <div>
            {tags.map((t, i) => (
              <Badge key={i}>{t}</Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <article className="text-ellipsis line-clamp-3">{content}</article>
        {author && (
          <div className="flex">
            <div>MyAvatar</div>
            <p>{author}</p>
            <Dot />
            <p>{dayjs(createdAt).format("DD MMMM YYYY")}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <ThumbsUp />
        <p>{likes}</p>
        <MessageSquare />
        <p>{comments}</p>
      </CardFooter>
    </Card>
  );
}
