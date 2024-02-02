import express, { Express } from "express";
import dotenv from "dotenv";
import { Users } from "./controller/user.controller";
import { generateRoutes } from "./routes/generate";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const controllers = [Users];

const routes = generateRoutes(controllers);

app.use(routes);
app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
