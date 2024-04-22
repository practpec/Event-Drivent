import { SendMessageService } from "../../shared/broker/application/services/sendMessage.service";
import { AmqpLibPort } from "../../shared/broker/infraestructure/ports/AmqpLib";
import { CreatePaymentService } from "../application/services/createPayment.service";
import { SocketIOPort } from "../../shared/socket/infraestructure/ports/SocketIO.port";
import { SendDataService } from "../../shared/socket/application/services/sendData.service";
import { CreatePaymentController } from "./controllers/CreatePayment.controller";

const socketIoPort = new SocketIOPort("http://52.22.232.79:4000");
const amqplLib = new AmqpLibPort("amqp://52.21.220.174/");

const sendMessageService = new SendMessageService(amqplLib);
const sendDataService = new SendDataService(socketIoPort)

 const createPaymentService = new CreatePaymentService(
  sendMessageService,
  sendDataService
);

export const createPaymentController = new CreatePaymentController(createPaymentService)
