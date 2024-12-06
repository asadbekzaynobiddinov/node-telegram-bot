import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

export const Payment = model('payment', paymentSchema)