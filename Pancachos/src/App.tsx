import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import UserProfilePage from './pages/userprofile/profilepage';
import Favourite from './pages/favourite/favourite';
import MyProducts from './pages/myproducts/myproducts';
import CreateProduct from './pages/createproduct/create';
import EditProduct from './pages/editproduct/edit';

import LoginSelect from './pages/login/loginSelect';
import Register from './pages/login/register';
import Login from './pages/login/login';
import Info from './pages/info/pInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/favourites" element={<Favourite />} />
      <Route path="/myproducts" element={<MyProducts />} />
      <Route path="/createproduct" element={<CreateProduct />} />
      <Route path="/editproduct/:id" element={<EditProduct />} />
      <Route path="/select" element={<LoginSelect />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Info />} />
    </Routes>
  );
}

export default App;