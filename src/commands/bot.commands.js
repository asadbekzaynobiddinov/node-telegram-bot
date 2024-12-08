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
    ctx.session.page = ctx.session.page || 1;
    ctx.session.limit = ctx.session.limit || 10;

    const user = await User.findOne({ id: ctx.from.id });
    if (!user) {
        return ctx.reply("Kechirasiz, siz hali ro'yxatdan o'tmagansiz!", {
            reply_markup: authKeyboards(),
            resize_keyboard: true,
        });
    }

    const orders = await Order.aggregate([
        {
            $match: {
                user_id: ctx.from.id
            }
        },
        {
            $group: {
                _id: { date: { $dateToString: { format: "%d.%m.%Y", date: "$createdAt" } } },
                realDate: { $first: "$createdAt" },
                totalOrders: { $sum: 1 },
                totalAmount: { $sum: "$price" }
            }
        },
        {
            $sort: { realDate: -1 }
        },
        {
            $skip: (ctx.session.page - 1) * ctx.session.limit
        },
        {
            $limit: ctx.session.limit
        },
        {
            $project: {
                _id: 0,
                date: "$_id.date",
                realDate: 1,
                totalOrders: 1,
                totalAmount: 1
            }
        }
    ]);

    if (!orders || orders.length === 0) {
        return ctx.reply("Sizda hech qanday harid amalga oshirilmagan.");
    }


    const inlineKeyboard = [];
    let row = [];

    for (let order of orders) {
        row.push({
            text: `${order.date}`,
            callback_data: `order=${JSON.stringify(order.realDate)}=${ctx.from.id }`
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
    ];

    inlineKeyboard.push(prewNext);
    inlineKeyboard.push([{
        text: "❌ Cancel", callback_data: "remove"
    }]);

    await ctx.reply("Sizning haridlar tarixi:", {
        reply_markup: {
            inline_keyboard: inlineKeyboard,
        },
    });
};