"use client";
import React from "react";
import { Spinner } from "@/shared/components/ui/spinner";
import { useGetPopularBlogs } from "../hooks/useBlogposts";
import { Separator } from "@/shared/components/ui/separator";
import PopularCard from "./popularCard";

export default function PopularBlogs() {
  const { data, isError, isPending } = useGetPopularBlogs({
    limit: 3,
    page: 1,
  });

  return (
    <div className="flex flex-col gap-4 lg:gap-5 h-full">
      {isError ? (
        <div className="flex justify-center items-center min-h-screen mx-auto">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
          </div>
        </div>
      ) : isPending ? (
        <Spinner className="mx-auto mt-20">Loading...</Spinner>
      ) : (
        <>
          {data?.data.map((d, i, arr) => (
            <React.Fragment key={i}>
              <PopularCard
                title={d.title}
                content={d.content}
                comments={d.comments}
                likes={d.likes}
              ></PopularCard>
              {i !== arr.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}
