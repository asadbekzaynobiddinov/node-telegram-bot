import { InlineKeyboard } from "grammy";

export const authKeyboards = () =>
    new InlineKeyboard()
        .text("Ro'yxatdan o'tish", "register").row()
        .text("Tizimga kirish", "login");
