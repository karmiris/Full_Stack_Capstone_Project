import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Logout() {
    let dispatch = useDispatch();
    
    useEffect(()=> { // runs when component is loaded
        dispatch({type:"LOGOUT"});
    }); 

    return(
        <div>
            Logout
        </div>
    );
}

export default Logout;