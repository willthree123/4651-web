// src/api/config.ts

// Base URLs for the APIs
export const BASE_URLS = {
  IMAGE_API: "https://stwf97t3a2.execute-api.us-east-1.amazonaws.com/default",
  IMAGE_URLS_API: "https://phq27t0v05.execute-api.ap-southeast-2.amazonaws.com/default",
};

// Common query parameters
export const COMMON_QUERIES = {
  apiVersion: "2023-06-01-preview", // Update for each API
  apiKey: "c780408e10754da884f2c31269e233e1",
};

// Endpoints
export const ENDPOINTS = {
  GET_IMAGE: "/get-image",
  GET_IMAGE_URLS: "/getImageUrlsFromS3",
  GEN_TEXT: "/gen-text",
};
