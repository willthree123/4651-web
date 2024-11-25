// src/api/apiClient.ts

import { getImageUrlsFromS3, uploadImageUrlsToS3, getImageFromAWS, generateText, generateImage } from "./apiService";

// Function to handle fetching image URLs from S3 (Personal AWS)
export const fetchImageUrls = async () => {
  try {
    const data = await getImageUrlsFromS3();
    console.log("Image URLs:", data);
    return data;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    throw error;
  }
};

// Function to handle uploading an image (PNG in binary) to Personal AWS
export const uploadImage = async (image: Blob) => {
  try {
    const data = await uploadImageUrlsToS3(image);
    console.log("Uploaded Image:", data);
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Function to get an image from AWS (OpenAI image by ID)
export const fetchImage = async (imageId: string) => {
  try {
    const data = await getImageFromAWS(imageId);
    console.log("Fetched Image:", data);
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

// Function to generate text from AWS Wrapper (OpenAI)
export const fetchGeneratedText = async (inputText: string) => {
  try {
    if (inputText === "") {
      inputText = "kiwi fruit";
      //   console.log("Yes");
    }

    const data = await generateText("Be creative! You are an artist. Generate me a detailed text prompt for generating ultra realistic AI image for the following object: " + inputText);
    console.log("Generated Text:", data);
    return data;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};

// Function to generate an image from AWS Wrapper (OpenAI model)
export const fetchGeneratedImage = async (imagePrompt: string) => {
  try {
    const data = await generateImage(imagePrompt);
    console.log("Generated Image:", data);
    return data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
