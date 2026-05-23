import { Request, Response } from "express";
import issueService from "./issue.service";
import { sendResponse } from "../../utils/sendResponse";

const createIssues = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;
  // console.log("issue body", req.body)
  const reporter_id = req.user?.id;
  // console.log("reporter ",reporter_id)

  const issue = await issueService.createIssueIntoDB({
    title,
    description,
    type,
    reporter_id,
  });
  // console.log("create issue ", issue)
  if (!issue) {
    sendResponse(res, { message: "Failed to create a Issue" }, 400);
    return;
  }
  sendResponse(
    res,
    { message: "Issue created successfully", data: issue },
    201,
  );
};

export const issuesController = {
  createIssues,
};
