import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { ListController } from '../controller/list.controller'
import { TaskController } from '../controller/task.controller'

const app = new Hono()

app.onError((err, c) => {
  const body = JSON.stringify({
    message: 'Internal Server Error',
    error: err.message
  })

  return new Response(body, {
    status: 500,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

app.use(async (context, next) => {
  //@ts-ignore
  context.set('userId', '57bad979-0d73-448e-b4ea-a1b7fbef8d7f')
  await next()
})

app.route('/', ListController)
app.route('/', TaskController)

serve(app)
