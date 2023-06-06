// How close is this peer to reaching the timeout? (0 to 1)
export const getTimeoutProgress = (
  heartbeatTime = 0,
  nowTime = new Date().getTime()
) => 1 - (nowTime - heartbeatTime) / 30000;

// TODO: Re-render every second or so (using nowTime) to fade out cursors
export const Cursors = ({ peerStates = [], heartbeats = [] }) =>
  Object.entries(peerStates).map(
    ([key, { cursor: [x, y] = [0, 0], color = "white" }]) => (
      <div
        key={key}
        style={{
          backgroundColor: color,
          border: `2px solid ${color}`,
          opacity: getTimeoutProgress(heartbeats[key]) * 0.8, // Fade out cursors with old heartbeats
          position: "absolute",
          left: window.innerWidth / 2 + x,
          top: window.innerHeight / 2 + y,
          transition: "top 0.05s linear, left 0.05s linear, opacity 1s linear", // Smooth out cursor & opacity updates
          borderRadius: "1em",
          padding: "0 1px 2px 1px",
        }}
        children="🍔"
      />
    )
  );
