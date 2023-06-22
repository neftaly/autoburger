import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {DocumentId, Repo} from "automerge-repo";
// import { BroadcastChannelNetworkAdapter } from "automerge-repo-network-broadcastchannel";
import {BrowserWebSocketClientAdapter} from "automerge-repo-network-websocket";
import {LocalForageStorageAdapter} from "automerge-repo-storage-localforage";
import {RepoContext} from "automerge-repo-react-hooks";
import {v4} from 'uuid';

const repo = new Repo({
    network: [
        // This server is hosted at https://codesandbox.io/p/github/neftaly/automerge-repo/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clj63vvah005i2a75hbu66fhq%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clj63vvah005k2a75z07i2uyh%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clj63vvah005i2a75hbu66fhq%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpackages%252Fautomerge-repo-sync-server%252Fsrc%252Findex.js%2522%252C%2522id%2522%253A%2522clj63t4gb00au2a759gr5lpli%2522%252C%2522mode%2522%253A%2522temporary%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clj63vvah005i2a75hbu66fhq%2522%252C%2522activeTabId%2522%253A%2522clj63t4gb00au2a759gr5lpli%2522%257D%252C%2522clj63vvah005k2a75z07i2uyh%2522%253A%257B%2522id%2522%253A%2522clj63vvah005k2a75z07i2uyh%2522%252C%2522activeTabId%2522%253A%2522clj63y5aa008q2a75z9dv1ocr%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clj63vvah005j2a75sw8psh6m%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start-app%2522%257D%252C%257B%2522id%2522%253A%2522clj63y5aa008q2a75z9dv1ocr%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522port%2522%253A3030%252C%2522taskId%2522%253A%2522start-app%2522%252C%2522path%2522%253A%2522%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D
        new BrowserWebSocketClientAdapter("wss://kwjh7g-3030.csb.app"),
        // new BroadcastChannelNetworkAdapter(), // Local only networking (tab-to-tab)
    ],
    storage: new LocalForageStorageAdapter(),
});

// Get a key from a query-param-style hash URL
const getHashValue = (key: string) => {
    const {hash} = window.location;
    const matches = hash.match(new RegExp(`${key}=([^&]*)`));
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
    handle.change((s: any) => {
        s.layers = ["bun", "lettuce", "patty", "bun"];
    });
    return handle.documentId;
})();

window.location.hash = `id=${rootDocId}`;

// Prevent hash changes once the doc is loaded
addEventListener("hashchange", (/*event*/) => {
    if (getHashValue("id") !== rootDocId)
        window.location.hash = `id=${rootDocId}`;
});

const userId = v4(); // Create a random userId (v4 UUID)
const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
    <RepoContext.Provider value={repo}>
        <React.StrictMode>
            <App documentId={rootDocId} userId={userId}/>
        </React.StrictMode>
    </RepoContext.Provider>
);
