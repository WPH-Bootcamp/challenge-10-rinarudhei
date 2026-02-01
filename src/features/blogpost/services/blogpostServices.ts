import { apiGet } from "@/shared/lib/api";
import { PaginationParam, PaginationResponse } from "@/types";
import { BlogPost } from "../types/blogpost";

export async function getRecommendedBlogs(
  params: PaginationParam,
): Promise<PaginationResponse<BlogPost>> {
  const limitQueryString = params.limit && `limit=${params.limit}`;
  const pageQueryString = params.page && `page=${params.page}`;
  const isQuery = params.limit || params.page;
  const isBothQuery = params.limit && params.page;

  return await apiGet<PaginationResponse<BlogPost>>(
    `/posts/recommended${isQuery ? "/?" : ""}${limitQueryString}${isBothQuery ? "&" : ""}${pageQueryString}`,
  );
}

export async function getPopularBlogs(
  params: PaginationParam,
): Promise<PaginationResponse<BlogPost>> {
  const limitQueryString = params.limit && `limit=${params.limit}`;
  const pageQueryString = params.page && `page=${params.page}`;
  const isQuery = params.limit || params.page;
  const isBothQuery = params.limit && params.page;

  return await apiGet<PaginationResponse<BlogPost>>(
    `/posts/most-liked${isQuery ? "/?" : ""}${limitQueryString}${isBothQuery ? "&" : ""}${pageQueryString}`,
  );
}
