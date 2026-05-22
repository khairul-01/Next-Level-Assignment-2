import app from "./app"
import envConfig from "./config/envIndex";
import { initDB } from "./db/dbIndex";

const main = async () => {
    initDB();
    app.listen(envConfig.port, () => {
        console.log(`Server is running on port, ${envConfig.port}`)
    })
}

main();