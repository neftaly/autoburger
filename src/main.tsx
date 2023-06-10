import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Repo } from "automerge-repo";
import { BroadcastChannelNetworkAdapter } from "automerge-repo-network-broadcastchannel";
// import {BrowserWebSocketClientAdapter} from "automerge-repo-network-websocket"
// import {
//   LocalFirstRelayNetworkAdapter
// } from 'automerge-repo-network-localfirstrelay'
import { LocalForageStorageAdapter } from "automerge-repo-storage-localforage";
import { RepoContext } from "automerge-repo-react-hooks";
import { v4 } from "uuid";

const repo = new Repo({
  network: [
    new BroadcastChannelNetworkAdapter(),
    // new BrowserWebSocketClientAdapter("ws://localhost:3030")
    // new LocalFirstRelayNetworkAdapter ('ws://localhost:8080')
    // new LocalFirstRelayNetworkAdapter("wss://local-first-relay.glitch.me/")
  ],
  storage: new LocalForageStorageAdapter(),
});

// Get a key from a query-param-style hash URL
const getHashValue = (key: string) => {
  const { hash } = window.location;
  var matches = hash.match(new RegExp(`${key}=([^&]*)`));
  return matches ? matches[1] : undefined;
};

// Get Automerge document ID
const rootDocId = (() => {
  // Lookup existing document ID
  const idFromHash = getHashValue("id");
  if (idFromHash) return idFromHash as DocumentId;
  // Create a new document
  const handle = repo.create();
  // Set initial state
  handle.change((s) => {
    s.layers = ["bun", "lettuce", "patty", "bun"];
  });
  return handle.documentId;
})();

window.location.hash = `id=${rootDocId}`;

// Prevent hash changes once the doc is loaded
addEventListener("hashchange", (event) => {
  if (getHashValue("id") !== rootDocId)
    window.location.hash = `id=${rootDocId}`;
});

const userId = v4(); // Create a random userId (v4 UUID)

ReactDOM.createRoot(document.getElementById("root")).render(
  <RepoContext.Provider value={repo}>
    <React.StrictMode>
      <App documentId={rootDocId} userId={userId} />
    </React.StrictMode>
  </RepoContext.Provider>
);
