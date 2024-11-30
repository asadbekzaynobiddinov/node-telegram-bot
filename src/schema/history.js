import { Schema, model } from "mongoose";

const historySchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        ref: 'User'
    },
    amount: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

export const History = model('history', historySchema)