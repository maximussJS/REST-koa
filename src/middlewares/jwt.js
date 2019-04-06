import koaJWT from 'koa-jwt'

export const jwt = koaJWT({
    secret: process.env.JWT_SECRET,
})
