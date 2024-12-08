/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";

import "./styles.css";
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

interface Props {
	clildren: React.ReactNode;
}

const QuizFlow = ({ clildren }: Props) => {};

export default QuizFlow;
