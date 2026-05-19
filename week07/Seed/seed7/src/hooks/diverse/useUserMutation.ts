import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";

export const useUserMutation = () => {
    const queryClient = useQueryClient();

    const updateProfile = useMutation({
        mutationFn: patchMyInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myInfo"] });
            alert("프로필이 수정되었습니다.");
        },
    });

    return { updateProfile };
};