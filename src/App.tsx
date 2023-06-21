import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useDocument } from "automerge-repo-react-hooks";
import { Burger } from "./Burger";
import { Cursors } from "./Cursors";
import { LocalColor, getRandomColor } from "./LocalColor";
import { Editor } from "./Editor";

// https://github.com/automerge/automerge-repo/pull/45
import { useLocalAwareness } from "./useLocalAwareness";
import { useRemoteAwareness } from "./useRemoteAwareness";

const App = ({ documentId, userId }) => {
  const [doc, changeDoc] = useDocument(documentId);

  const channelId = `${documentId}-useAwareness`;
  const [localState, updateLocalState] = useLocalAwareness(userId, channelId, {
    color: getRandomColor(),
  });
  const [peerStates, heartbeats] = useRemoteAwareness(channelId, {
    localUserId: userId,
  });

  return (
    <div
      onPointerMove={(event) => {
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
        <Burger layers={doc?.layers} />
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
        <LocalColor color={localState.color} />
        <Editor doc={doc} changeDoc={changeDoc} />
      </div>

      <Cursors peerStates={peerStates} heartbeats={heartbeats} />
    </div>
  );
};

export default App;
