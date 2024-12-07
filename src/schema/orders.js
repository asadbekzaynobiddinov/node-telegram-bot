import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    account_id: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

export const Order = model('order', orderSchema)