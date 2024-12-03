import bcrypt from "bcrypt";
import { User } from "../schema/index.js";
import { authKeyboards, mainMenuKeyboard } from "../keyboards/index.js";

export const registerConv = async (conversation, ctx) => {
    try {
        const id = ctx.from.id
        await ctx.reply('Emailingizni kiriting:')
        const emailMessage = await conversation.wait()
        const email = emailMessage.message.text
        const userExists = await User.exists({email})
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return ctx.reply(`${email} yaroqsiz email kiritdingiz !!!`, {
                reply_markup: authKeyboards()
            })
        }
        if(userExists){
            return ctx.reply(`${email} allaqachon mavjud !!!`, {
                reply_markup: authKeyboards()
            })
        }
        await ctx.reply(`Parol o'ylab toping: `)
        const passwordMessage = await conversation.wait()
        const password = passwordMessage.message.text
        if(password.length < 6){
            return ctx.reply(`Parol kamida 6 ta belgidan iborat bo'lishi kerak !!!`, {
                reply_markup: authKeyboards()
            })
        }
        await ctx.reply("<b>Telefon raqamni ulashish</b> tugmasini bosing:", {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: "Telefon raqamni ulashish",
                            request_contact: true
                        }
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
        const contactMessage = await conversation.wait()
        const phone_number = contactMessage.message.contact.phone_number
        const user = {
            id,
            email,
            password, 
            phone_number
        }
        const saltsRound = 10
        user.password = await bcrypt.hash(user.password, saltsRound)
        const registeredUser = new User(user)
        await registeredUser.save()
        await ctx.reply(`Tabriklayman ${user.email}🥳\nQuyidagi tugmalardan foydalanishingiz mumkin`);
        await mainMenuKeyboard(ctx)
    } catch (error) {
        console.log(error)
    }
};


export const paymentConv = async (conversation, ctx) => {
    try {
        await ctx.reply("To'lov summasini kiriting");
        const pricerMessage = await conversation.wait();

        await ctx.reply("To'lov rasmini yuboring");
        const pictureMessage = await conversation.wait();

    } catch (error) {
        console.log("Suhbatda xato:", error);
        await ctx.reply("Xatolik yuz berdi.");
    }
}

