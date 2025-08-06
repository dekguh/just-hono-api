import { Hono } from 'hono'
import { usersRoute } from './routes/users.route'

const app = new Hono()

app.route('/users', usersRoute)

export default app
