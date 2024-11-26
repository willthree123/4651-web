import { useState } from "react";
import { fetchGeneratedImage, fetchGeneratedText } from "../api/apiClient"; // Import the fetchGeneratedImage function
export default function Home() {
  const [userPrompt, setUserPrompt] = useState(""); // State for user input
  const [magicalPrompt, setMagicalPrompt] = useState(""); // State for magical prompt
  const [imageUrl, setImageUrl] = useState<string>(""); // State for storing the image URL
  const [genImagePrompt, setGenImagePrompt] = useState(""); // State for image prompt text field

  // Handle button click to fetch the generated text (magic prompt)
  const handleFetchGeneratedText = async () => {
    try {
      const data = await fetchGeneratedText(userPrompt); // Fetch the magic prompt using user input
      setMagicalPrompt(data.choices[0].message.content); // Set the magical prompt from the API response
    } catch (error) {
      console.error("Error fetching generated text:", error);
    }
  };

  // Handle the first generate image button click (use userPrompt)
  const handleGenerateUserImage = async () => {
    try {
      const prompt = userPrompt || "kiwi fruit"; // Use "kiwi fruit" if userPrompt is empty
      setGenImagePrompt(prompt); // Set the image prompt text field
      const data = await fetchGeneratedImage(prompt);

      const imageUrl = data?.imageUrl;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error generating image from user prompt:", error);
    }
  };

  // Handle the second generate image button click (use magicalPrompt)
  const handleGenerateMagicalImage = async () => {
    try {
      const prompt = userPrompt || "kiwi fruit"; // Use "kiwi fruit" if userPrompt is empty
      setGenImagePrompt(magicalPrompt); // Set the image prompt text field
      const data = await fetchGeneratedImage(magicalPrompt);

      const imageUrl = data?.imageUrl;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error generating image from user prompt:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16 lg:ml-64">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">Create your masterpiece 🎨</h1>
      </div>

      {/* Row 3: User Prompt & Magic Prompt */}
      <div className="mb-6 flex gap-4 justify-start items-end">
        <div className="flex-grow">
          <label htmlFor="userPrompt" className="label">
            <span className="label-text">Text Prompt</span>
          </label>
          <input
            id="userPrompt"
            type="text"
            placeholder="Input Your Prompt here..."
            className="input input-bordered w-full"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)} // Handle user input
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleFetchGeneratedText} // Trigger fetch magic prompt
        >
          Magic Prompt ✨
        </button>
        <button
          className="btn btn-primary"
          onClick={handleGenerateUserImage} // Trigger image generation from user prompt
        >
          Generate Image 🧪
        </button>
      </div>

      {/* Row 4: Magical Prompt (readOnly) */}
      <div className="mb-6 flex gap-4 justify-start items-end">
        <div className="flex-grow">
          <label htmlFor="magicalPrompt" className="label">
            <span className="label-text">Magical Prompt</span>
          </label>
          <input
            id="magicalPrompt"
            type="text"
            className="input input-bordered w-full"
            readOnly
            value={magicalPrompt} // Display fetched magical prompt
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleGenerateMagicalImage} // Trigger image generation from magical prompt
        >
          Generate Image 🧪
        </button>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Other Content */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-left">Your Masterpiece</h2>
      </div>
      {/* Remaining Layout */}

      {/* Row 6: Two Columns with Same Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Column 1: Image Prompt and Buttons */}
        <div className="space-y-4 w-full flex flex-col h-full">
          {/* Reduced space-y-6 to space-y-4 */}
          <div className="flex-grow mb-0 p-0 flex flex-col">
            <label htmlFor="imagePrompt" className="label">
              <span className="label-text">Image Prompt:</span>
            </label>

            {/* Conditionally render skeleton loader or the input field */}
            {genImagePrompt ? (
              <input
                id="imagePrompt"
                type="text"
                className="input input-bordered w-full flex-grow text-left align-top break-words" // Added break-words to make text wrap
                readOnly
                value={genImagePrompt}
              />
            ) : (
              <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                {/* <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div> */}
              </div>
            )}
          </div>
          {/* Divider */}
          <div className="divider my-2"></div> {/* Adjusted my-4 to my-2 for smaller spacing */}
          {/* Buttons aligned to bottom */}
          <div className="flex gap-4 mt-auto">
            <button className="btn btn-secondary flex-1 text-sm">Download ⬇️</button>
            <button className="btn btn-primary flex-1 text-sm">Upload ⬆️</button>
          </div>
        </div>
        {/* Column 2: 300x300 Image Placeholder */}
        <div className="flex justify-start items-start w-full">
          <div className="w-72 h-72">
            {/* If imageUrl is not set, show a skeleton */}
            {imageUrl ? (
              <a>
                <img
                  src={imageUrl}
                  alt="Generated Image"
                  className="w-full h-full object-cover"
                  onClick={() => window.open(imageUrl, "_blank")} // Open image in a new tab
                />
              </a>
            ) : (
              <div className="skeleton w-full h-full text-center flex justify-center items-center"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
