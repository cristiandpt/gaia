import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import "../../3D-models/Gaia.css";
import Lights from "../../pages/lights/Inicio-lights.jsx";
import { Physics, RigidBody } from "@react-three/rapier";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { GaiaCapturePlane } from "./GaiaCapturePlane";
import { Drop } from "./models/Drop";
import { Trowel } from "./models/Trowel";
import { HatChet } from "./models/HatChet";
import { WaterCan } from "./models/WaterCan";
import useQuizStore from "../../pages/Quiz/quiz-store";
import useAuthStore from "../../stores/use-auth-store";
import { doc, setDoc } from "firebase/firestore"; // Para manipular documentos
import { db } from "../../../firebase.config"; // Ruta a tu configuración de Firebase

function GaiaModel() {
  const { scene } = useGLTF("3D-models/Gaia4.glb");
  const gaiaRef = useRef();
  const { increaseScore } = useQuizStore();
  const [badCollisions, setBadCollisions] = useState(0);

  // Movimiento oscilatorio y control con teclas
  useFrame(() => {
    if (gaiaRef.current) {
      const gaiaPosition = gaiaRef.current.translation();
      const newY = Math.sin(Date.now() * 0.002) * 0.1; // Movimiento oscilatorio

      gaiaRef.current.setTranslation(
        { x: gaiaPosition.x, y: newY, z: gaiaPosition.z },
        true,
      );
    }
  });

  const handleKeyDown = useCallback((e) => {
    if (!gaiaRef.current) return;
    const translation = gaiaRef.current.translation();
    switch (e.key) {
      case "ArrowLeft":
        gaiaRef.current.setTranslation(
          { x: translation.x - 0.5, y: translation.y, z: translation.z },
          true,
        );
        break;
      case "ArrowRight":
        gaiaRef.current.setTranslation(
          { x: translation.x + 0.5, y: translation.y, z: translation.z },
          true,
        );
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleCollision = useCallback(
    (event) => {
      const colliderName = event.collider.userData.name;
      if (colliderName === "Drop" || colliderName === "WaterCan") {
        increaseScore(20);
      } else if (colliderName === "Trowel" || colliderName === "HatChet") {
        setBadCollisions((prev) => prev + 1);
        if (badCollisions + 1 >= 2) {
          alert("¡Juego terminado! Gaia ha tocado demasiados objetos malos.");
          // Lógica para terminar el juego o reiniciar
        }
      }
    },
    [badCollisions, increaseScore],
  );

  return (
    <RigidBody
      ref={gaiaRef}
      colliders="cuboid"
      type="fixed"
      gravityScale={0}
      onCollisionEnter={() => increaseScore(20)}
    >
      <primitive
        object={scene}
        scale={[5, 5, 5]}
        position={[0, 0, 1]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </RigidBody>
  );
}

// Componente para instancias aleatorias de objetos
const RandomizeComponent = () => {
  const { size } = useThree();
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = (Math.random() - 0.5) * 60;
      const componentType = Math.floor(Math.random() * 4) + 1;
      const newInstance = {
        component: ModelFactory(componentType, [randomX, 15, 1]),
        id: Date.now(),
      };
      setInstances((prev) => [...prev, newInstance]);

      setTimeout(() => {
        setInstances((prev) => prev.filter((i) => i.id !== newInstance.id));
      }, 5000);
    }, 2000);

    return () => clearInterval(interval);
  }, [size]);

  return instances.map((c) => (
    <RigidBody key={c.id} userData={{ name: c.component.type.name }}>
      {c.component}
    </RigidBody>
  ));
};

// Factoría para los modelos
const ModelFactory = (index, position) => {
  switch (index) {
    case 1:
      return <Drop position={position} scale={60} />;
    case 2:
      return <Trowel position={position} scale={20} />;
    case 3:
      return <HatChet position={position} scale={20} />;
    case 4:
      return <WaterCan position={position} scale={15} />;
    default:
      return null;
  }
};

