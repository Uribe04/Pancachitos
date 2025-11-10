import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import MyProducts from './pages/myproducts/myproducts';
import CreateProduct from './pages/createproduct/create';
import EditProduct from './pages/editproduct/edit';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    <Route path="/myproducts" element={<MyProducts />} />
<Route path="/createproduct" element={<CreateProduct />} />
<Route path="/editproduct/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;