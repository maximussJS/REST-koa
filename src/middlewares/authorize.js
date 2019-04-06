import { getUserById } from '../postgres'
import { decodeToken } from '../utils/security'

export const isAuthorized = async (ctx, next) => {
    const id = decodeToken(ctx.cookies.get('REST-koa'))
    const {
        rows: [user],
    } = await getUserById(id)
    if (!user) {
        ctx.status = 401
        ctx.body = {
            message: 'Unauthorized',
        }
    } else {
        ctx.user = user
        await next()
    }
}
