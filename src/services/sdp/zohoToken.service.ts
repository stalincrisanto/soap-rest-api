import axios from "axios";
import { env } from "../../config/sdp.config";
import { logger } from "../../utils/logger";

let accessToken: string | null = null;
let expiresAt = 0;

export async function getZohoAccessToken(): Promise<string> {
  if (accessToken && Date.now() < expiresAt) {
    logger.success("Token Zoho reutilizado desde caché");
    return accessToken;
  }

  logger.process("Solicitando nuevo token Zoho");

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
    refresh_token: env.ZOHO_REFRESH_TOKEN,
  });

  const { data } = await axios.post(env.ZOHO_TOKEN_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  accessToken = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000 - 60_000;

  logger.success("Nuevo token Zoho obtenido", {
    expiresInSeconds: data.expires_in,
  });

  return accessToken || "";
}
