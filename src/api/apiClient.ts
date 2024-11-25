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
    const data = await generateText(
      "Picture a sprawling metropolis in the year 2150, where [input word] shapes the very fabric of society. Skyscrapers of gleaming glass and steel rise high above, interconnected by skybridges and illuminated by neon lights. Hovercars zip through the air, and robotic assistants navigate the bustling streets. Central to this urban marvel is a massive, high-tech hub where [input word] is integrated into daily life, enhancing the capabilities of the city's residents and infrastructure. The cityscape is a blend of advanced technology and innovative design, showcasing the limitless potential of [input word]." +
        "The word/sentencec is: " +
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
    const data = await generateImage([
      {
        role: "user",
        content:
          "Picture a sprawling metropolis in the year 2150, where [input word] shapes the very fabric of society. Skyscrapers of gleaming glass and steel rise high above, interconnected by skybridges and illuminated by neon lights. Hovercars zip through the air, and robotic assistants navigate the bustling streets. Central to this urban marvel is a massive, high-tech hub where [input word] is integrated into daily life, enhancing the capabilities of the city's residents and infrastructure. The cityscape is a blend of advanced technology and innovative design, showcasing the limitless potential of [input word]." +
          "The word is: " +
          imagePrompt,
      },
    ]);
    console.log("Generated Image:", data);
    return data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
