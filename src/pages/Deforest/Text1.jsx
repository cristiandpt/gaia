import React, { useState } from "react";
import "./Text1.css";
import { Html } from "@react-three/drei";

export default function Text1() {
  const texts = [
    "La pérdida de biodiversidad es la disminución o extinción de especies, ecosistemas y recursos genéticos en un área determinada. Ocurre por causas como la deforestación, contaminación, cambio climático, caza excesiva, y la expansión urbana o agrícola, lo que fragmenta hábitats y reduce la capacidad de las especies para sobrevivir y reproducirse.",
    "Imagina un ecosistema como una cadena, donde cada eslabón es una especie. Cuando una especie se extingue, los eslabones de esa cadena se debilitan y el ecosistema entero comienza a desmoronarse. Esto afecta a todos. La pérdida de biodiversidad no es solo un problema de los animales y plantas, es un problema para todos, incluidos los humanos.",
    "Este proceso de extinción masiva está siendo impulsado por actividades humanas como la deforestación, la contaminación y el cambio climático. Cada vez que un ecosistema es alterado, no solo desaparecen las especies que habitan allí, sino que se rompen los procesos naturales que ayudan a amntener el equilibrio en el planeta.",
    "A medida que más especies desaparecen, también se pierde conocimiento invaluable sobre el mundo natural, y nos acercamos a un punto de no retorno. Si no actuamos ahora, las consecuencias serán irreversibles, y lo que alguna vez fue un mundo vibrante y diverso se convertirá en un lugar más vacío y frágil.",
    "Proteger la biodiversidad es proteger el futuro de la humanidad. Cada esfuerzo por conservar un hábitat, reducir nuestra huella de carbono o apoyar políticas de protección ambiental es un paso hacia un mundo más saludable y equilibrado. La biodiversidad es una responsabilidad colectiva que debemos asumir para asegurar un futuro para todas las formas de vida.",
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
