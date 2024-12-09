import React, { useState, useRef } from "react";

const DraggableImage = ({ imageUrl, onDropImage }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const dragRef = useRef(null);

  const handleDragStart = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleDrag = (e) => {
    if (dragRef.current) {
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      dragRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleDragEnd = () => {
    onDropImage(position); // Update the image position in the PDF
  };

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: "move",
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <img
        src={imageUrl}
        alt="Draggable"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default DraggableImage;
