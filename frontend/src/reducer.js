// global variables initialize
let initialState = {                
    isAdmin: false,
    login: ""            
}

// global variables update
function reducer(state = initialState, action) { 
                console.log(action, action.payload);
    switch(action.type) {
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return {isAdmin: false, login: ""}
    }
    return state;
}

/*
<input type="button" value="Increment"
       onClick={()=>
        dispatch({type:"DYNAMIC_INCREMENT",payload:n})
        //dispatch({type:"DYNAMIC_INCREMENT",payload:{pid:100, pname:"TV"}})
       }/>
*/

    /* two variable payload
  {
    type: 'FETCH_USERS_SUCCEEDED',
    payload: [{ id: '1', name: 'Mary' }, { id: '2', name: 'Jane' }]
  }*/

export default reducer;
// file imported in index.js