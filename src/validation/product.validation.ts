import Joi from 'joi'

interface ProductInterface {
  name: String
  price: Number
  description: String
}
const createProductValidate = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    description: Joi.number().required()
  })
  return schema.validate(payload)
}

export default createProductValidate
