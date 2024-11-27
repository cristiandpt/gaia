import React, { useState } from "react";
import "./Bubble.css";

const Bubble = ({ text, hoverText, link }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <div
      className="bubble"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => (window.location.href = link)} // Redirige al enlace
    >
      <div className="bubble-text">{hovered ? hoverText : text}</div>
    </div>
  );
};

export default Bubble;
