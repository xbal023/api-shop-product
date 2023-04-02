import { Router } from 'express'
import { getProduct, postProduct } from '../controlers/product.controler'
const productRouter: Router = Router()

productRouter.get('/', getProduct)
productRouter.get('/:name', getProduct)
productRouter.post('/', postProduct)

export default productRouter
