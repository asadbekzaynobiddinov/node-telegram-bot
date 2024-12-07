import { config } from "dotenv";
import { Payment, User, Order } from "../schema/index.js";
import { authKeyboards, mainMenuKeyboard, paymentKeys, ucKeys, almazKeys, shopKeys } from "../keyboards/index.js";


config()

export const callBackFunction = async (ctx) => {
    try {
        const callBackData = ctx.callbackQuery.data
        const [status, id, amount] = callBackData.split('=')

        switch (status) {

            case 'register':
                await ctx.conversation.enter('registerConv')
                await ctx.editMessageReplyMarkup() 
                break;

            case "whithUzbCard":
                await ctx.reply(`${process.env.HUMO_CARD}\nZaynobiddinov Asadbek`)
                ctx.session.payStatus = true
                await ctx.conversation.enter("paymentConv")
                await ctx.editMessageReplyMarkup()
                break;

            case 'pubg':
                await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                    reply_markup: ucKeys(),
                    resize_keyboard: true
                })
                break;

            case 'mlbb':
                await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                    reply_markup: almazKeys(),
                    resize_keyboard: true
                })
                await ctx.editMessageReplyMarkup()
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
                const orderConfirm = await Order.findById(id)
                const userConfirm = await User.findOne({ id: orderConfirm.user_id })
                userConfirm.balance -= orderConfirm.price
                await userConfirm.save()
                await ctx.api.sendMessage(orderConfirm.user_id,
                    `🎮: ${orderConfirm.type.toUpperCase()}\n` +
                    `🆔: ${orderConfirm.account_id}\n` +
                    `💵: ${orderConfirm.price} so'm\n` +
                    `⚠️: Buyurtma qabul qilindi`
                )

                await ctx.api.sendMessage(process.env.ADMIN_ID,
                    `👤: ${userConfirm.email}\n` +
                    `🎮: ${orderConfirm.type.toUpperCase()}\n` +
                    `🆔: ${orderConfirm.account_id}\n` +
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
                await ctx.editMessageReplyMarkup()
                break;

            case "almaz":
            case "uc":
                const userUc = await User.findOne({ id: ctx.from.id })
                if (userUc.balance < amount) {
                    return ctx.reply("Xisobingizda yetarli mablag' mavjud emas")
                }
                await ctx.editMessageReplyMarkup()

                await ctx.conversation.enter("orderConv")
                break;

            case "paid":
                const orderPaid = await Order.findById(id)
                const messagePaid =
                    `🎮: ${orderPaid.type.toUpperCase()}\n` +
                    `🆔: ${orderPaid.account_id}\n` +
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
                    `💵: ${orderDidNotPay.price} so'm\n` +
                    `❌: Buyurtma bekor qilindi`
                await ctx.api.sendMessage(orderDidNotPay.user_id, messageDidNotPay)
                await Order.findByIdAndDelete(id)
                await ctx.editMessageReplyMarkup()
                break;

            case "back":
                await ctx.reply("👇🏻 Kerakli bo'limni tanlang:", {
                    reply_markup: shopKeys(),
                    resize_keyboard: true
                })
                await ctx.editMessageReplyMarkup()
                break;

            default:
                await ctx.editMessageReplyMarkup()
                break;
        }
    } catch (error) {
        console.log(error)
    }
}
