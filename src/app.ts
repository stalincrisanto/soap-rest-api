import express from "express";
import clienteRoutes from "./routes/pronobis.routes";
import pisosRoutes from "./routes/pisos.routes";
import inmueblesRoutes from "./routes/inmuebles.routes";

const app = express();
app.use(express.json());

app.use("/api/cliente-proyectos", clienteRoutes);
app.use("/api/pisos", pisosRoutes);
app.use("/api/inmuebles", inmueblesRoutes);

export default app;
