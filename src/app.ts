import express from "express";
import clienteRoutes from "./routes/poblarCliente.routes";
import poblarTablasRoutes from "./routes/poblarTablas.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cliente-proyectos", clienteRoutes);
app.use("/api/poblar-tablas", poblarTablasRoutes);

export default app;
