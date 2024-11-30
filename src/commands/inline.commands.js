import { authKeyboards, mainMenuKeyboard } from "../keyboards/index.js";



export const callBackFunction = async (ctx) => {
    try {
        const callBackData = ctx.callbackQuery.data
        if(callBackData == 'register'){
            const result =  await ctx.conversation.enter('registerConv')
            console.log(result)
        }
    } catch (error) {
        console.log(error)
    }
}