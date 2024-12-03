import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./styles.css";

const questions = [
	{
		question: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Madrid"],
		correctAnswer: "Paris",
	},
	{
		question: "What is 2 + 2?",
		options: ["3", "4", "5", "6"],
		correctAnswer: "4",
	},
];

const Quiz = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [slideDirection, setSlideDirection] = useState("right");

	const handleAnswerClick = (answer) => {
		if (answer === questions[currentQuestionIndex].correctAnswer) {
			console.log("Correct!");
		} else {
			console.log("Wrong!");
		}
		setSlideDirection("left");
		setTimeout(() => {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			setSlideDirection("right");
		}, 500); // Adjust the timeout to match the animation duration
	};

	if (currentQuestionIndex >= questions.length) {
		return <h1>Quiz Completed!</h1>;
	}

	const currentQuestion = questions[currentQuestionIndex];

	return (
		<div className="h-80 b-gray">
			<div className={`slide ${slideDirection}`}>
				<h2>{currentQuestion.question}</h2>
				{currentQuestion.options.map((option, index) => (
					<button key={index} onClick={() => handleAnswerClick(option)}>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default Quiz;
