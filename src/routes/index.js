import Router from 'koa-router'
import { userRoutes, userAllowedMethods } from './user'
import { loginRoutes, loginAllowedMethods } from './login'
import { registrationRoutes, registrationAllowedMethods } from './registration'

const router = new Router()

router.use(userRoutes())
router.use(loginRoutes())
router.use(registrationRoutes())
router.use(userAllowedMethods())
router.use(loginAllowedMethods())
router.use(registrationAllowedMethods())

export const routes = () => router.routes()

export const allowedMethods = () => router.allowedMethods()
