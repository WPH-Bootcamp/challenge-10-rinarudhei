export type BlogPost = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
};

type Author = {
  id: number;
  name: string;
  username: string;
  email: string;
};
