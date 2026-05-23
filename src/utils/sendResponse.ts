import { Response } from "express";

export const sendResponse = <T>(res: Response, {
    message, data, error
}: {
    message: string, data?: T, error?: boolean
},
statusCode = 200
) => {
    res.status(statusCode).json({
        success: error?false:true,
        message: message,
        data: error ? undefined : data
    })
}