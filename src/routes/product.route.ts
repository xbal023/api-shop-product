import { Router, Request, Response, NextFunction } from 'express'
import log from '../utils/logger'
import createProductValidate from '../validation/product.validation'

const productRouter: Router = Router()

productRouter.get('/', (req: Request, res: Response) => {
  log.info('get product success')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: [{ id: 1, name: 'Tas sekolah', price: 200000, description: 'tas untuk sekolah anak anak di sekolah' }]
  })
})
productRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidate(req.body)
  if (error) {
    log.error('ERR * product - create ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [] })
  }
  log.info('post product success')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Success add product',
    data: [{ id: 1, name: 'Tas sekolah', price: 200000, description: 'tas untuk sekolah anak anak di sekolah' }]
  })
})

export default productRouter
