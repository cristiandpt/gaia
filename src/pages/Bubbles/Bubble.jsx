import React, { useState } from "react";

const Bubble = ({ text, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Función para manejar el clic y redirigir
  const handleButtonClick = () => {
    window.location.href = link;
  };

  return (
    <div
      className="bubble"
      style={{
        transform: isHovered ? "scale(4)" : "scale(1)", // Amplía la burbuja
        transition: "transform 0.3s ease", // Transición suave
      }}
      onMouseEnter={() => setIsHovered(true)} // Detecta cuando el mouse entra
      onMouseLeave={() => setIsHovered(false)} // Detecta cuando el mouse sale
    >
      <span className="bubble-text">{text}</span>
      <button className="bubble-button" onClick={handleButtonClick}>
        Go
      </button>
    </div>
  );
};

export default Bubble;
