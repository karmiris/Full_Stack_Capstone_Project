import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ChangePass() {
    let [msg, setMessage] = useState("");
    let [data, setData] = useState({oldPass: "", pass1: "", pass2: ""}); 
    const isadmin = useRef(0);
    let uname = useSelector(gs=>gs.login);
    let isAdm = useSelector(gs=>gs.isAdmin);

    let updatePass = function (event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (data.pass1 != data.pass2)
            setMessage("New Passwords do not much");
        else {
            if (isAdm)
                isadmin.current = 1;

                // First try to "login" with the old pass, then update new!

            axios.post("http://localhost:9090/updatePass", {username: uname, oldPass: data.oldPass, isAdm: isadmin.current, newPass: data.pass1}).then(result=> {
                switch(result.data) {
                    case -1:
                        setMessage("Wrong Old Password"); break;
                    case 1:
                        setMessage("Password Successfully Updated"); break;
                    default:
                        setMessage("Internal Error");
                }
            }).catch(error=> {
                setMessage(error);
            })
        }
    }

    let resetAction = function (event) {
        setMessage("");
        setData({oldPass: "", pass1: "", pass2: ""});
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
                    onSubmit = {resetAction} />
            </form>
            <br/><h5 style={{color:"red"}}>{msg}</h5>
        </div>
    )
}

export default ChangePass;