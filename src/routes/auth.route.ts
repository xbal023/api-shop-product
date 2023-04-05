import { Router } from 'express'
import { getAuth, postAuth } from '../controlers/auth.controler'
const authRouter: Router = Router()

authRouter.get('/register', getAuth)
authRouter.post('/register', postAuth)

export default authRouter
