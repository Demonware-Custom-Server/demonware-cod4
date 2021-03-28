import net from 'net'
import Logger from '@bwatton/logger'
import BinaryStream from './utils/BinaryStream'

const socket: net.Server = net.createServer()
const logger: Logger = new Logger('Server')

socket.on('data', async (message: Buffer) => {
  const stream = new BinaryStream(message)

  const packetId: number = stream.buffer[0]
})

socket.on('connection', socket => {
  logger.debug(`Got connection from ${socket.remoteAddress}:${socket.remotePort}`)
})

socket.listen(3074, () => logger.debug('Demonware socket running on 3074'))