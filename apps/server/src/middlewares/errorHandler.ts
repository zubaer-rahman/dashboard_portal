// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  res.status(500).send("Something went wrong!");
};

export default errorHandler;
