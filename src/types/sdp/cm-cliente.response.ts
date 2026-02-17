export interface CmClienteAttributes {
  ref_cedula: {
    id: string;
  };
  txt_name: string;
}

export interface CmCliente {
  id: string;
  cm_attributes: CmClienteAttributes;
}

export interface CmClienteSearchResponse {
  response_status: {
    status_code: number;
    status: string;
  }[];
  cm_cliente: CmCliente[];
}
