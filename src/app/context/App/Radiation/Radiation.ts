import { RadiationAction, RadiationActionTypes, RadiationType } from "./types";

export const radiationInitialState: RadiationType = null;

export default function RadiationReducer(
  state = radiationInitialState,
  action: RadiationAction
): RadiationType {
  switch (action.type) {
    case RadiationActionTypes.UPDATE_RADIATION:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}
