import app from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  logger.success("Servidor REST iniciado", { port: PORT });
});