import { apiPost } from "@/shared/lib/api";
import { AddCommentRequest, Comment } from "../types/types";

export default async function addComment(
  req: AddCommentRequest,
): Promise<Comment> {
  const response = await apiPost<Comment, { content: string }>({
    endpoint: `/comments/${req.postId}`,
    body: { content: req.content },
    token: req.token,
  });

  return response;
}
