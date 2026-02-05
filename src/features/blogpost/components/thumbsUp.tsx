import { useGetLikesByPostId } from "../hooks/useBlogposts";
import { Spinner } from "@/shared/components/ui/spinner";
import { useLikeBlogpost } from "../hooks/blogpostMutation";
import { ThumbsUp } from "lucide-react";

type ThumbsUpButtonProps = {
  currentUserId: number | undefined | null;
  postId: string;
};
export default function ThumbsUpButton({
  currentUserId,
  postId,
}: ThumbsUpButtonProps) {
  const { data, isPending } = useGetLikesByPostId({
    postId: Number(postId),
  });

  const { mutate } = useLikeBlogpost(Number(postId));

  const handleLikeButton = () => {
    mutate({ postId: Number(postId) });
  };
  return (
    <>
      {isPending || !data ? (
        <Spinner />
      ) : (
        <ThumbsUp
          size={20}
          className={`${data.some((l) => l.id === currentUserId) && "fill-primary-300 stroke-white stroke-1"} cursor-pointer w-5 h-5`}
          onClick={handleLikeButton}
        />
      )}
    </>
  );
}
