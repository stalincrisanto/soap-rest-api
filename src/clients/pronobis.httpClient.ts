import axios from "axios";
import xml2js from "xml2js";
import { parseSoapDataset } from "../utils/soapGenericParser";
import https from "https";
import { logger } from "../utils/logger";

const BASE_URL =
  "https://200.41.89.145:8090/IntegracionPortalPronobis/WebServiceInmobiliaria.asmx";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const callPronobisGet = async (
  method: string,
  params: Record<string, string>
): Promise<any[] | null> => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/${method}?${query}`;

    logger.process("Llamando servicio Pronobis", { method, params });

    const response = await axios.get(url, {
      httpsAgent,
      headers: { "Content-Type": "application/xml" },
    });

    const parsed = await xml2js.parseStringPromise(response.data, {
      explicitArray: false,
      tagNameProcessors: [xml2js.processors.stripPrefix],
    });

    const dataset = parseSoapDataset(parsed);
    logger.success("Respuesta Pronobis procesada", {
      method,
      records: dataset?.length ?? 0,
    });

    return dataset;
  } catch (error: any) {
    logger.error("Error consumiendo Pronobis", {
      method,
      message: error?.message,
      status: error?.response?.status,
    });

    return null;
  }
};
