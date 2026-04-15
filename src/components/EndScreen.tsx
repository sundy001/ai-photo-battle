import { useEffect, useRef } from "react";
import { config } from "../config";
import { PowerGlitch } from "powerglitch";

export function EndScreen() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!photoRef.current) return;
    const { stopGlitch } = PowerGlitch.glitch(photoRef.current, {
      playMode: "always",
      timing: { duration: 2500, iterations: Infinity },
      glitchTimeSpan: { start: 0.6, end: 0.8 },
      shake: { velocity: 12, amplitudeX: 0.04, amplitudeY: 0.04 },
      slice: { count: 3, velocity: 10, minHeight: 0.02, maxHeight: 0.12, hueRotate: true },
    });
    return () => stopGlitch();
  }, []);

  return (
    <div className="end-screen">
      <div className="scanlines" />
      <div className="end-content">
        <div className="end-photo" ref={photoRef}>
          <img src={config.ending.photo} alt="" />
        </div>
        <div className="end-messages">
          {config.ending.messagesSecond.map((msg, i) => (
            <p key={i} className="end-msg">
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
