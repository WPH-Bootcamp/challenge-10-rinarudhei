"use client";
import React from "react";
import BlogCard from "./blogCard";
import { Spinner } from "@/shared/components/ui/spinner";
import { useGetPopularBlogs } from "../hooks/useBlogposts";

export default function PopularBlogs() {
  const { data, isError, isPending } = useGetPopularBlogs({
    limit: 5,
    page: 1,
  });

  return (
    <div className="flex flex-col overflow-hidden lg:overflow-visible">
      {isError ? (
        <div className="flex justify-center items-center min-h-screen mx-auto">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
          </div>
        </div>
      ) : isPending ? (
        <Spinner className="mx-auto mt-20">Loading...</Spinner>
      ) : (
        <div className="">
          {data?.data.map((d, i, arr) => (
            <React.Fragment key={i}>
              <BlogCard
                key={i}
                title={d.title}
                content={d.content}
                comments={d.comments}
                likes={d.likes}
                isLast={arr.length === i + 1}
              ></BlogCard>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
