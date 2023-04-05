import { Router } from 'express'
import { getProduct, postProduct, putProduct, deleteProduct } from '../controlers/product.controler'
const productRouter: Router = Router()

productRouter.get('/', getProduct)
productRouter.get('/:id', getProduct)
productRouter.put('/:id', postProduct)
productRouter.delete('/:id', deleteProduct)

export default productRouter
