import { MathUtils } from "three";
import { useEffect, useState } from "react";

export const Cursor = ({
  offset: [x, y] = [0, 0],
  color,
  heartbeat = 0,
  nowTime,
}) => (
  <div
    style={{
      position: "absolute",
      opacity: (1 - (nowTime - heartbeat) / 30000) * 0.8, // Fade out cursors with old heartbeats
      border: `2px solid ${color}`,
      backgroundColor: color,
      transition: "top 0.05s linear, left 0.05s linear, opacity 0.95s linear", // Smooth out cursor & opacity updates
      borderRadius: "1em",
      padding: "0 1px 2px 1px",
      transform: "translate(-50%, -50%)", // Center icon on cursor position
      // Position cursor relative to center; don't let cursors go offscreen
      top: MathUtils.clamp(window.innerHeight / 2 + y, 0, window.innerHeight),
      left: MathUtils.clamp(window.innerWidth / 2 + x, 0, window.innerWidth),
    }}
    children="🍔"
  />
);

export const Cursors = ({
  peerStates = [],
  heartbeats = [],
}) => {
  // Update cursor timeout every second
  const [nowTime, setNowTime] = useState(new Date().getTime());
  useEffect(() => {
    const timer = setInterval(() => setNowTime(new Date().getTime()), 1000);
    return () => void clearInterval(timer);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
      children={Object.entries(peerStates).map(([key, { cursor, color }]) => (
        <Cursor
          key={key}
          offset={cursor}
          color={color}
          heartbeat={heartbeats[key]}
          nowTime={nowTime}
        />
      ))}
    />
  );
};
