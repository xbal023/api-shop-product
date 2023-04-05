import jwt from 'jsonwebtoken';
import config from '../config/environment'

export const signJWT = (payload: Object, options?: jwt.SignOptions | undefined) => {
	return jwt.sign(payload, config.private, {
		...(options && options),
		algorithm: 'RS256'
	})
}

export const verifyToken = (token: string) => {
	try {
		const decode = jwt.verify(token, config.public)
		return {
			isValid: true,
			expired: false,
			decode
		}
	} catch (error: any) {
		return {
			isValid: false,
			expired: (error.message === 'jwt is expired or not aligible to use'),
			decode: null
		}
	}
}