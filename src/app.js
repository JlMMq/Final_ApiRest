import express from "express";
import morgan from "morgan"
import cat from "./routes/categoria.routes";
import prod from "./routes/producto.routes";
import client from "./routes/cliente.routes";
import orden from "./routes/orden.routes";
import cors from "cors";

const app = express();

app.set("port",4000);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(cat);
app.use(prod);
app.use(client);
app.use(orden);

export default app;
