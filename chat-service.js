'use strict'

const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000');

const service = {
  connection: socket,
  registerCallback (cb) { this.callback = cb },
  send (str) { this.connection.send(str) },
  receive (str) {
    const data = JSON.parse(str)
    console.log(data)
    this.callback(data)
  }
};

socket.on('message', (str) => {
  console.log(str)
  service.receive(str)
})

socket.on('open', () => {
  const msgObj = {
    command: 'register',
    user: 'badik'
  }
  const str = JSON.stringify(msgObj);
  service.send(str)
})

module.exports = service;
