import React, { useState } from "react";
import { uploadImage } from "../api/apiClient"; // Import the updated uploadImage function

const Browse: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage)); // Preview image
    }
  };

  // Handle image submission
  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      // Convert the selected image into a Blob
      const imageBlob = new Blob([image], { type: "image/png" });

      console.log("Submitting image blob:", imageBlob); // Log the image blob

      // Call the uploadImage API (passing the image as a Blob directly)
      const response = await uploadImage(imageBlob); // Pass the Blob to the API
      console.log("Posting to URL:", response.url); // Log the URL

      if (response.ok) {
        alert("Image uploaded successfully!");
      } else {
        console.error("Error uploading image:", response);
        alert("Error uploading image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error instanceof Error) {
        alert(`Error uploading image: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16 lg:ml-64">
      {/* Row 1: Heading */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">Upload Your Creation</h1>
      </div>
      <div className="divider"></div>

      {/* Row 2: Image Upload */}
      <div className="mb-6">
        <input type="file" accept="image/png" className="input input-bordered w-full max-w-xs" onChange={handleFileChange} />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Selected Preview" className="w-72 h-72 object-cover border border-gray-300" />
          </div>
        )}
        <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>

      {/* Row 3: Community Creations */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">Community Creations 🎨</h1>
        {/* Add community creations here */}
      </div>
    </div>
  );
};

export default Browse;
