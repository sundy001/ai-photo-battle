import { config } from "../config";

export function EndScreen() {
  return (
    <div className="end-screen">
      <div className="scanlines" />
      <div className="end-content">
        <div className="end-photo">
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
