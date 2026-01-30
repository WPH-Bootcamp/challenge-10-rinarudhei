export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
}

export interface LoginParam {
  email: string;
  passsword: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterParam extends LoginParam {
  name: string;
  username: string;
}

export interface PaginationParam {
  limit: number;
  page: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
}

type Author = {
  id: number;
  name: string;
  email: string;
};

export interface BlogPostListResponse {
  data: BlogPost[];
  total: number;
  page: number;
  lastPage: number;
}
