// src/api/apiService.ts
import { BASE_URLS, COMMON_QUERIES, ENDPOINTS } from "./config";

// Fetch Image URLs from Personal AWS S3
export const getImageUrlsFromS3 = async () => {
  const url = `${BASE_URLS.PERSONAL_AWS}${ENDPOINTS.GET_IMAGE_URLS}`;

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
  const url = `${BASE_URLS.PERSONAL_AWS}${ENDPOINTS.POST_IMAGE}`;
  console.log(url);

  const headers = {
    "Content-Type": "application/json", // Change to JSON for better compatibility
  };

  const reader = new FileReader();
  reader.readAsDataURL(image);

  const base64Image = await new Promise<string>((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

  // Send the full Base64 string (with prefix)
  const body = JSON.stringify({
    image: base64Image,
  });

  const options: RequestInit = {
    method: "POST",
    headers,
    body,
  };

  try {
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
// export const getImageFromAWS = async (imageId: string) => {
//   const url = new URL(`${BASE_URLS.PERSONAL_AWS}${ENDPOINTS.GET_IMAGE}`);
//   url.searchParams.append("apiVersion", COMMON_QUERIES.imageApiVersion);
//   url.searchParams.append("apiKey", COMMON_QUERIES.apiKey);
//   url.searchParams.append("imageId", imageId);
//   console.log(url);

//   try {
//     const response = await fetch(url.toString());
//     if (!response.ok) {
//       throw new Error("Failed to fetch OpenAI image");
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Error fetching OpenAI image:", error);
//     throw error;
//   }
// };

// Generate text with AWS Wrapper
export const generateText = async (inputText: string) => {
  const url = new URL(`${BASE_URLS.PERSONAL_AWS}${ENDPOINTS.GEN_TEXT}`);
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
export const generateImage = async (userPrompt: string) => {
  const url = new URL(`${BASE_URLS.PERSONAL_AWS}${ENDPOINTS.GEN_IMAGE}`);
  url.searchParams.append("apiVersion", COMMON_QUERIES.imageApiVersion);
  url.searchParams.append("apiKey", COMMON_QUERIES.apiKey);
  console.log(url.toString());
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    userPrompt: userPrompt,
  });
  console.log(body);
  const options: RequestInit = {
    method: "POST",
    headers,
    body,
  };

  try {
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new Error("Failed to generate image");
    }
    return response.json();
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
