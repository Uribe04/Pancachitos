import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Info from './pages/info/pInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Info />} />
    </Routes>
  );
}

export default App;