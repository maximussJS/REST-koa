import { load } from 'dotenv'

load()

const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
    ctx.body = 'Hi'
    return next()
        .then(() => console.log(`${ctx.method} ${ctx.url} - ${Date.now()} ms`))
        .catch(err => console.error('Error : ', err))
})

app.listen(3000)
