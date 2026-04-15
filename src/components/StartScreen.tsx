import { useEffect, useRef } from "react";
import { config } from "../config";
import { PowerGlitch } from "powerglitch";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const { stopGlitch } = PowerGlitch.glitch(titleRef.current, {
      playMode: "always",
      timing: {
        duration: 3000,
        iterations: Infinity,
      },
      glitchTimeSpan: {
        start: 0.7,
        end: 0.85,
      },
      shake: {
        velocity: 10,
        amplitudeX: 0.05,
        amplitudeY: 0.05,
      },
      slice: {
        count: 4,
        velocity: 12,
        minHeight: 0.02,
        maxHeight: 0.1,
        hueRotate: true,
      },
    });
    return () => stopGlitch();
  }, []);

  return (
    <div className="start-screen">
      <div className="start-content">
        <div className="start-icon">
          <span className="icon-camera">📷</span>
          <span className="icon-vs">vs</span>
          <span className="icon-ai">🤖</span>
        </div>
        <h1 className="start-title" ref={titleRef}>{config.title}</h1>
        <p className="start-tagline">{config.tagline}</p>
        <p className="start-instruction">Two photos. One is AI-generated. Tap the fake.</p>
        <button className="start-button" onClick={onStart}>
          Start
        </button>
      </div>
      <footer className="start-footer">© Ovis Design Co. All rights reserved.</footer>
    </div>
  );
}
