import { Peer, DataConnection } from "peerjs";

const serverId = "server-91d015d7-265f-4a18-98db-0905883a1d4c";

function log(str: string) {
  document.getElementById('log')!.appendChild(document.createTextNode(str + '\n'));
}

function getPeer() {
  const options = { debug: 3 };
  if (localStorage.isServer) {
    return new Peer(serverId, options);
  }
  else {
    return new Peer(options);
  }
}
function go() {
  const peer = getPeer();
  peer.on('open', () => {
    log(`initialized peer, my id is ${peer.id}`);
  });

  var gconn: undefined | DataConnection = undefined;

  peer.on('connection', conn => {
    gconn = conn;
    console.log('got connection!');
    conn.on('data', data => {
      console.log('got data!');
      log('got:' + data);
      if (localStorage.isServer) {
        conn.send('response');
        console.log('sent response');
      }
    });
    conn.on('close', () => { log('closed'); });
    conn.on('iceStateChanged', () => { log('iceStateChanged'); });
  });

  const connectButton = document.getElementById('connectButton')!;
  const sendButton = document.getElementById('sendButton')!;


  connectButton.onmousedown = () => {
    gconn = peer.connect(serverId, { reliable: true });
    gconn.on('data', (data) => {
      const dataStr = data as any as string;
      log('got a message: ' + dataStr);
    });
    gconn.on('open', () => {
      log('channel opened');
    });
    setInterval(() => { console.log(gconn); }, 5000);
  };

  sendButton.onmousedown = () => {
    if (gconn == undefined) {
      log('connection not open');
    }
    else {
      gconn.send('some arbitrary message');
    }
  };


}

setTimeout(go, 0);
