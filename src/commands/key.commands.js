import { mainMenuKeyboard } from "../keyboards/index.js";
import { User } from "../schema/index.js";

export const profileKey = async (ctx) => {
    const user = await User.findOne({id: ctx.from.id})
    console.log(user)
    if(!user){
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    return ctx.reply(`👤 Email: ${user.email}\n💰 Hisob: ${user.balance} so'm`)
}