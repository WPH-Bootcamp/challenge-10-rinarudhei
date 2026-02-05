import { useGetLikesByPostId } from "../hooks/useBlogposts";
import { Spinner } from "@/shared/components/ui/spinner";
import { useLikeBlogpost } from "../hooks/blogpostMutation";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

type ThumbsUpButtonProps = {
  currentUserId: number | undefined | null;
  postId: string;
};
export default function ThumbsUpButton({
  currentUserId,
  postId,
}: ThumbsUpButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { data, isPending } = useGetLikesByPostId({
    postId: Number(postId),
    setIsLiked,
    currentUserId,
  });

  const { mutate, isPending: mPending } = useLikeBlogpost(Number(postId));

  const handleLikeButton = () => {
    mutate({ postId: Number(postId) });
    if (mPending) {
      setIsLiked((prev) => !prev);
    } else {
      setIsLiked((prev) => {
        if (data) {
          return data.some((l) => l.id === currentUserId);
        }

        return prev;
      });
    }
  };
  return (
    <>
      {isPending || !data ? (
        <Spinner />
      ) : (
        <ThumbsUp
          size={20}
          className={`${isLiked && "fill-primary-300 stroke-white stroke-1"} cursor-pointer w-5 h-5`}
          onClick={handleLikeButton}
        />
      )}
    </>
  );
}
