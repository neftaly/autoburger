// @ts-nocheck
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useDocument } from "automerge-repo-react-hooks";
import { Burger } from "./Burger";
import { Cursors } from "./Cursors";
import { LocalColor, getRandomColor } from "./LocalColor";
import { Editor } from "./Editor";
import { useDocumentId } from "./useDocumentId";
import { Peers } from "./Peers";

// https://github.com/automerge/automerge-repo/pull/45
import { useLocalAwareness } from "./useLocalAwareness";
import { useRemoteAwareness } from "./useRemoteAwareness";
import { useState } from "react";

const App = ({ userId }) => {
  const documentId = useDocumentId((s: any) => {
    s.layers = ["bun", "lettuce", "patty", "bun"];
  });
  const [doc, changeDoc] = useDocument(documentId);
  const [copied, setCopied] = useState(false);

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
        <a
          href="https://github.com/garbo-succus/autoburger"
          style={{
            display: "inline-block",
            color: "black",
            padding: "1rem 1rem 0 1rem",
            fontSize: "2em",
          }}
        >
          Autoburger
        </a>

        <Editor doc={doc} changeDoc={changeDoc} />

        <hr />
        <div
          style={{
            padding: "1rem",
          }}
        >
          <h3>Peers:</h3>
          <LocalColor color={localState.color} />
          <Peers peerStates={peerStates} heartbeats={heartbeats} />
        </div>
      </div>
      <button
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        {copied ? (
          <span>Copied!🥰share it</span>
        ) : (
          <span>Copy invite link</span>
        )}
      </button>

      <Cursors peerStates={peerStates} heartbeats={heartbeats} />
    </div>
  );
};

export default App;
