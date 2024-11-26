// src/api/apiClient.ts

import { getImageUrlsFromS3, uploadImageUrlsToS3, generateText, generateImage } from "./apiService";

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
// export const fetchImage = async (imageId: string) => {
//   try {
//     const data = await getImageFromAWS(imageId);
//     console.log("Fetched Image:", data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     throw error;
//   }
// };

// Function to generate text from AWS Wrapper (OpenAI)
export const fetchGeneratedText = async (inputText: string) => {
  try {
    if (inputText === "") {
      inputText = "kiwi fruit";
      //   console.log("Yes");
    }

    const data = await generateText(
      "Imagine you are an artist tasked with creating an AI-generated image. Please provide a detailed prompt in 100 words that includes:" +
        "1. *A clear description of the object*: What is it? What are its key features?" +
        "2. *The setting or background*: Where is the object located? What is the environment like?" +
        "3. *Specific details*: Include colors, textures, lighting, and any other elements that enhance realism." +
        "4. *Artistic style*: What kind of artistic approach should be taken (e.g., hyper-realistic, impressionistic)?" +
        "Your detailed prompt should be for the following object: *{text input}*." +
        inputText
    );
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
