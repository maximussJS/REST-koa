import Router from 'koa-router'
import { getAllUsers, getUserByName, createUser, updateUserAgeById, updateUserNameById, deleteUserById } from '../postgres'

const router = new Router()

router
    .get('/user', async ctx => {
        const {
            rows: [users],
        } = await getAllUsers()
        users ? (ctx.body = users) : (ctx.body = 'No users')
        ctx.status = 200
    })
    .get('/user/:name', async ctx => {
        const {
            rows: [user],
        } = await getUserByName(ctx.params.name)
        user ? (ctx.body = user) : (ctx.status = 400)
    })
    .post('/user', async ctx => {
        ctx.body = await createUser(ctx.request.body.name, ctx.request.body.age)
        ctx.status = 201
    })
    .put('/user/age/:id', async ctx => {
        await updateUserAgeById(ctx.params.id, ctx.request.body.age)
        ctx.status = 204
    })
    .put('/user/name/:id', async ctx => {
        await updateUserNameById(ctx.params.id, ctx.request.body.name)
        ctx.status = 204
    })
    .delete('/user/:id', async ctx => {
        await deleteUserById(ctx.params.id)
        ctx.status = 204
    })

export const userRoutes = () => router.routes()

export const userAllowedMethods = () => router.allowedMethods()
