import Router from 'koa-router'
import { userRoutes, userAllowedMethods } from './user'
import { loginRoutes, loginAllowedMethods } from './login'

const router = new Router()

router.use(loginRoutes())
router.use(loginAllowedMethods())
router.use(userRoutes())
router.use(userAllowedMethods())

export const routes = () => router.routes()

export const allowedMethods = () => router.allowedMethods()
