import { Spinner } from "@/shared/components/ui/spinner";
import BlogCard from "./blogCard";
import { useGetOtherBlogByUserId } from "../hooks/useBlogposts";

type OtherBlogsProps = {
  authorId: number;
  currentBlogId: number;
};
export default function OtherBlogs({
  authorId,
  currentBlogId,
}: OtherBlogsProps) {
  const { data, isPending, isError } = useGetOtherBlogByUserId(
    { page: 1, limit: 10 },
    authorId,
    currentBlogId,
  );

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      {isError ? (
        <div className="flex justify-center items-center h-20 "></div>
      ) : isPending ? (
        <Spinner className="mx-auto mt-20">Loading...</Spinner>
      ) : (
        <>
          <h2 className="font-bold text-cs-xl text-neutral-900 sm:text-display-sm md:text-display-md lg:text-display-lg xl:text-display-xl h-8.5 md:h-9 p-0 m-0">
            Another Post
          </h2>
          <BlogCard
            title={data.title}
            tags={data.tags}
            username={data.author.username}
            avatar={data.author.avatarUrl}
            author={data.author.name}
            content={data.content}
            likes={data.likes}
            comments={data.comments}
            imageUrl={data.imageUrl}
          />
        </>
      )}
    </div>
  );
}
