import { useMutation, useQueryClient } from "@tanstack/react-query";
import addComment from "../services/commentPostService";
import { toast } from "sonner";

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onError: () => {
      toast.error("Failed to add comment");
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userId-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["detail-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["popular-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["recommended-blog"] }),
        queryClient.invalidateQueries({ queryKey: ["comments"] }),
      ]);
    },
  });
}
