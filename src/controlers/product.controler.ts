import { Router, Request, Response } from 'express'
import log, { success, notFound, unprocessable } from '../utils/logger'
import createProductValidate, { putProductValidate } from '../validation/product.validation'
import { readFileSync, writeFileSync } from 'fs'
import { ProductCreate } from '../types/product'
import { randomString } from '../utils/helper'

let data = JSON.parse(readFileSync('./database/product.json').toString())

export const getProduct = async (req: Request, res: Response) => {
  const { params } = req
  if (params.id) {
    const productFiltered = data.filter((prod: ProductCreate) => prod._id == params.id)
    if (productFiltered.length > 0) res.status(201).send(success('Success getting data', productFiltered))
    else res.status(404).send(notFound('Data not found', []))
  } else res.status(201).send(success('Success getting data', data))
}

export const postProduct = async (req: Request, res: Response) => {
  const { error, value } = createProductValidate(req.body)
  if (error) {
    log.error('ERR * product - create ', error.details[0].message)
    return res.status(422).send(unprocessable(error.details[0].message, []))
  }
  let postVal: ProductCreate = Object.assign(value, {
    _id: randomString(2),
    solds: 0,
    favorites: 0,
    created_at: Date.now(),
    updated_at: Date.now()
  })
  let dataAdd = data.push(postVal)
  await writeFileSync('./database/product.json', JSON.stringify(dataAdd, null, 4))
  return res.status(201).send(success('Success add product', postVal))
}

export const putProduct = async (req: Request, res: Response) => {
  const { params } = req
  if (params.id) {
    const productFiltered = data.filter((prod: ProductCreate) => prod._id == params.id)
    if (productFiltered.length > 0) {
      const { error, value } = putProductValidate(req.body)
      if (error) {
        log.error('ERR * product - create ', error.details[0].message)
        return res.status(422).send(unprocessable(error.details[0].message, []))
      }
      let arrNew = Object.assign(productFiltered[0], value, { updated_at: Date.now() })
      let dataNew = data.splice(data.indexOf(productFiltered[0]), 1, arrNew)
      await writeFileSync('./database/product.json', JSON.stringify(dataNew, null, 4))
      return res.status(201).send(success('Success update product', arrNew))
    } else res.status(404).send(notFound('Cannot update data! data not found in database', []))
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { params } = req
  if (params.id) {
    const productFiltered = data.filter((prod: ProductCreate) => prod._id == params.id)
    if (productFiltered.length > 0) {
      let dataNew = data.splice(data.indexOf(productFiltered[0]), 1)
      await writeFileSync('./database/product.json', JSON.stringify(dataNew, null, 4))
      return res.status(201).send(success('Success delete product', {}))
    } else res.status(404).send(notFound('Cannot delete data! data not found in database', []))
  }
}
