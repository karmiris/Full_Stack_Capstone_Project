import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageCategories() {
    let navigate = useNavigate();

    let [categories, setCategories] = useState([null]);
    let [searchCategory, setSearchCategory] = useState(""); 
    let [newCategory, setNewCategory] = useState(""); 
    let [msgupdate, setMessageUpdate]=useState("Or Create new Category");
    let [btnupdate, setButtonUpdate]=useState("Create");
    let [cidupdate, setCidUpdate]=useState(0);
    let [btntype, setButtonType]=useState("btn btn-success");
    let [msg, setMessage]=useState("");
    let uname = useSelector(gs=>gs.login);
    let host = useSelector(gs=>gs.host);

    var formControls = document.getElementsByClassName("form-control");

    useEffect(()=> { // runs when component is loaded
        if (uname == "") navigate("/login"); // check user is logged in
    });

    const sleep = ms => new Promise( // delay for ms milliseconds
        resolve => setTimeout(resolve, ms)
      );

    let clearForms = function(isUpdate) {
        setSearchCategory("");
        setNewCategory("");
        if (!isUpdate) {
            setMessageUpdate("Or Create Category");
            setButtonUpdate("Create");
            setButtonType("btn btn-success");
        }
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
        clearForms(false);
    }

    let categoryRecord = (categories ?? []).filter(c => c != null).length > 0 ? ( // empty list means first element is null
        categories.map(c => (
            <tr>
                <td>{c.cid}</td>
                <td>{c.categoryname}</td>
                <td>
                    <input type="button" value="Update Category" className="btn btn-warning"
                        onClick={(event)=> {updateCategory(event, c.cid, c.categoryname);}}
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
        clearForms(false);
    }

    let insertCategory = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (newCategory == "") return; // don't run for empty string
        if (msgupdate == "Update Category") {
            updateCategoryFunc();
            return;
        }
        axios.get(host + "storeCategory/" + newCategory).then(result=>{
            setMessage(result.data);
            loadCategories(false);
        }).catch(error=> {
            setMessage(error);
        })
        clearForms(false);
    }

    let updateCategory = function(event, cid, categoryname) {
        clearForms(true);
        setMessageUpdate("Update Category");
        setButtonUpdate("Update");
        setButtonType("btn btn-warning");
        document.getElementById("addCategory").value = categoryname;
        setCidUpdate(cid);
    }

    let updateCategoryFunc = function() {
        axios.post(host + "updateCategory", {cid: cidupdate, categoryname: newCategory}).then(result=> {
            switch(result.data) {
                case 101:
                    setMessage("Category name cannot be empty"); break;
                case 102:
                    setMessage("Category name already exists"); break;
                case 1:
                    setMessage("Category Successfully Updated"); break;
                default:
                    setMessage("Internal Error");
            }
        }).catch(error=> {
            setMessage(error);
        })
            sleep(500).then(() => { // delay 100 milliseconds for database entry to be updated before loading again
            clearForms(false);
            loadCategories(false);            
        })
    }

    let findCategory = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (searchCategory == "") return; // don't run for empty string
        axios.get(host + "findCategory/" + searchCategory).then(result=>{
            setCategories(result.data);
            if ((result.data ?? []).filter(c => c != null).length > 0)
                setMessage("1 Category Found");
            else
                setMessage("No categories found");
        }).catch(error=> {
            setMessage(error);
        })
        clearForms(false);
    }

    let resetFunc = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        clearForms(false);
    }

    return(
        <div>
            <h2>Category Management Page</h2><br/>
            
            <input type="reset" value="Load All Categories" className="btn btn-danger"
                    onClick = {() => loadCategories(true)} /><br/>

            <form className="form-group" onSubmit = {findCategory} >
                <label className="form-label">Or Find Category by Name</label>
                <input type="text" name="searchCategory" className="form-control" 
                    onChange = {(event) => setSearchCategory(event.target.value)}
                />
                <input type="submit" value="Search" className="btn btn-success"/>                
            </form><br/>

            <form className="form-group" onSubmit = {insertCategory} >
                <label className="form-label">{msgupdate}</label>
                <input type="text" name="addCategory" className="form-control" id="addCategory"
                    onChange = {(event) => setNewCategory(event.target.value)}
                />
                <input type="submit" value={btnupdate} className={btntype}/>      
                <input type="reset" value="Reset" className="btn btn-danger"
                    onClick = {resetFunc} /><br/>          
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