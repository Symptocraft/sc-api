import express from 'express';
import "express-async-errors"; 
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import dbconnection from './configs/db';
import routes from './routes/index.route';
import helmet from 'helmet';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
dbconnection();

app.disable('x-powered-by')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())

app.get("/", (req:Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api", routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});