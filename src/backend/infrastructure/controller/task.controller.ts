import { Hono } from 'hono'
import { usecases } from './usecases.factory'

const {
  createTaskUsecase,
  listTasksUsecase,
  editTaskUsecase,
  deleteTaskUsecase,
} = usecases

const task = new Hono()

task.get('list/:list_id/task', async (context) => {
  console.log('GET /task')

  //@ts-ignore
  const userId = context.get('userId') as string
  const listId = context.req.param('list_id')

  console.debug('userId', userId);

  const tasks = await listTasksUsecase.execute({ userId, listId })

  tasks.tasks.forEach(task => {
    task.toJSON()
  })

  const body = JSON.stringify(tasks)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

task.post('list/:list_id/task', async (context) => {
  console.log('POST /task')

  const { title, description } = await context.req.json()
  //@ts-ignore
  const userId = context.get('userId') as string
  const listId = context.req.param('list_id')

  const newTask = await createTaskUsecase.execute({ title, description, userId, listId })

  const body = JSON.stringify(newTask)
  return new Response(body, {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})


task.put('list/:list_id/task/:id', async (context) => {
  console.log('PUT /task')

  const { title, description } = await context.req.json()
  //@ts-ignore
  const userId = context.get('userId') as string
  const listId = context.req.param('list_id')
  const id = context.req.param('id')

  const updatedTask = await editTaskUsecase.execute({ id, title, description, userId, listId })

  const body = JSON.stringify(updatedTask)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})


task.delete('list/:list_id/task/:id', async (context) => {
  console.log('DELETE /task')

  //@ts-ignore
  const userId = context.get('userId') as string
  const listId = context.req.param('list_id')
  const id = context.req.param('id')

  await deleteTaskUsecase.execute({ id, userId, listId })

  return new Response(null, {
    status: 204,
  })
})


export { task as TaskController }
