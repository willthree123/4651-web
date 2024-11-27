import React, { useEffect, useState } from "react";

const InstructionPopUp: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const skipPopup = localStorage.getItem("dontShowInstructionPopUp");
    if (!skipPopup) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("dontShowInstructionPopUp", "true");
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          style={
            {
              // boxShadow: "0 0 20px rgba(0, 0, 255, 0.5)",
            }
          }>
          <dialog id="instruction_modal" className="modal modal-bottom sm:modal-middle" open>
            <div
              className="modal-box shadow-lg rounded-lg bg-base-100"
              style={{
                boxShadow: `0 0 50px oklch(var(--a) / 0.5)`,
              }}>
              <h3 className="font-bold text-2xl text-accent mb-4">Welcome to Your Creative Hub!</h3>
              <p className="py-2 text-base-content">Here’s how to get started with your creative journey:</p>
              <ul className="list-disc pl-6 py-2 text-base-content">
                <li>
                  <strong>Input a Prompt:</strong> Enter a description in the text box to visualize your idea.
                </li>
                <li>
                  <strong>Generate an Image:</strong> Click "Generate Image" or enhance your prompt with the "Magic Prompt" feature.
                </li>
                <li>
                  <strong>Download or Upload:</strong> Save your image locally or share it with the community gallery.
                </li>
                <li>
                  <strong>Explore the Gallery:</strong> Browse creations from fellow users to spark inspiration.
                </li>
              </ul>
              <p className="py-2 text-base-content">🚀 Dive into creativity and let your imagination run wild!</p>
              <div className="modal-action justify-start gap-4 w-full">
                <button className="btn btn-accent" onClick={handleClose}>
                  Close
                </button>
                <div className="flex items-center">
                  <input id="dontShowAgain" type="checkbox" className="checkbox checkbox-accent" checked={dontShowAgain} onChange={(e) => setDontShowAgain(e.target.checked)} />
                  <label htmlFor="dontShowAgain" className="ml-2 text-base-content cursor-pointer">
                    Don&apos;t show me again
                  </label>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default InstructionPopUp;
