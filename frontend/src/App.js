import './App.css';
import {Link, Route, Routes} from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  let isAdmin = useSelector(gs=>gs.isAdmin);
  let fname = useSelector(gs=>gs.login);

  if (fname = '')
    return (
      <div>
        <h2>React Routing App</h2>  
        -- create buttons in another file
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <hr/>

        <Routes>  -- all routes
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </div>
    );
  else if (isAdmin) {
    return(
      <div>
        <h2>React Routing App</h2>  
        <Link to="/home">Home</Link>
        <Link to="/viewUsers">View All Users</Link>
        <Link to="/changePass">Change Password</Link>
        <Link to="/logout">Logout</Link>
        <hr/>

        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/viewUsers' element={<ViewUsers/>}></Route>
          <Route path='/changePass' element={<ChangePass/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
        </Routes>
      </div>
    );
  }
  else if (!isAdmin) {
    return(
      <div>
        <h2>React Routing App</h2>  
        <Link to="/home">Home</Link>
        <Link to="/changePass">Change Password</Link>
        <Link to="/logout">Logout</Link>
        <hr/>

        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/changePass' element={<ChangePass/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
