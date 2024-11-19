import React from "react";

const AddImageModal = ({ setIsImageModalOpen }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-4/5 p-6 bg-white rounded shadow-lg md:w-1/3">
      <h2 className="text-lg font-bold">Add Image</h2>
      <p>Coming soon...</p>
      <button
        onClick={() => setIsImageModalOpen(false)}
        className="px-3 py-2 mt-4 text-white bg-red-500 rounded"
      >
        Close
      </button>
    </div>
  </div>
);

export default AddImageModal;
