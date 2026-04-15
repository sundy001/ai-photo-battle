import { config } from "../config";

interface FeedbackOverlayProps {
  correct: boolean;
  onNext: () => void;
}

export function FeedbackOverlay({ correct, onNext }: FeedbackOverlayProps) {
  return (
    <div className={`feedback-overlay ${correct ? "correct" : "wrong"}`}>
      <div className="feedback-content">
        <span className="feedback-icon">{correct ? "✓" : "✗"}</span>
        <span className="feedback-text">
          {correct ? config.correctText : config.wrongText}
        </span>
      </div>
      <button className="next-button" onClick={onNext}>
        Next
      </button>
    </div>
  );
}
