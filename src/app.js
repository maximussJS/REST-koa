import './postgres'
import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import { ErrorMiddleware } from './middlewares/error'
import { routes, allowedMethods } from './middlewares'

const app = new Koa()

app.use(logger())
app.use(
    bodyParser({
        onerror: (err, ctx) => ctx.throw('body parse Error : ', err),
    })
)
app.use(ErrorMiddleware)
app.use(routes())
app.use(allowedMethods())

app.listen(3000, () => console.log('Listening'))
