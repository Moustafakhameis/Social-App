export interface PostAuthor {
  _id: string;
  name: string;
  photo?: string;
}

export interface Post {
  _id: string;
  body: string;
  image?: string;
  user: PostAuthor;
  createdAt: string;
  comments: any[];
}

export interface PostsResponse {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  posts: Post[];
}
