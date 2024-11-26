import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import CafePage from './components/CafePage';
import BakeryPage from "./components/BakeryPage";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/cafe" element={<CafePage />} />
                        <Route path="/bakery" element={<BakeryPage />} />
                        <Route path="/cinema" element={<div>영화관 페이지 - 준비중</div>} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
