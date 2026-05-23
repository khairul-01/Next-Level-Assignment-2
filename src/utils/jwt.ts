import envConfig from "../config/envIndex";
import { TUserResponse } from "../types/typeIndex";
import jwt from "jsonwebtoken";

export const signToken = (payload: TUserResponse) => {

    const accessToken = jwt.sign(payload, envConfig.jwt_access_secret, {
        expiresIn: "1d"
    });

    const refreshToken = jwt.sign(payload, envConfig.jwt_refresh_secret, {
        expiresIn: "10d"
    })

    return {accessToken, refreshToken}
}