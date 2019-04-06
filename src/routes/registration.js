import Router from 'koa-router'
import { getUserByLogin, createUser } from '../postgres'
import { encryptPassword } from '../utils/security'

const router = new Router()

router.post('/registration', async ctx => {
    const { login, password, name, age } = ctx.request.body
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
    if (!name) {
        ctx.body = {
            message: 'Name field is required',
        }
        ctx.status = 400
    }
    if (!age) {
        ctx.body = {
            message: 'Age field is required',
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
    }
    if (name.length < 2 || name.length > 25) {
        ctx.body = {
            message: 'Invalid name length',
        }
        ctx.status = 400
    }
    if (age < 6 || age > 80) {
        ctx.body = {
            message: 'Invalid age',
        }
        ctx.status = 400
    } else {
        const {
            rows: [user],
        } = await getUserByLogin(login)
        if (user) {
            ctx.body = {
                message: `User with login ${login} already exists`,
            }
            ctx.status = 400
        } else {
            await createUser(login, encryptPassword(password), name, age)
            ctx.body = {
                message: 'Created!',
            }
            ctx.status = 201
        }
    }
})

export const registrationRoutes = () => router.routes()

export const registrationAllowedMethods = () => router.allowedMethods()
