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

const rootDocId = (() => {
  // To reset, comment out the following line and reload
  if (localStorage.rootDocId) return localStorage.rootDocId;
  const handle = repo.create();
  // Initial state
  handle.change((s) => {
    s.layers = ["bun", "lettuce", "patty", "bun"];
  });
  localStorage.rootDocId = handle.documentId;
  return handle.documentId;
})();

const userId = v4();

ReactDOM.createRoot(document.getElementById("root")).render(
  <RepoContext.Provider value={repo}>
    <React.StrictMode>
      <App documentId={rootDocId} userId={userId} />
    </React.StrictMode>
  </RepoContext.Provider>
);
