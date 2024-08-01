import { Hono } from 'hono'
import { usecases } from './usecases.factory'

const {
  listListsUsecase,
  createListUsecase,
  getListUsecase,
  editListUsecase,
  deleteListUsecase,
  archiveListUsecase,
} = usecases

const list = new Hono()

list.get('/list', async (context) => {
  console.log('GET /list')
  //@ts-ignore
  const userId = context.get('userId') as string

  console.debug('userId', userId);

  const lists = await listListsUsecase.execute({ userId })

  lists.lists.forEach(list => {
    list.toJSON()
  })

  const body = JSON.stringify(lists)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

list.get('/list/:id', async (context) => {
  console.log('GET /list/:id')

  const id = context.req.param('id')
  //@ts-ignore
  const userId = context.get('userId') as string

  const list = await getListUsecase.execute({ id, userId })

  const body = JSON.stringify(list)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

list.post('/list', async (context) => {
  console.log('POST /list')

  const { title } = await context.req.json()
  //@ts-ignore
  const userId = context.get('userId') as string

  const newList = await createListUsecase.execute({ title, userId })

  const body = JSON.stringify(newList)
  return new Response(body, {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

list.put('/list/:id', async (context) => {
  console.log('PUT /list/:id')

  const id = context.req.param('id')
  const { title } = await context.req.json()
  //@ts-ignore
  const userId = context.get('userId') as string

  const updatedList = await editListUsecase.execute({ id, title, userId })

  const body = JSON.stringify(updatedList)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

list.delete('/list/:id', async (context) => {
  console.log('DELETE /list/:id')

  const id = context.req.param('id')
  //@ts-ignore
  const userId = context.get('userId') as string

  await deleteListUsecase.execute({ id, userId })

  return new Response(null, {
    status: 204
  })
})

list.patch('/list/:id/archive', async (context) => {
  console.log('PATCH /list/:id/archive')

  const id = context.req.param('id')
  //@ts-ignore
  const userId = context.get('userId') as string

  const archivedList = await archiveListUsecase.execute({ id, userId })

  const body = JSON.stringify(archivedList)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

export { list as ListController }
