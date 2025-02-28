export enum RadiationActionTypes {
  UPDATE_RADIATION = "UPDATE_RADIATION",
}

export type RadiationPayload = {
  radiation: any;
};

export type RadiationAction = {
  type: RadiationActionTypes;
  payload: RadiationPayload;
};
