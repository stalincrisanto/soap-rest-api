import createDebug from "debug";

const processLogger = createDebug("app:process");
const successLogger = createDebug("app:success");
const errorLogger = createDebug("app:error");
const httpLogger = createDebug("app:http");

if (!process.env.DEBUG) {
  createDebug.enable("app:process,app:success,app:error,app:http");
}

export const logger = {
  process: (message: string, meta?: unknown) => processLogger(message, meta ?? ""),
  success: (message: string, meta?: unknown) => successLogger(message, meta ?? ""),
  error: (message: string, meta?: unknown) => errorLogger(message, meta ?? ""),
  http: (message: string, meta?: unknown) => httpLogger(message, meta ?? ""),
};
