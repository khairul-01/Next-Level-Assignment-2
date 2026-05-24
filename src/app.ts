import express, { Application, Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import { logger } from "./middleware/logger.js";
import { issueRoute } from "./modules/issue/issue.route.js";

const app: Application = express();

// middleware
app.use(express.json());

app.use(logger)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Express World");
})

app.use("/api/auth", authRoute);
app.use("/api", issueRoute);

// Global error handling middleware
app.use(globalErrorHandler)

export default app;