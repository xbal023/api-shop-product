import { Router } from 'express'
import { getAuth, postAuth, getLogin, postLogin } from '../controlers/auth.controler'

const authRouter: Router = Router()

authRouter.get('/register', getAuth)
authRouter.post('/register', postAuth)
authRouter.get('/login', getLogin)
authRouter.post('/login', postLogin)

export default authRouter
