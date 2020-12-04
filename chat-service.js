'use strict'

const WebSocket = require('ws');

const serverAddress = 'ws://localhost:3000';
let socket = new WebSocket(serverAddress);
let reconnectionInterval = null;

const addHandlers = (ws) => {
  ws.on('message', (str) => {
    service.receive(str);
  })

  ws.on('open', () => {
    clearInterval(reconnectionInterval);
    const msgObj = {
      command: 'register',
      user: 'badik'
    }
    const str = JSON.stringify(msgObj);
    service.send(str)
  })

  ws.on('close', () => {
    reconnect();
    console.log('connection closed');
  })

  ws.on('error', () => {
    console.log("Socket error")
  })
}

addHandlers(socket);

const reconnect = () => {
  reconnectionInterval = setInterval(() => {
    socket = new WebSocket(serverAddress);
    addHandlers(socket);
  }, 1000)
}

const service = {
  connection: socket,
  registerCallback (cb) { this.callback = cb },
  send (str) { this.connection.send(str) },
  receive (str) {
    const data = JSON.parse(str)
    this.callback(data)
  }
};


module.exports = service;
