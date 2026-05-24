import dotenv from "dotenv";
import { env } from "process";

dotenv.config({quiet:true});

const envConfig = {
    port: env.PORT || 5000,
    database_url: env.DATABASE_URL as string,
    node_env: env.NODE_ENV as string,
    jwt_access_secret: env.JWT_ACCESS_SECRET as string,
    jwt_refresh_secret: env.JWT_REFRESH_SECRET as string
}

export default envConfig;