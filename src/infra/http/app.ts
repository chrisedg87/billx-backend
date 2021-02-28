import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { apiRouter } from "./api/router";

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined"));

app.use("/api", apiRouter);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export { port }