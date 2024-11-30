import { Keyboard } from "grammy";

export const mainMenuKeyboard = () =>
    new Keyboard()
        .text(`🛒 Do'kon`)
        .text('👤 Kabinet').row()
        .text('🌐 Buyurtmalar tarixi')
        .text(`💰 Xisob to'ldirish`).row()
        .text(`📕 Qo'llanma`)
        .text('☎️ Yordam uchun');
