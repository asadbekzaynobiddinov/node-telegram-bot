import { config } from "dotenv";
import { Payment, User, Order } from "../schema/index.js";
import { ucKeys, almazKeys, shopKeys } from "../keyboards/index.js";


config()

export const callBackFunction = async (ctx) => {
    try {
        const callBackData = ctx.callbackQuery.data
        const [status, id, amount, value] = callBackData.split('=')
        
        switch (status) {

            case 'register':
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                await ctx.conversation.enter('registerConv')
                break;

            case "whithUzbCard":
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                await ctx.reply(`${process.env.HUMO_CARD}\nZaynobiddinov Asadbek`)
                ctx.session.payStatus = true
                await ctx.conversation.enter("paymentConv")
                break;

            case 'pubg':
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                    reply_markup: ucKeys(),
                    resize_keyboard: true
                })
                break;

            case 'mlbb':
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                    reply_markup: almazKeys(),
                    resize_keyboard: true
                })
                break;

            case 'ok':
                const payment = await Payment.findById(id)
                const user = await User.findOne({ id: payment.user_id })

                user.balance += payment.amount

                await user.save()

                await ctx.api.sendMessage(
                    payment.user_id,
                    `Hisob to'ldirish haqidagi arizangiz qabul qilindi 🥳\n` +
                    `👤 Email: ${user.email}\n💰 Hisob: ${user.balance} so'm`
                )
                await ctx.editMessageReplyMarkup()
                break;

            case 'no':
                const paymentNo = await Payment.findById(id)
                await ctx.api.sendMessage(paymentNo.user_id, "Hisob to'ldirish haqidagi arizangiz bekor qilindi 😔\nQaytadan urinib ko'ring")
                break;

            case 'confirm':
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                const orderConfirm = await Order.findById(id)
                const userConfirm = await User.findOne({ id: orderConfirm.user_id })
                userConfirm.balance -= orderConfirm.price
                await userConfirm.save()
                await ctx.api.sendMessage(orderConfirm.user_id,
                    `🎮: ${orderConfirm.type.toUpperCase()}\n` +
                    `🆔: ${orderConfirm.account_id}\n` +
                    `${orderConfirm.value}\n` +
                    `💵: ${orderConfirm.price} so'm\n` +
                    `⚠️: Buyurtma qabul qilindi`
                )

                await ctx.api.sendMessage(process.env.ADMIN_ID,
                    `👤: ${userConfirm.email}\n` +
                    `🎮: ${orderConfirm.type.toUpperCase()}\n` +
                    `🆔: ${orderConfirm.account_id}\n` +
                    `${orderConfirm.value}\n` +
                    `💵: ${orderConfirm.price} so'm\n` +
                    `🆕 Yangi buyurtma`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "✅ To'ladim",
                                    callback_data: `paid=${orderConfirm._id}`,
                                },
                                {
                                    text: "❌ Bekor qildim",
                                    callback_data: `didn't_pay=${orderConfirm._id}`,
                                },
                            ],
                        ],
                    },
                })
                break;

            case "cancel":
                await Order.findByIdAndDelete(id)
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                break;

            case "almaz":
            case "uc":
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                const userUc = await User.findOne({ id: ctx.from.id })
                if (userUc.balance < amount) {
                    return ctx.reply("Xisobingizda yetarli mablag' mavjud emas")
                }

                await ctx.conversation.enter("orderConv")
                break;

            case "paid":
                const orderPaid = await Order.findById(id)
                const messagePaid =
                    `🎮: ${orderPaid.type.toUpperCase()}\n` +
                    `🆔: ${orderPaid.account_id}\n` +
                    `${orderPaid.value}\n` +
                    `💵: ${orderPaid.price} so'm\n` +
                    `✅: Hisob t'ldirildi`
                await ctx.api.sendMessage(orderPaid.user_id, messagePaid)
                await ctx.editMessageReplyMarkup()
                break;

            case "didn't_pay":
                const orderDidNotPay = await Order.findById(id)
                const userDidNotPay = await User.findOne({ id: orderDidNotPay.user_id })

                userDidNotPay.balance += orderDidNotPay.price

                await userDidNotPay.save()

                const messageDidNotPay =
                    `🎮: ${orderDidNotPay.type.toUpperCase()}\n` +
                    `🆔: ${orderDidNotPay.account_id}\n` +
                    `${orderConfirm.value}\n` +
                    `💵: ${orderDidNotPay.price} so'm\n` +
                    `❌: Buyurtma bekor qilindi`
                await ctx.api.sendMessage(orderDidNotPay.user_id, messageDidNotPay)
                await Order.findByIdAndDelete(id)
                await ctx.editMessageReplyMarkup()
                break;

            case "back":
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                    reply_markup: shopKeys(),
                    resize_keyboard: true
                })
                break;

            case "history":

                if (id == 'prev') {
                    ctx.session.page--
                }

                if (id == 'next') {
                    ctx.session.page++
                }

                const skip = (ctx.session.page - 1) * ctx.session.limit

                if (skip < 0) {
                    ctx.session.page++
                    return ctx.answerCallbackQuery({
                        text: "Siz ro'yxatning boshidasiz",
                        show_alert: true
                    })
                }

                const orders = await Order.find({ user_id: ctx.from.id })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(ctx.session.limit)

                if(orders.length == 0){
                    ctx.session.page--
                    return ctx.answerCallbackQuery({
                        text: "Siz ro'yxatning oxiridasiz",
                        show_alert: true
                    })
                }

                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
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

                break;

            case "order":
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)

                const order = await Order.findById({_id: id})
                const message = 
                    `🎮: ${order.type.toUpperCase()}\n` +
                    `🆔: ${order.account_id}\n` +
                    `${order.value}\n` +
                    `💵: ${order.price} so'm\n` +
                    `✅: To'ldirildi`
                await ctx.api.sendMessage(order.user_id, message)
                break;

            case "remove":
                await ctx.api.deleteMessage(ctx.from.id, ctx.update.callback_query.message.message_id)
                ctx.session.page = 1
                ctx.session.limit = 10
                break;

            default:
                await ctx.editMessageReplyMarkup()
                break;
        }
    } catch (error) {
        console.log(error)
    }
}
