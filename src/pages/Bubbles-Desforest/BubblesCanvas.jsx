import React from "react";
import Bubble from "./Bubble";
import "./BubblesCanvas.css";

const BubbleCanvas = () => {
  const bubbles = [
    {
      text: "Introducción",
      hoverText:
        "La deforestación afecta ecosistemas, reduce biodiversidad y contribuye al cambio climático.",
      link: "/biodiversity",
    },
    {
      text: "Sensibilización",
      hoverText:
        "Concienticemos sobre la importancia de preservar los bosques para el futuro.",
      link: "/climate-change",
    },
    {
      text: "Solución",
      hoverText:
        "Reforestación, leyes ambientales, y consumo responsable son claves.",
      link: "/habitats",
    },
  ];

  return (
    <div className="bubble-canvas">
      {bubbles.map((bubble, index) => (
        <Bubble
          key={index}
          text={bubble.text}
          hoverText={bubble.hoverText}
          link={bubble.link}
        />
      ))}
    </div>
  );
};

export default BubbleCanvas;
