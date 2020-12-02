'use strict'

const service = require('./chat-service')

const income = (msg) => { console.log(msg) };

service.registerCallback(income);

process.stdin.on('data', (str) => {
  const msg = {
    user: 'skillzor',
    command: 'message',
    payload: {
      date: new Date().toLocaleTimeString(),
      message: str.toString('utf-8'),
      side: 'income'
    }

  }
  str = JSON.stringify(msg)
  console.log(str)
  service.send(str)
});