import { RadiationAction, RadiationActionTypes } from "./types";

const radiationInitialState = {
  radiation: null,
};

export default function RadiationReducer(
  state = radiationInitialState,
  action: RadiationAction
) {
  switch (action.type) {
    case RadiationActionTypes.UPDATE_RADIATION:
      return {
        ...state,
        radiation: action.payload.radiation,
      };

    default:
      return state;
  }
}
