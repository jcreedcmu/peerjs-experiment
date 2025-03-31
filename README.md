PeerJs Experiment
=================

I just wanted to quickly validate that the peerjs api worked for me in
practice.

The experiment was:

1. `make deploy` to publish to `deploy` branch which makes github actions
   publish to https://jcreedcmu.github.io/peerjs-experiment
2. Go to that page, go into the console, set `localStorage.isServer = true`
3. Reload. Now I should have a "server" peer
4. Get a friend on a different network to also go to the same page,
   and ask them to click the Connect button, then the Send button
5. See that I the "server" get some messages from them, and that they
   the "client" get some responses.
   (the "server" and "client" roles are really only relevant in that the
    server makes the pong in response to the ping)
