import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestUpdateMyInfoDto,
  ResponseMyInfoDto,
} from "../../types/auth.ts";

type MyInfoData = ResponseMyInfoDto["data"];
type MyInfoQueryData = ResponseMyInfoDto | MyInfoData;

const isResponseMyInfoDto = (
  data: MyInfoQueryData
): data is ResponseMyInfoDto => {
  return "data" in data && typeof data.data === "object";
};

const updateMyInfoCache = (
  old: MyInfoQueryData | undefined,
  newMyInfo: RequestUpdateMyInfoDto
) => {
  if (!old) return old;

  if (isResponseMyInfoDto(old)) {
    return {
      ...old,
      data: {
        ...old.data,
        name: newMyInfo.name,
        bio: newMyInfo.bio ?? old.data.bio,
        avatar: newMyInfo.avatar ?? old.data.avatar,
      },
    };
  }

  return {
    ...old,
    name: newMyInfo.name,
    bio: newMyInfo.bio ?? old.bio,
    avatar: newMyInfo.avatar ?? old.avatar,
  };
};

export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchMyInfo,
    onMutate: async (newMyInfo: RequestUpdateMyInfoDto) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.my] });

      const previousMyInfoQueries =
        queryClient.getQueriesData<MyInfoQueryData>({
          queryKey: [QUERY_KEY.my],
        });

      queryClient.setQueriesData<MyInfoQueryData>(
        { queryKey: [QUERY_KEY.my] },
        (old) => updateMyInfoCache(old, newMyInfo)
      );

      return { previousMyInfoQueries };
    },
    onError: (_error, _variables, context) => {
      context?.previousMyInfoQueries.forEach(([queryKey, previousData]) => {
        queryClient.setQueryData(queryKey, previousData);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.my] });
    },
  });
};
