export const ErrorMiddleware = async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        console.error('Error : ', e)
        ctx.status = e.statusCode || e.status || 500
        ctx.body = {
            message: 'Internal Server Error',
        }
    }
}
