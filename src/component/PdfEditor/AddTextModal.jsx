import React from "react";

const AddTextModal = ({
  setIsTextModalOpen,
  newText,
  setNewText,
  onAddText,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-4/5 p-6 bg-white rounded shadow-lg md:w-1/3">
      <h2 className="text-lg font-bold">Add Custom Text</h2>
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        placeholder="Enter text"
        className="w-full p-2 mt-2 border rounded"
      />
      <button
        onClick={onAddText}
        className="px-3 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        Add
      </button>
      <button
        onClick={() => setIsTextModalOpen(false)}
        className="px-3 py-2 mt-4 ml-2 text-white bg-red-500 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default AddTextModal;
