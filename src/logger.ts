import createDebug from "debug";

export const appLogger = createDebug("soap-rest-api:app");
export const httpLogger = createDebug("soap-rest-api:http");
export const errorLogger = createDebug("soap-rest-api:error");
