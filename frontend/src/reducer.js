// global variables initialize
let initialState = {                
    isAdmin: false,
    login: "",
    //host: "http://localhost:9090/"
    host: "http://35.175.254.167:9090/"
}

// global variables update
function reducer(state = initialState, action) { 
  switch(action.type) {
    case "LOGIN":
      return {...state, isAdmin: action.payload.isAdmin, login: action.payload.login};
    case "LOGOUT":
      return {...state, isAdmin: false, login: ""};
  }
  return state;
}

// file imported in index.js
export default reducer;