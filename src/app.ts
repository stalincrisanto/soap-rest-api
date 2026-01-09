import express from "express";
import poblarTablasRoutes from "./routes/poblarTablas.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/poblar-tablas", poblarTablasRoutes);

export default app;
