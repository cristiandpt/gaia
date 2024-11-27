import React from "react";
import Bubble from "./Bubble";
import "./BubblesCanvas.css"

const BubbleCanvas = () => {
  const bubbles = [
    { text: "Introducción", link: "/biodiversity" },
    { text: "Sensibilización", link: "/climate-change" },
    { text: "Solucion", link: "/habitats" },
  ];

  return (
    <div className="bubble-canvas">
      {bubbles.map((bubble, index) => (
        <Bubble key={index} text={bubble.text} link={bubble.link} />
      ))}
    </div>
  );
};

export default BubbleCanvas;
