import React from "react";
import Bubble from "./Bubble";
import "./BubblesCanvas.css";

const BubbleCanvas = () => {
  const bubbles = [
    {
      text: "Educación ambiental",
      hoverText:
        "Concienciar a la sociedad sobre la importancia de la biodiversidad.",
      link: "/biodiversity",
    },
    {
      text: "Restauración de ecosistemas",
      hoverText:
        "Recuperar tierras degradadas para su rehabilitación ecológica.",
      link: "/climate-change",
    },
    {
      text: "Uso sostenible de recursos",
      hoverText:
        "Promover prácticas agrícolas y pesqueras responsables.",
      link: "/climate-change",
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
