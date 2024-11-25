// src/api/apiService.ts
import { fetchClient } from "./apiClient";
import { BASE_URLS, ENDPOINTS, COMMON_QUERIES } from "./config";

export const fetchImage = async (imageId: string) => {
  return fetchClient(BASE_URLS.IMAGE_API, ENDPOINTS.GET_IMAGE, {
    method: "GET",
    queryParams: {
      ...COMMON_QUERIES,
      imageId,
    },
  });
};

export const fetchImageUrls = async () => {
  return fetchClient(BASE_URLS.IMAGE_URLS_API, ENDPOINTS.GET_IMAGE_URLS, {
    method: "GET",
    queryParams: {
      apiKey: COMMON_QUERIES.apiKey, // Example: no `apiVersion` required
    },
  });
};

export const generateText = async (messages: { role: string; content: string }[]) => {
  return fetchClient(BASE_URLS.IMAGE_API, ENDPOINTS.GEN_TEXT, {
    method: "POST",
    queryParams: {
      apiVersion: "2024-10-01-preview", // Override default
      apiKey: COMMON_QUERIES.apiKey,
    },
    body: {
      messages,
    },
  });
};
