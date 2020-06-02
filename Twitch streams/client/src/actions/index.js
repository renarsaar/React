// 2 action creaters
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import streams from "../apis/streams";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// (formvalues inside)
// async action creator
// getState = id
export const createStream = (formValues) => async (dispatch, getState) => {
  // inside googleauth.js = this.auth = for userId
  const { userId } = getState().auth;

  // Post all form values
  // Response from axios
  const res = await streams.post("/streams", { ...formValues, userId });

  // reducer to save the stream? endpoint
  dispatch({
    type: CREATE_STREAM,
    payload: res.data,
  });

  // Direct user back to Streams list = Programmatic navigation
  history.push("/");
};

// Fetch Streams
export const fetchStreams = () => async (dispatch) => {
  const res = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: res.data });
};

// Fetch Stream
export const fetchStream = (id) => async (dispatch) => {
  const res = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: res.data });
};

// Delete Stream
export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  // gets nothing back, payload id
  dispatch({ type: DELETE_STREAM, payload: id });

  history.push("/");
};

// Edit Stream
export const editStream = (id, formValues) => async (dispatch) => {
  const res = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: res.data });

  history.push("/");
};
