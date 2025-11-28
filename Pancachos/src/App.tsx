import './App.css'
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { hydrateAuth } from './redux/slices/authSlice';
import { hydrateProducts } from './redux/slices/productsSlice';
import { hydrateCart } from './redux/slices/cartSlice';
import Home from './pages/home/home';
import UserProfilePage from './pages/userprofile/profilepage';
import Favourite from './pages/favourite/favourite';
import MyProducts from './pages/myproducts/myproducts';
import CreateProduct from './pages/createproduct/create';
import EditProduct from './pages/editproduct/edit';
import Register from './pages/login/register';
import Login from './pages/login/login';
import Info from './pages/info/pInfo';
import CartPage from './pages/cart/cart';
import SearchPage from './pages/search/search';

function App() {
  const dispatch = useAppDispatch();

  // Hidratar Redux desde localStorage al cargar la app
  useEffect(() => {
    dispatch(hydrateAuth());
    dispatch(hydrateProducts());
    dispatch(hydrateCart());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/favourites" element={<Favourite />} />
      <Route path="/myproducts" element={<MyProducts />} />
      <Route path="/createproduct" element={<CreateProduct />} />
      <Route path="/editproduct/:id" element={<EditProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Info />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;