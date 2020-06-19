const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";

//action creator => this is a fucntion which return an action
//action => it is an object with type property
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux action",
  };
}

//initial value of our state
const initialState = {
  numOfCakes: 10,
};

//reducer function
// ( previousState, action ) => newState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

//store creating and functionality
const store = createStore(reducer);
console.log("initial store", store.getState());
const unSubscribe = store.subscribe(() =>
  console.log("updated store", store.getState())
);

//dispatching action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unSubscribe();