// Componente principal
const GaiaObjectCapture = () => {
  const { user } = useAuthStore();
  const { score, resetScore } = useQuizStore();
  const [timeLeft, setTimeLeft] = useState(30); // Tiempo en segundos
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [level, setLevel] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setFinalScore(score);
          setGameOver(true);
          showAlert();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score]);

  useEffect(() => {
      if (score < 600) {
        setLevel("Principiante");
      } else if (score < 900) {
        setLevel("Cobre");
      } else if (score < 1500) {
        setLevel("Plata");
      } else {
        setLevel("Oro");
      }
    }, [gameOver, score]);

  const showAlert = async () => {
    const message = `Nombre: ${user ? user.displayName : "Desconocido"}\nPuntuación final: ${score}\nNivel alcanzado: ${level}\n\n¿Quieres jugar de nuevo o volver al inicio?`;
    const playAgain = window.confirm(message);

    if (user) {
      try {
        const docRef = doc(db, "scores", user.uid); // Usar el UID del usuario como ID del documento
        await setDoc(docRef, {
          displayName: user.displayName || "Desconocido",
          score,
          level,
          timestamp: new Date(),
        });
        console.log("Puntaje guardado exitosamente en Firebase");
      } catch (error) {
        console.error("Error al guardar el puntaje en Firebase:", error);
      }
    } else {
      console.log("No se puede guardar el puntaje: usuario no autenticado");
    }

    if (playAgain) {
      // Recargar la página para reiniciar el juego
      window.location.reload();
    } else {
      // Redirigir al inicio (ajusta la ruta según tu aplicación)
      window.location.href = "/";
    }
  };

  const moveGaia = useCallback((direction) => {
    if (!gaiaRef.current) return;
    const translation = gaiaRef.current.translation();
    if (direction === "left") {
      gaiaRef.current.setTranslation(
        { x: translation.x - 0.5, y: translation.y, z: translation.z },
        true,
      );
    } else if (direction === "right") {
      gaiaRef.current.setTranslation(
        { x: translation.x + 0.5, y: translation.y, z: translation.z },
        true,
      );
    }
  }, []);

  const resetGame = () => {
    resetScore();
    setGameOver(false);
    setFinalScore(0);
    setLevel("");
    setTimeLeft(30);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {" "}
      (
      <Canvas camera={{ position: [0, 5, 30] }} shadows>
        <Html position={[-20, 17, 0]} scale={[3]}>
          <p style={{ fontSize: "3rem", color: "white" }}>
            Nombre: {user ? user.displayName : "Desconocido"}
          </p>
        </Html>
        <Html position={[12, 17, 0]} scale={[5]}>
          <p style={{ fontSize: "3rem", color: "white" }}>
            Tiempo restante: {timeLeft} s
          </p>
        </Html>
        <Html position={[0, 17, 0]} scale={[5]}>
          <p>Puntuacion: {score}</p>
        </Html>
        <Html
          center
          style={{
            width: "90vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FaArrowCircleLeft
            style={{ height: "7rem", width: "7rem", cursor: "pointer" }}
            onClick={() => handleKeyDown({ key: "ArrowLeft" })} // Simula la tecla "ArrowLeft"
          />
          <FaArrowCircleRight
            style={{ height: "7rem", width: "7rem", cursor: "pointer" }}
            onClick={() => handleKeyDown({ key: "ArrowRight" })} // Simula la tecla "ArrowRight"
          />
        </Html>

        <Lights />
        <Environment
          files="imagenes/satara_night_no_lamps_4k.hdr"
          background
          backgroundIntensity={1}
        />
        <OrbitControls />
        <Suspense fallback={null}>
          <Physics>
            <RandomizeComponent />
            <GaiaCapturePlane position={[0, -11, 2]} scale={[10, 10, 10]} />
            <GaiaModel />
          </Physics>
        </Suspense>
      </Canvas>
      )
    </div>
  );
};

export default GaiaObjectCapture;