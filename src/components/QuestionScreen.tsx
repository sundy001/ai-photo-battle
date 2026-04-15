import type { Question } from "../config";
import { config } from "../config";

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (pickedAI: boolean) => void;
}

export function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: QuestionScreenProps) {
  const topPhoto =
    question.aiPosition === "top" ? question.aiPhoto : question.realPhoto;
  const bottomPhoto =
    question.aiPosition === "top" ? question.realPhoto : question.aiPhoto;

  const topIsAI = question.aiPosition === "top";

  return (
    <div className="question-screen">
      <div className="question-header">
        <p className="question-counter">
          {questionIndex + 1} / {totalQuestions}
        </p>
        <p className="question-text">{config.questionHeader}</p>
      </div>
      <div className="photos-container">
        <button className="photo-card" onClick={() => onAnswer(topIsAI)}>
          <img src={topPhoto} alt="Photo A" />
        </button>
        <button className="photo-card" onClick={() => onAnswer(!topIsAI)}>
          <img src={bottomPhoto} alt="Photo B" />
        </button>
      </div>
    </div>
  );
}
