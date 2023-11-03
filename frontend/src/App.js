import './App.css';
import './bootstrap/bootstrap.css';

import { Route, Routes } from 'react-router-dom';

import Navigation from './Navigation';
import Message from './Message';
  import Login from './Login';
  import Signup from './Signup';
  import Home from './Home';
  import ViewUsers from './ViewUsers';
  import ChangePass from './ChangePass';
import Logout from './Logout';

function App() {
 
  return (
    <div class="container">      
      <h1 class="col-12">MEDICARE WEB APPLICATION</h1>  
      <Navigation/><hr/>
      <Message/><br/>

      <Routes>  
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/viewUsers' element={<ViewUsers/>}></Route>
        <Route path='/changePass' element={<ChangePass/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
    </div>
  );

}

export default App;