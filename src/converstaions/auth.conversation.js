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
                reply_markup: authKeyboards(),
                resize_keyboard: true
            })
        }

        if(userExists){
            return ctx.reply(`${email} allaqachon mavjud !!!`, {
                reply_markup: authKeyboards(),
                resize_keyboard: true
            })
        }

        await ctx.reply(`Parol o'ylab toping: `)

        const passwordMessage = await conversation.wait()
        const password = passwordMessage.message.text

        if(password.length < 6){
            return ctx.reply(`Parol kamida 6 ta belgidan iborat bo'lishi kerak !!!`, {
                reply_markup: authKeyboards(),
                resize_keyboard: true
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

        const registeredUser = new User(user)

        await registeredUser.save()

        ctx.session.email = email;

        await ctx.reply(`Tabriklayman ${user.email}🥳\nQuidagi tugmalardan foydalanishingiz mumkin`, {
            reply_markup: mainMenuKeyboard(),
            resize_keyboard: true,
        });

        return user

    } catch (error) {
        console.log(error)
    }
};

