import app from "./app"
import envConfig from "./config/envIndex";

const main = async () => {
    app.listen(envConfig.port, () => {
        console.log(`Server is running on port, ${envConfig.port}`)
    })
}

main();