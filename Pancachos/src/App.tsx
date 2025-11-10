import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import LoginSelect from './pages/login/loginSelect';
import Register from './pages/login/register';
import Login from './pages/login/login';
import Info from './pages/info/pInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select" element={<LoginSelect />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Info />} />
    </Routes>
  );
}

export default App;