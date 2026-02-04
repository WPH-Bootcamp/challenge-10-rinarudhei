import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { likeBlogpost } from "../services/blogPostServices";

export function useLikeBlogpost() {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: likeBlogpost,
    onError: () => {
      toast.error("Failed to add comment");
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userId-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["detail-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["popular-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["recommended-blog"] }),
      ]);
    },
  });
}
