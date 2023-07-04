# Autoburger

This is a multiplayer burger configurator, intended to demonstrate [local-first software](https://www.inkandswitch.com/local-first/) via [automerge-repo](https://github.com/automerge/automerge-repo).

[Try it out](https://garbo-succus.github.io/autoburger/) and share the invite link with anyone else over the internet!

## Test it locally

Clone the repo, install its dependencies and run it:

```bash
  git clone https://github.com/neftaly/autoburger.git
  cd autoburger
  npm i
  npm run dev
```

Open it, copy the invite link, and try it in another window.

## Tutorial

Find a detailed explanation of how Autoburger works, please visit [jermsams' blog](). **(Coming soon)**

## Server

This demo handles sync using a cloud-hosted automerge-repo-sync-server instance. You can start your own server [on codesandbox](https://codesandbox.io/p/github/neftaly/automerge-repo/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clj63vvah005i2a75hbu66fhq%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clj63vvah005k2a75z07i2uyh%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clj63vvah005i2a75hbu66fhq%2522%253A%257B%2522id%2522%253A%2522clj63vvah005i2a75hbu66fhq%2522%252C%2522activeTabId%2522%253A%2522cljnvy4ii008e2a75x35u6cix%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252F.codesandbox%252FDockerfile%2522%252C%2522id%2522%253A%2522clj8uvj6v008j2a75jds54q6u%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpackages%252Fautomerge-repo-sync-server%252Fsrc%252Findex.js%2522%252C%2522id%2522%253A%2522cljnvy4ii008e2a75x35u6cix%2522%252C%2522mode%2522%253A%2522temporary%2522%257D%255D%257D%252C%2522clj63vvah005k2a75z07i2uyh%2522%253A%257B%2522id%2522%253A%2522clj63vvah005k2a75z07i2uyh%2522%252C%2522activeTabId%2522%253A%2522clj63y5aa008q2a75z9dv1ocr%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clj63vvah005j2a75sw8psh6m%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start-app%2522%257D%252C%257B%2522id%2522%253A%2522clj63y5aa008q2a75z9dv1ocr%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522port%2522%253A3030%252C%2522taskId%2522%253A%2522start-app%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A20.010295126973233%257D).

## Demo video

https://github.com/garbo-succus/autoburger/assets/11094475/896937ec-7955-466d-83e8-317a961a5a59

* With your computer connected to wifi, take notice how you can tell the mouse position as you edit from one browser on the other browsers and how the changes you make from one browser take effect in other browsers in real time.
* Turn off your wifi and refresh. Notice how you can still edit your burger when offline and how you can tell from the other browsers that you're no longer online since your cursor position is no longer traceable. Also while offline, the changes you make from one browser do not reflect on the other browsers anymore.
* Now turn your wifi on again, and see how the changes from all browsers while offline merge magically 😇 ( You might have to refresh to experience this. )
    