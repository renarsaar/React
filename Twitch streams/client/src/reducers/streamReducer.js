import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    // All the time create new object
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      // dispatch payload = id
      return _.omit(state, action.payload);

    case FETCH_STREAMS:
      const newObject = action.payload.reduce(
        (map, item) => ({ ...map, [item.id]: item }),
        {}
      );
      return { ...state, ...newObject };

    default:
      return state;
  }
};
