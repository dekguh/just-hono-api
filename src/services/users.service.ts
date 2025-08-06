/* eslint-disable unused-imports/no-unused-vars */
import { supabaseAdmin } from '../config/supabase'
import { UsersSchemaZod } from '../models/users.model'
import { UsersRepository } from '../repository/users.repository'
import { HTTPException } from 'hono/http-exception'

export class UsersService {
  private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  constructor (
    private usersRepository: UsersRepository
  ) {}

  async register (userData: UsersSchemaZod) {
    const isEmailExists = await this.usersRepository.emailExists(userData.email)

    if (isEmailExists) {
      throw new HTTPException(400, {
        message: 'email already exists'
      })
    }

    if (!this.passwordRegex.test(userData.password)) {
      throw new HTTPException(400, {
        message: 'password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
      })
    }

    if (userData.password.length < 8) {
      throw new HTTPException(400, {
        message: 'password must contain at least 8 characters'
      })
    }

    const hashedPassword = await Bun.password.hash(userData.password)

    const userCreated = await this.usersRepository.create({
      ...userData,
      password: hashedPassword
    })

    try {
      await supabaseAdmin.auth.admin.createUser({
        email: userCreated.email,
        password: userCreated.password,
        user_metadata: {
          name: userCreated.name,
          user_id: userCreated.id
        }
      })
    } catch (error) {
      throw new HTTPException(500, {
        message: 'failed to create user in supabase'
      })
    }

    const { password, ...userWithoutPassword } = userCreated

    return userWithoutPassword
  }
}
