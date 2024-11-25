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
            placeholder="Input Your Prompt here..."
            className="input input-bordered w-full" // Input fills within the max width
          />
        </div>
        <button className="btn btn-secondary">Magic Prompt ✨</button>
        <button className="btn btn-primary">Generate Image 🧪</button> {/* Removed width classes */}
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
            className="input input-bordered w-full" // Input fills within the max width
            readOnly
          />
        </div>
        <button className="btn btn-primary">Generate Image 🧪</button> {/* Removed width classes */}
      </div>
      {/* Row 4: Divider */}
      <div className="divider"></div>
      {/* Row 5: Heading for "Your Masterpiece" */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-left">Your Masterpiece</h2>
      </div>

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
            {false /* Replace with a condition to check if there is content */ ? (
              <input
                id="imagePrompt"
                type="text"
                className="input input-bordered w-full flex-grow text-left align-top" // Added text-left and align-top
                readOnly
                value="some content"
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
            <div className="skeleton w-full h-full text-center flex justify-center items-center ">300x300 Image Placeholder</div>
          </div>
        </div>
      </div>

      {/* // */}
    </div>
  );
}
