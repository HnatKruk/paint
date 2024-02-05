const express = require('express')
const cors = require('cors')
const router = require('./router')

const PORT = process.env.PORT || 4000
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Встановлюємо конкретний домен, або '*' для дозволу всіх доменів
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', router)

app.ws('/', (ws, req) => {
  ws.on('headers', (headers) => {
    headers.push('Access-Control-Allow-Origin: *');
    headers.push('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  });

  ws.on('message', (msg) => {
    msg = JSON.parse(msg)
    switch (msg.method) {
      case 'connection':
        connectionHandler(ws, msg)
        break
    
      case 'draw':
        broadcastConnection(ws, msg)
    }
  })
})

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg))
    }
  })
}

const connectionHandler = (ws, msg) => {
  ws.id = msg.id
  broadcastConnection(ws, msg)
}

app.listen(PORT, (err) => console.log(err ? `Error: ${err}` : `Server is running ot port ${PORT}`))
