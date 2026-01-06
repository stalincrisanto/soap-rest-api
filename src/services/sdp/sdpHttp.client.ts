import axios from "axios";
import { getZohoAccessToken } from "./zohoToken.service";
import { env } from "./config";

export const sdpHttpClient = axios.create({
  baseURL: env.sdpBaseUrl,
  timeout: 30_000,
});

sdpHttpClient.interceptors.request.use(async (config) => {
  const token = await getZohoAccessToken();

  config.headers.set("Authorization", `Zoho-oauthtoken ${token}`);
  config.headers.set("Accept", "application/vnd.manageengine.sdp.v3+json");
  config.headers.set("Content-Type", "application/json");

  return config;
});
