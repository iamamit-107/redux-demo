const redux = require("redux");
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//action creator => this is a fucntion which return an action
//action => it is an object with type property
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux action",
  };
}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
  };
}

//initial value of our state
const initialCakeState = {
  numOfCakes: 10,
};

const initialIcecreamState = {
  numOfIcecream: 20,
};

//reducer function
// ( previousState, action ) => newState
const CakeReducer = (state = initialCakeState, action) => {
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

const IcecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIcecream: state.numOfIcecream - 1,
      };
    default:
      return state;
  }
};

//combine multiple reducer
const rootReducer = combineReducer({
  cake: CakeReducer,
  icrcream: IcecreamReducer,
});
//store creating and functionality
const store = createStore(rootReducer);
console.log("initial store", store.getState());
const unSubscribe = store.subscribe(() =>
  console.log("updated store", store.getState())
);

//dispatching action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unSubscribe();
