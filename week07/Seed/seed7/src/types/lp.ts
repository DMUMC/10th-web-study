import { type CursorBasedResponse } from "./common.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type LpItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = {
  status: boolean;
  message: string;
  statusCode: number;
  data: CursorBasedResponse<LpItem[]>;
};

export type CommentAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CommentItem = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor; 
};


export type ResponseCommentListDto = {
  status: boolean;
  message: string;
  statusCode: number;
  data: CursorBasedResponse<CommentItem[]>;
};