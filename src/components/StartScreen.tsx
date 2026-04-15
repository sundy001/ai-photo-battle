import { config } from "../config";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="start-title">{config.title}</h1>
        <p className="start-tagline">{config.tagline}</p>
        <button className="start-button" onClick={onStart}>
          Start
        </button>
      </div>
    </div>
  );
}
