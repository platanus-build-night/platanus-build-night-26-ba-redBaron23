import { Bot, webhookCallback } from 'grammy'
import { ENV } from '../config/constants.js'

export const bot = new Bot(ENV.TELEGRAM_BOT_TOKEN)

bot.on('message:text', async (ctx) => {
  await ctx.reply(`Received: ${ctx.message.text}`)
})

export const handleWebhook = webhookCallback(bot, 'hono')
