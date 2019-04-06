import Router from 'koa-router'
import { getUserByLogin } from '../postgres'
import { encryptPassword, generateToken } from '../utils/security'

const router = new Router()

router.post('/login', async ctx => {
    const { login, password } = ctx.request.body
    if (!login) {
        ctx.body = {
            message: 'Login field is required',
        }
        ctx.status = 400
    }
    if (!password) {
        ctx.body = {
            message: 'Password field is required',
        }
        ctx.status = 400
    }
    if (login.length < 8 || login.length > 20) {
        ctx.body = {
            message: 'Invalid login length',
        }
        ctx.status = 400
    }
    if (password.length < 8 || password.length > 20) {
        ctx.body = {
            message: 'Invalid login length',
        }
        ctx.status = 400
    } else {
        const {
            rows: [user],
        } = await getUserByLogin(login)
        if (user && user.password === encryptPassword(password)) {
            ctx.cookies.set('REST-koa', generateToken(user.id), {
                httpOnly: true,
                expiresIn: 36000 + Date.now(),
            })
            ctx.status = 200
            ctx.body = {
                message: 'Authorized',
            }
        } else {
            ctx.body = {
                message: 'Invalid Login Or Password',
            }
            ctx.status = 401
        }
    }
})

export const loginRoutes = () => router.routes()

export const loginAllowedMethods = () => router.allowedMethods()
