import { CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
}

export type Likes = {
    id: number;
    userId: number;
    lpld: number;
}

export type ResponseLpListDto = CursorBasedResponse<{
    data: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorld: number;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
    }[]
}>;
