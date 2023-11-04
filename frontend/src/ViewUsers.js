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

    useEffect(()=> { // runs when component is loaded
        if (uname == "") navigate("/login"); // check user is logged in
        //loadUsers();        /// constantly updates!!!
    });

    let loadUsers = function() {
        axios.get(host + "allUsers").then(result=>{
            setUsers(result.data);
            setMessage("All Users Loaded");
                                            console.log(users);
        }).catch(error=> {
            setMessage(error);
        })
    }

    let loadUsers1 = function(event) {
        event.preventDefault();
        loadUsers(); 
    }

    let userRecord = users.map(u=>
        <tr>
            <td>{u.uid}</td>
            <td>{u.username}</td>
            <td>{u.isadmin}</td>
        </tr>
    )

    let findUser = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        axios.get(host + "findUser/" + searchUser).then(result=>{
            setUsers(result.data);
            setMessage("1 Users Found");
                                            console.log(users);
        }).catch(error=> {
            setMessage(error);
        })
        setSearchUser("");
        //clear form
        //found 1/zero users message
    }

    return(
        <div>
            <h2>User Management Page</h2>
            <h5>Find User</h5>
            <form className="form-group" onSubmit = {findUser} >
                <label className="form-label">Username</label>
                <input type="text" name="searchUser" className="form-control" 
                    onChange = {(event) => setSearchUser(event.target.value)}
                /><br/>
                <input type="submit" value="Search" className="btn btn-success"/>
                <input type="reset" value="Load All Users" className="btn btn-danger"
                    onSubmit = {loadUsers1} />
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