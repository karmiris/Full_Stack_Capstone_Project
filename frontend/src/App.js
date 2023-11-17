import './App.css';
import './bootstrap/bootstrap.css';

import { Route, Routes } from 'react-router-dom';

import Navigation from './Navigation';
import Message from './Message';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import ManageCategories from './ManageCategories';
import ManageProducts from './ManageProducts';
import ViewUsers from './ViewUsers';
import ChangePass from './ChangePass';
import SeeProducts from './SeeProducts';
import Checkout from './Checkout';
import Logout from './Logout';

function App() {
 
  return (
    <div className="container">      
      <h1 className="col-12">MEDICARE WEB APPLICATION</h1>  
      <Navigation/><hr/>
      <Message/><br/>

      <Routes>  
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/manageCategories' element={<ManageCategories/>}></Route>
        <Route path='/manageProducts' element={<ManageProducts/>}></Route>
        <Route path='/viewUsers' element={<ViewUsers/>}></Route>
        <Route path='/changePass' element={<ChangePass/>}></Route>
        <Route path='/seeProducts' element={<SeeProducts/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
    </div>
  );

}

export default App;