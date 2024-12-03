import { Bot, session } from "grammy";
import { helpCommand, startCommand, profileCommand, paymentCommand } from "./commands/bot.commands.js";
import { config } from "dotenv";
import { callBackFunction } from "./commands/inline.commands.js";
import { registerConv, paymentConv } from "./converstaions/auth.conversation.js";
import { conversations, createConversation } from "@grammyjs/conversations";
import { profileKey } from "./commands/key.commands.js";

config()

const token = process.env.TOKEN

export const bot = new Bot(token)

// bot.api.setMyCommands([
//     { command: 'start', description: 'Botni boshlash' },
//     { command: 'help', description: 'Yordam' },
//     { command: 'profile', description: "Profilni ko'rish" },
//     { command: 'pay', description: "To'lovni amalga oshirish" }
// ]);

bot.use(session({
    initial(){
        return {}
    },
}));

bot.use(conversations());
bot.use(createConversation(registerConv))
bot.use(createConversation(paymentConv))



bot.command("start", (ctx) => {

    startCommand(ctx)
})

bot.command('help', (ctx) => {
    helpCommand(ctx)
})

bot.command('profile', (ctx) => {
    profileCommand(ctx)
})

bot.command('pay', (ctx) => {
    paymentCommand(ctx)
})

bot.on('callback_query:data', async (ctx) => {
    await callBackFunction(ctx)
})

bot.hears('👤 Kabinet', (ctx) => {
    profileKey(ctx)
})

bot.start()