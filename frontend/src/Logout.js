import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Logout() {
    let dispatch = useDispatch();
    
    useEffect(()=> { // runs when component is loaded
        dispatch({type:"LOGOUT"});
    });

    return(
        <div>
            <br/><h6 style={{color:"red"}}>Logout Successful</h6>
        </div>
    );
}

export default Logout;