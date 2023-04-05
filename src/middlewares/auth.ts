import { Request, Response, NextFunction } from 'express'

export const requiredBasic = (req:Request, res:Response, next:NextFunction) => {
	const basic = res.locals.user
	if (!basic) return res.sendStatus(403)
	return next()
}