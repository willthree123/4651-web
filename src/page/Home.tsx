import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto p-4 mt-16 lg:ml-64">
      {/* Added mt-16 for non-lg screens to create space for the navbar */}

      {/* Row 1: Heading */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">Create your masterpiece 🎨</h1>
      </div>

      {/* Row 3: Magical Prompt (editable=false) & Generate Button in same row */}
      <div className="mb-6 flex gap-4 justify-start items-end">
        {" "}
        {/* Changed items-center to items-end */}
        <div className="flex-grow">
          <label htmlFor="magicalPrompt" className="label">
            <span className="label-text">Magical Prompt</span>
          </label>
          <input
            id="magicalPrompt"
            type="text"
            value="Some magical text will appear here"
            className="input input-bordered w-full" // Input fills within the max width
            disabled
          />
        </div>
        <button className="btn btn-primary">Generate Image 🧪</button> {/* Removed width classes */}
      </div>

      {/* Row 4: Divider */}
      <div className="divider"></div>
    </div>
  );
}
