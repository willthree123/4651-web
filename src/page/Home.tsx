import React, { useState } from "react";
import { fetchGeneratedText } from "../api/apiClient"; // Import the function from apiClient

export default function Home() {
  const [userPrompt, setUserPrompt] = useState(""); // State for user input
  const [magicalPrompt, setMagicalPrompt] = useState(""); // State for magical prompt

  const handleFetchGeneratedText = async () => {
    try {
      const data = await fetchGeneratedText(userPrompt); // Use the imported function
      setMagicalPrompt(data.generatedText); // Assuming the API returns an object with generatedText
    } catch (error) {
      console.error("Error fetching generated text:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16 lg:ml-64">
      {/* Added mt-16 for non-lg screens to create space for the navbar */}
      {/* Row 1: Heading */}
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
            className="input input-bordered w-full" // Input fills within the max width
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)} // Handle user input
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleFetchGeneratedText} // Trigger fetch on click
        >
          Magic Prompt ✨
        </button>
        <button className="btn btn-primary">Generate Image 🧪</button>
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
            className="input input-bordered w-full" // Input fills within the max width
            readOnly
            value={magicalPrompt} // Display fetched result
          />
        </div>
        <button className="btn btn-primary">Generate Image 🧪</button>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Other Content */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-left">Your Masterpiece</h2>
      </div>
      {/* Remaining Layout */}
    </div>
  );
}
