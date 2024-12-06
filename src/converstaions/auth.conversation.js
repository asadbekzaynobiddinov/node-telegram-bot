import bcrypt from "bcrypt";
import { config } from "dotenv";
import { User, Payment } from "../schema/index.js";
import { authKeyboards, mainMenuKeyboard, paymentKeys } from "../keyboards/index.js";
import {
    profileCommand,
    startCommand,
    helpCommand,
    paymentCommand,
    shopCommand
} from "../commands/bot.commands.js";


config()


export const registerConv = async (conversation, ctx) => {
    try {
        const id = ctx.from.id
        await ctx.reply('Emailingizni kiriting:')
        const emailMessage = await conversation.wait()
        const email = emailMessage.message.text
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return ctx.reply(`${email} yaroqsiz email kiritdingiz !!!`, {
                reply_markup: authKeyboards()
            })
        }
        const userExists = await User.exists({ email })
        if (userExists) {
            return ctx.reply(`${email} allaqachon mavjud !!!`, {
                reply_markup: authKeyboards()
            })
        }
        await ctx.reply(`Parol o'ylab toping: `)
        const passwordMessage = await conversation.wait()
        const password = passwordMessage.message.text
        if (password.length < 6) {
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
        return
    } catch (error) {
        console.log(error)
    }
};




export const paymentConv = async (conversation, ctx) => {
    try {
        const user = await User.findOne({id: ctx.from.id})

        await ctx.reply(
            "tepadagi kartaga to'lov qilganingizdan so'ng.\n\n" +
            "— jo'natgan pulingizni YOZMA ko'rinishda yuboring. " +
            "Nuqta(.) vergul(,) ishlatmasdan jo'nating, " +
            "na'muna: 10000"
        );

        let sum
        let fileId

        do {
            const { message } = await conversation.wait();
            sum = message.text


            switch (sum) {
                case '/start':
                    await startCommand(ctx)
                    return;
                case '/help':
                case "☎️ Yordam uchun":
                    await helpCommand(ctx)
                    return;
                case '/profile':
                case "👤 Kabinet":
                    await profileCommand(ctx)
                    return;
                case '/pay':
                case "💰 Xisob to'ldirish":
                    await paymentCommand(ctx)
                    return;
                case '/shop':
                case "🛒 Do'kon":
                    await shopCommand(ctx)
                    return
            }


            if (isNaN(sum) || sum <= 0 || sum.includes('.') || sum.includes(',')) {
                await ctx.reply("Iltimos, to'g'ri summa kiriting (faqat raqam, (.) va (,) siz).");
            } else {
                break
            }
        } while (true);

        await ctx.reply("Endi esa to'lov skrenshotini jo'nating \npdf yoki boshqa format qabul qilinmaydi ");

        do {
            const { message } = await conversation.wait();

            if (message.photo && message.photo.length > 0) {
                const photo = message.photo;
                const largestPhoto = photo[photo.length - 1];
                fileId = largestPhoto.file_id;
                break;
            } else {
                await ctx.reply("Iltimos, rasm yuboring.");
            }
        } while (true);

        const pay = {
            user_id: user.id,
            amount: sum
        }

        const newPay = new Payment(pay)
        await newPay.save()
        const messageInfo = `email:  ${user.email}\n\nusername:  ${ctx.from.username}\n\nnumber:  ${user.phone_number}\n\nqiymat:  ${sum}` 
        await ctx.api.sendPhoto(process.env.ADMIN_ID, fileId, {
            parse_mode: "HTML",
            caption: messageInfo,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "✅ Tasdiqlash",
                            callback_data: `ok=${newPay._id}`,
                        },
                        {
                            text: "❌ Bekor qilish",
                            callback_data: `no=${newPay._id}`,
                        },
                    ],
                ],
            },
        });

        
        await ctx.reply("Hisob to'ldirish haqida so'rovingiz qabul qilindi. \nTo'lov tekshirilib balansingizga tez orada pul tushadi!")
        await mainMenuKeyboard(ctx)     
        return
    } catch (error) {
        console.log("Suhbatda xato:", error);
        if (ctx) {
            await ctx.reply("Xatolik yuz berdi.");
        }
    }
};


