import dotenv from "dotenv";
import { env } from "process";

dotenv.config({quiet:true});

const envConfig = {
    port: env.PORT,
    database_url: env.DATABASE_URL as string,
    node_env: env.NODE_ENV as string
}

export default envConfig;