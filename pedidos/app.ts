import express from "express";
import cors from "cors";
import indexRouter from "./src/shared/broker/infraestructure/index.router";

const app = express();
const PORT = process.env.PORT || "3000";

app.disable("x-powered-by");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
