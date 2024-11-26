import React, { useEffect, useState } from "react";

interface ChatBotProps {
  bubbleType?: "primary" | "error" | "success"; // Optional, default is 'primary'
  message: string; // Message that the bot will display
}

const ChatBot: React.FC<ChatBotProps> = ({ bubbleType = "primary", message }) => {
  const [displayMessage, setDisplayMessage] = useState(message);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setDisplayMessage(message);
    setIsVisible(true);

    // Hide the message after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  // Map bubbleType to Daisy UI's corresponding class
  const bubbleClass = {
    primary: "chat-bubble chat-bubble-primary",
    error: "chat-bubble chat-bubble-error",
    success: "chat-bubble chat-bubble-success",
  };

  return (
    <div>
      {/* Chat bubble UI */}
      <div className="fixed bottom-16 right-4 flex flex-col space-y-2">
        {displayMessage && (
          <div className={`chat chat-end relative right-20 top-5 transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className={`${bubbleClass[bubbleType]} max-w-xs`}>{displayMessage}</div>
          </div>
        )}
      </div>

      {/* Chat Bot UI */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2 p-4 bg-white rounded-full shadow-lg">
        {/* Emoji */}
        <span className="text-3xl">🤖</span>
        {/* Label */}
      </div>
    </div>
  );
};

export default ChatBot;
