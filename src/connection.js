class Connection {
  constructor() {
    this.local = {};
    this.send = {};
    this.receive = {};
    init();
    return this;
  }

  init() {
    this.local = new RTCPeerConnection(servers);
    this.send = this.local.createDataChannel('sendDataChannel');
  }
}

export default Connection
