import { apiPost } from "@/shared/lib/api";
import { BlogPost } from "../types/blogpost";
import { getTokenFromCookies } from "@/shared/lib/auth";

export async function likeBlogpost(param: {
  postId: number;
}): Promise<BlogPost> {
  const token = await getTokenFromCookies();
  if (!token) {
    throw new Error("Unauthorized");
  }
  return await apiPost<BlogPost, unknown>({
    endpoint: `/posts/${param.postId}/like`,
    token: token,
  });
}
