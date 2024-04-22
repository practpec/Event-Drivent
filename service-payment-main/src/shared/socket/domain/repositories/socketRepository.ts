import { QueueContent } from "../../../broker/domain/entities";
import { EventsSocket } from "../entities/event.types";

export interface SocketRepository {
  connect(): Promise<any>;
  sendData(eventEmit: EventsSocket , data : QueueContent): Promise<void>;
}
