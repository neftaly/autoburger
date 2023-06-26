import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Repo} from "automerge-repo";
// import { BroadcastChannelNetworkAdapter } from "automerge-repo-network-broadcastchannel";
import {BrowserWebSocketClientAdapter} from "automerge-repo-network-websocket";
import {LocalForageStorageAdapter} from "automerge-repo-storage-localforage";
import {RepoContext} from "automerge-repo-react-hooks";
import {v4} from 'uuid';

const repo = new Repo({
    network: [
       new BrowserWebSocketClientAdapter("wss://kwjh7g-3030.csb.app"),
        // new BroadcastChannelNetworkAdapter(), // Local only networking (tab-to-tab)
    ],
    storage: new LocalForageStorageAdapter(),
});

const userId = v4(); // Create a random userId (v4 UUID)
const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
    <RepoContext.Provider value={repo}>
        <React.StrictMode>
            <App userId={userId}/>
        </React.StrictMode>
    </RepoContext.Provider>
);
