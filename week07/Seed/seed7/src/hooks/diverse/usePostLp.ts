import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp, type CreateLpDto } from "../../apis/lp";

export const usePostLp = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLpDto) => postLp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onSuccessCallback();
    },
    onError: (error: any) => {
      console.error("상세 에러 내용:", error.response?.data || error.message);
      alert(`등록 실패: ${error.response?.data?.message || "데이터 형식을 확인해주세요."}`);
    }
  });
};