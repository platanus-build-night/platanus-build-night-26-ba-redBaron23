import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { ENV } from './config/constants.js'
import { bot, handleWebhook } from './bot/telegram.js'

const app = new Hono()

app.get('/', (c) => c.json({ status: 'ok' }))
app.post('/telegram/webhook', handleWebhook)

app.get('/telegram/setup', async (c) => {
  await bot.api.setWebhook(`${ENV.WEBHOOK_URL}/telegram/webhook`)
  return c.json({ status: 'ok', webhook: `${ENV.WEBHOOK_URL}/telegram/webhook` })
})

serve({ fetch: app.fetch, port: ENV.PORT }, (info) => {
  console.log(`Nudge running on http://localhost:${info.port}`)
})
