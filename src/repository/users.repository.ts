import { eq } from 'drizzle-orm'
import { DbType } from '../config/postgres'
import { UsersSchemaZod, usersSchema } from '../models/'

export class UsersRepository {
  constructor (private db: DbType) {}

  async findById (id: number) : Promise<UsersSchemaZod | null> {
    const result = await this.db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, id))
      .limit(1)

    return result[0] ?? null
  }

  async findByEmail (email: string) : Promise<UsersSchemaZod | null> {
    const result = await this.db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email))
      .limit(1)

    return result[0] ?? null
  }
}
