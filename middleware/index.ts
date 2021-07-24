import nc from 'next-connect'
import { dbConnection } from './dbConnection'

const attachMiddleware = () => nc().use(dbConnection)

export default attachMiddleware
