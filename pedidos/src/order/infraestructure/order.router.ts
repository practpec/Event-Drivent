import { Router } from "express";
import { createOrderController } from "./dependencies";

const orderRouter = Router();

orderRouter.post("/", createOrderController.run.bind(createOrderController));

export default orderRouter;
