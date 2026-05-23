import envConfig from "../config/envIndex";
import { TUserResponse } from "../types/typeIndex";
import jwt, { JwtPayload } from "jsonwebtoken";

export const signToken = (payload: TUserResponse) => {

    const accessToken = jwt.sign(payload, envConfig.jwt_access_secret, {
        expiresIn: "1d"
    });

    const refreshToken = jwt.sign(payload, envConfig.jwt_refresh_secret, {
        expiresIn: "10d"
    })

    return {accessToken, refreshToken}
}

export const verifyToken = (token: string, type: "access" | "refresh") => {
    const secret = type === "refresh" ? envConfig.jwt_refresh_secret : envConfig.jwt_access_secret;

    const decoded = jwt.verify(token, secret) as JwtPayload;
    // console.log("decoded ", decoded)
    return decoded;
}