import dotenv from "dotenv";
import { env } from "process";

dotenv.config({quiet:true});

const envConfig = {
    port: env.PORT,
}

export default envConfig;