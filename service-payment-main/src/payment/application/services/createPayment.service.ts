import { SendMessageService } from "../../../shared/broker/application/services/sendMessage.service";
import {
  QueueName,
  QueueResponse,
} from "../../../shared/broker/domain/entities";
import { SendDataService } from "../../../shared/socket/application/services/sendData.service";
import { EventsSocket } from "../../../shared/socket/domain/entities/event.types";

export class CreatePaymentService {
  constructor(
    private readonly sendMessageService: SendMessageService,
    private readonly sendDataService: SendDataService
  ) {}
  async run(order: any): Promise<void> {
    try {
      const payment = {
        title: `payment Id de orden ${order?.id_order} y con producto: ${order?.Name} fue creado, precio: ${order?.price} y cantidad ${order?.cant}`,
        ...order,
      };
      await this.sendDataService.run(EventsSocket.SEND_DATA, payment);
      await this.sendMessageService.run(payment, QueueName.PAYMENT);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
