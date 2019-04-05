import Router from 'koa-router'
import Convert from 'koa-convert'
import Body from 'koa-body'
import { getAllUsers, getUserByName, createUser, updateUserAgeById, updateUserNameById, deleteUserById } from '../postgres'

const router = new Router()

const koaBody = new Convert(Body())

router
    .get('/user', async (ctx, next) => {
        ctx.body = await getAllUsers()
        ctx.status = 200
    })
    .get('/user/:name', async (ctx, next) => {
        const user = await getUserByName(ctx.params.name)
        user ? (ctx.body = user) : (ctx.status = 400)
    })
    .post('/user', async (ctx, next) => {
        ctx.body = await createUser(ctx.request.body.name, ctx.request.body.age)
        ctx.status = 201
    })
    .put('/user/age/:id', async (ctx, next) => {
        await updateUserAgeById(ctx.params.id, ctx.request.body.age)
        ctx.status = 204
    })
    .put('/user/name/:id', async (ctx, next) => {
        await updateUserNameById(ctx.params.id, ctx.request.body.name)
        ctx.status = 204
    })
    .delete('/user/:id', async (ctx, next) => {
        await deleteUserById(ctx.param.id)
        ctx.status = 204
    })

export const routes = () => router.routes()

export const allowedMethods = () => router.allowedMethods()
