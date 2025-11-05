import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import UserProfilePage from './pages/userprofile/profilepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfilePage />} />

    </Routes>
  );
}

export default App;