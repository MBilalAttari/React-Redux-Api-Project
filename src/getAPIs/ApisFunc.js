import axios from "axios";
import { store } from "../redux/store";


const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

export const photosApi = async (query, page, per_page = 30 ) => {
  const response = await axios("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  return(response.data);
};

export const videosApi = async (query, page, per_page = 30) => {
  const response = await axios("https://api.pexels.com/videos/search", {
    params: { query, page, per_page },
    headers: { Authorization: PEXELS_KEY },
  });
  return(response.data);
};
export const gifApi = async (query, limit, offset = 0) => {
  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: GIPHY_KEY,
      q: query,
      limit,
      offset,
      rating: "g",
      lang: "en",
    },
  });

  return(response.data);
};
