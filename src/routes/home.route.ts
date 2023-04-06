import { Router, Request, Response } from 'express'
import log from '../utils/logger'

const homeRouter: Router = Router()

homeRouter.get('/', (req: Request, res: Response) => {
  log.info('get tes router success')
  res.status(200).send('Fitur API:\n<ul><li>Post register | path: /user/register</li><li>Post Login | path: /user/login</li><li>Post product | path: /product</li><li>Put product | path: /product</li><li>Get product | path: /product</li><li>Delete product | path: /product</li></ul>')
})

export default homeRouter
