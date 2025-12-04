import axios from "axios";
import xml2js from "xml2js";
import { parseSoapDataset } from "./soapGenericParser";

const BASE_URL =
  "http://200.41.89.145:8091/IntegracionPortalPronobisTest/WebServiceInmobiliaria.asmx";

export const callPronobisGet = async (
  method: string,
  params: Record<string, string>
): Promise<any[] | null> => {
  try {
    const query = new URLSearchParams(params).toString();

    const url = `${BASE_URL}/${method}?${query}`;

    const response = await axios.get(url, {
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
