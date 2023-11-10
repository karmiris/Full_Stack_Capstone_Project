import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageProducts() {
    let navigate = useNavigate();

    let [products, setProducts] = useState([null]);
    let [searchProductName, setSearchProductName] = useState("");
    let [newProduct, setNewProduct] = useState({pname:"", price:0.0, productimage:"", cid:0, cname:"", isEnabled:true});
    let [msgupdate, setMessageUpdate] = useState("Or Create new Product");
    let [btnupdate, setButtonUpdate] = useState("Create");
    let [pidupdate, setPidUpdate]=useState(0);
    let [btntype, setButtonType] = useState("btn btn-success");
    let [msg, setMessage] = useState("");
    let [enableProd, setEnable] = useState("true");
    let uname = useSelector(gs=>gs.login);
    let host = useSelector(gs=>gs.host);

    var formControls = document.getElementsByClassName("form-control");

    useEffect(()=> { // runs when component is loaded
        if (uname == "") navigate("/login"); // check user is logged in   
        console.log(newProduct);    
    });

    const sleep = ms => new Promise( // delay for ms milliseconds
        resolve => setTimeout(resolve, ms)
      );

    let clearForms = function(isUpdate) {
        setSearchProductName("");
        setNewProduct("");
        if (!isUpdate) {
            setMessageUpdate("Or Create new Product");
            setButtonUpdate("Create");
            setButtonType("btn btn-success");
        }
        Array.from(formControls).forEach((formControl) => { formControl.value = ""; });        
    }

    let loadProducts = function(nomessage) {
        axios.get(host + "allProducts").then(result=>{
            setProducts(result.data);
            if (nomessage)
                setMessage("All Products Loaded");
        }).catch(error=> {
            setMessage(error);
        })
        clearForms(false);
    }

    let productRecord = (products ?? []).filter(p => p != null).length > 0 ? ( // empty list means first element is null
        products.map(p => (
            <tr>
                <td>{p.pid}</td>
                <td>{p.pname}</td>
                <td>{p.price}</td>
                <td><img src={p.productimage} width="100px" height="100px"/></td>
                <td>{p.category.categoryname}</td>
                <td>{p.isEnabled}</td>                
                <td>
                    <input type="button" value="Update Product" className="btn btn-warning"
                        onClick={(event)=> {updateProduct(event, p);}}
                        //onClick={(event)=> {updateProduct(event, p.pid);}}
                    />
                </td>
                <td>
                    <input type="button" value="Delete Product" className="btn btn-danger"
                        onClick={(event)=> {deleteProduct(event, p.pid);}}
                    />
                </td>
            </tr>
            ))
        ) : (
            <p>No products found</p>
    );
    
    let deleteProduct = function(event, pid) {
        axios.delete(host + "deleteProduct/" + pid).then(result=>{
            setMessage(result.data);
            loadProducts(false);
        }).catch(error=> {
            setMessage(error);
        })
        clearForms(false);
    }

    let insertProduct = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (msgupdate == "Update Product") {
            updateProductFunc();
            return;
        }
        //axios.post(host + "storeProduct/", {pid: newProduct.pid, pname: newProduct.pname, price: newProduct.price, productimage: newProduct.productimage,
          //      cid: newProduct.cid, cname: newProduct.cname, isEnabled: newProduct.isEnabled}).then(result=> {
        axios.post(host + "storeProduct/", newProduct).then(result=> {
            setMessage(result.data);
            loadProducts(false);
        }).catch(error=> {
            setMessage(error);
        })
        clearForms(false);
    }

    let updateProduct = function(event, pid) {
        clearForms(true);
        setMessageUpdate("Update Product");
        setButtonUpdate("Update");
        setButtonType("btn btn-warning");
        setPidUpdate(pid);
    }

    let updateProductFunc = function() {
        axios.post(host + "updateProduct", {pid: pidupdate, newProduct}).then(result=> {
            switch(result.data) {
                case 101:
                    setMessage("Product name cannot be empty"); break;
                case 102:
                    setMessage("Price must be positive"); break;
                case 103:
                    setMessage("Product name already exists"); break;
                case 1:
                    setMessage("Product Successfully Updated"); break;
                default:
                    setMessage("Internal Error");
            }
        }).catch(error=> {
            setMessage(error);
        })
            sleep(100).then(() => { // delay 100 milliseconds for database entry to be updated before loading again
            clearForms(false);
            loadProducts(false);            
        })
    }

    let findProduct = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        if (searchProductName == "") return; // don't run for empty string
        axios.get(host + "findProduct/" + searchProductName).then(result=>{
            setProducts(result.data);
            if ((result.data ?? []).filter(p => p != null).length > 0)
                setMessage("1 Product Found");
            else
                setMessage("No products found");
        }).catch(error=> {
            setMessage(error);
        })
        clearForms(false);
    }

    let resetFunc = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        clearForms(false);
    }

    let changeEnable = function(event) {
        setEnable(current => !current);
        setNewProduct((previousValue)=> {return {...previousValue, isEnabled:!newProduct.isEnabled}});
    }

    return(
        <div>
            <h2>Product Management Page</h2><br/>
            
            <input type="reset" value="Load All Products" className="btn btn-danger"
                    onClick = {() => loadProducts(true)} /><br/>

            <form className="form-group" onSubmit = {findProduct} >
                <label className="form-label"><b>Or Find Product by Name:</b></label>
                <input type="text" name="searchProduct" className="form-control" 
                    onChange = {(event) => setSearchProductName(event.target.value)}
                />
                <input type="submit" value="Search" className="btn btn-success"/>                
            </form><br/>

            <form className="form-group" onSubmit = {insertProduct} >
                <div><b>{msgupdate}:</b></div>
                <label className="form-label">Product Name</label>
                <input type="text" name="addProductName" className="form-control" 
                    onChange = {(event) => setNewProduct((previousValue)=> {return {...previousValue, pname:event.target.value}})}
                />
                <label className="form-label">Price</label>
                <input type="decimal" name="addPrice" className="form-control" 
                    onChange = {(event) => setNewProduct((previousValue)=> {return {...previousValue, price:event.target.value}})}
                />
                <label className="form-label">Image URL</label>
                <input type="url" name="addImage" className="form-control" 
                    onChange = {(event) => setNewProduct((previousValue)=> {return {...previousValue, productimage:event.target.value}})}
                />
                <label className="form-label">Enabled</label>
                <input type="checkbox" name="addEnabled" className="form-check" defaultChecked={enableProd} 
                    onChange = {changeEnable}
                />
                <input type="submit" value={btnupdate} className={btntype}/>      
                <input type="reset" value="Reset" className="btn btn-danger"
                    onClick = {resetFunc} /><br/>          
            </form><br/>

            <h5 style={{color:"red"}}>{msg}</h5>
            <table className="table table-success">
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category Name</th>
                    <th>Is Enabled?</th>
                    <th>Update</th>
                    <th>Delete</th>                    
                </tr>
                </thead>
                <tbody>
                    {productRecord}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProducts;