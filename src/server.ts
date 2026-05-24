import app from "./app.js"
import envConfig from "./config/envIndex.js";
import { initDB } from "./db/dbIndex.js";

const main = async () => {
    initDB();
    app.listen(envConfig.port, () => {
        console.log(`Server is running on port, ${envConfig.port}`)
    })
}

main();