import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewUsers() {
    let navigate = useNavigate();

    let [users, setUsers] = useState([{}]);
    let [searchUser, setSearchUser] = useState(""); 
    let [msg, setMessage]=useState("");
    let uname = useSelector(gs=>gs.login);
    let host = useSelector(gs=>gs.host);

    var formControls = document.getElementsByClassName("form-control");

    useEffect(()=> { // runs when component is loaded
        if (uname == "") navigate("/login"); // check user is logged in
    });

    let loadUsers = function() {
        axios.get(host + "allUsers").then(result=>{
            setUsers(result.data);
            setMessage("All Users Loaded");
        }).catch(error=> {
            setMessage(error);
        })
    }
/*
    let userRecord = users.map(u=>
        <tr>
            <td>{u.uid}</td>
            <td>{u.username}</td>
            <td>{u.isadmin}</td>
        </tr>
    )
*/

    let userRecord = (users ?? []).filter(u => u != null).length > 0 ? (
        users.map(u => (
            <tr>
                <td>{u.uid}</td>
                <td>{u.username}</td>
                <td>{u.isadmin}</td>
            </tr>
            ))
        ) : (
            <p>No users found</p>
    );

    let findUser = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (searchUser == "") return; // don't run for empty string
        axios.get(host + "findUser/" + searchUser).then(result=>{
            setUsers(result.data);
            if ((result.data ?? []).filter(u => u != null).length > 0)
                setMessage("1 User Found");
            else
                setMessage("");
        }).catch(error=> {
            setMessage(error);
        })
        setSearchUser("");
        Array.from(formControls).forEach((formControl) => { formControl.value = ""; });        
    }

    return(
        <div>
            <h2>User Management Page</h2><br/>
            
            <input type="reset" value="Load All Users" className="btn btn-danger"
                    onClick = {loadUsers} /><br/><br/>

            <form className="form-group" onSubmit = {findUser} >
                <label className="form-label">Or Find User by Username</label>
                <input type="text" name="searchUser" className="form-control" 
                    onChange = {(event) => setSearchUser(event.target.value)}
                /><br/>
                <input type="submit" value="Search" className="btn btn-success"/>                
            </form><br/>

            <h5 style={{color:"red"}}>{msg}</h5>
            <table className="table table-success">
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Is Admin</th>
                </tr>
                </thead>
                <tbody>
                    {userRecord}
                </tbody>
            </table>
        </div>
    );
}

export default ViewUsers;