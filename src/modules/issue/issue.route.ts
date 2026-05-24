import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth, authorizeRoles } from "../../middleware/auth";

const route = Router();

route.post("/issues", auth, authorizeRoles("maintainer","contributor"), issuesController.createIssues);

route.get("/issues/:id", issuesController.getSingleIssue);

route.get("/issues", issuesController.getAllIssues);

export const issueRoute = route;