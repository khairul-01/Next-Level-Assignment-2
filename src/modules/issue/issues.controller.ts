import { Request, Response } from "express";
import issueService from "./issue.service";
import { sendResponse } from "../../utils/sendResponse";
import { TIssueType } from "../../types/typeIndex";

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
      sendResponse(res, { message: "Failed to get issue", error: true }, 400);
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
    console.log("sorting query: ", sort);
    const allIssues = await issueService.getAllIssueFromDb(sort);

    if (!allIssues) {
      sendResponse(res, { message: "Failed to get issues", error: true }, 400);
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
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, type } = req.body;
    const requesterId = req.user?.id;
    const requesterRole = req.user?.role;
    console.log(id, req.body);
    const existingIssue = await issueService.getSingleIssueFromDb(id as string);
    if (!existingIssue) {
      sendResponse(res, { message: "Failed to get issue", error: true }, 400);
    }

    console.log("Existing issue ", existingIssue);

    const isMaintainer = requesterRole === "maintainer";
    const isOwner = requesterId === existingIssue.reporter.id;
    const isOpen = existingIssue.status === "open";
    console.log(
      "Authentication: ",
      isMaintainer,
      isOwner,
      isOpen,
      typeof requesterId,
      typeof id,
    );
    if (!isMaintainer && (!isOwner || !isOpen)) {
      sendResponse(
        res,
        { message: "Forbidden, you don't have permission", error: true },
        400,
      );
    }

    const updatedIssue = await issueService.patchIssue(
      id as string,
      title,
      description,
      type,
    );

    if (!updateIssue) {
      sendResponse(
        res,
        { message: "Failed to update issue", error: true },
        400,
      );
    }
    sendResponse(
      res,
      { message: "Issue updated successfully", data: updatedIssue },
      200,
    );
  } catch (error) {
    sendResponse(res, { message: "Failed to update issue", error: true }, 400);
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Id: ", id);
    const result = await issueService.removeIssue(id as string);
    if (!result) {
      sendResponse(res, { message: "Failed to delete issue", error: true }, 400);
    }
    sendResponse(
      res,
      { message: "Issue deleted successfully" },
      200,
    );
  } catch (error) {
    sendResponse(
      res,
      { message: "Something wrong, Failed to delete issue", error: true },
      400,
    );
  }
};

export const issuesController = {
  createIssues,
  getSingleIssue,
  getAllIssues,
  updateIssue,
  deleteIssue,
};
