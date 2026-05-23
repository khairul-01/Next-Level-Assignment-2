import express, { Application, Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

// middleware
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Express World");
})

app.use("/api/auth", authRoute)

// Global error handling middleware
app.use(globalErrorHandler)

export default app;