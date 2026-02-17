export interface Cliente {
  tipoDocumento?: string;
  documento?: string;
  cliente?: string;
  email?: string;
  celular?: string;
  direccion?: string;
}

export interface Proyecto {
  codigoCompania: number;
  codigoProyecto: number;
  nombreProyecto: string;
}

export interface ClienteResponse {
  success: boolean;
  data: Cliente | null;
}

export interface Response {
  success: boolean;
  data: {
    cliente: Cliente | null;
    proyectos: Proyecto[] | null;
  };
}
