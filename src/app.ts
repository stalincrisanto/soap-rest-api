import express from "express";
import clienteRoutes from "./routes/pronobis.routes";

const app = express();
app.use(express.json());

app.use("/api/cliente-proyectos", clienteRoutes);

export default app;
