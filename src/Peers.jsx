import { useEffect, useState } from "react";

export const Peer = ({ color, heartbeat = 0, nowTime }) => (
  <div style={{ backgroundColor: color }}>
    <span
      style={{
        opacity: (1 - (nowTime - heartbeat) / 30000) * 0.8, // Fade out cursors with old heartbeats
      }}
      children="🍔"
    />{" "}
    {color}
  </div>
);

export const Peers = ({ peerStates = [], heartbeats = [] }) => {
  // Update peer timeout every second
  const [nowTime, setNowTime] = useState(new Date().getTime());
  useEffect(() => {
    const timer = setInterval(() => setNowTime(new Date().getTime()), 1000);
    return () => void clearInterval(timer);
  }, []);
  return (
    <div>
      {Object.entries(peerStates).map(([key, { color }]) => (
        <Peer
          key={key}
          color={color}
          heartbeat={heartbeats[key]}
          nowTime={nowTime}
        />
      ))}
    </div>
  );
};
