import { PaginationParam, PaginationResponse } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getPopularBlogs,
  getRecommendedBlogs,
} from "../services/blogpostServices";
import { BlogPost } from "../types/blogpost";
import { ApiError } from "next/dist/server/api-utils";

export function useGetRecommendedBlogs(params: PaginationParam) {
  return useQuery<PaginationResponse<BlogPost>, ApiError>({
    queryKey: ["recommended-blogs", params.page, params.limit],
    queryFn: () => getRecommendedBlogs(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 3600 * 24,
  });
}

export function useGetPopularBlogs(params: PaginationParam) {
  return useQuery<PaginationResponse<BlogPost>, ApiError>({
    queryKey: ["popular-blogs", params.page, params.limit],
    placeholderData: keepPreviousData,
    queryFn: () => getPopularBlogs(params),
    staleTime: 1000 * 3600 * 24,
  });
}
