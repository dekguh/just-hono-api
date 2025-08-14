import { Hono } from 'hono'
import { TodosService } from '../services/todos.service'
import { db } from '../config/postgres'
import { TodosRepository } from '../repository/todos.repository'
import { globalResponse } from '../utils/response'
import { authMiddleware } from '../middleware/auth.middleware'

export const todosRoute = new Hono()
const todosService = new TodosService(new TodosRepository(db))

todosRoute.get('/search', authMiddleware, async (c) => {
  return c.json(globalResponse(200, 'todos fetched successfully', {}), 200)
})

todosRoute.post('/add', authMiddleware, async (c) => {
  return c.json(globalResponse(200, 'todos fetched successfully', {}), 200)
})
