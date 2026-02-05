import { apiGet } from "@/shared/lib/api";
import { PaginationParam, PaginationResponse } from "@/types";
import { BlogPost, Like } from "../types/blogpost";
import { Dispatch, SetStateAction } from "react";

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

export async function getOtherBlogByUserId(
  params: PaginationParam,
  id: number,
  currentBlogID: number,
): Promise<BlogPost> {
  const limit = params.limit || 1;
  const randomNumber = Math.floor(Math.random() * limit);

  const response = await apiGet<PaginationResponse<BlogPost>>(
    `/posts/by-user/${id}`,
  );
  if (response.data[randomNumber].id === currentBlogID) {
    const shiftedRandomNumber = (randomNumber + 2) % limit;
    return response.data[shiftedRandomNumber];
  }

  return response.data[randomNumber];
}

export async function getBlogDetail(params: { id: string }): Promise<BlogPost> {
  return await apiGet<BlogPost>(`/posts/${params.id}`);
}

export async function getLikesByPostId(params: {
  id: number;
  setIsLiked: Dispatch<SetStateAction<boolean>>;
  currentUserId: number | undefined | null;
}): Promise<Like[] | null> {
  const response = await apiGet<Like[]>(`/posts/${params.id}/likes`);
  if (!params.currentUserId) {
    return response;
  }
  if (response.some((l) => l.id === params.currentUserId)) {
    params.setIsLiked(true);
  } else {
    params.setIsLiked(false);
  }

  return response;
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
