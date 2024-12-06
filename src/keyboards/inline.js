import { InlineKeyboard } from "grammy";

export const authKeyboards = () =>
    new InlineKeyboard()
        .text("Ro'yxatdan o'tish", "register")



export const paymentKeys = () =>
    new InlineKeyboard()
        .text("💳 Humo kartadan Hamkorbank", "whithUzbCard")
        .row()
        .text("💳 Uzkard kartadan Hamkorbank", "whithUzbCard")


export const shopKeys = () =>
    new InlineKeyboard()
        .text("🔫 PUBG Mobile 🔫", "pubg").row()
        .text("🏹 MOBILE LEGENDS 🏹", "mlbb")


export const ucKeys = () =>
    new InlineKeyboard()
        .text("💰 60 UC - 13000So'm", "uc=pubg=13000").row()
        .text("💰 120 UC - 25000So'm", "uc=pubg=25000").row()
        .text("💰 180 UC - 38000So'm", "uc=pubg=38000").row()
        .text("💰 325 UC - 60000So'm", "uc=pubg=60000").row()
        .text("💰 385 UC - 70000So'm", "uc=pubg=70000").row()
        .text("💰 660 UC - 115000So'm", "uc=pubg=115000").row()
        .text("💰 720 UC - 128000So'm", "uc=pubg=128000").row()
        .text("💰 985 UC - 178000So'm", "uc=pubg=178000").row()
        .text("💰 1320 UC - 230000So'm", "uc=pubg=230000").row()
        .text("💰 1800 UC - 280000So'm", "uc=pubg=280000").row()
        .text("💰 3850 UC - 559000So'm", "uc=pubg=559000").row()
        .text("💰 8100 UC - 1099000So'm", "uc=pubg=1099000").row()
        .text("💰 11950 UC - 1660000So'm", "uc=pubg=1660000").row()
        .text("💰 16200 UC - 2200000So'm", "uc=pubg=2200000").row()
        .text("↩️ Orqaga", "back");



export const almazKeys = () =>
    new InlineKeyboard()
        .text("💎 ALMAZ propusk - 200000So'm", "almaz_propusk").row()
        .text("💎 8 ALMAZ ML - 30000So'm", "8_almaz").row()
        .text("💎 35 ALMAZ ML - 70000So'm", "35_almaz").row()
        .text("💎 88 ALMAZ ML - 170000So'm", "88_almaz").row()
        .text("💎 132 ALMAZ ML - 250000So'm", "132_almaz").row()
        .text("💎 264 ALMAZ ML - 450000So'm", "264_almaz").row()
        .text("💎 440 ALMAZ ML - 730000So'm", "440_almaz").row()
        .text("💎 734 ALMAZ ML - 1130000So'm", "734_almaz").row()
        .text("💎 933 ALMAZ ML - 1450000So'm", "933_almaz").row()
        .text("💎 1410 ALMAZ ML - 2150000So'm", "1410_almaz").row()
        .text("💎 1881 ALMAZ ML - 2810000So'm", "1881_almaz").row()
        .text("💎 2845 ALMAZ ML - 4300000So'm", "2845_almaz").row()
        .text("💎 6163 ALMAZ ML - 9000000So'm", "6163_almaz").row()
        .text("↩️ Orqaga", "back");