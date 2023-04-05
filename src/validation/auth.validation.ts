import Joi from 'joi'
import { RegisterValidate } from '../types/auth'

const registerValidate = (payload: RegisterValidate) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.object({
      first: Joi.string().required(),
      last: Joi.string().required()
    }),
    password: Joi.string().min(6).required(),
    role: Joi.allow('BASIC', 'VIP', 'VVIP', 'ADMIN').default('BASIC')
  })
  return schema.validate(payload)
}

export default registerValidate
