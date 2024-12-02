import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import RegistroPage from './components/pages/RegistroPage.jsx';
import CestaPage from './components/pages/Cesta.jsx';
import Footer from './components/Footer/Footer';
import 'font-awesome/css/font-awesome.min.css';
import Header from './components/Header/Header';
import '../styles/App.scss';

const App = () => {
    return (
        <Router>
             <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cesta" element={<CestaPage />} />
          </Routes>
          <Footer />
        </Router>
      );
};

export default App;
