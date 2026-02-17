export interface SdpResponseStatus {
  status_code: number;
  status: string;
}

export interface CmCedulaAttributes {
  txt_name: string;
}

export interface CmCedula {
  id: string;
  cm_attributes: CmCedulaAttributes;
}

export interface CmCedulaListInfo {
  has_more_rows: boolean;
  start_index: number;
  row_count: number;
  page: number;
  fields_required: string[];
  search_criteria: {
    field: string;
    value: string;
    condition: string;
  };
}

export interface CmCedulaSearchResponse {
  response_status: SdpResponseStatus[];
  cm_cedula: CmCedula[];
  list_info: CmCedulaListInfo;
}
