import Express, { Application, Request, Response } from "express";

const app: Application = Express();
const port: Number = 4000;

app.use("/", (req: Request, res: Response) => {
	res.status(200).send({ "status": "200", "message": "success" })
})

app.listen(port, () => console.log("App listen on port: " + port));