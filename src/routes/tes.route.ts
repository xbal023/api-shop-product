import { Router, Request, Response } from 'express'
import log from '../utils/logger'

const tesRouter: Router = Router()

tesRouter.get('/', (req: Request, res: Response) => {
  log.info('get tes router success')
  res.status(200).send({ status: '200', message: 'success' })
})

export default tesRouter
