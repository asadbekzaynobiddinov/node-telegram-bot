import { authKeyboards, mainMenuKeyboard } from "../keyboards/index.js";



export const callBackFunction = async (ctx) => {
    try {
        const callBackData = ctx.callbackQuery.data
        if(callBackData == 'register'){
            await ctx.conversation.enter('registerConv')
        }
    } catch (error) {
        console.log(error)
    }
}