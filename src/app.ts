import express from "express";
import clienteRoutes from "./routes/pronobis.routes";
import pisosRoutes from "./routes/pisos.routes";
import inmueblesRoutes from "./routes/inmuebles.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cliente-proyectos", clienteRoutes);
app.use("/api/pisos", pisosRoutes);
app.use("/api/inmuebles", inmueblesRoutes);

export default app;
