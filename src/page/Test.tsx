import { useState } from "react";

const Test = () => {
  const [text, setText] = useState("Centered Text");

  const handleClick = async () => {
    try {
      const response = await fetch("https://phq27t0v05.execute-api.ap-southeast-2.amazonaws.com/default/uploadImageUrlsFromS3", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Log the result to the console
      setText(data.choices[0].message.content || "No text available");
    } catch (error) {
      console.error("Error fetching data:", error);
      setText("Error fetching text");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h4 className="text-4xl">{text}</h4>
      <button className="btn btn-primary mt-4" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};

export default Test;
