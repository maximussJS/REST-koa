import Router from 'koa-router'
import { getUserByLogin, createUser } from '../postgres'
import { encryptPassword } from '../utils/security'

const router = new Router()

router.post('/registration', async ctx => {
    const { login, password, name, age } = ctx.request.body
    if (!login) {
        ctx.body = 'Login field is required'
        ctx.status = 400
    }
    if (!password) {
        ctx.body = 'Password field is required'
        ctx.status = 400
    }
    if (!name) {
        ctx.body = 'Name field is required'
        ctx.status = 400
    }
    if (!age) {
        ctx.body = 'Age field is required'
        ctx.status = 400
    }
    if (login.length < 8 || login.length > 20) {
        ctx.body = 'Invalid login length'
        ctx.status = 400
    }
    if (password.length < 8 || password.length > 20) {
        ctx.body = 'Invalid login length'
        ctx.status = 400
    }
    if (name.length < 2 || name.length > 25) {
        ctx.body = 'Invalid name length'
        ctx.status = 400
    }
    if (age < 6 || age > 80) {
        ctx.body = 'Invalid age'
        ctx.status = 400
    } else {
        const user = await getUserByLogin(login)
        console.log(user)
        if (user) {
            ctx.body = `User with login ${login} already exists`
            ctx.status = 400
        } else {
            await createUser(login, encryptPassword(password), name, age)
            ctx.body = 'Created!'
            ctx.status = 201
        }
    }
})

export const registrationRoutes = () => router.routes()

export const registrationAllowedMethods = () => router.allowedMethods()
