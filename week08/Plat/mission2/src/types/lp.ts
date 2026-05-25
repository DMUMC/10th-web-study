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

export type LpListData = {
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type ResponseLpListDto = CommonResponse<LpListData>;

export type ResponseLpDetailDto = CommonResponse<Lp>;

export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type RequestUpdateLpDto = Partial<RequestCreateLpDto>;

export type ResponseLpMutationDto = CommonResponse<Lp>;

export type ResponseDeleteLpDto = CommonResponse<null>;
