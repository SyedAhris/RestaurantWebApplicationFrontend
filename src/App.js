import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './App.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContext} from './UserContext' 
import {useState} from 'react';
import AdminLogin from './admin/AdminLogin';
import AdminOnlineOrder from './admin/AdminOnlineOrder';
import Customers from './admin/Customers';
import Employees from './admin/Employees';
import Orders from './admin/Orders';
import Dishes from './admin/Dishes'
import EmployeesOfOnlineOrders from './admin/EmployeesOfOnlineOrders';
import EmployeesOfOrders from './admin/EmployeesOfOrders';
import AddOrders from './admin/AddOrders';
function App() {

  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] =useState(false)
  const [adminCart, setAdminCart] = useState([]);
  const [adminCartTotal, setAdminCartTotal] = useState(0);

  const [admin, setAdmin] = useState();
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);

  return (
    <>
    <UserContext.Provider  value={{user, setUser, cart, setCart, isLoggedIn, setIsLoggedIn, cartTotal, setCartTotal, admin, setAdmin, adminIsLoggedIn,setAdminIsLoggedIn, adminCart, setAdminCart, adminCartTotal, setAdminCartTotal}}>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/menu' element={<Menu/>} />
          <Route exact path='/orderhistory' element={<OrderHistory/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<SignUp/>} />
            <Route exact path='/adminlogin' element={<AdminLogin/>}></Route>
            <Route exact path='/admin/onlineorders' element={<AdminOnlineOrder/>}></Route>
            <Route exact path='/admin/orders' element={<Orders/>}></Route>
            <Route exact path='/admin/dishes' element={<Dishes/>}></Route>
            <Route exact path='/admin/employees' element={<Employees/>}></Route>
            <Route exact path='/admin/customers' element={<Customers/>}></Route>
            <Route exact path='/admin/employeeonlineorders' element={<EmployeesOfOnlineOrders/>}></Route>
            <Route exact path='/admin/employeeorders' element={<EmployeesOfOrders/>}></Route>
            <Route exact path='/admin/addorders' element={<AddOrders/>}></Route>
        </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
