import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth, authorizeRoles } from "../../middleware/auth";

const route = Router();

route.post("/issues", auth, authorizeRoles("maintainer"), issuesController.createIssues)

export const issueRoute = route;