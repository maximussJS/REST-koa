import Router from 'koa-router'
import { isOwner } from '../middlewares/owner'
import { isAuthorized } from '../middlewares/authorize'
import { getAllUsers, getUserByName, updateUserAgeById, updateUserNameById, deleteUserById } from '../postgres'

const router = new Router()

router
    .get('/users', isAuthorized, async ctx => {
        const {
            rows: [users],
        } = await getAllUsers()
        users
            ? (ctx.body = {
                  data: users,
                  message: 'OK',
              })
            : (ctx.body = {
                  message: 'No users',
              })
        ctx.status = 200
    })
    .get('/user', isAuthorized, async ctx => {
        ctx.status = 200
        ctx.body = {
            message: 'OK',
            data: ctx.user,
        }
    })
    .get('/user/:name', isAuthorized, async ctx => {
        const {
            rows: [user],
        } = await getUserByName(ctx.params.name)
        if (!user) {
            ctx.status = 400
            ctx.body = {
                message: `No user with name ${name}`,
            }
        } else {
            ctx.body = {
                data: user,
                message: 'OK',
            }
            ctx.status = 200
        }
    })
    .put('/user/age/:id', isAuthorized, isOwner, async ctx => {
        const { age } = ctx.request.body
        if (age < 6 || age > 80) {
            ctx.body = {
                message: 'Invalid age',
            }
            ctx.status = 400
        } else {
            await updateUserAgeById(ctx.params.id, age)
            ctx.user.age = age
            ctx.body = {
                message: 'Updated!',
            }
            ctx.status = 204
        }
    })
    .put('/user/name/:id', isAuthorized, isOwner, async ctx => {
        const { name } = ctx.request.body
        if (!name) {
            ctx.body = {
                message: 'Name field is required',
            }
            ctx.status = 400
        } else if (name.length < 2 || name.length > 25) {
            ctx.body = {
                message: 'Invalid name length',
            }
            ctx.status = 400
        } else {
            await updateUserNameById(ctx.params.id, name)
            ctx.user.name = name
            ctx.body = {
                message: 'Updated',
            }
            ctx.status = 204
        }
    })
    .delete('/user/:id', isAuthorized, isOwner, async ctx => {
        await deleteUserById(ctx.params.id)
        ctx.body = {
            message: 'Deleted!',
        }
        ctx.status = 204
    })

export const userRoutes = () => router.routes()

export const userAllowedMethods = () => router.allowedMethods()
