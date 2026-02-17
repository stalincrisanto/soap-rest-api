import axios from "axios";
import xml2js from "xml2js";
import { parseSoapDataset } from "../utils/soapGenericParser";
import https from "https";

const BASE_URL =
  "https://200.41.89.145:8090/IntegracionPortalPronobis/WebServiceInmobiliaria.asmx";

// const BASE_URL = "https://10.120.4.26:8090/IntegracionPortalPronobis/WebServiceInmobiliaria.asmx";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const callPronobisGet = async (
  method: string,
  params: Record<string, string>,
): Promise<any[] | null> => {
  try {
    const query = new URLSearchParams(params).toString();

    const url = `${BASE_URL}/${method}?${query}`;

    const response = await axios.get(url, {
      httpsAgent,
      headers: { "Content-Type": "application/xml" },
    });

    const parsed = await xml2js.parseStringPromise(response.data, {
      explicitArray: false,
      tagNameProcessors: [xml2js.processors.stripPrefix],
    });

    return parseSoapDataset(parsed);
  } catch (error) {
    console.error("GET GENÉRICO ERROR:", error);
    return null;
  }
};
