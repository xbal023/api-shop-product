import { Router, Request, Response } from 'express'

const tesRouter: Router = Router()

tesRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send({ status: '200', message: 'success' })
})

export default tesRouter
