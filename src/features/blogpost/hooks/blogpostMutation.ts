import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { likeBlogpost } from "../services/blogPostServices";
import { Dispatch, SetStateAction } from "react";

export function useLikeBlogpost(
  postId: number,
  setIsLiked: Dispatch<SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeBlogpost,
    onMutate: () => {
      setIsLiked((prev) => !prev);
    },
    onError: () => {
      toast.error("Failed to like blog");
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userId-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["detail-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["popular-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["recommended-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["recommended-blog"] }),
        queryClient.invalidateQueries({
          queryKey: ["likes", postId],
          refetchType: "active",
        }),
      ]);
    },
  });
}
