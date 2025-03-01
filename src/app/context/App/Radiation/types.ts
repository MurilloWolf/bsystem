import { RadiationPerAngle } from "@/lib/PanelSetup/CalcRadiation/types";

export enum RadiationActionTypes {
  UPDATE_RADIATION = "UPDATE_RADIATION",
}

export type RadiationPayload = RadiationPerAngle | null;

export type RadiationType = RadiationPerAngle | null;

export type RadiationAction = {
  type: RadiationActionTypes;
  payload: RadiationPayload;
};
