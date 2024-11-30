import { connetDb } from "./src/database/index.js"
import { bot } from "./src/bot.js"

const bootstrap = async () => {
    try {
        await connetDb()
        bot.start()
    } catch (error) {
        console.log(error)
    }
}

bootstrap()
