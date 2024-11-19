import React from "react";

const TextAnnotations = ({ textAnnotations, zoom }) => (
  <>
    {textAnnotations.map((annotation, index) => (
      <div
        key={index}
        style={{
          position: "absolute",
          left: annotation.x * zoom,
          top: annotation.y * zoom,
        }}
        className="absolute text-black bg-yellow-200 rounded"
      >
        {annotation.text}
      </div>
    ))}
  </>
);

export default TextAnnotations;
