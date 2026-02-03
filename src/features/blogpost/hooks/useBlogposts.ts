import { PaginationParam, PaginationResponse } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getBlogDetail,
  getPopularBlogs,
  getRecommendedBlogs,
} from "../services/blogpostServices";
import { BlogPost } from "../types/blogpost";
import { ApiError } from "next/dist/server/api-utils";

export function useGetRecommendedBlogs(
  params: PaginationParam,
  query: string | string[] | undefined,
) {
  return useQuery<PaginationResponse<BlogPost>, ApiError>({
    queryKey: ["recommended-blogs", params.page, params.limit, query],
    queryFn: () => getRecommendedBlogs(params, query),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetPopularBlogs(params: PaginationParam) {
  return useQuery<PaginationResponse<BlogPost>, ApiError>({
    queryKey: ["popular-blogs", params.page, params.limit],
    placeholderData: keepPreviousData,
    queryFn: () => getPopularBlogs(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetBlogDetail(params: { id: string }) {
  return useQuery<BlogPost>({
    queryKey: ["detail-blog", params.id],
    placeholderData: keepPreviousData,
    queryFn: () => getBlogDetail(params),
    staleTime: 1000 * 60 * 5,
  });
}
