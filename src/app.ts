import express from "express";
import clienteRoutes from "./routes/pronobis.routes";
import pisosRoutes from "./routes/pisos.routes";
import inmueblesRoutes from "./routes/inmuebles.routes";
import cors from "cors";
import { httpLogger } from "./logger";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    httpLogger(
      "%s %s -> %d (%dms)",
      req.method,
      req.originalUrl,
      res.statusCode,
      durationMs
    );
  });

  next();
});

app.use("/api/cliente-proyectos", clienteRoutes);
app.use("/api/pisos", pisosRoutes);
app.use("/api/inmuebles", inmueblesRoutes);

export default app;
