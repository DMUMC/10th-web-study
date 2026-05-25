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


import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";
import { PAGINATION_ORDER } from "../enums/common";
import axios from "axios";

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


//lp 생성
export const createLp = async ({
    title,
    content,
    published,
    thumbnail,
    tags,
}: {
    title: string;
    content: string;
    published: boolean;
    thumbnail: File | null;
    tags: string[];
}) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    // formData.append("published", String(published));
    formData.append("published", "true");



    if (thumbnail) {
        formData.append("thumbnail", thumbnail);
    }

    tags.forEach((tag) => {
        // formData.append("tags", tag);
        // formData.append("tags", tag);
    });

    const { data } = await axiosInstance.post("/v1/lps", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });


    return data;
};

//lp 수정
export const updateLp = async ({
    lpId,
    title,
    content,
    thumbnailFile,
    tags,
}: {
    lpId: number;
    title: string;
    content: string;
    thumbnailFile: File | null;
    tags: string[];
}) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", "true");

    if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
    }
    tags.forEach((tag) => formData.append("tags", tag));

    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, formData,);
    return data;
};



export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file); // 필드명 "file"

    const { data } = await axiosInstance.post("/v1/uploads/public", formData);
    return data.data.imageUrl; // 반환된 URL
};

// LP 생성 - thumbnail은 이제 string(URL)
export const createLpApi = async ({
    title,
    content,
    published,
    thumbnail,
    tags,
}: {
    title: string;
    content: string;
    published: boolean;
    thumbnail: string | null;
    tags: string[];
}) => {
    const body = {
        title,
        content,
        published: Boolean(published),
        ...(thumbnail && { thumbnail }),
        ...(tags.length > 0 && { tags }),
    };

    const { data } = await axiosInstance.post("/v1/lps", body);
    return data;
};

interface FetchLpListParams {
    cursor?: number | null;
    limit: number;
    order: string;
    search?: string;
}

export const fetchLpList = async ({
    cursor,
    limit,
    order,
    search,
}: FetchLpListParams) => {
    const params: Record<string, any> = {
        limit,
        order,
    };

    if (cursor) {
        params.cursor = cursor;
    }

    if (search?.trim()) {
        params.search = search;
    }

    const response = await axios.get("/v1/lps", {
        params,
    });

    return response;
};