# AutoBurger

A burger configurator demonstrating [Local-first software](https://www.inkandswitch.com/local-first/) via [Automerge Repo](https://github.com/automerge/automerge-repo)

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

* With your computer connected to wifi, take notice how you can tell the mouse position as you edit from one browser on the other browsers and how the changes you make from one browser take effect in other browsers in real time.
* Turn off your wifi and refresh. Notice how you can still edit your burger when offline and how you can tell from the other browsers that you're no longer online since your cursor position is no longer traceable. Also while offline, the changes you make from one browser do not reflect on the other browsers anymore.
* Now turn your wifi on again, and see how the changes from all browsers while offline merge magically 😇 ( You might have to refresh to experience this. )
    
## How it works

Find a detailed explanation of how it works and it's inspiration in [the blog]() **(Coming soon)**
## Roadmap

- This demo is using a cloud hosted websocket server and a file storage but a fully p2p network adapter (holepunch) is desired. **(Contributions are welcome)**

