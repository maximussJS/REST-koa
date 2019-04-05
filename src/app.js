import './postgres'
import Koa from 'koa'
import { ErrorMiddleware } from './middlewares/error'
import { routes, allowedMethods } from './middlewares/routes'

const app = new Koa()

app.use(ErrorMiddleware)
app.use(routes())
app.use(allowedMethods())

app.listen(3000, () => console.log('Listening'))
