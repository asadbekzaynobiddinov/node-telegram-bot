import { Bot, InlineKeyboard } from "grammy";
import { config } from "dotenv";

config()

const bot = new Bot(process.env.TOKEN); // Bot tokeningizni kiriting

// Tugmalarni yaratish
bot.command("start", async (ctx) => {
    const keyboard = new InlineKeyboard()
        .text("💳 Humo kartadan Hamkorbank", "whithUzbCard")
        .row()
        .text("💳 Uzkard kartadan Hamkorbank", "whithUzbCard")
        .row()
        .text("💳 Viza kartaga", "VisaCard");

    await ctx.reply("Kartani tanlang:", { reply_markup: keyboard });
});

// Callbackni boshqarish
bot.callbackQuery("whithUzbCard", async (ctx) => {
    await ctx.answerCallbackQuery("Humo yoki Uzkard tanlandi!"); // Javob berish
    await ctx.editMessageReplyMarkup(); // Keyboardni olib tashlash
    await ctx.reply("Siz \"Hamkorbank\" tanladingiz!"); // Qo'shimcha xabar
});

bot.callbackQuery("VisaCard", async (ctx) => {
    await ctx.answerCallbackQuery("Visa karta tanlandi!");
    await ctx.editMessageReplyMarkup(); // Keyboardni olib tashlash
    await ctx.reply("Siz \"Visa karta\" tanladingiz!");
});

// Botni ishga tushirish
bot.start();