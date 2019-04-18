import { COLLECTION_GET_SECRET } from "../actions/types";

const DEFAULT_STATE = {
  secret: ""
};

export const collectionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case COLLECTION_GET_SECRET:
      return {
        ...state,
        secret: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
