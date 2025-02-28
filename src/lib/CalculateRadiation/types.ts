export type InputFormat = {
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DNI: {
        [key: string]: number;
      };
    };
  };
};

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

export type RadiationByAngle = {
  [key: string]: {
    [key: string]: {
      [key: string]: number;
    };
  };
};
