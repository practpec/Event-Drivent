import { Router, Request, Response } from "express";
import orderRouter from "../../../order/infraestructure/order.router";

const prefijo = "/api";
const indexRouter = Router();

indexRouter.use(`${prefijo}/pedidos`, orderRouter);

indexRouter.get(prefijo, (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

export default indexRouter;
