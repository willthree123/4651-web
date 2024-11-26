import React, { useState, useEffect } from "react";
import { uploadImage } from "../api/apiClient"; // Import the updated uploadImage function
import { fetchImageUrls } from "../api/apiClient"; // Updated API for fetching image URLs

const Browse: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [communityImages, setCommunityImages] = useState<string[]>([]); // State to store image URLs

  // Fetch community images function
  const fetchCommunityImages = async () => {
    try {
      const response = await fetchImageUrls();
      if (response.status === "success") {
        console.log("Community images:", response.data.imageUrls); // Log the image URLs
        setCommunityImages(response.data.imageUrls); // Set the image URLs in the state
      } else {
        console.error("Failed to fetch community images:", response.message);
      }
    } catch (error) {
      console.error("Error fetching community images:", error);
    }
  };

  // Fetch community images on component mount and when loading changes
  useEffect(() => {
    fetchCommunityImages();
  }, [loading]);

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
      // console.log("Posting to URL:", response.url); // Log the URL

      if (response.status === "success") {
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
      // Fetch the updated community images after successful upload
    }
  };

  // Handle image click to open in new tab
  const handleImageClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto ">
      {/* Row 1: Heading */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">Upload Your Creation</h1>
      </div>
      <div className="divider"></div>

      {/* Row 2: Image Upload */}
      <div className="mb-6">
        <input type="file" accept="image/png" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={handleFileChange} />
        <button className={`btn btn-primary mt-4 ml-4 ${loading ? "loading" : ""}`} onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Selected Preview" className="w-72 h-72 object-cover border border-gray-300" />
          </div>
        )}
      </div>

      {/* Row 3: Community Creations */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">Community Creations 🎨</h1>

        {/* Display fetched community images */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {communityImages.length > 0 ? (
            communityImages.map((url, index) => (
              <a>
                <div
                  key={index}
                  className="w-36 h-36 flex justify-start items-start border rounded p-1" // Align to left and top, with padding to avoid image being flush to the container's edge
                  onClick={() => handleImageClick(url)} // Open image in new tab on click
                >
                  <img src={url} alt={`Community Creation ${index}`} className="w-full h-full object-cover cursor-pointer" />
                </div>
              </a>
            ))
          ) : (
            <p>Loading community images...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
