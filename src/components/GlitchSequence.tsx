import { useEffect, useState } from "react";
import { config } from "../config";

interface GlitchSequenceProps {
  onComplete: () => void;
}

type Phase =
  | "shake"
  | "glitch"
  | "messages-first"
  | "flash"
  | "final";

export function GlitchSequence({ onComplete }: GlitchSequenceProps) {
  const [phase, setPhase] = useState<Phase>("shake");
  const [visibleLines, setVisibleLines] = useState(0);
  const [showSecondMessages, setShowSecondMessages] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Shake phase: 2s
    timers.push(setTimeout(() => setPhase("glitch"), 2000));

    // Glitch/break phase: 2s
    timers.push(setTimeout(() => setPhase("messages-first"), 4000));

    // First messages fade in line by line
    const firstMessages = config.ending.messagesFirst;
    firstMessages.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), 4000 + (i + 1) * 1200)
      );
    });

    const afterFirstMessages = 4000 + firstMessages.length * 1200 + 800;

    // Flash
    timers.push(setTimeout(() => setPhase("flash"), afterFirstMessages));

    // Final reveal
    timers.push(
      setTimeout(() => {
        setPhase("final");
      }, afterFirstMessages + 300)
    );

    // Show second messages
    timers.push(
      setTimeout(() => {
        setShowSecondMessages(true);
      }, afterFirstMessages + 1500)
    );

    // Complete
    timers.push(
      setTimeout(() => {
        onComplete();
      }, afterFirstMessages + 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`glitch-sequence phase-${phase}`}>
      {/* Scanline overlay */}
      <div className="scanlines" />

      {phase === "shake" && (
        <div className="shake-content">
          <div className="photo-card glitch-photo">
            <img src={config.ending.photo} alt="" />
          </div>
        </div>
      )}

      {phase === "glitch" && (
        <div className="glitch-break">
          <div className="glitch-bars" />
          <div className="glitch-noise" />
        </div>
      )}

      {phase === "messages-first" && (
        <div className="glitch-messages">
          {config.ending.messagesFirst.map((msg, i) => (
            <p
              key={i}
              className={`glitch-msg ${i < visibleLines ? "visible" : ""}`}
            >
              {msg}
            </p>
          ))}
        </div>
      )}

      {phase === "flash" && <div className="flash-white" />}

      {phase === "final" && (
        <div className="final-reveal">
          <div className="final-photo">
            <img src={config.ending.photo} alt="" />
          </div>
          <div className={`final-messages ${showSecondMessages ? "visible" : ""}`}>
            {config.ending.messagesSecond.map((msg, i) => (
              <p key={i} className="final-msg">
                {msg}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
