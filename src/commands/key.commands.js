import { mainMenuKeyboard } from "../keyboards/index.js";
import { User } from "../schema/index.js";

export const profileKey = async (ctx) => {
    const user = await User.findOne({id: ctx.from.id})
    if(!user){
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }
    return ctx.reply("Sizning profilingiz ma'lumotlari\n" + `👤 Email: ${user.email}\n💰 Hisob: ${user.balance} so'm`)
}