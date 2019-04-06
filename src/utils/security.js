import crypto from 'crypto'
import { sign, verify } from 'jsonwebtoken'

export const encryptPassword = password => {
    const hmac = crypto.createHmac('sha512', process.env.SERVER_SALT)
    hmac.update(password)
    return hmac.digest('hex')
}

export const generateToken = id => sign({ id }, process.env.JWT_SECRET)

export const decodeToken = token => {
    const payload = verify(token, process.env.JWT_SECRET)
    if (!payload.id) throw new Error('Invalid Token')
    return payload.id
}
