import { QueueContent } from "../../../broker/domain/entities";
import { EventsSocket } from "../../domain/entities/event.types";
import { SocketRepository } from "../../domain/repositories/socketRepository";

export class SendDataService {
  constructor(private readonly socketRepository: SocketRepository) {}
  async run(eventEmit: EventsSocket, data: QueueContent) {
    try {
      await this.socketRepository.sendData(eventEmit, data);
      console.log("Informacion enviada Correctamente");
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
