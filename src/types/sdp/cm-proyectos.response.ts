export interface CmProyectoAttributes {
  txt_name: string;
}

export interface CmProyecto {
  id: string;
  cm_attributes: CmProyectoAttributes;
}

export interface CmProyectoSearchResponse {
  response_status: {
    status_code: number;
    status: string;
  }[];
  cm_proyecto: CmProyecto[];
}
