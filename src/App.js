import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AccountDetail, Home, Login, Register, StatusList } from './pages'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/statuslist" element={<StatusList isLoggedIn={isLoggedIn}/>} />
            <Route path="/accountdetail" element={<AccountDetail />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
