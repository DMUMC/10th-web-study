import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp, postLpLike, deleteLpLike } from "../../apis/lp";

export const useLpMutation = () => {
  const queryClient = useQueryClient();


  const createLpMutation = useMutation({
    mutationFn: postLp,
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
  });


  const toggleLikeMutation = useMutation({
    mutationFn: ({ lpId, isLiked }: { lpId: string; isLiked: boolean }) => 
      isLiked ? deleteLpLike(lpId) : postLpLike(lpId),
    onSuccess: (_, variables) => {
      
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      queryClient.invalidateQueries({ queryKey: ["lps", variables.lpId] });
    },
  });

  return { createLpMutation, toggleLikeMutation };
};