import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

export class MissingApiKeyError extends Error {
  constructor(service) {
    super(`Missing API key for ${service}. Add it to your .env file and restart the dev server.`);
    this.name = "MissingApiKeyError";
  }
}

export const photosApi = async (query, page, per_page = 30, signal) => {
  if (!UNSPLASH_KEY) throw new MissingApiKeyError("Unsplash (VITE_UNSPLASH_KEY)");
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    signal,
  });
  return response.data;
};

export const videosApi = async (query, page, per_page = 30, signal) => {
  if (!PEXELS_KEY) throw new MissingApiKeyError("Pexels (VITE_PEXELS_KEY)");
  const response = await axios.get("https://api.pexels.com/videos/search", {
    params: { query, page, per_page },
    headers: { Authorization: PEXELS_KEY },
    signal,
  });
  return response.data;
};

export const gifApi = async (query, page, per_page = 30, signal) => {
  if (!GIPHY_KEY) throw new MissingApiKeyError("Giphy (VITE_GIPHY_KEY)");
  const offset = (page - 1) * per_page;
  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: GIPHY_KEY,
      q: query,
      limit: per_page,
      offset,
      rating: "g",
      lang: "en",
    },
    signal,
  });
  return response.data;
};

/** Picks a reasonably-sized playable file from a Pexels video's file list. */
export const pickVideoFile = (videoFiles = []) => {
  if (!videoFiles.length) return null;
  const sd = videoFiles.find((f) => f.quality === "sd" && f.file_type === "video/mp4");
  return sd || videoFiles.find((f) => f.file_type === "video/mp4") || videoFiles[0];
};
