import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import LoginSelect from './pages/login/loginSelect';
import Login from './pages/login/login';
import Register from './pages/login/register';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select" element={<LoginSelect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;