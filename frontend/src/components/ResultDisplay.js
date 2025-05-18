// src/components/ResultDisplay.js

import React from "react";

const ResultDisplay = ({ imageUrl }) => {
  return (
    <div className="container mt-4 text-center">
      <h3>Generated Image</h3>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Stylized Result"
          className="img-fluid rounded shadow"
          style={{ maxWidth: "80%", border: "2px solid #ccc" }}
        />
      ) : (
        <p>No image to display.</p>
      )}
    </div>
  );
};

export default ResultDisplay;
