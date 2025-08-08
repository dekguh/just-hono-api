
import { supabase } from '../config/supabase'
import { UsersSchemaZod } from '../models/users.model'
import { UsersRepository } from '../repository/users.repository'
import { HTTPException } from 'hono/http-exception'

export class UsersService {
  private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  constructor (
    private usersRepository: UsersRepository
  ) {}

  async signUp (userData: Pick<UsersSchemaZod, 'email' | 'name'> & { password: string }) {
    try {
      const isExist = await this.usersRepository.findByEmail(userData.email)
      if (isExist) {
        throw new HTTPException(400, { message: 'User already exists' })
      }

      const responseSignUp = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      })
      const responseAddDetail = await this.usersRepository.addDetail({
        email: userData.email,
        name: userData.name,
        userId: responseSignUp?.data.user?.id || ''
      })

      return responseAddDetail
    } catch (error: unknown) {
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, { message: error.message })
      }
    }
  }
}
