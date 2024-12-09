/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Environment, Html } from "@react-three/drei";
import Loader from "../../shared/3DModelLoader";
import { Canvas } from "@react-three/fiber";
import EmptyingProgressBar from "../../components/questions/EmptyProgressBar";
import { SoilLayers } from "../../components/questions/SoilLayers";
import QuestionControl from "../../components/questions/QuestionsControls";
import { SoilTypes } from "../../components/questions/SoilTypes";
import { CropsType } from "../../components/questions/CropsTypes";
import useQuizStore from "./quiz-store";

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const questions = [
	{
		question: "¿Cúal capa es la que se afecta durante la erosión?",
		options: [
			"a) Aumenta la resiliencia de los ecosistemas",
			"b) Disminuye la estabilidad y funcionalidad de los ecosistemas",
			"c) Mejora la calidad del agua",
			"d) Aumenta la producción de alimentos",
		],
	},
	{
		question: "Selecciona la esfera que corresponde a un terreno erosionado",
		options: [
			"a) Aumenta la resiliencia de los ecosistemas",
			"b) Disminuye la estabilidad y funcionalidad de los ecosistemas",
			"c) Mejora la calidad del agua",
			"d) Aumenta la producción de alimentos",
		],
	},
	{
		question:
			"Selecciona las actividades agrículas que ocasiona la erosión de la tierra",
		options: [
			"a) Aumenta la resiliencia de los ecosistemas",
			"b) Disminuye la estabilidad y funcionalidad de los ecosistemas",
			"c) Mejora la calidad del agua",
			"d) Aumenta la producción de alimentos",
		],
	},
];

const generateQuestion = (selectedQuestion: number) => {
	switch (selectedQuestion) {
		case 1:
			return (
				<SoilLayers
					onHover={(payload) => console.log("")}
					scale={3}
					position={[0, 0, 0]}
					question={"¿Cúal capa es la que se afecta durante la erosión?"}
				/>
			);
		case 2:
			return <SoilTypes scale={2.5} />;
		case 3:
			return <CropsType rotation={[0, 0, 0.01]} position={[0, -2.5, 0]} />;
	}
};

const QuizFlow = () => {
	const { questionNumber, score } = useQuizStore();

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
			<Suspense fallback={<Loader />}>
				{generateQuestion(questionNumber)}
			</Suspense>
			<QuestionControl />
			<Html wrapperClass="div" position={[0, 7, 0]} center>
				<h1 style={styles.question}>
					{questions[questionNumber - 1].question}
				</h1>
			</Html>
			<Environment background files="imagenes/qwantani_dusk_2_2k.hdr" />
			<Html wrapperClass="div" position={[0, -10, 0]} center>
				<EmptyingProgressBar key={questionNumber} duration={10000} />
			</Html>
		</Canvas>
	);
};

const styles = {
	container: {
		width: "300px",
		height: "auto",
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		borderRadius: "8px",
		overflow: "hidden",
		position: "relative",
		padding: "16px",
	},
	question: {
		fontSize: "1.75rem",
		color: "black",
		width: "1000px",
		fontEeight: "bold",
	},
};

export default QuizFlow;
