import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    let [msg, setMessage] = useState("");  // use prop to save signup message!
    const isAdm = useRef(false); //sync call, no re-rendering
    let [login, setLogin] = useState({username:"", password:""}); //async call, re-renders element

    let host = useSelector(gs=>gs.host);
    var formControls = document.getElementsByClassName("form-control");

    let clearForms = function() {
        setLogin({username:"", password:""});
        Array.from(formControls).forEach((formControl) => { formControl.value = ""; });
    }

    useEffect(()=> { // runs when component is loaded
        if (location.state != null)
            setMessage(location.state.message); // get legacy message from signup page (if applicable)
    });

    let verifyUser = function (event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        setMessage("");
        axios.post(host + "signIn", login).then(result=> {
            switch(result.data) {
                case -1: 
                    setMessage("Invalid username or password");
                    break;
                case 2:
                    isAdm.current = true;
                case 1: 
                    setMessage("Successful Login");
                    dispatch({type:"LOGIN",
                        payload:{login:login.username, isAdmin: isAdm.current}});
                    navigate("/home");
            }             
        }).catch(error=> {
            setMessage(error);
        })      
        clearForms();  
    }

    let resetAction = function (event) {
        event.preventDefault();
        setMessage("");
        clearForms();
    }

    return(
        <div>
            <h2>Login Page</h2>
            <form className="form-group" onSubmit = {verifyUser} >
                <label className="form-label">Username</label>
                <input type="text" name="uname" className="form-control" 
                    onChange = {(event) => 
                        setLogin((previousValue)=> {
                            return {...previousValue, username:event.target.value}
                        })
                    }/><br/>
                <label className="form-label">Password</label>
                <input type="password" name="pass" className="form-control"
                    onChange = {(event) => 
                        setLogin((previousValue)=> {
                            return {...previousValue, password:event.target.value}
                        })
                    }/><br/>
                <input type="submit" value="Submit" className="btn btn-success"/>
                <input type="reset" value="Reset" className="btn btn-danger"
                    onSubmit = {resetAction} />
            </form><br/>
            <h5 style={{color:"red"}}>{msg}</h5>
        </div>
    )
}

export default Login;