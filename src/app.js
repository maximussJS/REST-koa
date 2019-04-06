import { pool } from './postgres'
import Koa from 'koa'
import logger from 'koa-json-logger'
import bodyParser from 'koa-bodyparser'
import { routes, allowedMethods } from './routes'
import { ErrorMiddleware } from './middlewares/error'

const app = new Koa()

app.use(
    logger({
        name: 'REST-koa',
        path: 'logs',
        jsonapi: true,
    })
)
app.use(
    bodyParser({
        onerror: (err, ctx) => ctx.throw('body parse Error : ', 422),
    })
)
app.use(ErrorMiddleware)
app.use(routes())
app.use(allowedMethods())

app.listen(3000, () => console.log('Listening'))

process.on('SIGINT', async () => {
    await pool.end()
    process.nextTick(() => {
        console.log('\nCtrl+C Server Stopped')
        process.exit(0)
    })
})
