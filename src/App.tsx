import { useState } from "react";
import "./index.css";
import { config } from "./config";
import { StartScreen } from "./components/StartScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { FeedbackOverlay } from "./components/FeedbackOverlay";
import { GlitchSequence } from "./components/GlitchSequence";
import { EndScreen } from "./components/EndScreen";

type GameState =
  | { phase: "start" }
  | { phase: "question"; index: number }
  | { phase: "feedback"; index: number; correct: boolean }
  | { phase: "glitch" }
  | { phase: "end" };

export function App() {
  const [state, setState] = useState<GameState>({ phase: "start" });

  const totalQuestions = config.questions.length;
  const isLastQuestion = (index: number) => index === totalQuestions - 1;

  function handleStart() {
    setState({ phase: "question", index: 0 });
  }

  function handleAnswer(pickedAI: boolean) {
    if (state.phase !== "question") return;

    if (isLastQuestion(state.index)) {
      // Q6: immediately trigger glitch, no feedback
      setState({ phase: "glitch" });
    } else {
      setState({ phase: "feedback", index: state.index, correct: pickedAI });
    }
  }

  function handleNext() {
    if (state.phase !== "feedback") return;
    setState({ phase: "question", index: state.index + 1 });
  }

  function handleGlitchComplete() {
    setState({ phase: "end" });
  }

  return (
    <>
      {state.phase === "start" && <StartScreen onStart={handleStart} />}

      {state.phase === "question" && (
        <QuestionScreen
          question={config.questions[state.index]!}
          questionIndex={state.index}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
        />
      )}

      {state.phase === "feedback" && (
        <>
          <QuestionScreen
            question={config.questions[state.index]!}
            questionIndex={state.index}
            totalQuestions={totalQuestions}
            onAnswer={() => {}}
            revealed
          />
          <FeedbackOverlay correct={state.correct} onNext={handleNext} />
        </>
      )}

      {state.phase === "glitch" && (
        <GlitchSequence onComplete={handleGlitchComplete} />
      )}

      {state.phase === "end" && <EndScreen />}
    </>
  );
}

export default App;
