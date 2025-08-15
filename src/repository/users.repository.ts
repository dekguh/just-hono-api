import { eq } from 'drizzle-orm'
import { DbType } from '../config/postgres'
import { TUsersSchema, usersSchema } from '../models/'

export class UsersRepository {
  constructor (private db: DbType) {}

  async findById (id: string) : Promise<TUsersSchema | null> {
    const user = await this.db.select().from(usersSchema).where(eq(usersSchema.id, id)).limit(1)

    return user[0] || null
  }

  async addDetail (userData: Pick<TUsersSchema, 'email' | 'name' | 'id'>) {
    const user = await this.db.insert(usersSchema).values(userData).returning()

    return user[0]
  }

  async findByEmail (email: string) : Promise<TUsersSchema | null> {
    const user = await this.db.select().from(usersSchema).where(eq(usersSchema.email, email)).limit(1)

    return user[0] || null
  }
}
