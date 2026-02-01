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

export default function BlogList() {
  const queryClient = useQueryClient();
  const [nextPage, setNextPage] = useState(1);
  const { data, isPending, isError, isPlaceholderData } =
    useGetRecommendedBlogs({
      page: nextPage,
      limit: 5,
    });
  useEffect(() => {
    if (!isPlaceholderData && data && data.page < data.lastPage) {
      queryClient.prefetchQuery({
        queryKey: ["recommended-blogs", data.page + 1, 5],
        queryFn: () => getRecommendedBlogs({ page: data.page + 1, limit: 5 }),
      });
    }
  }, [data, isPlaceholderData, nextPage, queryClient]);

  return (
    <div className="flex flex-col justify-center items-center">
      {isError ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
          </div>
        </div>
      ) : isPending ? (
        <Spinner className="mx-auto">Loading...</Spinner>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {data?.data.map((d, i) => (
            <React.Fragment key={i}>
              <BlogCard
                key={i}
                title={d.title}
                author={d.author.name}
                content={d.content}
                comments={d.comments}
                likes={d.likes}
                imageUrl={d.imageUrl}
                tags={d.tags}
                createdAt={d.createdAt}
              ></BlogCard>
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
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => setNextPage(data.page - 1)}>
                      {data.page - 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationLink isActive>{data.page}</PaginationLink>
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
      )}
    </div>
  );
}
