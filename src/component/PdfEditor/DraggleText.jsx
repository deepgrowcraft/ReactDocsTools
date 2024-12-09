import React, { useState, useRef } from "react";

const DraggableText = ({ newText, fontSize, onDropText }) => {
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
    onDropText(position); // Update the position in the PDF
  };

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: "move",
        fontSize: `${fontSize}px`,
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      {newText}
    </div>
  );
};

export default DraggableText;
