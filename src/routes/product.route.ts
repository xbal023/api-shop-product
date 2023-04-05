import { Router } from 'express'
import { getProduct, postProduct, putProduct, deleteProduct } from '../controlers/product.controler'
import { requiredBasic } from '../middlewares/auth'

const productRouter: Router = Router()

productRouter.get('/', getProduct)
productRouter.get('/:id', getProduct)
productRouter.post('/:id', requiredBasic, postProduct)
productRouter.put('/:id', requiredBasic, postProduct)
productRouter.delete('/:id', requiredBasic, deleteProduct)

export default productRouter
