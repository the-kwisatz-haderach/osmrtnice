import nc from 'next-connect'
import { dbConnection } from './dbConnection'

const middleware = nc()

middleware.use(dbConnection)

export default middleware
