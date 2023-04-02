import Express, { Application, Request, Response } from 'express';
import routes from "./routes/index"
const app: Application = Express();
const port: Number = 3000;

routes(app)

app.listen(port, () => console.log('App listen on port: ' + port));
