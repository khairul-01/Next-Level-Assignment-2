import { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken } from "../../utils/jwt";

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
    const {email, password} = req.body;
    // console.log(email);
    const user = await authService.validateUser(email, password);
    console.log("valid user", user)
    if(!user){
        sendResponse(res, {message: "Invalid email or password"}, 401)
    }

    const {accessToken}  = signToken(user);
    // console.log('accessToken', accessToken)
    const result = {
        token: accessToken,
        user: user
    }

    sendResponse(res, {message: "Login successful", data: result}, 200)

}

export const authController = {
    login,
    signup,
}