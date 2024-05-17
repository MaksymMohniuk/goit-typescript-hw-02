import axios from "axios";

interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  description: string;
  likes: number;
}
interface ApiResponse {
  data: Photo[];
}


export const requestPhotos = async(): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    "https://api.unsplash.com/photos/?client_id=oGYzQqArk2YQGtYqQNUjoqd5R_WjC4bentc-JV8nvfk"
  );
  return response.data;
};


export const requestContentByQuery = async (query: string, page: number): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `https://api.unsplash.com/search/photos/?query=${query}&page=${page}&client_id=oGYzQqArk2YQGtYqQNUjoqd5R_WjC4bentc-JV8nvfk`
  );
  return response.data;
};
