import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getComments } from "../services/commentsService";

export function useGetComments(params: { postId: string }) {
  return useQuery({
    queryKey: ["comments", params.postId],
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    queryFn: () => getComments(params),
  });
}
