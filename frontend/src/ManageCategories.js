import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageCategories() {
    let navigate = useNavigate();

    let [categories, setCategories] = useState([null]);
    let [searchCategory, setSearchCategory] = useState(""); 
    let [msg, setMessage]=useState("");
    let uname = useSelector(gs=>gs.login);
    let host = useSelector(gs=>gs.host);

    var formControls = document.getElementsByClassName("form-control");

    useEffect(()=> { // runs when component is loaded
        if (uname == "") navigate("/login"); // check user is logged in
    });

    let clearForms = function() {
        setSearchCategory("");
        Array.from(formControls).forEach((formControl) => { formControl.value = ""; });        
    }

    let loadCategories = function(nomessage) {
        axios.get(host + "allCategories").then(result=>{
            setCategories(result.data);
            if (nomessage)
                setMessage("All Categories Loaded");
        }).catch(error=> {
            setMessage(error);
        })
    }

    let categoryRecord = (categories ?? []).filter(c => c != null).length > 0 ? ( // empty list means first element is null
        categories.map(c => (
            <tr>
                <td>{c.cid}</td>
                <td>{c.categoryname}</td>
                <td>
                    <input type="button" value="Update Category" className="btn btn-warning"
                        onClick={(event)=> {updateCategory(event, c.cid);}}
                    />
                </td>
                <td>
                    <input type="button" value="Delete Category" className="btn btn-danger"
                        onClick={(event)=> {deleteCategory(event, c.cid);}}
                    />
                </td>
            </tr>
            ))
        ) : (
            <p>No categories found</p>
    );
    
    let deleteCategory = function(event, cid) {
        axios.delete(host + "deleteCategory/" + cid).then(result=>{
            setMessage(result.data);
            loadCategories(false);
        }).catch(error=> {
            setMessage(error);
        })
    }

    let insertCategory = function(event) {}
    let updateCategory = function(event) {}

    let findCategory = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (searchCategory == "") return; // don't run for empty string
        axios.get(host + "findCategory/" + searchCategory).then(result=>{
            setCategories(result.data);
            console.log(result.data);
            if ((result.data ?? []).filter(c => c != null).length > 0)
                setMessage("1 Category Found");
            else
                setMessage("No categories found");
        }).catch(error=> {
            setMessage(error);
        })
        clearForms();
    }

    return(
        <div>
            <h2>Category Management Page</h2><br/>
            
            <input type="reset" value="Load All Categories" className="btn btn-danger"
                    onClick = {() => loadCategories(true)} /><br/><br/>

            <form className="form-group" onSubmit = {findCategory} >
                <label className="form-label">Or Find Category by Name</label>
                <input type="text" name="searchCategory" className="form-control" 
                    onChange = {(event) => setSearchCategory(event.target.value)}
                /><br/>
                <input type="submit" value="Search" className="btn btn-success"/>                
            </form><br/>

            <h5 style={{color:"red"}}>{msg}</h5>
            <table className="table table-success">
                <thead>
                <tr>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {categoryRecord}
                </tbody>
            </table>
        </div>
    );
}

export default ManageCategories;