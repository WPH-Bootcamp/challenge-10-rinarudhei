import { PaginationParam, PaginationResponse } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getBlogDetail,
  getLikesByPostId,
  getOtherBlogByUserId,
  getPopularBlogs,
  getRecommendedBlogs,
} from "../services/blogGetServices";
import { BlogPost } from "../types/blogpost";
import { ApiError } from "@/shared/lib/api";

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

export function useGetLikesByPostId(params: { postId: number }) {
  return useQuery({
    queryKey: ["likes", params.postId],
    placeholderData: keepPreviousData,
    queryFn: () => getLikesByPostId({ id: params.postId }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetOtherBlogByUserId(
  params: PaginationParam,
  userId: number,
  currentBlogId: number,
) {
  return useQuery<BlogPost, ApiError>({
    queryKey: ["userId-blog", params.page, params.limit, userId],
    placeholderData: keepPreviousData,
    queryFn: () => getOtherBlogByUserId(params, userId, currentBlogId),
    staleTime: 1000 * 60 * 5,
  });
}
export function useGetBlogDetail(params: { id: string }) {
  return useQuery<BlogPost, ApiError>({
    queryKey: ["detail-blog", params.id],
    placeholderData: keepPreviousData,
    queryFn: () => getBlogDetail(params),
    staleTime: 1000 * 60 * 5,
  });
}
