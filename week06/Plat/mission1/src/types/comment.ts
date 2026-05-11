import type { CommonResponse } from "./common.ts";

export type LpComment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    avatar: string | null;
  };
};

export type LpCommentListData = {
  data: LpComment[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type ResponseLpCommentListDto = CommonResponse<LpCommentListData>;