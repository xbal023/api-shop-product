import { Application, Router } from 'express'
import tesRouter from './tes'

const _routes: Array<[string, Router]> = [['/tes', tesRouter]]

const routes = (app: Application) => {
  _routes.forEach(([url, router]) => {
    app.use(url, router)
  })
}

export default routes
