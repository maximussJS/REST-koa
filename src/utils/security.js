import { sign } from 'jsonwebtoken'
import crypto from 'crypto'

export const encryptPassword = password => {
    const hmac = crypto.createHmac('sha512', process.env.SERVER_SALT)
    hmac.update(password)
    return hmac.digest('hex')
}

export const generateToken = id => sign({ id }, process.env.JWT_SECRET)
