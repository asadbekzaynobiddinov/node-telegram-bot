import { authKeyboards, mainMenuKeyboard } from "../keyboards/index.js"
import { User } from '../schema/index.js'

export const startCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    if (!user) {
        return ctx.reply("Assalomu alaykumbotga hush kelibsiz !!!\nBotdan to'liq foydalanish uchun 👇", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }

    mainMenuKeyboard(ctx)
}

export const helpCommand = (ctx) => {
    ctx.reply("Yordam uchun Admin tez orada qo'shiladi")
}

export const paymentCommand = async (ctx) => {
    await ctx.conversation.enter("paymentConv")
}

export const profileCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    console.log(user)
    if (!user) {
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    return ctx.reply(`👤 Email: ${user.email}\n💰 Hisob: ${user.balance} so'm`)
}

