import app from "./app";
import { appLogger, errorLogger } from "./logger";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = app.listen(PORT, () => {
  appLogger("Servidor REST corriendo en puerto %d", PORT);
});

server.on("error", (error) => {
  errorLogger("Error al iniciar el servidor: %O", error);
  process.exit(1);
});
