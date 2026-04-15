import { useEffect, useRef, useState } from "react";
import { config } from "../config";
import gsap from "gsap";
import { Application, Assets, Sprite } from "pixi.js";
import { GlitchFilter, RGBSplitFilter } from "pixi-filters";

interface GlitchSequenceProps {
  onComplete: () => void;
}

export function GlitchSequence({ onComplete }: GlitchSequenceProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"glitch" | "messages" | "final">("glitch");
  const [visibleLines, setVisibleLines] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [showSecondMessages, setShowSecondMessages] = useState(false);
  const pixiRef = useRef<Application | null>(null);

  // PixiJS glitch effect
  useEffect(() => {
    if (phase !== "glitch" || !canvasRef.current) return;

    let app: Application;
    let tl: gsap.core.Timeline;
    let cancelled = false;

    async function initPixi() {
      const texture = await Assets.load(config.ending.photo);
      if (cancelled) return;

      // Calculate canvas size preserving aspect ratio, fitting within 300px wide
      const canvasWidth = 300;
      const aspectRatio = texture.height / texture.width;
      const canvasHeight = Math.round(canvasWidth * aspectRatio);

      app = new Application();
      await app.init({
        width: canvasWidth,
        height: canvasHeight,
        backgroundAlpha: 0,
        resizeTo: undefined,
      });
      if (cancelled) { app.destroy(true); return; }

      // Clear any previous canvas (StrictMode double-mount)
      const wrapper = canvasRef.current!;
      while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);

      pixiRef.current = app;
      wrapper.appendChild(app.canvas);

      const sprite = new Sprite(texture);
      sprite.width = canvasWidth;
      sprite.height = canvasHeight;
      sprite.x = 0;
      sprite.y = 0;

      const rgbFilter = new RGBSplitFilter({
        red: { x: 0, y: 0 },
        green: { x: 0, y: 0 },
        blue: { x: 0, y: 0 },
      });
      const glitchFilter = new GlitchFilter({
        slices: 0,
        offset: 15,
        direction: 0,
        fillMode: 1, // ORIGINAL — fills offset gaps with the original image
      });

      sprite.filters = [rgbFilter, glitchFilter];
      app.stage.addChild(sprite);

      function rand(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      // GSAP timeline for glitch animation
      tl = gsap.timeline({ repeat: -1 });

      // Shake the sprite
      tl.to(sprite, {
        duration: 0.1,
        x: rand(-10, 10),
        y: rand(-8, 8),
        ease: "steps(1)",
        repeat: 5,
        yoyo: true,
      });

      // RGB split burst
      tl.to(rgbFilter.red, {
        duration: 0.15,
        x: rand(-20, 20),
        y: rand(-15, 15),
      }, "<");
      tl.to(rgbFilter.blue, {
        duration: 0.15,
        x: rand(-20, 20),
        y: rand(-10, 10),
        onComplete: () => {
          glitchFilter.slices = 20;
          glitchFilter.direction = rand(-75, 75);
        },
      }, "<0.05");
      tl.to(rgbFilter.green, {
        duration: 0.15,
        x: rand(-15, 15),
        y: rand(-15, 15),
      }, "<0.05");

      // Intensify
      tl.to(rgbFilter.red, {
        duration: 0.1,
        x: rand(-25, 25),
        y: rand(-20, 20),
        onComplete: () => {
          glitchFilter.slices = 15;
          glitchFilter.direction = rand(-90, 90);
        },
      });
      tl.to(rgbFilter.blue, {
        duration: 0.08,
        x: rand(-25, 25),
        y: rand(-15, 15),
      }, "<");

      // Reset briefly
      tl.to([rgbFilter.red, rgbFilter.green, rgbFilter.blue], {
        duration: 0.02,
        x: 0,
        y: 0,
        onComplete: () => {
          glitchFilter.slices = 0;
          glitchFilter.direction = 0;
        },
      });

      // Another burst
      tl.to(rgbFilter.red, {
        duration: 0.12,
        x: rand(-30, 30),
        y: rand(-20, 20),
        onComplete: () => {
          glitchFilter.slices = 25;
          glitchFilter.direction = rand(-60, 60);
        },
      });
      tl.to(rgbFilter.green, {
        duration: 0.1,
        x: rand(-20, 20),
        y: rand(-20, 20),
      }, "<0.03");

      // Reset
      tl.to([rgbFilter.red, rgbFilter.green, rgbFilter.blue], {
        duration: 0.01,
        x: 0,
        y: 0,
        onComplete: () => {
          glitchFilter.slices = 0;
        },
      });

      // After ~4s of glitching, move to messages
      gsap.delayedCall(4, () => {
        tl.kill();
        // Fade out canvas
        gsap.to(canvasRef.current, {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            app.destroy(true);
            pixiRef.current = null;
            setPhase("messages");
          },
        });
      });
    }

    initPixi();

    return () => {
      cancelled = true;
      tl?.kill();
      if (pixiRef.current) {
        pixiRef.current.destroy(true);
        pixiRef.current = null;
      }
    };
  }, [phase]);

  // Messages phase with GSAP
  useEffect(() => {
    if (phase !== "messages") return;

    const firstMessages = config.ending.messagesFirst;
    const tl = gsap.timeline();

    // Fade in each line
    firstMessages.forEach((_, i) => {
      tl.call(() => setVisibleLines(i + 1), [], i * 1.2 + 0.5);
    });

    // After all first messages, flash and go to final
    tl.call(
      () => setPhase("final"),
      [],
      firstMessages.length * 1.2 + 2
    );

    return () => { tl.kill(); };
  }, [phase]);

  // Final phase
  useEffect(() => {
    if (phase !== "final") return;

    setShowFlash(true);
    const tl = gsap.timeline();
    tl.call(() => setShowFlash(false), [], 0.3);
    tl.call(() => setShowSecondMessages(true), [], 1.5);
    tl.call(() => onComplete(), [], 3);

    return () => { tl.kill(); };
  }, [phase]);

  return (
    <div className="glitch-sequence">
      <div className="scanlines" />

      {phase === "glitch" && (
        <div className="glitch-canvas-wrapper" ref={canvasRef} />
      )}

      {phase === "messages" && (
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

      {phase === "final" && (
        <>
          {showFlash && <div className="flash-white" />}
          <div className="final-reveal visible">
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
        </>
      )}
    </div>
  );
}
