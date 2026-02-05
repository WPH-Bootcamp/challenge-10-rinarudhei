import { apiPost } from "@/shared/lib/api";
import { AddCommentRequest, Comment } from "../types/types";
import { getTokenFromCookies } from "@/shared/lib/auth";

export default async function addComment(
  req: AddCommentRequest,
): Promise<Comment | null> {
  const token = await getTokenFromCookies();
  if (!token) {
    throw new Error("Unauthorized");
  }
  const response = await apiPost<Comment, { content: string }>({
    endpoint: `/comments/${req.postId}`,
    body: { content: req.content },
    token,
  });

  return response;
}
