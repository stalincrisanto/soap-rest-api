export interface CmInmuebleAttributes {
  txt_name: string;
  txt_cedula_cliente: string;
  ref_proyecto: {
    id: string;
  };
  ref_piso: {
    id: string;
  };
}

export interface CmInmueble {
  id: string;
  cm_attributes: CmInmuebleAttributes;
}

export interface CmInmuebleSearchResponse {
  response_status: {
    status_code: number;
    status: string;
  }[];
  cm_inmueble: CmInmueble[];
}
