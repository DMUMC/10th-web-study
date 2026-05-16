import { axiosInstance } from "./axios.ts";
import type { PAGINATION_ORDER } from "../enums/common.ts";
import type {
  RequestLpCommentDto,
  ResponseDeleteLpCommentDto,
  ResponseLpCommentDto,
  ResponseLpCommentListDto,
} from "../types/comment.ts";

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

export const postLpComment = async ({
  lpId,
  body,
}: {
  lpId: number;
  body: RequestLpCommentDto;
}): Promise<ResponseLpCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);

  return data;
};

export const patchLpComment = async ({
  lpId,
  commentId,
  body,
}: {
  lpId: number;
  commentId: number;
  body: RequestLpCommentDto;
}): Promise<ResponseLpCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    body
  );

  return data;
};

export const deleteLpComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}): Promise<ResponseDeleteLpCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );

  return data;
};
