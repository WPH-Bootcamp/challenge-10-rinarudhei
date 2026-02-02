import { apiGet } from "@/shared/lib/api";
import { PaginationParam, PaginationResponse } from "@/types";
import { BlogPost } from "../types/blogpost";

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

export async function getRecommendedBlogs(
  params: PaginationParam,
  query?: string | string[] | undefined,
): Promise<PaginationResponse<BlogPost>> {
  const limitQueryString = params.limit && `limit=${params.limit}`;
  const pageQueryString = params.page && `page=${params.page}`;
  const queryString = query && query !== "" && `query=${query}`;

  const queryParams = [];
  if (limitQueryString) {
    queryParams.push(limitQueryString);
  }
  if (pageQueryString) {
    queryParams.push(pageQueryString);
  }
  if (queryString) {
    queryParams.push(queryString);
  }

  let queryParamsString = "";
  if (queryParams.length > 0) {
    queryParamsString += "/?";
    queryParamsString += queryParams.join("&");
  }

  if (queryString) {
    return await apiGet<PaginationResponse<BlogPost>>(
      `/posts/search${queryParamsString}`,
    );
  }

  return await apiGet<PaginationResponse<BlogPost>>(
    `/posts/recommended${queryParamsString}`,
  );
}
