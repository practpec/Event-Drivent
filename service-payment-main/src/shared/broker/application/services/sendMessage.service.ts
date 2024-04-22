import { QueueContent, QueueName, QueueRequest } from "../../domain/entities";
import { BrokerRepository } from "../../domain/repository/BrokerRepository";

export class SendMessageService {
  constructor(private readonly brokerRepository: BrokerRepository) {}
  async run(data: QueueContent, queueName: QueueName) {
    try {
      const reqQueue: QueueRequest = {
        queueName: queueName,
        content: data,
      };
      console.log(reqQueue)
      await this.brokerRepository.sendMessageToChannel(reqQueue);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
