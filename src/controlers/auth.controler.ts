import { Router, Request, Response, NextFunction } from 'express'
import log, { success, notFound, unprocessable, statusOK } from '../utils/logger'
import registerValidate, {loginValidate} from '../validation/auth.validation'
import { readFileSync, writeFileSync } from 'fs'
import {Register} from '../types/auth'
import { randomString } from '../utils/helper'
import { signJWT } from '../utils/jwt'

const data = JSON.parse(readFileSync('./database/auth.json').toString())

export const postAuth = async (req: Request, res: Response) => {
  const { error, value } = registerValidate(req.body)
  if (error) {
    log.error('ERR * auth register', error.details[0].message)
    return res.status(422).send(unprocessable(error.details[0].message, []))
  }
  
	let findedEmail = data.find((user: Register) => user.email == value.email)
	if (findedEmail) return res.status(422).send(unprocessable('Im sorry email has registered, please using another email', []))
  let postVal: Register = Object.assign(value, {
  	_id: randomString(2),
  	created_at: Date.now(),
  	updated_at: Date.now(),
  })
  let dataAdd = data.push(postVal)
  await writeFileSync('./database/auth.json', JSON.stringify(dataAdd, null, 4))
  return res.status(201).send(success('Register success', postVal))
}

export const getAuth = async (req: Request, res: Response) => {
	return res.status(200).send(statusOK('input your name: first and last, email, password, role in here', []))
}
export const getLogin = async (req: Request, res: Response) => {
	return res.status(200).send(statusOK('input email and password in here', []))
}

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
	const { error, value } = loginValidate(req.body)
  if (error) {
    log.error('ERR * auth login', error.details[0].message)
    return res.status(422).send(unprocessable(error.details[0].message, []))
  }
  let findedEmail = data.find((user: Register) => user.email == value.email)
	if (!findedEmail) return res.status(422).send(unprocessable('Im sorry Email Not registered!', []))
  let findedPass = data.find((user: Register) => user.email == value.email && user.password == value.password)
	if (!findedPass) return res.status(422).send(unprocessable('Wrong email or password, please correct this', []))
  const Access = signJWT({ ...findedEmail }, {
  	expiresIn: '1d'
  })
  res.status(201).send(success('Logged success', Access))
}