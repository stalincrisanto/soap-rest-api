// import axios from "axios";
// import xml2js from "xml2js";
// import { ClienteResponse, Cliente } from "../types/cliente";
// import { mapSoapClienteToCliente } from "./cliente.mapper";

// const BASE_URL =
//   "http://200.41.89.145:8091/IntegracionPortalPronobisTest/WebServiceInmobiliaria.asmx";

// export const consultarCliente = async (
//   identificacion: string
// ): Promise<ClienteResponse> => {
//   try {
//     const url = `${BASE_URL}/PronobisTrack_Consulta_Cliente?sCCiIdentificacion=${identificacion}`;

//     const response = await axios.get(url, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//     });

//     const parsed = await xml2js.parseStringPromise(response.data, {
//       explicitArray: false,
//       tagNameProcessors: [xml2js.processors.stripPrefix], // 💥 QUITA NAMESPACE (diffgr:, msdata:, etc)
//     });

//     /**
//      * DESPUÉS DEL stripPrefix, EL XML QUEDA ASÍ:
//      *
//      * DataSet
//      *   diffgram
//      *     NewDataSet
//      *       Table
//      */

//     const table: Cliente | null =
//       parsed?.DataSet?.diffgram?.NewDataSet?.Table || null;

//     const formatted = table ? mapSoapClienteToCliente(table) : null;

//     return {
//       success: true,
//       data: formatted,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       data: null,
//     };
//   }
// };
