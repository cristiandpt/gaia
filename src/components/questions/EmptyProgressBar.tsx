import { useEffect, useState, FC } from "react";
import useQuizStore from "../../pages/Quiz/quiz-store";

interface EmptyingProgressBarProps {
	duration: number; // Duration in milliseconds
}

const EmptyingProgressBar: FC<EmptyingProgressBarProps> = ({ duration }) => {
	const [progress, setProgress] = useState<number>(100); // Start with a full bar (100%)
	const { questionNumber, newQuestion } = useQuizStore();

	useEffect(() => {
		// Calculate the interval time based on the duration
		const intervalTime = 100; // Update every 100ms
		const totalSteps = duration / intervalTime; // Total number of steps to empty the bar
		const decrement = 100 / totalSteps; // Amount to decrease progress each step

		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress <= 0) {
					setTimeout(() => {
						if (questionNumber < 3) newQuestion(questionNumber + 1);
					}, 250);
					clearInterval(interval); // Clear the interval when progress is 0
					return 0; // Ensure progress doesn't go below 0
				}
				return prevProgress - decrement; // Decrease progress
			});
		}, intervalTime);

		// Cleanup function to clear the interval on component unmount
		return () => clearInterval(interval);
	}, [duration]);

	return (
		<div style={styles.container}>
			<div style={{ ...styles.progressBar, width: `${progress}%` }} />
		</div>
	);
};

// Styles for the progress bar
const styles = {
	container: {
		width: "1000px",
		height: "40px",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		borderRadius: "8px",
		overflow: "hidden",
		position: "relative",
	},
	progressBar: {
		height: "40px",
		backgroundColor: "#F4A460",
		transition: "width 0.1s ease-in-out",
	},
};

export default EmptyingProgressBar;
