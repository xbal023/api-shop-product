import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

const authorization = async (req:Request, res:Response, next:NextFunction) => {
	const getToken = req.headers.authorization?.replace(/^Bearer\s/,'')
	if (!getToken) return next()
	const { decode, expired } = verifyToken(getToken)
	if (decode) {
		res.locals.user = decode
		return next()
	}
	if (expired) return next()
	return next()
}

export default authorization;