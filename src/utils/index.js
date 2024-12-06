export const deleteMessage = async (messageId, ctx) => {
    await ctx.api.deleteMessage(messageId)
}