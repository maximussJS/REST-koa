export const isOwner = async (ctx, next) => {
    if (ctx.user.id !== +ctx.params.id) {
        ctx.status = 401
        ctx.body = {
            message: 'No root',
        }
    } else await next()
}
