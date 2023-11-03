// global variables initialize
let initialState = {                
    isAdmin: false,
    login: "",
    message: ""
}

// global variables update
function reducer(state = initialState, action) { 
  switch(action.type) {
    case "LOGIN":
      return {...state, isAdmin: action.payload.isAdmin, login: action.payload.login};
    case "LOGOUT":
      return {...state, isAdmin: false, login: "", message: ""}
    case "SIGNUP":
      return {...state, message: "Account created successfully"}
  }
  return state;
}

export default reducer;
// file imported in index.js