import { useEffect, useRef, useState } from "react";
import { config } from "../config";
import gsap from "gsap";

interface FeedbackOverlayProps {
  correct: boolean;
  onNext: () => void;
}

export function FeedbackOverlay({ correct, onNext }: FeedbackOverlayProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // After 2s, fade out the backdrop and text, leaving only the border
    tl.to(backdropRef.current, {
      duration: 0.6,
      opacity: 0,
      delay: 2,
      onComplete: () => setFaded(true),
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div className={`feedback-overlay ${correct ? "correct" : "wrong"}`}>
      <div
        ref={backdropRef}
        className="feedback-backdrop"
      >
        <div className="feedback-content">
          <span className="feedback-icon">{correct ? "✓" : "✗"}</span>
          <span className="feedback-text">
            {correct ? config.correctText : config.wrongText}
          </span>
        </div>
      </div>
      <button className={`next-button ${faded ? "visible" : ""}`} onClick={onNext}>
        Next
      </button>
    </div>
  );
}
