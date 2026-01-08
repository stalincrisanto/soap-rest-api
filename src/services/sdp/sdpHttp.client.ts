import { env } from "./config";
import { getZohoAccessToken } from "./zohoToken.service";
import axios from "axios";

export const sdpHttpClient = axios.create({
  baseURL: `${env.SDP_BASE_URL}/app/${env.SDP_PORTAL_ID}`,
  timeout: 30_000,
});

sdpHttpClient.interceptors.request.use(async (config) => {
  const token = await getZohoAccessToken();

  config.headers.set("Authorization", `Zoho-oauthtoken ${token}`);
  config.headers.set("Accept", "application/vnd.manageengine.sdp.v3+json");

  return config;
});
