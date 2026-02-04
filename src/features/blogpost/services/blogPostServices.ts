import { apiPost } from "@/shared/lib/api";
import { BlogPost } from "../types/blogpost";

export function likeBlogpost(param: { postId: number; token: string }) {
  return apiPost<BlogPost, unknown>({
    endpoint: `/posts/${param.postId}/like`,
    token: param.token,
  });
}
