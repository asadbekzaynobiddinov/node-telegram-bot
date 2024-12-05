import bcrypt from "bcrypt";
import { User } from "../schema/index.js";
import { authKeyboards, mainMenuKeyboard, paymentKeys} from "../keyboards/index.js";

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
        await ctx.reply(
            "tepadagi kartaga to'lov qilganingizdan so'ng.\n\n"+
            "— jo'natgan pulingizni YOZMA ko'rinishda yuboring. "+
            "Nuqta(.) vergul(,) ishlatmasdan jo'nating, "+
            "na'muna: 10000"
        );

        const { message } = await conversation.wait();
        const sum = message.text

        if (isNaN(sum) || sum <= 0) {
            await ctx.reply("Iltimos, to'g'ri summa kiriting (faqat raqam).");
            await ctx.reply("☟Kerakli bo'limni tanlang:", {
                reply_markup: paymentKeys()
            })
            return;
        }

        await ctx.reply("Endi esa to'lov skrenshotini jo'nating pdf yoki boshqa format qabul qilinmaydi ");
        const pictureMessage = await conversation.wait();

        const photo = pictureMessage.message.photo
        if (pictureMessage.message.photo) {

            const largestPhoto = photo[photo.length - 1];
            const fileId = largestPhoto.file_id;

            await ctx.api.sendPhoto(6648345777, fileId)

            await ctx.reply("Siz yuborgan rasm:", {
                reply_to_message_id: pictureMessage.message.message_id,
                photo: fileId
            });
        } else {
            await ctx.reply("Iltimos, rasm yuboring.");
            await ctx.reply("☟Kerakli bo'limni tanlang:", {
                reply_markup: paymentKeys()
            })
            return;
        }
    } catch (error) {
        console.log("Suhbatda xato:", error);
        if (ctx) {
            await ctx.reply("Xatolik yuz berdi.");
        }
    }
};


