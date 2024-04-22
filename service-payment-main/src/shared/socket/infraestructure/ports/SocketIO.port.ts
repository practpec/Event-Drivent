import { Socket, io } from "socket.io-client";
import { EventsSocket } from "../../domain/entities/event.types";
import { SocketRepository } from "../../domain/repositories/socketRepository";
import { QueueContent } from "../../../broker/domain/entities";

export class SocketIOPort implements SocketRepository {
  constructor(private readonly url: string) {}
  async connect() {
    return new Promise<Socket>((resolve, reject) => {
      try {
        const socket = io(this.url);
        resolve(socket);
      } catch (err: any) {
        reject(err);
      }
    });
  }
  async sendData(eventEmit: EventsSocket, data: QueueContent) {
    try {
      const socket = await this.connect();
      console.log("Informacion para socket:")
      console.log(data)
      socket.emit(eventEmit, data);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
