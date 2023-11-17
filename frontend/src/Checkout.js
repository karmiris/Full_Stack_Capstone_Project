import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
    let navigate = useNavigate();

    let [msg, setMessage] = useState("");
    let [summary, setSummary] = useState("");
    let [cartLoaded, setCartLoaded] = useState(false);
    let [cart, setCart] = useState([null]);
    let uname = useSelector(gs=>gs.login);
    let host = useSelector(gs=>gs.host);

    useEffect(()=> { // runs when component is loaded
        // check admin user is logged in
        if (uname == "") navigate("/login");
    
        // load categories
        loadCart();
    });
  
    const sleep = ms => new Promise( // delay for ms milliseconds
      resolve => setTimeout(resolve, ms)
    );

    function loadCart() {
        if (!cartLoaded) {
            axios.get(host + "findOrders/" + uname).then(result=>{
                setCart(result.data);
                setCartLoaded(true); // stop reloading data and refreshing page
                const orders = result.data;
                const sum = orders.reduce((acc, order) => acc + order.product.price * order.quantity, 0);
                const count = orders.reduce((acc, order) => acc + order.quantity, 0);
                setSummary("Products in Cart: " + count + ", Total Cost: " + sum.toFixed(2) +"€" );
            }).catch(error=> {
                setSummary(error);
            })        
        }
        sleep(100).then(() => { // delay screen refresh for 100 milliseconds            
        })
    }

    let cartRecord = (cart ?? []).filter(p => p != null).length > 0 ? ( // empty list means first element is null
        cart.map(p => (
            <tr>
                <td>{p.product.pid}</td>
                <td>{p.product.pname}</td>
                <td>{p.product.price}€</td>
                <td><img src={p.product.productimage} width="100px" height="100px"/></td>
                <td>{p.product.category.categoryname}</td>
                <td>
                    {p.quantity}
                    <input type="button" value="+" className="btn btn-success"
                        onClick={()=> {itemInc(p.oid);}}
                    />
                    <input type="button" value="-" className="btn btn-warning"
                        onClick={()=> {itemDec(p.oid);}}
                    />
                </td>
                <td>
                    <input type="button" value="Remove from Cart" className="btn btn-danger"
                        onClick={()=> {deleteCart(p.oid);}}
                    />
                </td>
            </tr>
            ))
        ) : (
            <p>No products in cart</p>
        )
    ;

    let itemInc = function(oid) {
        setMessage("");
        axios.post(host + "itemInc/" + oid).then(result=> {
            setMessage(result.data);
            setCartLoaded(false); // reload cart
            loadCart();
        }).catch(error=> {
            setMessage(error);
            setCartLoaded(false); // reload cart
            loadCart();
        })
    }

    let itemDec = function(oid) {
        setMessage("");
        axios.post(host + "itemDec/" + oid).then(result=> {
            setMessage(result.data);
            setCartLoaded(false); // reload cart
            loadCart();
        }).catch(error=> {
            setMessage(error);
            setCartLoaded(false); // reload cart
            loadCart();
        })
    }

    let deleteCart = function(oid) {
        setMessage("");
        axios.delete(host + "removeCart/" + oid).then(result=> {
            setMessage(result.data);
            setCartLoaded(false); // reload cart
            loadCart();
        }).catch(error=> {
            setMessage(error);
            setCartLoaded(false); // reload cart
            loadCart();
        })
    }

    let checkOut = function() {
        setMessage("");
        axios.post(host + "checkout/" + uname).then(result=> {
            setMessage(result.data);
            setCartLoaded(false); // reload cart
            loadCart();
        }).catch(error=> {
            setMessage(error);
            setCartLoaded(false); // reload cart
            loadCart();
        })
    }

    return(
        <div>
            <h2>Products in your cart:</h2><br/>
         
            <input type="button" value="CheckOut" className="btn btn-danger"
                onClick={()=> {checkOut();}}
            /><br/><br/>

            <h5 style={{color:"red"}}>{msg}</h5>
            <h5 style={{color:"red"}}>{summary}</h5>
            <table className="table table-success">
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category Name</th>
                    <th>Quantity</th>                    
                    <th>Remove from Cart</th>                    
                </tr>
                </thead>
                <tbody>
                    {cartRecord}
                </tbody>
            </table>
        </div>
    );
}

export default Checkout;