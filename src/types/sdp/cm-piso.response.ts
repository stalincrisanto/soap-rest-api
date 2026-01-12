export interface CmPisoAttributes {
  txt_name: string;
  txt_cedula_cliente: string;
  ref_proyecto: {
    id: string;
  };
}

export interface CmPiso {
  id: string;
  cm_attributes: CmPisoAttributes;
}

export interface CmPisoSearchResponse {
  response_status: {
    status_code: number;
    status: string;
  }[];
  cm_piso: CmPiso[];
}
