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
    console.error("Error fetching photos:", error);
    return [];
  }
};

export const searchPhotos = async (query) => {
  try {
    const response = await unsplashApi.get("/search/photos", {
      params: { query, per_page: 10 },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
