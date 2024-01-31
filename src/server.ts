import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import router from "./services/router";
import * as middlewares from "./middlewares"; // Import named exports from middlewares

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use(middlewares.notFound);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  middlewares.errorHandler(err, req, res, next);
});

export default app;
