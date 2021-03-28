import dgram from 'dgram'
import net from 'net'
import Logger from '@bwatton/logger'

const socket = dgram.createSocket('udp4')
const tcpSocket = net.createServer()

const logger: Logger = new Logger('Server')


socket.on('listening', () => {
  const address = socket.address()
  logger.debug(`Demonware listening on ${address.address}:${address.port}`)
});

socket.on('connect', client => {
  logger.debug('New connection from ' + client)
})

socket.on('message', async (message, sInfo) => {
  logger.debug(`Recieved message from ${sInfo.address}:${sInfo.port}\nMessage: ${message}`)
})

tcpSocket.on('data', data => {
  logger.debug(`Got data ${data}`)
})

tcpSocket.on('connection', socket => {
  logger.debug(`Got connection from ${socket.remoteAddress}:${socket.remotePort}`)
})

socket.bind(3074)
tcpSocket.listen(3074, () => logger.debug('TCP socket running on 3074'))