import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    timestamps: true
}
)

export const User = model("user", usersSchema)