export type BlogPost = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
};

export type Author = {
  id: number;
  name: string;
  username: string;
  email: string;
  headline: string;
  avatarUrl: string;
  avatarPublicId: string;
};
