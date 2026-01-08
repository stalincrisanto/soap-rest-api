import express from "express";
import clienteRoutes from "./routes/pronobis.routes";
import pisosRoutes from "./routes/pisos.routes";
import inmueblesRoutes from "./routes/inmuebles.routes";
import sdpRoutes from "./routes/spd.routes";
import poblarCamposRoutes from "./routes/poblarCampos.routes";
import poblarTablasRoutes from "./routes/poblarTablas.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cliente-proyectos", clienteRoutes);
app.use("/api/pisos", pisosRoutes);
app.use("/api/inmuebles", inmueblesRoutes);
app.use("/api/sdp", sdpRoutes);
app.use("/api/poblar-campos", poblarCamposRoutes);
app.use("/api/poblar-tablas", poblarTablasRoutes);

export default app;
