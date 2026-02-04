import { BlogPost } from "@/features/blogpost/types/blogpost";
import { PaginationResponse } from "@/types";

export type UserMe = {
  id: number;
  name: string;
  email: string;
  headline: string;
  avatarUrl: string;
  username: string;
};

export type UserDetail = Omit<UserMe, "email"> & {
  posts: PaginationResponse<BlogPost>;
};
