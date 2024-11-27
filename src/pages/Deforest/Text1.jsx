import React, { useState } from "react";
import "./Text1.css";
import { Html } from "@react-three/drei";

export default function Text1() {
  const texts = [
    "La deforestación es la eliminación o destrucción de bosques y selvas debido a actividades humanas como la tala indiscriminada, la agricultura intensiva y la expansión urbana. Esta actividad reduce drásticamente el hábitat natural de muchas especies, amenazando su supervivencia.",
    "Los bosques desempeñan un papel crucial en la regulación del clima, actuando como sumideros de carbono que absorben dióxido de carbono y liberan oxígeno. La deforestación libera grandes cantidades de carbono almacenado, contribuyendo al cambio climático global.",
    "Cuando un bosque desaparece, no solo se pierde un hábitat, también se interrumpen ciclos vitales como la regulación del agua, la formación de suelos y el control de plagas naturales. Esto tiene un impacto directo en las comunidades humanas cercanas.",
    "La deforestación masiva puede llevar a la desertificación y la pérdida de tierras fértiles. Además, incrementa el riesgo de desastres naturales como inundaciones y deslizamientos de tierra, afectando gravemente a las poblaciones humanas.",
    "Proteger los bosques es vital para preservar la biodiversidad, mitigar el cambio climático y garantizar la sostenibilidad del planeta. Cada acción para reducir la deforestación y promover prácticas sostenibles es un paso hacia un futuro más equilibrado y saludable para todos.",
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
