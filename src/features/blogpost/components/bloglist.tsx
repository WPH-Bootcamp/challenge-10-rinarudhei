"use client";

import { Spinner } from "@/shared/components/ui/spinner";
import { useGetRecommendedBlogs } from "../hooks/useBlogposts";
import BlogCard from "./blogCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getRecommendedBlogs } from "../services/blogpostServices";
import NotFound from "@/shared/components/containers/notfound";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/shared/components/ui/separator";
import Link from "next/link";

type BlogListProps = {
  query?: string | string[] | undefined;
};
export default function BlogList({ query }: BlogListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [nextPage, setNextPage] = useState(1);

  const { data, isPending, isError, isPlaceholderData } =
    useGetRecommendedBlogs(
      {
        page: nextPage,
        limit: 5,
      },
      query,
    );

  useEffect(() => {
    if (!isPlaceholderData && data && data.page < data.lastPage) {
      queryClient.prefetchQuery({
        queryKey: ["recommended-blogs", data.page + 1, 5, query],
        queryFn: () =>
          getRecommendedBlogs({ page: data.page + 1, limit: 5 }, query),
      });
    }
  }, [data, isPlaceholderData, queryClient, query, setNextPage]);

  return (
    <div className="flex flex-col justify-center items-center">
      {isError ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
          </div>
        </div>
      ) : isPending ? (
        <Spinner className="mx-auto mt-20">Loading...</Spinner>
      ) : data?.data.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          <input onChange={() => setNextPage(1)} value={query || ""} hidden />
          {data.data.map((d, i) => (
            <React.Fragment key={i}>
              <Link href={`/detail/${d.id}`}>
                <BlogCard
                  title={d.title}
                  author={d.author.username}
                  username={d.author.username}
                  content={d.content}
                  comments={d.comments}
                  likes={d.likes}
                  imageUrl={d.imageUrl}
                  tags={d.tags}
                  createdAt={d.createdAt}
                  avatar={d.author.avatarUrl}
                ></BlogCard>
              </Link>
              <Separator />
            </React.Fragment>
          ))}
          <Pagination>
            <PaginationContent>
              {data.page > 1 && (
                <>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setNextPage(data.page - 1)}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => setNextPage(data.page - 1)}>
                      {data.page - 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                {isPending || isPlaceholderData ? (
                  <Spinner />
                ) : (
                  <PaginationLink isActive>{data.page}</PaginationLink>
                )}
              </PaginationItem>
              {data.lastPage !== data.page && (
                <>
                  <PaginationItem
                    onClick={() => setNextPage(data.page + 1)}
                    className="cursor-pointer"
                  >
                    <PaginationLink>{data.page + 1}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem
                    onClick={() => setNextPage(data.page + 1)}
                    className="cursor-pointer"
                  >
                    <PaginationNext />
                  </PaginationItem>
                </>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        <div className="flex flex-col w-fit absolute top-3/10 md:top-2/5 gap-6 md:left-9/20 items-center justify-start">
          <NotFound />
          <div className="flex flex-col">
            <h3 className="font-semibold text-cs-sm text-center">
              No results found
            </h3>
            <p className="text-cs-sm text-center">
              Try using different keywords
            </p>
          </div>
          <Button className="w-full" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}
