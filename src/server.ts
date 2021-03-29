import net, { Server } from 'net'
import Logger from '@bwatton/logger'
import BinaryStream from './utils/BinaryStream'

const server: Server = net.createServer()
const logger: Logger = new Logger('Server')

server.on('connection', socket => {
  socket.on('data', async (message: Buffer) => {
    const stream = new BinaryStream(message)
    const packetId: number = stream.buffer[0]

    logger.debug(`Got packet: ${packetId}`)

    console.log(stream.buffer)
  })
  logger.debug(`Got connection from ${socket.remoteAddress}:${socket.remotePort}`)
})

server.listen(3074, () => logger.debug('Demonware socket running on 3074'))