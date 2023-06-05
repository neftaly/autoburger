import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { Burger, toppings } from "./Burger";
import { useDocument } from "automerge-repo-react-hooks";
import { applyChange } from "./util";
import { useLocalAwareness } from "./useLocalAwareness";
import { useRemoteAwareness } from "./useRemoteAwareness";

const Cursors = ({ peerStates = [] }) =>
  Object.values(peerStates).map(
    ({ cursor: [x, y] = [0, 0], color = "white" }, key) => (
      <div
        key={key}
        style={{
          position: "absolute",
          left: window.innerWidth / 2 + x,
          top: window.innerHeight / 2 + y,
          backgroundColor: color,
          border: `2px solid ${color}`,
          borderRadius: "1em",
        }}
        children="🍔"
      />
    )
  );

const App = ({ documentId, userId }) => {
  const [doc, changeDoc] = useDocument(documentId);

  const channelId = `${documentId}-useAwareness`;
  const [localState, updateLocalState] = useLocalAwareness(userId, channelId, {
    color: "#" + Math.floor(Math.random() * 16777215).toString(16), // Generate random color
  });
  const [peerStates, heartbeats] = useRemoteAwareness(channelId, {
    localUserId: userId,
  });

  const layers = doc?.layers ?? ["bun"];
  // const [layers, setLayers] = useState(["bun", "patty", "lettuce", "bun"]);
  return (
    <div
      onMouseMove={(event) => {
        // Local mouse position, relative to center
        const cursor = [
          event.clientX - window.innerWidth / 2,
          event.clientY - window.innerHeight / 2,
        ];
        updateLocalState((state) => ({ ...state, cursor }));
      }}
    >
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "skyblue",
        }}
      >
        <ambientLight intensity={0.5} />
        <Burger layers={layers} />
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.9}
          makeDefault
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          border: "1px solid white",
          width: "auto",
        }}
      >
        {/*<button children='+' onClick={
        () => {
            changeDoc(doc => {
            if (!doc.layers) doc.layers = []
            doc.layers.push('patty')
            })
          }
      } />*/}
        <pre
          children={JSON.stringify({ doc, localState, peerStates }, null, 2)}
        />
      </div>

      <Cursors peerStates={peerStates} />
    </div>
  );
};

export default App;
