// src/types/lp.ts

import type { CommonResponse } from "./common.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CommonResponse<{
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type ResponseLpDetailDto = CommonResponse<Lp>;