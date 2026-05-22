import express, { Application, Request, Response } from "express";

const app: Application = express();

// middleware
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Express World");
})

export default app;