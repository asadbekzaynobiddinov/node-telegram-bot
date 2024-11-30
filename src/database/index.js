import mongoose from "mongoose";
import { config } from "dotenv";
config()

export const connetDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URL).then((res) => {
            console.log('Mongodb Connnected')
        }).catch((error) => {
            console.log(error)
        })
    } catch (error) {
        console.log(error.message)
    }
}