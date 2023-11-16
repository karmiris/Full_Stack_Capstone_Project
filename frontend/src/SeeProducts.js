import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SeeProducts() {
    let navigate = useNavigate();

    let [products, setProducts] = useState([null]);
    let [searchProduct, setSearchProduct] = useState({pname: "", enName: false, opName: "0", price: 0.0, enPrice: false, opPrice: "2", cid: "-1"});
    let [searchEnableFilter, setSearchEnableFilter] = useState({enName:false, enPrice:false});
    let [msg, setMessage] = useState("");
    let [options, setOptions] = useState([null]);
    let [optionsLoaded, setOptionsLoaded] = useState(false);
    let uname = useSelector(gs=>gs.login);
    let host = useSelector(gs=>gs.host);

    var formControls = document.getElementsByClassName("form-control");

    useEffect(()=> { // runs when component is loaded
        // check admin user is logged in
        if (uname == "") navigate("/login");
        
        // load categories
        loadOptions();

        // reset checkboxes
        if (searchEnableFilter.enName) document.getElementById("enName").checked = true;
        else document.getElementById("enName").checked = false;
        if (searchEnableFilter.enPrice) document.getElementById("enPrice").checked = true;
        else document.getElementById("enPrice").checked = false;
    });

    let clearForms = function() {
        setSearchProduct({pname: "", enName: false, opName: "0", price: 0.0, enPrice: false, opPrice: "2", cid: "-1"});
        setSearchEnableFilter({enName:false, enPrice:false});
        Array.from(formControls).forEach((formControl) => { formControl.value = ""; });        
        document.getElementById("selName").value = 0;
        document.getElementById("selPrice").value = 2;
        document.getElementById("selCategory").value = -1;        
    }

    let loadProducts = function(nomessage) {
        axios.get(host + "allProductsCustomer").then(result=>{
            setProducts(result.data);
            if (nomessage)
                setMessage("All Products Loaded");
        }).catch(error=> {
            setMessage(error);
        })
        clearForms();
    }

    let productRecord = (products ?? []).filter(p => p != null).length > 0 ? ( // empty list means first element is null
        products.map(p => (
            <tr>
                <td>{p.pid}</td>
                <td>{p.pname}</td>
                <td>{p.price}€</td>
                <td><img src={p.productimage} width="100px" height="100px"/></td>
                <td>{p.category.categoryname}</td>          
                <td>
                    <input type="button" value="To Cart" className="btn btn-danger"
                        onClick={()=> {toCart(p.pid);}}
                    />
                </td>
            </tr>
            ))
        ) : (
            <p>No products found</p>
        )
    ;

    let toCart = function(pid) {
        axios.toCart(host + "findProductCustomer/", {product: {pid: pid}, username: {username: uname}}).then(result=> {
            setMessage(result.data);
        }).catch(error=> {
            setMessage(error);
        })
        clearForms();
    }
    
    let findProduct = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        axios.post(host + "findProductCustomer/", searchProduct).then(result=> {
            setProducts(result.data);
            let x = (result.data ?? []).filter(p => p != null).length;
            setMessage(x + " Product(s) Found");
        }).catch(error=> {
            setMessage(error);
        })
        clearForms();
    }

    let resetFunc = function(event) {
        event.preventDefault(); // prevents default action on "submit", eg page being refreshed etc
        clearForms();
    }

    function loadOptions() {
        if (!optionsLoaded) {
            axios.get(host + "allCategories").then(result=>{
                setOptions(result.data);
                setOptionsLoaded(true); // stop reloading data and refreshing page
            }).catch(error=> {
                setMessage(error);
            })        
        }
    }
    
    return(
        <div>
            <h2>Product Page</h2><br/>
            
            <input type="reset" value="Load All Products" className="btn btn-danger"
                    onClick = {() => loadProducts(true)} /><br/>

            <form className="form-group" onSubmit = {findProduct} >
                <div><b>Or Find Product:</b></div>                

                <input type="checkbox" name="enName" id="enName" className="form-check"
                    onChange = {() => {
                        setSearchEnableFilter((previousValue)=> {return {...previousValue, enName:!searchEnableFilter.enName}}); 
                        setSearchProduct((previousValue)=> {return {...previousValue, enName:!searchProduct.enName}});
                    }}
                />
                <label className="form-label">Product Name</label>
                <select name="selName" className="form-select" value={searchProduct.opName} id="selName" 
                    onChange = {(event) => {
                        setSearchProduct((previousValue)=> {return {...previousValue, opName:event.target.value}});
                    }}>
                    <option value="0" selected>Equals</option>
                    <option value="1" >Contains</option>
                </select>
                <input type="text" name="searchName" className="form-control" 
                    onChange = {(event) => setSearchProduct((previousValue)=> {return {...previousValue, pname:event.target.value}})}
                />

                <input type="checkbox" name="enPrice" id="enPrice" className="form-check"
                    onChange = {() => {
                        setSearchEnableFilter((previousValue)=> {return {...previousValue, enPrice:!searchEnableFilter.enPrice}}); 
                        setSearchProduct((previousValue)=> {return {...previousValue, enPrice:!searchProduct.enPrice}});
                    }}
                />
                <label className="form-label">Product Price</label>
                <select name="selPrice" className="form-select" required value={searchProduct.opPrice} id="selPrice" 
                    onChange = {(event) => {
                        setSearchProduct((previousValue)=> {return {...previousValue, opPrice:event.target.value}});
                    }}>
                    <option value="0" >&lt;</option>
                    <option value="1" >&le;</option>
                    <option value="2" selected>=</option>
                    <option value="3" >&ge;</option>
                    <option value="4" >&gt;</option>
                </select>
                <input type="number" name="searchPrice" className="form-control" min="0.01" step="0.01"
                    onChange = {(event) => setSearchProduct((previousValue)=> {return {...previousValue, price:event.target.value}})}
                />

                <label className="form-label">Product Category</label>
                <select name="selCategory" className="form-select" required value={searchProduct.cid} id="selCategory" 
                    onChange = {(event) => {
                        setSearchProduct((previousValue)=> {return {...previousValue, cid:event.target.value}});
                    }}>
                    <option value="-1" selected>Any Category</option>
                    {(options ?? []).filter(option => option != null).length > 0 ? (
                        options.map((option) => (
                            <option key={option.cid} value={option.cid}>
                                {option.categoryname}
                            </option>
                        ))
                    ) : (
                        <option disabled hidden>No categories</option>
                    )}
                </select>
                <input type="submit" value="Search" className="btn btn-success"/>         
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
                    <th>To Cart</th>                    
                </tr>
                </thead>
                <tbody>
                    {productRecord}
                </tbody>
            </table>
        </div>
    );
}

export default SeeProducts;