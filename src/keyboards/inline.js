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
        .text("💎 ALMAZ propusk - 20000So'm", "almaz=mobile legends=20000").row()
        .text("💎 8 ALMAZ ML - 3000So'm", "almaz=mobile legends=3000").row()
        .text("💎 35 ALMAZ ML - 7000So'm", "almaz=mobile legends=7000").row()
        .text("💎 88 ALMAZ ML - 17000So'm", "almaz=mobile legends=17000").row()
        .text("💎 132 ALMAZ ML - 25000So'm", "almaz=mobile legends=25000").row()
        .text("💎 264 ALMAZ ML - 45000So'm", "almaz=mobile legends=45000").row()
        .text("💎 440 ALMAZ ML - 73000So'm", "almaz=mobile legends=73000").row()
        .text("💎 734 ALMAZ ML - 113000So'm", "almaz=mobile legends=113000").row()
        .text("💎 933 ALMAZ ML - 145000So'm", "almaz=mobile legends=145000").row()
        .text("💎 1410 ALMAZ ML - 215000So'm", "almaz=mobile legends=215000").row()
        .text("💎 1881 ALMAZ ML - 281000So'm", "almaz=mobile legends=281000").row()
        .text("💎 2845 ALMAZ ML - 430000So'm", "almaz=mobile legends=430000").row()
        .text("💎 6163 ALMAZ ML - 900000So'm", "almaz=mobile legends=900000").row()
        .text("↩️ Orqaga", "back");