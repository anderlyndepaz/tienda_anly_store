import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Home from './components/pages/Home.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import RegistroPage from './components/pages/RegistroPage.jsx';
// import { fetchExampleData } from '../services/api';
// import Cesta from './components/pages/Cesta.jsx';


const App = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      );
};

export default App;
