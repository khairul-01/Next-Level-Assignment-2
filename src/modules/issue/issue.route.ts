import { Router } from "express";
import { issuesController } from "./issues.controller.js";
import { auth, authorizeRoles } from "../../middleware/auth.js";

const route = Router();

route.post("/issues", auth, authorizeRoles("maintainer","contributor"), issuesController.createIssues);

route.get("/issues/:id", auth, issuesController.getSingleIssue);

route.get("/issues", auth, issuesController.getAllIssues);

route.patch("/issues/:id", auth, issuesController.updateIssue);

route.delete("/issues/:id", auth, authorizeRoles("maintainer"), issuesController.deleteIssue);

export const issueRoute = route;