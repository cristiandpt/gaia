/* eslint-disable react/no-unknown-property */
import {
  Suspense,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { ErosionPlane } from "../../3D-models/ErosionPlane";
import { Canvas } from "@react-three/fiber";
import MyGaia from "../../3D-models/MyGaia.jsx";
import CherryTree from "../../3D-models/cherry-tree/CherryTree.jsx";
import Loader from "../../shared/3DModelLoader";
import { useFrame } from "@react-three/fiber";
import City from "../../3D-models/city/City";
import PostProcessing from "./PostProcessing.jsx";

import {
  Box,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  useScroll,
  PositionalAudio,
} from "@react-three/drei";
import ErosionScrollControl from "../../controls/ErosionScrollControl.js";
import { Soil } from "../../3D-models/soil/Soil.jsx";
import NavbarHome from "../../components/NavbarHome.js";
import GaiaDialog from "../../components/GaiaDialog.js";
import Sand from "../../3D-models/sand/Sand.jsx";
import Untitle from "../../3D-models/untitle/Untitle";
import ErosionText from "../../components/Erosion3Dtext";
import * as THREE from "three";
import {
  CuboidCollider,
  Physics,
  RigidBody,
  TrimeshCollider,
} from "@react-three/rapier";
import { Leaves } from "../../components/leaf/Leaves.jsx";
import { FlatRock } from "../../3D-models/FlatRock";
import { VintageTV } from "../../3D-models/VintageTV";
import VideoTexture from "./ErosionVideo";
import { useAspect, useVideoTexture, useTexture } from "@react-three/drei";

function VideoMaterial(url: string) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function FallbackMaterial(url: string) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function Scene() {
  const size = useAspect(1800, 1000);
  return (
    <mesh scale={size}>
      <planeGeometry />
      <Suspense fallback={null}>
        <VideoMaterial url="/videos/la_vida_del_suelo.mp4" />
      </Suspense>
    </mesh>
  );
}

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

//useGLTF.preload("3D-models/cherry-tree/scene.gltf");

const VideoTextureLocal = () => {
  // Load the video texture
  const texture = useVideoTexture("/videos/la_vida_del_suelo.mp4", {
    muted: true,
    loop: true,
  }); // Ensure correct path to your video
  const size = useAspect(1800, 1000);
  return (
    <mesh position={[0, 0, 0]} scale={size}>
      <planeGeometry args={[16, 9]} /> {/* Aspect ratio of the video */}
      <Suspense fallback={null}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </Suspense>
    </mesh>
  );
};

const Erosion = () => {
  const dialog = [
    "Hola Cristian. Ahora seguimos explorando el problema de la erosión.",
    "La erosón degrada mi superficie, hace perder de ésta la vitalidad, la fuerza para producir el fruto de la tierra.",
    "Sin fruto, los animales padecen y la tierra se convierte en árida, desértica y seol de los bioverrsidad.",
    "Haz click para empezar a explorar el problema de la erosión.",
  ];

  const erosionProblems = [
    "Pérdida de Nutrientes: La erosión arrastra la capa superior del suelo, rica en nutrientes esenciales para las plantas.",
    "Disminución de la Fertilidad: La fertilidad del suelo se ve comprometida, requiriendo más fertilizantes y aumentando la contaminación.",
    "Reducción de la Absorción de Agua: La erosión dificulta la infiltración del agua, provocando escorrentías e inundaciones.",
    "Falta de Biodiversidad: La erosión destruye hábitats naturales, llevando a la pérdida de especies vegetales y animales.",
    "Desarrollo de Arenas y Polvo: La erosión transforma suelos fértiles en desiertos de arena, aumentando la desertificación.",
    "Contaminación por Humo: La quema de residuos agrícolas genera humo, contaminando el aire y contribuyendo al cambio climático.",
  ];

  const [currentText, setCurrentText] = useState<string>("");
  const [textVisible, setTextVisible] = useState<boolean>(false);
  let textIndex = 0;
  const [index, setIndex] = useState(0);

  const earthRef = useRef<any>();
  const particlesRef = useRef<any>();

  const initialPosition = new THREE.Vector3(0, 0, 0);
  const initialVelocity = 0.01;

  // State to store particle positions
  const [particles, setParticles] = useState<number[]>([]);

  // Function to disintegrate model
  const disintegrateModel = () => {
    // Get the mesh geometry
    const geometry = earthRef?.current?.geometry;

    if (!geometry) return;

    // Create particles from the mesh vertices
    const particlePositions: number[] = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      const vertex = geometry.attributes.position.get(i);
      particlePositions.push(vertex.x, vertex.y, vertex.z);
    }

    setParticles(particlePositions);

    // Apply initial velocity to each particle
    for (let i = 0; i < particlePositions.length; i += 3) {
      const particlePos = new THREE.Vector3(
        particlePositions[i],
        particlePositions[i + 1],
        particlePositions[i + 2],
      );
      particlePos.add(
        new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).multiplyScalar(initialVelocity),
      );

      // Add some random displacement
      particlePos.x += Math.random() * 0.1 - 0.05;
      particlePos.y += Math.random() * 0.1 - 0.05;
      particlePos.z += Math.random() * 0.1 - 0.05;

      // Update particle position
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          geometry.getAttribute("position").array.slice(),
          3,
        ),
      );
    }
  };

  /* useEffect(() => {
        const interval = setInterval(() => {
			if ( index < erosionProblems.length - 1) {
				setIndex((prevIndex) => (prevIndex + 1) % erosionProblems.length);	
			}
        }, 2000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []); */

  useEffect(() => {
    // Set up a timer
    const timerId = setInterval(() => {
      if (textIndex == 4) {
        setTextVisible(false);
        clearInterval(timerId);
      } else {
        setTextVisible(!textVisible);
        setCurrentText(dialog[textIndex]);
        textIndex++;
      }
    }, 3000); //three seconds for text interleaving

    // Cleanup function to clear the timer on the last text
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCityActive, setIsCityActive] = useState<boolean>(false);
  const [isTreeActive, setIsTreeActive] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startPresentation = () => {
    if (!isActive) {
      setIsActive(true);
      const id = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % erosionProblems.length);
      }, 5000);
      setIntervalId(id);
    }
  };

  const stopPresentation = () => {
    if (isActive) {
      if (intervalId) clearInterval(intervalId);
      setIsActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const vertices = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
    -1, 1, 1,
  ];

  const indices = [
    0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 0, 4, 7, 1, 5, 6, 2, 6, 5,
  ];

  useEffect(() => {
    const simulateDisintegration = () => {
      disintegrateModel();
    };

    // Simulate disintegration every frame
    simulateDisintegration();
  }, []);

  // Run simulation loop
  useEffect(() => {
    // Update particles position every frame
    const updateParticles = () => {
      if (particlesRef.current) {
        const geometry = particlesRef.current.geometry;
        const positions = geometry.getAttribute("position").array;
        setParticles(positions);
      }
    };
    const animationFrameId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const onEnteringHandler = () => {
    setIsCityActive(true);
  };
  const onExitingHandler = () => {
    setIsCityActive(false);
  };

  const onTreeEnteringHandler = () => {
    setIsTreeActive(true);
  };
  const onTreeExitingHandler = () => {
    setIsTreeActive(false);
  };

  const instanceData = [
    { position: [10, 8, 10], scale: [0.1, 0.1, 0.1] },
    { position: [12, 7, 11], scale: [0.1, 0.1, 0.1] },
    { position: [9, 5, 10], scale: [0.1, 0.1, 0.1] },
    { position: [7, 9, 12], scale: [0.05, 0.05, 0.05] },
    { position: [10, 5, 10], scale: [0.5, 0.5, 0.5] },
    { position: [11, 6, 13], scale: [0.4, 0.4, 0.4] },
    { position: [8, 5, 16], scale: [0.3, 0.3, 0.3] },
    { position: [9, 6, 17], scale: [0.1, 0.1, 0.1] },
    { position: [10, 8, 8], scale: [0.2, 0.2, 0.2] },
    { position: [12, 3, 10], scale: [0.2, 0.2, 0.2] },
    { position: [14, 4, 9], scale: [0.4, 0.4, 0.4] },
    { position: [10, 7, 10], scale: [0.2, 0.2, 0.2] },
    { position: [11, 6, 7], scale: [0.1, 0.1, 0.1] },
    { position: [12, 5, 13], scale: [0.3, 0.3, 0.3] },
    { position: [10, 5, 12], scale: [0.3, 0.3, 0.3] },
    { position: [10, 6, 8], scale: [0.1, 0.1, 0.1] },
    { position: [11, 5.2, 13], scale: [0.1, 0.1, 0.1] },
    { position: [15, 5, 15], scale: [0.2, 0.2, 0.2] },
    { position: [7, 8, 11], scale: [0.2, 0.2, 0.2] },
    { position: [13, 7, 9], scale: [0.1, 0.1, 0.1] },
  ];

  const audioRef = useRef();

  const handleAudio = useCallback(() => {
    audioRef?.current.play();
    audioRef?.current.setVolume(3);
  }, []);

  return (
    <>
      <NavbarHome />
      <Canvas
        className="h-screen w-screen"
        shadows
        onClick={handleAudio}
        camera={{ position: [0, 5, 15] }}
      >
        <ambientLight intensity={0.3} />{" "}
        {/* Low ambient light for softer global illumination */}
        <pointLight
          position={[6, 10, 4]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.1} // Near clip for shadows
          shadow-camera-far={50} // Far clip for shadows
        />
        {/* Ground plane to receive shadows */}
        <Physics>
          <RigidBody position={[0, 8, 0]} ref={earthRef} colliders="hull">
            <Box />
            <TrimeshCollider args={[vertices, indices]} />
          </RigidBody>
          {/* Particle System */}
          <points ref={particlesRef}>
            <sphereGeometry args={[0.05, 32, 16]} />
            <pointsMaterial color="#A52A2A" size={0.05} />
          </points>
          {/* Function to disintegrate model */}
        </Physics>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -4.09, 0]}
        >
          <planeGeometry args={[500, 500]} />
          <shadowMaterial opacity={0.7} />
        </mesh>
        <Suspense fallback={<Loader />}>
          <group receiveShadow castShadow position={[0, 0, 0]}>
            {/* Puedes ajustar posiciones y rotaciones de cada uno */}
            {textVisible && (
              <Html position={[8, 6, 0]} center>
                <div
                  className="px-4 py-4 rounded-md bg-black/[0.5]"
                  style={{
                    width: "200px",
                    color: "white",
                    background: "black",
                  }}
                >
                  {currentText}
                  {textVisible && !(textIndex >= 3) && (
                    <button
                      onClick={startPresentation}
                      style={{ margin: "5px" }}
                    >
                      Start Presentation
                    </button>
                  )}
                  {false && (
                    <button
                      onClick={stopPresentation}
                      disabled={!isActive}
                      style={{ margin: "5px" }}
                    >
                      Stop Presentation
                    </button>
                  )}
                </div>
              </Html>
            )}
            {isActive && (
              <GaiaDialog
                say={erosionProblems[index]}
                position={[4, 5, 0]}
                style={{
                  width: "320px",
                  color: "#7F664A",
                  fontWeight: 500,
                  backgroundColor: "rgba(255, 255, 255, 0.66)",
                }}
              />
            )}

            <Physics gravity={[0, 0, 0]}>
              {isCityActive && (
                <GaiaDialog
                  say={
                    "La erosión del suelo, un problema cada vez más acuciante, no solo degrada nuestros campos y bosques, sino que también contamina el aire que respiramos. El viento, al arrastrar las partículas de suelo erosionado, las 1levanta y las dispersa en el aire, creando una neblina de polvo que se adentra en nuestras ciudades. Esta sedimentación no solo reduce la visibilidad y afecta la calidad de vida, sino que también representa un grave riesgo para nuestra salud.La inhalación de estas partículas finas puede provocar enfermedades respiratorias, alergias y afecciones cardiovasculares. Además, contaminan las fuentes de agua, dañan los cultivos y aceleran el desgaste de edificios e infraestructuras."
                  }
                  position={[-15, 12, -8]}
                  style={{
                    width: "320px",
                    color: "#7F664A",
                    fontWeight: 500,
                    backgroundColor: "rgba(255, 255, 255, 0.66)",
                  }}
                />
              )}
              <ErosionPlane scale={10} position={[0, -4.5, 1]} />
              <RigidBody type="fixed">
                <FlatRock scale={[0.35, 0.35, 0.2]} position={[-10, -6, 14]} />
              </RigidBody>
              <RigidBody type="fixed">
                <VintageTV scale={1.1} position={[-8, 1, 14]} />
              </RigidBody>

              <RigidBody type="fixed">
                <City scale={0.05} />
              </RigidBody>
              <MyGaia />
              {isActive && <Soil position={[-3, 3, 20]}></Soil>}
              <RigidBody type="fixed">
                <CherryTree position={[10, -2, 9]} />
              </RigidBody>
              <Leaves instances={instanceData} />
              {isTreeActive && (
                <GaiaDialog
                  say={
                    "La pérdida de nutrientes desencadena una reacción en cadena de consecuencias devastadoras. Al carecer de los elementos necesarios para su crecimiento y desarrollo, los árboles debilitados se vuelven más susceptibles a plagas, enfermedades y condiciones climáticas extremas. Sus hojas, que antes lucían vibrantes y saludables, comienzan a amarillear y marchitarse, cayendo prematuramente al suelo. La caída de las hojas acelera aún más el proceso de erosión, ya que la capa protectora que formaban sobre el suelo desaparece, exponiéndolo directamente a la acción del viento y el agua. Esto, a su vez, debilita aún más las raíces de los árboles supervivientes, creando un círculo vicioso que conduce a la desertificación y a la pérdida de biodiversidad."
                  }
                  position={[-15, 14, 0]}
                  style={{
                    width: "320px",
                    color: "#7F664A",
                    fontWeight: 500,
                    backgroundColor: "rgba(255, 255, 255, 0.66)",
                  }}
                />
              )}
              <CuboidCollider
                args={[5, 2, 1]}
                sensor
                position={[5, 2, 12]}
                rotation={[0, 0, 0]}
                onIntersectionEnter={onTreeEnteringHandler}
                onIntersectionExit={onTreeExitingHandler}
              />
              {/* <Sand /> */}
              <CuboidCollider
                args={[14, 2, 10]}
                sensor
                position={[-9, 2, -7]}
                rotation={[0, 0, 0]}
                onIntersectionEnter={onEnteringHandler}
                onIntersectionExit={onExitingHandler}
              />
            </Physics>

            {/* <OrbitControls enableZoom={false} /> */}
            <ErosionText refToModel={null} />
            {/* Posiciona el segundo modelo respecto al primero */}
          </group>
        </Suspense>
        <Environment files="/imagenes/qwantani_dusk_2_2k.hdr" background />
        <group position={[0, 5, 0]}>
          <PositionalAudio
            ref={audioRef}
            loop
            url="/sound/desert.mp3"
            distance={5}
          />
        </group>
        <PostProcessing />
      </Canvas>
    </>
  );
};

export default Erosion;
