import { NextFunction, Request, Response } from "express";
import envConfig from "../config/envIndex.js";

const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Internal Server Error!",
        stack: envConfig.node_env === "development" && err instanceof Error ? err.stack : undefined
    })
}

export default globalErrorHandler;