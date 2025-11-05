import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import UserProfilePage from './pages/userprofile/profilepage';
import Favourite from './pages/favourite/favourite';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/favourites" element={<Favourite />} />

    </Routes>
  );
}

export default App;