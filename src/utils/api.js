import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
  },
});

export const getAllPhotos = async (page = 1, perPage = 10) => {
  try {
    const response = await unsplashApi.get("/photos", {
      params: { page, per_page: perPage },
    });

    return response.data;
  } catch (error) {
    return { total: 0, results: [] };
  }
};

export const searchPhotos = async (query, page = 1, per_page = 20) => {
  try {
    const response = await unsplashApi.get("/search/photos", {
      params: { query, per_page, page },
    });
    return { total: response.data?.total, results: response.data?.results };
  } catch (error) {
    return { total: 0, results: [] };
  }
};
