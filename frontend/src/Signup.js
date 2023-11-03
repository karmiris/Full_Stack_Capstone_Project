import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    let navigate = useNavigate();

    let [msg, setMessage] = useState("");
    let [login, setLogin] = useState({username:"", password:"", isadmin: 0}); //async call, re-renders element

    let saveUser = function (event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        setMessage("");
        console.log(login);
        axios.post("http://localhost:9090/signUp", login).then(result=> {
            setMessage(result.data);
            setLogin({username:"", password:"", isadmin: 0});
            if (result.data == "Account created successfully") {
                navigate("/login", {
                    state: { message: result.data }
                });
            }            
        }).catch(error=> {
            setMessage(error);
        })
    }

    let resetAction = function (event) {
        setMessage("");
        setLogin({username:"", password:"", isadmin: 0});
    }

    return(
        <div>
            <h2>Signup Page</h2>
            <form className="form-group" onSubmit = {saveUser} >
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
            </form>
            <br/><h5 style={{color:"red"}}>{msg}</h5>
        </div>
    )
}

export default Signup;