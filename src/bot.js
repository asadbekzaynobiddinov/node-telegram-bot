import { Bot, session } from "grammy";
import { helpCommand, startCommand, profileCommand } from "./commands/bot.commands.js";
import { config } from "dotenv";
import { callBackFunction } from "./commands/inline.commands.js";
import { registerConv } from "./converstaions/auth.conversation.js";
import { conversations, createConversation } from "@grammyjs/conversations";
import { profileKey } from "./commands/key.commands.js";

config()

const token = process.env.TOKEN

export const bot = new Bot(token)



bot.use(session({
    initial(){
        return {
            email: null
        }
    },
}));


bot.use(conversations());
bot.use(createConversation(registerConv))



bot.command("start", (ctx) => {

    startCommand(ctx)
})

bot.command('help', (ctx) => {
    helpCommand(ctx)
})

bot.command('profile', (ctx) => {
    profileCommand(ctx)
})

bot.on('callback_query:data', async (ctx) => {
    await callBackFunction(ctx)
})

bot.hears('👤 Kabinet', (ctx) => {
    profileKey(ctx)
})

bot.start()