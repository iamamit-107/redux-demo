const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axois = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  user: [],
  error: "",
};

//action are declared
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCERSS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//action createor are created
function fetchUSerRequest() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}

function fetchUserSuccess(user) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: user,
  };
}

function fetchUserFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//async action creator
const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUSerRequest());
    axois
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.name);
        dispatch(fetchUserSuccess(users));
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUser());
