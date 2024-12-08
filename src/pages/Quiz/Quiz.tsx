/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";

import "./styles.css";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import Loader from "../../shared/3DModelLoader";
import { Canvas } from "@react-three/fiber";
import EmptyingProgressBar from "../../components/questions/EmptyProgressBar";
import { SoilLayers } from "../../components/questions/SoilLayers";
import QuestionControl from "../../components/questions/QuestionsControls";
import { SoilTypes } from "../../components/questions/SoilTypes";
import { CropsType } from "../../components/questions/CropsTypes";
const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const questions = [
	{
		text: "Pregunta 1: ¿Cuál de las siguientes prácticas agrícolas ayuda a prevenir la erosión del suelo?",
		options: [
			"a) Aumenta la resiliencia de los ecosistemas",
			"b) Disminuye la estabilidad y funcionalidad de los ecosistemas",
			"c) Mejora la calidad del agua",
			"d) Aumenta la producción de alimentos",
		],
	},
	{
		text: "Pregunta 2: ¿Cuál de las siguientes es una de las principales causas de la deforestación a nivel mundial?",
		options: [
			"a) Aumenta la resiliencia de los ecosistemas",
			"b) Disminuye la estabilidad y funcionalidad de los ecosistemas",
			"c) Mejora la calidad del agua",
			"d) Aumenta la producción de alimentos",
		],
	},
	{
		text: "Pregunta 3: ¿Qué efecto tiene la pérdida de biodiversidad en los ecosistemas?",
		options: [
			"a) Aumenta la resiliencia de los ecosistemas",
			"b) Disminuye la estabilidad y funcionalidad de los ecosistemas",
			"c) Mejora la calidad del agua",
			"d) Aumenta la producción de alimentos",
		],
	},
];

type QuestionType = 1 | 2 | 3;

const generateQuestion = (selectedQuestion: QuestionType) => {
	switch (selectedQuestion) {
		case 1:
			return (
				<SoilLayers
					onHover={(payload) => console.log("")}
					scale={3}
					position={[0, 0, 0]}
				/>
			);
		case 2:
			return <SoilTypes scale={2.5} />;
		case 3:
			return <CropsType rotation={[0, 0, 0.01]} position={[0, -2.5, 0]} />;
	}
};

const QuizFlow = () => {
	return (
		<Canvas
			className="h-screen w-screen"
			shadows
			camera={{ position: [0, 5, 15] }}
		>
			<ambientLight intensity={0.3} /> {/* Ground plane to receive shadows */}
			<mesh
				receiveShadow
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -4.09, 0]}
			>
				<planeGeometry args={[500, 500]} />
				<shadowMaterial opacity={0.7} />
			</mesh>
			<Suspense fallback={<Loader />}>{generateQuestion(3)}</Suspense>
			<QuestionControl />
			<Environment background files="imagenes/qwantani_dusk_2_2k.hdr" />
			<Html wrapperClass="div" position={[0, -10, 0]} center>
				<EmptyingProgressBar duration={100000} />
			</Html>
		</Canvas>
	);
};

export default QuizFlow;
