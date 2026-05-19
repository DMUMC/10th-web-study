import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp, type CreateLpDto } from "../../apis/lp";

export const useCreateLp = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLpDto) => postLp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onSuccessCallback();
    },
    onError: (error: any) => {
      console.error(error.response?.data);
      alert(`등록 실패: ${error.response?.data?.message || "에러가 발생했습니다."}`);
    }
  });
};