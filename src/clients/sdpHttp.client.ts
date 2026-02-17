import { env } from "../config/sdp.config";
import axios from "axios";
import { getZohoAccessToken } from "../services/sdp/zohoToken.service";
import { logger } from "../utils/logger";

export const sdpHttpClient = axios.create({
  baseURL: `${env.SDP_BASE_URL}/app/${env.SDP_PORTAL_ID}`,
  timeout: 30_000,
});

sdpHttpClient.interceptors.request.use(async (config) => {
  const token = await getZohoAccessToken();

  config.headers.set("Authorization", `Zoho-oauthtoken ${token}`);
  config.headers.set("Accept", "application/vnd.manageengine.sdp.v3+json");

  logger.process("Request SDP", {
    method: config.method,
    url: config.url,
  });

  return config;
});

sdpHttpClient.interceptors.response.use(
  (response) => {
    logger.success("Response SDP", {
      method: response.config.method,
      url: response.config.url,
      status: response.status,
    });

    return response;
  },
  (error) => {
    logger.error("Error response SDP", {
      method: error.config?.method,
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });

    return Promise.reject(error);
  }
);
