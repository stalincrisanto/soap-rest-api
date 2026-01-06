export interface AllowedValue {
  value: string;
}

export interface UpdateUdfPayload {
  udf_field: {
    allowed_values: AllowedValue[];
  };
}
