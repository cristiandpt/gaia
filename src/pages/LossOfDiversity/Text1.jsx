import React, { useState } from "react";
import "./Text1.css";
import { Html } from "@react-three/drei";

export default function Text1() {
  const texts = [
    "La pérdida de biodiversidad es la disminución o extinción de especies, ecosistemas y recursos genéticos en un área determinada. Ocurre por causas como la deforestación, contaminación, cambio climático, caza excesiva, y la expansión urbana o agrícola, lo que fragmenta hábitats y reduce la capacidad de las especies para sobrevivir y reproducirse.",
    "La deforestación es uno de los mayores causantes de la pérdida de biodiversidad, ya que destruye hábitats naturales de muchas especies. Las actividades humanas, como la agricultura y la urbanización, son las principales responsables de la deforestación.",
    "El cambio climático también es una amenaza para la biodiversidad, ya que altera los hábitats y los patrones de migración, afectando la supervivencia de diversas especies.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    if (currentIndex < texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container">
      <div className="info-text">
        <div className="text-content">{texts[currentIndex]}</div>
        <div className="buttons">
          <button onClick={goBack} disabled={currentIndex === 0}>
            Atrás
          </button>
          <button onClick={goNext} disabled={currentIndex === texts.length - 1}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
