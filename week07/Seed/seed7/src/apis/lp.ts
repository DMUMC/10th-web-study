import { type PaginationDto } from "../types/common.ts";
import { axiosInstance } from "./axios.ts";
import { type ResponseCommentListDto, type ResponseLpListDto } from "../types/lp.ts";

export interface CreateLpDto {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", { params: paginationDto });
  return data;
};

export const getLpDetail = async (lpid: string): Promise<any> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const getLpComments = async ({ lpId, cursor, limit, order }: { lpId: string; cursor: number; limit: number; order: string }): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params: { cursor, limit, order } });
  return data;
};

export const postLp = async (lpData: CreateLpDto) => {
  const { data } = await axiosInstance.post("/v1/lps", lpData);
  return data;
};

export const postComment = async ({ lpId, content }: { lpId: string; content: string }) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return data;
};

export const patchComment = async ({ lpId, commentId, content }: { lpId: string; commentId: number; content: string }) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
  return data;
};

export const deleteComment = async ({ lpId, commentId }: { lpId: string; commentId: number }) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return data;
};

export const postLpLike = async (lpId: number) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLpLike = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};