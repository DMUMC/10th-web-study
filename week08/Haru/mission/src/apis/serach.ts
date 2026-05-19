import { axiosInstance } from "./axios";


export interface LpTag {
  id: number;
  name: string;
}

export interface LpItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: LpTag[];
}


export interface SearchResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
   data: LpItem[];
    nextCursor: number | null; 
    hasNext: boolean;
  };
}

export const getSearchData = async (
  query: string, 
  pageParam: number
): Promise<SearchResponse> => {
  const { data } = await axiosInstance.get<SearchResponse>("/v1/lps", {
    params: {
      cursor: pageParam,
      limit: 10, 
      search: query,
      order: "desc"  
    }
  });
  return data;
};