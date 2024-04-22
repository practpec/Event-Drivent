import { SendMessageService } from "../../../shared/broker/application/services/sendMessage.service";
import { QueueName } from "../../../shared/broker/domain/entities";
import { OrderInterface } from "../../domain/entities/order";

export class CreateOrderService {
  constructor(private readonly sendMessageService: SendMessageService) {}
  async run(order: OrderInterface): Promise<OrderInterface> {
    try {
      await this.sendMessageService.run(order, QueueName.SEDNQUEUE);
      return order;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
