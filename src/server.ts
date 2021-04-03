import net, { Server } from 'net'
import Logger from '@bwatton/logger'
import { BitStream } from 'bit-buffer'
import { PacketInfo } from './network/PacketInfo'

const hostAddr = '0.0.0.0'
const hostPort = 3074

const server: Server = net.createServer()
const logger: Logger = new Logger('Server')

server.on('connection', socket => {
  socket.on('data', async (message: Buffer) => {
    const stream = new BitStream(message)
    const packetID = stream.readInt8()

    logger.debug(`Got packetID ${packetID}`)

    switch (packetID) {
      case PacketInfo.CLIENT_AUTH_TICKET:
        handleClientAuth(stream)
        break
      default:
        logger.error(`Unhandled packet ${packetID}`)
     }
  })
  logger.debug(`Got connection from ${socket.remoteAddress}:${socket.remotePort}`)
})

function handleClientAuth(stream: BitStream) {
  stream.index = 1
  const randomBoolean = stream.readBoolean()
  const randomNumber = stream.readUint32()
  const gameId = stream.readUint32()
  const ticketLength = stream.readUint32()
  // const ticket = stream.readBits(ticketLength)

  logger.debug(`\nRandom Boolean ${randomBoolean}\nRandom Number ${randomNumber}\nGameID ${gameId}\nTicket Len ${ticketLength}\nTicket $`)
}

server.listen(hostPort, () => logger.debug(`Demonware socket running on ${hostAddr}:${hostPort}`))