export type Directions =
  | "N"
  | "NE"
  | "NNE"
  | "ENE"
  | "E"
  | "SE"
  | "ESE"
  | "SSE"
  | "S"
  | "SW"
  | "SSW"
  | "WSW"
  | "W"
  | "NW"
  | "NNW"
  | "WNW";

export type RadiationPerAngle = {
  [key: string]: {
    [key: string]: {
      [key: string]: number;
    };
  };
};

export type InputFormat = {
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DNI: {
        [key: string]: number;
      };
    };
  };
};
