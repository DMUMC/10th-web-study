import { type PaginationDto } from "../types/common.ts";
import { axiosInstance } from "./axios.ts";
import { type ResponseCommentListDto, type ResponseLpListDto } from "../types/lp.ts";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpid: string): Promise<any> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const getLpComments = async ({
  lpId,
  cursor,
  limit,
  order,
}: {
  lpId: string;
  cursor: number;
  limit: number;
  order: string;
}): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return data;
};