import type { ResponseUploadImageDto } from "../types/common.ts";
import { axiosInstance } from "./axios.ts";

export const postUploadImage = async (
  file: File
): Promise<ResponseUploadImageDto> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
