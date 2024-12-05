import { authKeyboards, mainMenuKeyboard, paymentKeys, shopKeys} from "../keyboards/index.js"
import { User } from '../schema/index.js'

export const startCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    if (!user) {
        return ctx.reply("Assalomu alaykumbotga hush kelibsiz !!!\nBotdan to'liq foydalanish uchun 👇", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    await mainMenuKeyboard(ctx)
}

export const helpCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    if (!user) {
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    await ctx.reply("Yordam uchun Admin tez orada qo'shiladi")
}

export const paymentCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    if (!user) {
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    
    await ctx.reply("👇🏻 Kerakli bo'limni tanlang:",{
        reply_markup: paymentKeys(),
    })
}

export const profileCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    if (!user) {
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    return ctx.reply("Sizning profilingiz ma'lumotlari\n" + `👤 Email: ${user.email}\n💰 Hisob: ${user.balance} so'm`)
}

export const shopCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    if (!user) {
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    return ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
        reply_markup: shopKeys(),
        resize_keyboard: true
    })
}