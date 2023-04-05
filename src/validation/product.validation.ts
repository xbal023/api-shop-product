import Joi from 'joi'
import { ProductValidate } from '../types/product'

const createProductValidate = (payload: ProductValidate) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow(0, null),
    description: Joi.string(),
    specification: Joi.object({
      send_from: Joi.string().required(),
      products: Joi.number().required(),
      type_product: Joi.string()
    }),
    size: Joi.array().items(
      Joi.object({
        type: Joi.number().min(1).max(1000).allow('XL', 'L', 'M', 'S'),
        isReady: Joi.boolean(),
        stock: Joi.number
      })
    ),
    colors: Joi.array().items(Joi.string().required()),
    tags: Joi.array().items(Joi.string())
  })
  return schema.validate(payload)
}

export const putProductValidate = (payload: ProductValidate) => {
  const schema = Joi.object({
    name: Joi.string().allow(null),
    price: Joi.number().allow(0, null),
    description: Joi.string().allow(null),
    specification: Joi.object({
      send_from: Joi.string(),
      products: Joi.number(),
      type_product: Joi.string()
    }).allow(null),
    size: Joi.array()
      .items(
        Joi.object({
          type: Joi.number().min(1).max(1000).allow('XL', 'L', 'M', 'S'),
          isReady: Joi.boolean(),
          stock: Joi.number
        })
      )
      .allow(null),
    colors: Joi.array().items(Joi.string()).allow(null),
    tags: Joi.array().items(Joi.string()).allow(null)
  })
  return schema.validate(payload)
}

export default createProductValidate
