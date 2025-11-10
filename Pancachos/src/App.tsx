import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import LoginSelect from './pages/login/loginSelect';
import Register from './pages/login/register';
import Login from './pages/login/login';
import RecoverPassword from './pages/login/recoverPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select" element={<LoginSelect />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recover" element={<RecoverPassword />} />

    </Routes>
  );
}

export default App;