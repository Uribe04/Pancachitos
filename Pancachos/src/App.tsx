import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import LoginSelect from './pages/login/loginSelect';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select" element={<LoginSelect />} />
    </Routes>
  );
}

export default App;