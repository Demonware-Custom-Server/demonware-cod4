const dgram = require('dgram')
const net = require('net')

const socket = dgram.createSocket('udp4')
const tcpSocket = net.createServer()

socket.on('listening', () => {
  const address = socket.address()
  console.log(`Demonware listening on ${address.address}:${address.port}`)
});

socket.on('connect', client => {
  console.log('New connection from ' + client)
})

socket.on('message', async (message, sInfo) => {
  console.log(`Recieved message from ${sInfo.address}:${sInfo.port}\nMessage: ${message}`)
})

tcpSocket.on('data', data => {
  console.log(`Got data ${data}`)
})

tcpSocket.on('connection', socket => {
  console.log(`Got connection from ${socket.remoteAddress}:${socket.remotePort}`)
})

socket.bind(3074)
tcpSocket.listen(3074, () => console.log('TCP socket running on 3074'))