import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChangePass() {
    let navigate = useNavigate();

    let [msg, setMessage] = useState("");
    let [data, setData] = useState({oldPass: "", pass1: "", pass2: ""}); 
    const isadmin = useRef(0);
    let uname = useSelector(gs=>gs.login);
    let isAdm = useSelector(gs=>gs.isAdmin);
    let host = useSelector(gs=>gs.host);

    var formControls = document.getElementsByClassName("form-control");

    let clearForms = function() {
        setData({oldPass: "", pass1: "", pass2: ""});
        Array.from(formControls).forEach((formControl) => { formControl.value = ""; });
    }
    
    useEffect(()=> { // check user is logged in
        if (uname == "") navigate("/login");
    });

    let updatePass = function (event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (data.pass1 != data.pass2) {
            setMessage("New Passwords do not much");
        }
        else if (data.pass1 == data.oldPass) {
            setMessage("New Password cannot be same as old password");
        }
        else {
            if (isAdm)
                isadmin.current = 1;
            axios.post(host + "signIn", {username: uname, password: data.oldPass}).then(result=> {
                    switch(result.data) {
                        case -1: 
                            setMessage("Wrong old Password");
                            break;
                        case 2:
                        case 1: 
                            axios.post(host + "updatePass", {username: uname, isadmin: isadmin.current, password: data.pass1}).then(result=> {
                                switch(result.data) {
                                    case 101:
                                        setMessage("New Password cannot be empty"); break;
                                    case 1:
                                        setMessage("Password Successfully Updated"); break;
                                    default:
                                        setMessage("Internal Error");
                                }
                            }).catch(error=> {
                                setMessage(error);
                            })
                    }
                }).catch(error=> {
                    setMessage(error);
                })        

        }
        clearForms();
    }

    let resetAction = function (event) {
        event.preventDefault();
        setMessage("");
        clearForms();
    }

    return(
        <div>
            <h2>Update Password</h2>
            <form className="form-group" onSubmit = {updatePass} >
                <label className="form-label">Old Password</label>
                <input type="password" name="oldPass" className="form-control"
                    onChange = {(event) => 
                        setData((previousValue)=> {
                            return {...previousValue, oldPass:event.target.value}
                        })
                    }/><br/>
                <label className="form-label">New Password</label>
                <input type="password" name="pass1" className="form-control"
                    onChange = {(event) => 
                        setData((previousValue)=> {
                            return {...previousValue, pass1:event.target.value}
                        })
                    }/><br/>
                <label className="form-label">Retype new Password</label>
                <input type="password" name="pass2" className="form-control"
                    onChange = {(event) => 
                        setData((previousValue)=> {
                            return {...previousValue, pass2:event.target.value}
                        })
                    }/><br/>
                <input type="submit" value="Submit" className="btn btn-success"/>
                <input type="reset" value="Reset" className="btn btn-danger"
                    onClick = {resetAction} />
            </form>
            <br/><h5 style={{color:"red"}}>{msg}</h5>
        </div>
    )
}

export default ChangePass;