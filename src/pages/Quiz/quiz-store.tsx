import { create } from "zustand";
import { combine } from "zustand/middleware";

const useQuizStore = create<{ questionNumber: number; score: number }>(
	combine({ questionNumber: 1, score: 0, isFinished: false }, (set) => {
		return {
			increaseScore: (gain: number) =>
				set((state) => ({ score: state.score + gain })),
			newQuestion: (question: number) =>
				set((state) => ({ ...state, questionNumber: question })),
			finish: () => set((state) => ({ finished: true })),
		};
	}),
);

export default useQuizStore;
