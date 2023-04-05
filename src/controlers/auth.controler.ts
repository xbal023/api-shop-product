import { Router, Request, Response } from 'express'
import log, { success, notFound, unprocessable, statusOK } from '../utils/logger'
import registerValidate from '../validation/auth.validation'
import { readFileSync, writeFileSync } from 'fs'
import { Register } from '../types/auth'
import { randomString } from '../utils/helper'

const data = JSON.parse(readFileSync('./database/auth.json').toString())

export const postAuth = async (req: Request, res: Response) => {
  const { error, value } = registerValidate(req.body)
  if (error) {
    log.error('ERR * auth register', error.details[0].message)
    return res.status(422).send(unprocessable(error.details[0].message, []))
  }

  for (let user of data) {
    if (user.email == value.email) {
      return res.status(422).send(unprocessable('Im sorry email has registered, please using another email', []))
    }
  }
  let postVal: Register = Object.assign(value, {
    _id: randomString(2),
    created_at: Date.now(),
    updated_at: Date.now()
  })
  let dataAdd = data.push(postVal)
  await writeFileSync('./database/auth.json', JSON.stringify(dataAdd, null, 4))
  return res.status(201).send(success('Register success', postVal))
}

export const getAuth = async (req: Request, res: Response) => {
  return res.status(200).send(statusOK('input your name: first and last, email, password, role in here', []))
}
