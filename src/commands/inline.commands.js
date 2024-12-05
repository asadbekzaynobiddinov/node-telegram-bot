import { config } from "dotenv";
import { authKeyboards, mainMenuKeyboard, paymentKeys, ucKeys, almazKeys } from "../keyboards/index.js";


config()

export const callBackFunction = async (ctx) => {
    try {
        const callBackData = ctx.callbackQuery.data
        
        
        if(callBackData == 'register'){
            await ctx.conversation.enter('registerConv')
        }
        
        
        if(callBackData == "whithUzbCard"){
            await ctx.reply(`${process.env.HUMO_CARD}\nZaynobiddinov Asadbek`)
            await ctx.conversation.enter("paymentConv")
        }
        
        
        if(callBackData == 'pubg'){
            await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                reply_markup: ucKeys(),
                resize_keyboard: true
            })
        }


        if (callBackData == 'mlbb') {
            await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                reply_markup: almazKeys(),
                resize_keyboard: true
            })
        }

        await ctx.editMessageReplyMarkup()
    } catch (error) {
        console.log(error)
    }
}