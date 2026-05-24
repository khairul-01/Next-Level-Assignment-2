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
    sendResponse(
      res,
      { message: "Failed to create a Issue", error: true },
      400,
    );
    return;
  }
  sendResponse(
    res,
    { message: "Issue created successfully", data: issue },
    201,
  );
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Id: ", id);
    const result = await issueService.getSingleIssueFromDb(id as string);
    if (!result) {
      sendResponse(
        res,
        { message: "Failed to get issue", error: true },
        400,
      );    
    }
    sendResponse(
        res,
        { message: "Issue retrieved successfully", data: result },
        200,
      );
  } catch (error) {
    sendResponse(
      res,
      { message: "Something wrong, Failed to get issue", error: true },
      400,
    );
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string | undefined;
    console.log("sort query ", sort);
    const allIssues = await issueService.getAllIssueFromDb(sort);

    if (!allIssues) {
      sendResponse(
        res,
        { message: "Failed to get issues", error: true },
        400,
      );    
    }
    sendResponse(
        res,
        { message: "Issue retrieved successfully", data: allIssues },
        200,
      );

  } catch (error) {
    sendResponse(
      res,
      { message: "Something wrong, Failed to get issues", error: true },
      400,
    );
  }
}

export const issuesController = {
  createIssues,
  getSingleIssue,
  getAllIssues,
};
