import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageProducts() {
    let navigate = useNavigate();

    let [products, setProducts] = useState([null]);
    let [searchProductName, setSearchProductName] = useState("");
    let [newProduct, setNewProduct] = useState({pname:"", price:0.0, productimage:"", cid:-1, cname:"", isEnabled:true});
    let [msgupdate, setMessageUpdate] = useState("Or Create new Product");
    let [btnupdate, setButtonUpdate] = useState("Create");
    let [pidupdate, setPidUpdate]=useState(0);
    let [btntype, setButtonType] = useState("btn btn-success");
    let [msg, setMessage] = useState("");
    let [enableProd, setEnable] = useState(true);
    let [options, setOptions] = useState([null]);
    let [optionsLoaded, setOptionsLoaded] = useState(false);
    let uname = useSelector(gs=>gs.login);
    let host = useSelector(gs=>gs.host);

    var formControls = document.getElementsByClassName("form-control");

    useEffect(()=> { // runs when component is loaded
        // check user is logged in
        if (uname == "") navigate("/login");
        
        // load categories
        loadOptions();

        // reset checkboxes
        if (enableProd) document.getElementById("addEnabled").checked = true;
        else document.getElementById("addEnabled").checked = false;
        
        console.log("newProduct", newProduct);
        console.log("options", options);
        console.log("optionsLoaded", optionsLoaded);
        console.log("enableProd flag: ", enableProd);
    });

    const sleep = ms => new Promise( // delay for ms milliseconds
        resolve => setTimeout(resolve, ms)
      );

    let clearForms = function(isUpdate) {
        setSearchProductName("");
        setNewProduct({pname:"", price:0.0, productimage:"", cid:0, cname:"", isEnabled:true});
        if (!isUpdate) {
            setMessageUpdate("Or Create new Product");
            setButtonUpdate("Create");
            setButtonType("btn btn-success");
            setEnable(true);    
        }
        Array.from(formControls).forEach((formControl) => { formControl.value = ""; });        
        document.getElementById("addCategory").value = -1;
    }

    let loadProducts = function(nomessage) {
        axios.get(host + "allProducts").then(result=>{
            setProducts(result.data);
            console.log("All Products:", result.data);
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
                <td>{p.price}€</td>
                <td><img src={p.productimage} width="100px" height="100px"/></td>
                <td>{p.category.categoryname}</td>
                <td>{(p.isEnabled) ? "Yes" : "No"}</td>                
                <td>
                    <input type="button" value="Update Product" className="btn btn-warning"
                        onClick={(event)=> {updateProduct(event, p);}}
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
        )
    ;
    
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
        console.log("lift off:", newProduct);
        axios.post(host + "storeProduct/", {pname: newProduct.pname, price: newProduct.price, productimage: newProduct.productimage,
                category: {cid: newProduct.cid}, isEnabled: newProduct.isEnabled}).then(result=> {
            setMessage(result.data);
            loadProducts(false);
        }).catch(error=> {
            setMessage(error);
        })
        clearForms(false);
    }

    let updateProduct = function(event, product) {
        console.log("Update product: ", product);
        clearForms(true);
        setMessageUpdate("Update Product");
        setButtonUpdate("Update");
        setButtonType("btn btn-warning");
        setPidUpdate(product.pid);
        document.getElementById("addProductName").value = product.pname;
        document.getElementById("addPrice").value = product.price;
        document.getElementById("addImage").value = product.productimage;
        document.getElementById("addCategory").value = product.category.cid;
        document.getElementById("addEnabled").value = setEnable(product.isEnabled);    
        setNewProduct( {pname:"", price:0.0, productimage:"", cid:-1, cname:"", isEnabled:true});
        setNewProduct((previousValue)=> {return {...previousValue, pname: product.pname, price: product.price, productimage: product.productimage,
            cid: product.category.cid, cname: product.category.categoryname, isEnabled: product.isEnabled }});
    }

    let updateProductFunc = function() {
        axios.post(host + "updateProduct/", {pid: pidupdate, pname: newProduct.pname, price: newProduct.price, productimage: newProduct.productimage,
                category: {cid: newProduct.cid}, isEnabled: newProduct.isEnabled}).then(result=> {
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

    function loadOptions() {
        if (!optionsLoaded) {
            axios.get(host + "allCategories").then(result=>{
                console.log("result.data", result.data);
                setOptions(result.data);
                setOptionsLoaded(true); // stop reloading data and refreshing page
            }).catch(error=> {
                setMessage(error);
            })        
        }
    }
    
    let changeCategory = (event) => {
        console.log("loaded");
        let filteredOptions = options.filter(record => record.cid == event.target.value);
        setNewProduct((previousValue)=> {return {...previousValue, cid: filteredOptions[0].cid, cname: filteredOptions[0].categoryname}});
    }

    return(
        <div>
            <h2>Product Management Page</h2><br/>
            
            <input type="reset" value="Load All Products" className="btn btn-danger"
                    onClick = {() => loadProducts(true)} /><br/>

            <form className="form-group" onSubmit = {findProduct} >
                <div><b>Or Find Product:</b></div>                

                <input type="checkbox" name="enName" id="enName" className="form-check"
                    onChange = {changeEnable}
                />
                <label className="form-label">Product Name</label>
                <select name="selName" className="form-select" value={newProduct.categoryname} id="selName" onChange = {changeCategory}>
                    <option value="0" selected>Equals</option>
                    <option value="1" >Contains</option>
                </select>
                <input type="text" name="searchName" className="form-control" 
                    onChange = {(event) => setSearchProductName(event.target.value)}
                />

                <input type="checkbox" name="enPrice" id="enPrice" className="form-check"
                    onChange = {changeEnable}
                />
                <label className="form-label">Product Price</label>
                <select name="selPrice" className="form-select" required value={newProduct.categoryname} id="selPrice" onChange = {changeCategory}>
                    <option value="0" >&lt;</option>
                    <option value="1" >&le;</option>
                    <option value="2" selected>=</option>
                    <option value="3" >&ge;</option>
                    <option value="4" >&gt;</option>
                </select>
                <input type="number" name="searchPrice" className="form-control" 
                    onChange = {(event) => setSearchProductName(event.target.value)}
                />

                <label className="form-label">Product Category</label>
                <select name="selCategory" className="form-select" required value={newProduct.categoryname} id="selCategory" onChange = {changeCategory}>                
                    <option value="-1" selected>Any Category</option>
                    {(options ?? []).filter(option => option != null).length > 0 ? (
                        options.map((option) => (
                            <option key={option.cid} value={option.cid}>
                                {option.categoryname}
                            </option>
                        ))
                    ) : (
                        <option disabled hidden></option>
                    )}
                </select>
                <input type="submit" value="Search" className="btn btn-success"/>                
            </form><br/>

            <form className="form-group" onSubmit = {insertProduct} >
                <div><b>{msgupdate}:</b></div>
                <label className="form-label">Product Name</label>
                <input type="text" name="addProductName" className="form-control" required id="addProductName"
                    onChange = {(event) => setNewProduct((previousValue)=> {return {...previousValue, pname:event.target.value}})}
                />
                <label className="form-label">Price</label>
                <input type="number" name="addPrice" className="form-control" required min="0.01" step="0.01" id="addPrice"
                    onChange = {(event) => setNewProduct((previousValue)=> {return {...previousValue, price:event.target.value}})}
                />
                <label className="form-label">Image URL</label>
                <input type="url" name="addImage" className="form-control" required id="addImage"
                    onChange = {(event) => setNewProduct((previousValue)=> {return {...previousValue, productimage:event.target.value}})}
                />
                <label className="form-label">Category</label>                
                <select name="addCategory" className="form-select" required value={newProduct.categoryname} id="addCategory" onChange = {changeCategory}>
                    <option value="-1" selected disabled hidden>Choose Category</option>
                    {(options ?? []).filter(option => option != null).length > 0 ? (
                        options.map((option) => (
                            <option key={option.cid} value={option.cid}>
                                {option.categoryname}
                            </option>
                        ))
                    ) : (
                        <option>No categories</option>
                    )}
                </select>            
                <input type="checkbox" name="addEnabled" id="addEnabled" className="form-check"
                    onChange = {changeEnable}
                />
                <label className="form-label">Enabled</label><br/>
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