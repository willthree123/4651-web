import { useState } from "react";
import ChatBot from "../component/ChatBot";

import { fetchGeneratedImage, fetchGeneratedText, uploadImage } from "../api/apiClient"; // Import the fetchGeneratedImage function
export default function Home() {
  const [userPrompt, setUserPrompt] = useState(""); // State for user input
  const [magicalPrompt, setMagicalPrompt] = useState(""); // State for magical prompt
  const [imageUrl, setImageUrl] = useState<string>(""); // State for storing the image URL
  const [genImagePrompt, setGenImagePrompt] = useState(""); // State for image prompt text field
  const [loading, setLoading] = useState(false); // Loading state for uploading
  const [bubbleType, setBubbleType] = useState<"primary" | "error" | "success">("primary");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   setImageUrl("https://dalleproduse.blob.core.windows.net/private/images/29eb4468-dc00-4f7e-b9d5-481cf5fd0105/generated_00.png?se=2024-11-27T19%3A46%3A05Z&sig=RKk5Bqdt%2FTUVSJJIf5sNHcEOw9na85XCU91cKJURyMA%3D&ske=2024-12-03T19%3A15%3A25Z&skoid=09ba021e-c417-441c-b203-c81e5dcd7b7f&sks=b&skt=2024-11-26T19%3A15%3A25Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02");
  // }, []);
  // Handle button click to fetch the generated text (magic prompt)
  const handleFetchGeneratedText = async () => {
    try {
      setBubbleType("primary");
      setMessage("Generating magical prompt...");
      const data = await fetchGeneratedText(userPrompt); // Fetch the magic prompt using user input
      setMagicalPrompt(data.choices[0].message.content); // Set the magical prompt from the API response
      setBubbleType("success");
      setMessage("Magical prompt generated successfully!");
    } catch (error) {
      console.error("Error fetching generated text:", error);
      setBubbleType("error");
      setMessage("Error generating magical prompt.");
    }
  };

  // Handle the first generate image button click (use userPrompt)
  const handleGenerateUserImage = async () => {
    try {
      const prompt = userPrompt || "kiwi fruit"; // Use "kiwi fruit" if userPrompt is empty
      setBubbleType("primary");
      setMessage("Generating image...");
      setGenImagePrompt(prompt); // Set the image prompt text field
      const data = await fetchGeneratedImage(prompt);

      const imageUrl = data?.imageUrl;
      setImageUrl(imageUrl);
      setBubbleType("success");
      setMessage("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image from user prompt:", error);
      setBubbleType("error");
      setMessage("Error generating image.");
    }
  };

  // Handle the second generate image button click (use magicalPrompt)
  const handleGenerateMagicalImage = async () => {
    try {
      const prompt = magicalPrompt || "kiwi fruit"; // Use "kiwi fruit" if userPrompt is empty
      setBubbleType("primary");
      setMessage("Generating image...");
      setGenImagePrompt(prompt); // Set the image prompt text field
      const data = await fetchGeneratedImage(magicalPrompt);

      const imageUrl = data?.imageUrl;
      setImageUrl(imageUrl);
      setBubbleType("success");
      setMessage("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image from user prompt:", error);
      setBubbleType("error");
      setMessage("Error generating image.");
    }
  };
  // Handle the upload button click to upload the image
  const handleUploadImage = async () => {
    if (!imageUrl) {
      setBubbleType("error");
      setMessage("You must generate an image before uploading.");
      return;
    }

    setLoading(true);

    try {
      setBubbleType("primary");
      setMessage("Uploading image...");
      // Fetch the image from the URL as a Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob(); // Convert the image to a Blob

      // Upload the Blob instead of the image URL
      const uploadResponse = await uploadImage(blob); // Upload the Blob to the server

      if (uploadResponse.status === "success") {
        setBubbleType("success");
        setMessage("Image uploaded successfully!");
      } else {
        setBubbleType("error");
        setMessage("Error uploading image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setBubbleType("error");
      setMessage("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto ">
      <ChatBot bubbleType={bubbleType} message={message} />
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">Create Your Masterpiece 🎨</h1>
      </div>

      {/* Row 3: User Prompt & Magic Prompt */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-start items-end">
        <div className="w-full sm:w-auto flex-grow">
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
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            className="btn btn-secondary sm:w-auto w-full"
            onClick={handleFetchGeneratedText} // Trigger fetch magic prompt
          >
            Magic Prompt ✨
          </button>
          <button
            className="btn btn-primary sm:w-auto w-full"
            onClick={handleGenerateUserImage} // Trigger image generation from user prompt
          >
            Generate Image 🖌️
          </button>
        </div>
      </div>
      {/* Divider */}
      <div className="divider"></div>
      {/* Row 4: Magical Prompt (readOnly) */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-start items-end">
        <div className="w-full sm:w-auto flex-grow">
          <label htmlFor="magicalPrompt" className="label">
            <span className="label-text text-secondary">Magical Prompt</span>
          </label>
          <input
            id="magicalPrompt"
            type="text"
            className="text-secondary input input-bordered w-full input-secondary"
            readOnly
            value={magicalPrompt} // Display fetched magical prompt
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            className="btn btn-primary sm:w-auto w-full"
            onClick={handleGenerateMagicalImage} // Trigger image generation from magical prompt
          >
            Generate Image 🖌️
          </button>
        </div>
      </div>
      {/* Divider */}
      <div className="divider"></div>

      {/* Other Content */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-left text-success">Your Masterpiece 🖼️</h2>
      </div>
      {/* Remaining Layout */}
      {/* Row 6: Two Columns with Same Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Column 1: Image Prompt and Buttons */}
        <div className="space-y-4 w-full flex flex-col h-full">
          <div className="flex-grow mb-0 p-0 flex flex-col">
            <label htmlFor="imagePrompt" className="label">
              <span className="label-text text-success">Image Prompt:</span>
            </label>

            {genImagePrompt ? <textarea id="imagePrompt" className="input input-bordered w-full flex-grow textarea textarea-success" readOnly value={genImagePrompt} /> : <div className="skeleton h-32 w-full"></div>}
          </div>
          <div className="divider my-2"></div>
          <div className="flex gap-4 mt-auto">
            <button
              className="btn btn-success flex-1 text-sm"
              onClick={async () => {
                if (!imageUrl) {
                  setBubbleType("error");
                  setMessage("You must generate an image before downloading.");
                } else {
                  try {
                    // Fetch the image from the URL as a Blob
                    const response = await fetch(imageUrl);
                    const blob = await response.blob(); // Get the image as a blob

                    // Create a URL for the Blob object
                    const blobUrl = URL.createObjectURL(blob);

                    // Create a temporary anchor tag
                    const link = document.createElement("a");

                    // Set the href attribute to the Blob URL
                    link.href = blobUrl;

                    // Set the download attribute with the desired file name
                    link.download = "generated-image.png"; // Default file name

                    // Programmatically click the link to trigger the download
                    document.body.appendChild(link);
                    link.click();

                    // Clean up the DOM and revoke the Blob URL after download
                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);
                  } catch (error) {
                    setBubbleType("error");
                    setMessage("Error downloading image.");
                    console.error("Error downloading image:", error);
                    // alert("Error downloading image.");
                  }
                }
              }}>
              Download ⬇️
            </button>

            <button className="btn btn-primary flex-1 text-sm" onClick={handleUploadImage} disabled={loading}>
              {loading ? "Uploading..." : "Upload ⬆️"}
            </button>
          </div>
        </div>

        {/* Column 2: 300x300 Image Placeholder */}
        <div className="flex justify-start items-start w-full">
          <div className="w-72 h-72">
            {imageUrl ? (
              <a>
                <img
                  src={imageUrl}
                  alt="Generated Image"
                  className="w-full h-full object-cover cursor-pointer" // Add cursor-pointer class
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
