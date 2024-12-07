import { authKeyboards, mainMenuKeyboard, paymentKeys, shopKeys } from "../keyboards/index.js"
import { User, Order } from '../schema/index.js'




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
    await ctx.reply(
        `👤: @zaynobiddinovasadbek\n` +
        `☎️: +998907875101`
    )
}

export const paymentCommand = async (ctx) => {
    const user = await User.findOne({ id: ctx.from.id })
    if (!user) {
        return ctx.reply("Kechirasiz siz hali ro'yxatdan o'tmagansiz !!!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true
        })
    }

    await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
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

export const historyCommand = async (ctx) => {

    ctx.session.page = 1
    ctx.session.limit = 10

    const user = await User.findOne({ id: ctx.from.id });
    const orders = await Order.find({ user_id: ctx.from.id }).sort({ createdAt: -1 }).skip(0).limit(10);

    if (!user) {
        return ctx.reply("Kechirasiz, siz hali ro'yxatdan o'tmagansiz!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true,
        });
    }

    if (!orders || orders.length === 0) {
        return ctx.reply("Sizda hech qanday harid amalga oshirilmagan.");
    }

    const inlineKeyboard = [];
    let row = [];

    for (let order of orders) {
        const orderDate = new Date(order.createdAt)
            .toLocaleDateString("uz-UZ", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .split("/")
            .join(".");


        row.push({
            text: `${orderDate}`,
            callback_data: `order=${order._id}`
        });

        if (row.length === 2) {
            inlineKeyboard.push(row);
            row = [];
        }
    }

    if (row.length > 0) {
        inlineKeyboard.push(row);
    }

    const prewNext = [
        {
            text: "⬅️ Prev", callback_data: 'history=prev'
        },
        {
            text: "Next ➡️", callback_data: "history=next"
        }
    ]
    inlineKeyboard.push(prewNext)
    inlineKeyboard.push([{
        text: "❌ Cancel", callback_data: "remove"
    }])
    await ctx.reply("Sizning haridlar tarixi:", {
        reply_markup: {
            inline_keyboard: inlineKeyboard,
        },
    });
};
