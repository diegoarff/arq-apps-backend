import express from "express";
import cors from "cors"
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use("/", routes);
app.use(errorHandler)

export default app;