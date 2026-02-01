"use client";

import { Spinner } from "@/shared/components/ui/spinner";
import { useGetRecommendedBlogs } from "../hooks/useBlogposts";
import BlogCard from "./blogCard";
import { Separator } from "@/shared/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import React from "react";

export default function BlogList() {
  const { data, isPending, isError } = useGetRecommendedBlogs({
    page: 1,
    limit: 5,
  });

  return (
    <div className="flex flex-col overflow-hidden">
      {isError ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
          </div>
        </div>
      ) : isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <div>
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
              <Separator />
            </React.Fragment>
          ))}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
