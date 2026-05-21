// import { PaginationDto } from "../types/common";
// import { ResponseLpListDto } from "../types/lp";
// import { axiosInstance } from "./axios";


// export const getLpList = async (
//     paginationDto: PaginationDto
// ): Promise<ResponseLpListDto> => {
//     const { data } = await axiosInstance.get('/v1/lps', {
//         params: paginationDto,
//     })

//     return data;
// };

// export const getLp = async (lpId: number) => {
//     const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
//     return data;
// };

// apis/lp.ts 전체 최종본

import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";
import { PAGINATION_ORDER } from "../enums/common";

export const getLpList = async (
    paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get('/v1/lps', {
        params: paginationDto,
    });
    return data;
};

export const getLp = async (lpId: number) => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};

// ✅ 여기부터 추가
interface GetLpCommentsParams {
    lpId: number;
    cursor?: number;
    limit?: number;
    order?: PAGINATION_ORDER;
}

export const getLpComments = async ({
    lpId,
    cursor = 0,
    limit = 10,
    order = PAGINATION_ORDER.desc,
}: GetLpCommentsParams) => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
        params: { cursor, limit, order },
    });
    return data;
};

export const createComment = async ({
    lpId,
    content,
}: {
    lpId: number;
    content: string;
}) => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
        content,
    });
    return data;
};