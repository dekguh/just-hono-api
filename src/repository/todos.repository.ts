import { eq } from 'drizzle-orm'
import { DbType } from '../config/postgres'
import { CreateTodoZod, todosSchema } from '../models'

export class TodosRepository {
  constructor (private db: DbType) {}

  async getTodosByUserId (userId: string) {
    const todos = await this.db.select().from(todosSchema).where(eq(todosSchema.userId, userId))

    return todos
  }

  async createTodo (todo: CreateTodoZod) {
    const newTodo = await this.db.insert(todosSchema).values(todo).returning()

    return newTodo
  }
}
