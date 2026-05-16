import { type PaginationDto } from "../types/common.ts";
import type {
  RequestCreateLpDto,
  RequestUpdateLpDto,
  ResponseDeleteLpDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  ResponseLpMutationDto,
} from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (
  lpid: number
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);

  return data;
};

export const postLp = async (
  body: RequestCreateLpDto
): Promise<ResponseLpMutationDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);

  return data;
};

export const patchLp = async ({
  lpId,
  body,
}: {
  lpId: number;
  body: RequestUpdateLpDto;
}): Promise<ResponseLpMutationDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);

  return data;
};

export const deleteLpById = async (
  lpId: number
): Promise<ResponseDeleteLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);

  return data;
};

export const postLpLike = async (
  lpId: number
): Promise<ResponseLpMutationDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLpLike = async (
  lpId: number
): Promise<ResponseLpMutationDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};
