import Express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import authorization from './middlewares/authorization'
import cors from 'cors'
import routes from './routes/index'
import log from './utils/logger'
import './config/environment'

const app: Application = Express()
const port: Number = 3500

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
app.use(authorization)
routes(app)

app.listen(port, () => log.info('App listen on port: ' + port))
