import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import RegistroPage from './components/pages/RegistroPage.jsx';
import CestaPage from './components/pages/Cesta.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'font-awesome/css/font-awesome.min.css';
import Header from './components/Header/Header.jsx';
import '../styles/App.scss';
import { useState } from 'react';

const App = () => {
  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);
    return (
        <Router>
             <Header />
          <Routes>
            <Route path="/" element={<Home  total={total} cantidad={cantidad}/>} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cesta" element={<CestaPage setTotal={setTotal} setCantidad={setCantidad}/>} />
          </Routes>
          <Footer />
        </Router>
      );
};

export default App;
