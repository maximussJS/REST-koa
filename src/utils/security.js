import crypto from 'crypto'
import jwt from 'koa-jwt'

export const encryptPassword = password => {
    const hmac = crypto.createHmac('sha512', process.env.SERVER_SALT)
    hmac.update(password)
    return hmac.digest('hex')
}

export const generateToken = id => jwt.sign({ id })