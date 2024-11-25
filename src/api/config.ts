// src/api/config.ts

// Base URLs for the APIs
export const BASE_URLS = {
  // Personal AWS: GET for image URLs and POST for image upload
  PERSONAL_AWS_GET: "https://phq27t0v05.execute-api.ap-southeast-2.amazonaws.com/default",
  PERSONAL_AWS_POST: "https://rb2q7jcmc3.execute-api.ap-southeast-2.amazonaws.com/default",
  // AWS Wrapper: for OpenAI image and text generation
  AWS_WRAPPER: "https://stwf97t3a2.execute-api.us-east-1.amazonaws.com/default",
};

// Common query parameters
export const COMMON_QUERIES = {
  imageApiVersion: "2023-06-01-preview",
  textApiVersion: "2024-10-01-preview",
  apiKey: "c780408e10754da884f2c31269e233e1",
};

// Endpoints for Personal AWS and AWS Wrapper APIs
export const ENDPOINTS = {
  // Personal AWS: S3 image list and image upload
  GET_IMAGE_URLS: "/getImageUrlsFromS3",
  POST_IMAGE: "/uploadImageUrlsFromS3", // Upload PNG image in binary format
  // AWS Wrapper: OpenAI and text/image generation
  GET_IMAGE: "/get-image",
  GEN_TEXT: "/gen-text",
  GEN_IMAGE: "/gen-img",
};
