import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import AdminLanding from "./AdminInterface/AdminLanding";
import AdminProductList from "./AdminInterface/AdminProductList"
import AdminProducts from "./AdminInterface/AdminProducts";
import AdminNewProduct from "./AdminInterface/AdminNewProduct";
import AdminUserList from "./AdminInterface/AdminUserList";
import AdminUser from "./AdminInterface/AdminUser";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const registero = useSelector((state) => state.user.register);
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/> }/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/login" element={user !==null? <Home/>:<Login/>}/>
        <Route path="/register" element={user === null ? <Register /> : registero ==="Usuario creado"?  <Login />: <Register />}/>
        <Route path="/adminhome" element={admin ? <AdminLanding/>: <Login />}/>
        <Route path="/adminproducts" element={admin ? <AdminProductList />: <Login />}/>
        <Route path="/adminproduct/:productId" element={admin ? <AdminProducts />: <Login />}/>
        <Route path="/adminnewproduct" element={admin ? <AdminNewProduct />: <Login />}/>
        <Route path="/adminusers" element={admin ? <AdminUserList />: <Login />}/>
        <Route path="/adminuser/:userId" element={admin ? <AdminUser/>: <Login />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
