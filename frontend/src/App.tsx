import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import CafePage from './components/CafePage';
import BakeryPage from "./components/BakeryPage";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CinemaPage from './components/Cinema/CinemaPage';
import MovieListPage from './components/Cinema/MovieListPage';
import SeatSelectionPage from './components/Cinema/SeatSelectionPage';
import PaymentPage from './components/Cinema/PaymentPage';
import BookingHistoryPage from './components/Cinema/BookingHistoryPage';


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
                        <Route path="/cinema" element={<CinemaPage />} />
                        <Route path="/movies" element={<MovieListPage />} />
                        <Route path="/seat-selection" element={<SeatSelectionPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/booking-history" element={<BookingHistoryPage />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
