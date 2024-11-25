// src/api/apiService.ts
import { BASE_URLS, COMMON_QUERIES, ENDPOINTS } from "./config";

// Fetch Image URLs from Personal AWS S3
export const getImageUrlsFromS3 = async () => {
  const url = `${BASE_URLS.PERSONAL_AWS_GET}${ENDPOINTS.GET_IMAGE_URLS}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch image URLs from S3");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    throw error;
  }
};

// Upload Image to Personal AWS S3 (binary PNG image)
export const uploadImageUrlsToS3 = async (image: Blob) => {
  const url = `${BASE_URLS.PERSONAL_AWS_GET}${ENDPOINTS.POST_IMAGE}`;
  console.log(url);
  const headers = {
    "Content-Type": "image/png",
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: image, // Send the image as binary data
  };

  try {
    // const response = await fetch(url);
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to upload image to S3");
    }
    return response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Get OpenAI image from AWS Wrapper
export const getImageFromAWS = async (imageId: string) => {
  const url = new URL(`${BASE_URLS.AWS_WRAPPER}${ENDPOINTS.GET_IMAGE}`);
  url.searchParams.append("apiVersion", COMMON_QUERIES.imageApiVersion);
  url.searchParams.append("apiKey", COMMON_QUERIES.apiKey);
  url.searchParams.append("imageId", imageId);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch OpenAI image");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching OpenAI image:", error);
    throw error;
  }
};

// Generate text with AWS Wrapper
export const generateText = async (inputText: string) => {
  const url = new URL(`${BASE_URLS.PERSONAL_AWS_GET}${ENDPOINTS.GEN_TEXT}`);
  url.searchParams.append("apiVersion", COMMON_QUERIES.textApiVersion);
  url.searchParams.append("apiKey", COMMON_QUERIES.apiKey);
  console.log("URL:", url);
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    inputText,
  });

  const options: RequestInit = {
    method: "POST",
    headers,
    body,
  };
  try {
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new Error("Failed to generate text");
    }
    return response.json();
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};

// Generate image from AWS Wrapper (OpenAI model)
export const generateImage = async (messages: { role: string; content: string }[]) => {
  const url = `${BASE_URLS.AWS_WRAPPER}${ENDPOINTS.GEN_IMAGE}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    apiVersion: COMMON_QUERIES.imageApiVersion,
    apiKey: COMMON_QUERIES.apiKey,
    messages,
  });

  const options: RequestInit = {
    method: "POST",
    headers,
    body,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to generate image");
    }
    return response.json();
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
