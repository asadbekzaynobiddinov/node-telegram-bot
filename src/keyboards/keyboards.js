import { Keyboard } from "grammy";

export const mainMenuKeyboard = (ctx) => {
    const keys = new Keyboard()
        .text(`🛒 Do'kon`)
        .text('👤 Kabinet').row()
        .text('🌐 Buyurtmalar tarixi')
        .text(`💰 Xisob to'ldirish`).row()
        .text(`📕 Qo'llanma`)
        .text('☎️ Yordam uchun')
        .resized();

    return ctx.reply("👇🏻 Kerakli bolimni tanlang", {
        reply_markup: keys,
        one_time_keyboard: true
    });
}