import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImage, createLpApi } from '../../apis/lp';

export default function useCreateLp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            title,
            content,
            published,
            thumbnailFile,
            tags,
        }: {
            title: string;
            content: string;
            published: boolean;
            thumbnailFile: File | null;
            tags: string[];
        }) => {
            // 1단계: 이미지 업로드
            let thumbnail: string | null = null;
            if (thumbnailFile) {
                thumbnail = await uploadImage(thumbnailFile);
            }

            // 2단계: LP 생성
            return createLpApi({ title, content, published, thumbnail, tags });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lps'] });
        },
    });
}