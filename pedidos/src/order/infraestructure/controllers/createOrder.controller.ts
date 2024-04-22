import { Request, Response } from "express";
import { CreateOrderService } from "../../application/services/createOrder.service";

export class CreateOrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}
  async run(req: Request, res: Response) {
    try {
      const order = req.body;
      const result = await this.createOrderService.run(order);
      res.status(201).send(result);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
