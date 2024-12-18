import { Bot, session } from "grammy";
import { 
    helpCommand, 
    startCommand, 
    profileCommand, 
    paymentCommand, 
    shopCommand,
    historyCommand 
} from "./commands/bot.commands.js";
import { config } from "dotenv";
import { callBackFunction } from "./commands/inline.commands.js";
import { registerConv, paymentConv, orderConv } from "./converstaions/conversation.js";
import { conversations, createConversation } from "@grammyjs/conversations";


config()

const token = process.env.TOKEN

export const bot = new Bot(token)

// bot.api.setMyCommands([
//     { command: 'start', description: 'Botni boshlash' },
//     { command: 'help', description: 'Yordam' },
//     { command: 'profile', description: "Profilni ko'rish" },
//     { command: 'pay', description: "To'lovni amalga oshirish" },
//     {command: "shop", description: "Do'kon"}
// ]);


bot.use(
    session({
        initial: () => ({ 
            page: 0,
            limit: 0,
            conversation: {}
        }),
    })
);

bot.use(conversations());
bot.use(createConversation(registerConv))
bot.use(createConversation(paymentConv))
bot.use(createConversation(orderConv))



bot.command("start", async (ctx) => {
    ctx.session.payStatus = false
    await startCommand(ctx)
})

bot.command('help', async (ctx) => {
    await helpCommand(ctx)
})

bot.command('profile', async (ctx) => {
    await profileCommand(ctx)
})

bot.command('pay', async (ctx) => {
    await paymentCommand(ctx)
})

bot.command("shop", async (ctx) => {
    await shopCommand(ctx)
})

bot.on('callback_query:data', async (ctx) => {
    await callBackFunction(ctx)
})

bot.hears('👤 Kabinet', async (ctx) => {
    await profileCommand(ctx)
})

bot.hears("💰 Xisob to'ldirish", async (ctx) => {
    await paymentCommand(ctx)
})

bot.hears("🛒 Do'kon", async (ctx) => {
    await shopCommand(ctx)
})

bot.hears("🌐 Buyurtmalar tarixi", async (ctx) => {
    await historyCommand(ctx)
})

bot.hears("☎️ Yordam uchun", async (ctx) => {
    await helpCommand(ctx)
})

bot.hears("📕 Qo'llanma", async (ctx) => {
    await ctx.reply("Tez orada bot uchun qo'llanma yoziladi")
})

bot.start()