import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faFont,
  faImage,
  faSave,
  faUpload,
  faFileCirclePlus,
  faFileCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({
  zoom,
  setZoom,
  setIsTextModalOpen,
  setIsImageModalOpen,
  onSave,
  onUpload,
  onAddPage,
  onRemovePage,
  onAddText, // Handler for adding text
  onAddImage, // Handler for adding image
}) => (
  <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
    <div className="flex space-x-2">
      <button
        className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
        onClick={() => setZoom(zoom + 0.1)}
      >
        <FontAwesomeIcon icon={faPlus} /> Zoom In
      </button>
      <button
        className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
        onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
      >
        <FontAwesomeIcon icon={faMinus} /> Zoom Out
      </button>
      <button
        className="px-3 py-2 text-sm text-white bg-purple-500 rounded"
        onClick={onAddText}
      >
        <FontAwesomeIcon icon={faFont} /> Add Text
      </button>
      <button
        className="px-3 py-2 text-sm text-white bg-green-500 rounded"
        onClick={onAddImage}
      >
        <FontAwesomeIcon icon={faImage} /> Add Image
      </button>
      <button
        className="px-3 py-2 text-sm text-white bg-green-500 rounded"
        onClick={onAddPage}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} /> Add Page
      </button>
      <button
        className="px-3 py-2 text-sm text-white bg-red-500 rounded"
        onClick={onRemovePage}
      >
        <FontAwesomeIcon icon={faFileCircleMinus} /> Remove Page
      </button>
    </div>
    <div className="flex space-x-2">
      <label className="relative px-3 py-2 text-sm text-white bg-blue-500 rounded cursor-pointer">
        <FontAwesomeIcon icon={faUpload} /> Upload
        <input
          type="file"
          accept="application/pdf"
          onChange={onUpload}
          className="absolute inset-0 opacity-0"
        />
      </label>
      <button
        className="px-3 py-2 text-sm text-white bg-purple-500 rounded"
        onClick={onSave}
      >
        <FontAwesomeIcon icon={faSave} /> Save PDF
      </button>
    </div>
  </div>
);

export default Toolbar;
