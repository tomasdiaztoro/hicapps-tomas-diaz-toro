
import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import routes from "./src/routes/routes.js";

const app = express();

app.use(express.json());
app.use("/", routes);

export const api = onRequest(app);
export default app;
