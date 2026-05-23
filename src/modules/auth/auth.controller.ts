import { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const signup = async(req: Request, res: Response) => {
    const user = await authService.createUser(req.body);
    // console.log(user)
    if(!user){
        sendResponse(res, {message: "Failed to create user"}, 400);
        return
    }
    sendResponse(res, {message: "User registered successfully", data: user}, 201);
}

const login = async(req: Request, res: Response) => {

}

export const authController = {
    login,
    signup,
}