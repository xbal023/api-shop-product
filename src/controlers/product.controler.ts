import { Router, Request, Response } from 'express'
import log, { statusOK, unprocessable } from '../utils/logger'
import createProductValidate from '../validation/product.validation'

interface Product {
  id: Number
  name: String
  price: Number
  description: String
}
let product: Product[] = [
  { id: 1, name: 'Tas', price: 200000, description: 'tas untuk sekolah anak anak di sekolah' },
  { id: 2, name: 'Gamis', price: 170000, description: 'gamis untuk perempuan' },
  { id: 3, name: 'Koko', price: 150000, description: 'kok untuk baju lebaran' },
  { id: 4, name: 'Pensil', price: 3000, description: 'pensil untuk menggambar' }
]
export const getProduct = (req: Request, res: Response) => {
  const { params } = req
  if (params.name) {
    log.info('get product success with name')
    const productFiltered = product.filter((prod: Product): Boolean => prod.name == params.name)
    return res.status(200).send(statusOK('Success getting data', productFiltered))
  }
  log.info('get product success')
  return res.status(200).send(statusOK('Success getting data', product))
}

export const postProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidate(req.body)
  if (error) {
    log.error('ERR * product - create ', error.details[0].message)
    return res.status(422).send(unprocessable(error.details[0].message, []))
  }
  log.info('post product success')
  return res.status(200).send(statusOK('Success add product', value))
}
