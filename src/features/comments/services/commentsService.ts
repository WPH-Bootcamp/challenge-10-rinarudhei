import { apiGet } from "@/shared/lib/api";
import { Comment } from "../types/types";

export async function getComments(params: {
  postId: number;
}): Promise<Comment[]> {
  return await apiGet<Comment[]>(`/comments/${params.postId}`);
}
