import { Author } from "@/features/blogpost/types/blogpost";

export type Comment = {
  id: number;
  content: string;
  author: Author;
  post: {
    id: number;
  };
  createdAt: string;
};

export type AddCommentRequest = {
  postId: number;
  content: string;
  token: string;
};
