import { Router } from "express";
import { authController } from "./auth.controller.js";

const route = Router();

route.post("/signup", authController.signup);
route.post("/login", authController.login );

export const authRoute = route;