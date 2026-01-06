import axios from "axios";
import { env } from "./config";

let accessToken: string | null = null;
let expiresAt = 0;

export async function getZohoAccessToken(): Promise<string> {
  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: env.zohoClientId,
    client_secret: env.zohoClientSecret,
    refresh_token: env.zohoRefreshToken,
  });

  const { data } = await axios.post(env.zohoTokenUrl, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  accessToken = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000 - 60_000;

  return accessToken || "";
}
