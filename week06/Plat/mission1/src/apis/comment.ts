import { axiosInstance } from "./axios.ts";
import type { PAGINATION_ORDER } from "../enums/common.ts";
import type { ResponseLpCommentListDto } from "../types/comment.ts";

type GetLpCommentListParams = {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: PAGINATION_ORDER;
};

export const getLpCommentList = async ({
  lpId,
  cursor,
  limit = 10,
  order = "desc",
}: GetLpCommentListParams): Promise<ResponseLpCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });

  return data;
};