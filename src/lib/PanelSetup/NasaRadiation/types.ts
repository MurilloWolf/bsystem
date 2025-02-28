export type Location = {
  latitude: number | string;
  longitude: number | string;
};

// API RETURN
type Geometry = {
  type: "Point";
  coordinates: [number, number, number];
};

type ParameterValues = Record<string, number>;

type Parameter = {
  ALLSKY_SFC_SW_DWN: ParameterValues;
};

type Properties = {
  parameter: Parameter;
};

type APIInfo = {
  version: string;
  name: string;
};

type Header = {
  title: string;
  api: APIInfo;
  sources: string[];
  fill_value: number;
  time_standard: string;
  start: string;
  end: string;
};

type ParameterMetadata = {
  units: string;
  longname: string;
};

type Parameters = {
  ALLSKY_SFC_SW_DWN: ParameterMetadata;
};

type Times = {
  data: number;
  process: number;
};

export type ApiResponse = {
  type: "Feature";
  geometry: Geometry;
  properties: Properties;
  header: Header;
  messages: unknown[];
  parameters: Parameters;
  times: Times;
};
