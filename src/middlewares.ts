import { Request, Response, NextFunction } from "express";

function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

const validateRegion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  next();
};
const validateServant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, regionId, phone } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  if (!regionId) {
    return res.status(400).json({ error: "regionId is required" });
  }
  if (!phone) {
    return res.status(400).json({ error: "phone is required" });
  }
  next();
};

const validateChild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, regionId, dadPhone, momPhone, age, address } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  if (!regionId) {
    return res.status(400).json({ error: "regionId is required" });
  }
  if (!dadPhone) {
    return res.status(400).json({ error: "dadPhone is required" });
  }
  if (!momPhone) {
    return res.status(400).json({ error: "momPhone is required" });
  }
  if (!age) {
    return res.status(400).json({ error: "age is required" });
  }
  if (!address) {
    return res.status(400).json({ error: "address is required" });
  }
  next();
};

export {
  notFound,
  errorHandler,
  validateRegion,
  validateServant,
  validateChild,
};
