import express, { Application, Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { logger } from "./middleware/logger";
import { issueRoute } from "./modules/issue/issue.route";

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