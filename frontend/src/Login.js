import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let previousMessage = useSelector(gs=>gs.message);
    let [msg, setMessage] = useState("");           // use prop to save signup message!
    const isAdm = useRef(false); //sync call, no re-rendering
    let [login, setLogin] = useState({username:"", password:""}); //async call, re-renders element

    useEffect(()=> { // runs when component is loaded
        if (previousMessage != msg)      // both varables initialize asynchronously 
            setMessage(previousMessage); // so we align them after page is loaded
    }); 

    let verifyUser = function (event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        axios.post("http://localhost:9090/signIn", login).then(result=> {
            console.log(result.data);
            switch(result.data) {
                case -1: setMessage("Invalid username or password"); break;
                case 2: isAdm.current = true;
                case 1: 
                    setMessage("Successful Login");
                    dispatch({type:"LOGIN",
                        payload:{login:login.username, isAdmin: isAdm.current}});
                    navigate("/home");
            }             
        }).catch(error=> {
            setMessage(error);
        })
    }

    let resetAction = function (event) {
        event.preventDefault();
        setLogin({username:"", password:""});
    }

    return(
        <div>
            <h2>Login Page</h2>
            <form class="form-group" onSubmit = {verifyUser} >
                <label class="form-label">Username</label>
                <input type="text" name="uname" class="form-control" 
                    onChange = {(event) => 
                        setLogin((previousValue)=> {
                            return {...previousValue, username:event.target.value}
                        })
                    }/><br/>
                <label class="form-label">Password</label>
                <input type="password" name="pass" class="form-control"
                    onChange = {(event) => 
                        setLogin((previousValue)=> {
                            return {...previousValue, password:event.target.value}
                        })
                    }/><br/>
                <input type="submit" value="Submit" class="btn btn-success"/>
                <input type="reset" value="Reset" class="btn btn-danger"
                    onSubmit = {resetAction} />
            </form>
            <br/><h5 style={{color:"red"}}>{msg}</h5>
        </div>
    )
}


export default Login;