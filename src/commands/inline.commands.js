import { config } from "dotenv";
import { Payment, User } from "../schema/index.js";
import { authKeyboards, mainMenuKeyboard, paymentKeys, ucKeys, almazKeys } from "../keyboards/index.js";


config()

export const callBackFunction = async (ctx) => {
    try {
        const callBackData = ctx.callbackQuery.data
        
        const status = callBackData.split('=')[0]
        const id = callBackData.split('=')[1]
        
        if(status == 'register'){
            await ctx.conversation.enter('registerConv')
        }
        
        
        if(status == "whithUzbCard"){
            await ctx.reply(`${process.env.HUMO_CARD}\nZaynobiddinov Asadbek`)
            ctx.session.payStatus = true
            await ctx.conversation.enter("paymentConv")
        }
        
        
        if(status == 'pubg'){
            await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                reply_markup: ucKeys(),
                resize_keyboard: true
            })
        }


        if (status == 'mlbb') {
            await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                reply_markup: almazKeys(),
                resize_keyboard: true
            })
        }

        if(status == 'ok') {
            const payment = await Payment.findById(id)
            const user = await User.findOne({id: payment.user_id})

            user.balance += payment.amount

            await user.save()

            ctx.session.payStatus = true

            await ctx.api.sendMessage(
                payment.user_id, 
                `Hisob to'ldirish haqidagi arizangiz qabul qilindi 🥳\n` + 
                `👤 Email: ${user.email}\n💰 Hisob: ${user.balance} so'm`
            )
        }

        if(status == 'no') {
            const payment = await Payment.findById(id)
            await ctx.api.sendMessage(payment.user_id, "Hisob to'ldirish haqidagi arizangiz bekor qilindi 😔\nQaytadan urinib ko'ring")
            ctx.session.payStatus = false
        }

        await ctx.editMessageReplyMarkup()
    } catch (error) {
        console.log(error)
    }
}