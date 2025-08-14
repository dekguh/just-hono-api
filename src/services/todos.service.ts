import { HTTPException } from 'hono/http-exception'
import { CreateTodoZod } from '../models'
import { TodosRepository } from '../repository/todos.repository'

export class TodosService {
  constructor (private todosRepository: TodosRepository) {}

  async getTodosList (userId: string) {
    try {
      const todos = await this.todosRepository.getTodosByUserId(userId)

      return todos
    } catch (error: unknown) {
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, { message: error.message })
      }

      throw new HTTPException(500, { message: 'Internal server error' })
    }
  }

  async createTodo (todo: CreateTodoZod) {
    try {
      const newTodo = await this.todosRepository.createTodo(todo)

      return newTodo
    } catch (error: unknown) {
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, { message: error.message })
      }

      throw new HTTPException(500, { message: 'Internal server error' })
    }
  }
}
