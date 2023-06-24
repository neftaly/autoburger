
# AutoBurger

A burger product configurator to illustrate the seven ideals [Local-first software](https://www.inkandswitch.com/local-first/) using [Automerge Repo](https://github.com/automerge/automerge-repo)


## Illustration
Besides the intrincic motivation that comes from local-first such as data ownership and preservation, security and privacy, offline availability and enormous speed, we here illustrate basic Awareness and Presence in addition to local first collaboration.

## Test it locally

Clone the repo, install its dependencies and run it

```bash
  git clone https://github.com/neftaly/autoburger.git
  cd autoburger
  npm i
  npm run dev
```

Open it. Copy invite link and share it as shown in the video below. 


https://github.com/neftaly/autoburger/assets/11094475/896937ec-7955-466d-83e8-317a961a5a59


* With your computer connected to wifi, take note of how you can tell the mouse position as you edit from one browser on the other and how the changes you make from one browser take effect in the other in real time.
* Turn off your wifi and refresh. Notice how you can still edit your burger even offline and how you can tell from the other browser that you're no longer online since your cursor position is no longer traceable. Also while offline, changes you make from one browser do not reflect on the other anymore.
* Now turn your wifi back on, and see how the changes from all browsers while offline merge magically 😇
    
## How it works

Find a detailed explanation of how it works and it's inspiration in [the blog]() **(Coming soon)**
## Roadmap

- This demo is using a cloud hosted websocket server and a file storage but a fully p2p network adapter is desired. We are looking at hyperswarm-dht holepunch protocal network adapter for automerge. **(Contributions are welcome)**

