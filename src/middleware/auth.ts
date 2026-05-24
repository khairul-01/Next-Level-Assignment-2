import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse.js";
import { verifyToken } from "../utils/jwt.js";
import { pool } from "../db/dbIndex.js";
import { TRole } from "../types/typeIndex.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        // console.log("auth token", token)
        if(!token) {
            return sendResponse(res, {message: "Access token is missing", error: true},401)
        }

        const payload = verifyToken(token, "access");
        // console.log("user's info", payload)
        if(!payload) {
            return sendResponse(res, {message: "Invalid access token", error:true},401)
        }

        const userData = await pool.query( `
        SELECT * FROM users WHERE email=$1
            `,[payload.email]);
        // console.log("user's data", userData.rows[0])
        if(userData.rows.length === 0) {
            return sendResponse(res, {message:"User not found", error:true}, 404);
        }
        const user = userData.rows[0];
        // console.log("user ", user)
        req.user = user;

        next();

    } catch (error) {
        next(error)
    }
}

export const authorizeRoles = (...roles: TRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) {
            return sendResponse(res, {message:"Unauthorized", error:true},401)
        }

        if(!roles.includes(req.user.role)) {
            return sendResponse(res, {message:"Forbidden - you don't have permission", error:true},403)
        }

        return next();
    }
}