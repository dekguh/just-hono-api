
import { supabase } from '../config/supabase'
import { TUsersSchema } from '../models/users.model'
import { UsersRepository } from '../repository/users.repository'
import { HTTPException } from 'hono/http-exception'
import { TLoginParamsSchema } from '../types/users.types'

export class UsersService {
  private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  constructor (
    private usersRepository: UsersRepository
  ) {}

  async signIn (userData: TLoginParamsSchema) {
    try {
      const responseSignIn = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      })

      if (responseSignIn.error instanceof Error) {
        throw new HTTPException(400, { message: responseSignIn.error.message })
      }

      return {
        id: responseSignIn.data.user?.id,
        email: responseSignIn.data.user?.email,
        name: responseSignIn.data.user?.user_metadata.name,
        createdAt: responseSignIn.data.user?.created_at,
        updatedAt: responseSignIn.data.user?.updated_at,
        token: responseSignIn.data.session?.access_token
      }
    } catch (error: unknown) {
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, { message: error.message })
      }

      throw new HTTPException(500, { message: 'Internal server error' })
    }
  }

  async signUp (userData: Pick<TUsersSchema, 'email' | 'name'> & { password: string }) {
    try {
      const isExist = await this.usersRepository.findByEmail(userData.email)
      if (isExist) {
        throw new HTTPException(400, { message: 'User already exists' })
      }

      const responseSignUp = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      })

      if (responseSignUp.error instanceof Error) {
        throw new HTTPException(400, { message: responseSignUp.error.message })
      }

      const responseAddDetail = await this.usersRepository.addDetail({
        email: userData.email,
        name: userData.name,
        id: responseSignUp?.data.user?.id || ''
      })

      return responseAddDetail
    } catch (error: unknown) {
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, { message: error.message })
      }
    }
  }

  async getUserMe (userId : string) {
    try {
      const user = await this.usersRepository.findById(userId)

      return user
    } catch (error: unknown) {
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, { message: error.message })
      }

      throw new HTTPException(500, { message: 'Internal server error' })
    }
  }
}
