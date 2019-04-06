import Router from 'koa-router'
import { getUserByLogin } from '../postgres'
import { encryptPassword, generateToken } from '../utils/security'

const router = new Router()

router.post('/login', async ctx => {
    const { login, password } = ctx.request.body
    if (!login) {
        ctx.body = 'Login field is required'
        ctx.status = 400
    }
    if (!password) {
        ctx.body = 'Password field is required'
        ctx.status = 400
    }
    if (login.length < 8 || login.length > 20) {
        ctx.body = 'Invalid login length'
        ctx.status = 400
    }
    if (password.length < 8 || password.length > 20) {
        ctx.body = 'Invalid login length'
        ctx.status = 400
    } else {
        const {
            rows: [user],
        } = await getUserByLogin(login)
        if (user && user.password === encryptPassword(password)) {
            ctx.status = 200
            ctx.body = {
                token: generateToken(user.id),
                message: 'Authorized',
            }
        } else {
            ctx.body = 'Invalid Login Or Password'
            ctx.status = 401
        }
    }
})

export const loginRoutes = () => router.routes()

export const loginAllowedMethods = () => router.allowedMethods()
