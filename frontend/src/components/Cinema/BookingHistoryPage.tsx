import React from 'react';
import '../../styles/Cinema/BookingHistoryPage.css';

const BookingHistoryPage = () => {
    const bookingHistory = [
        { movie: '영화 1', seat: '1A', date: '2024-12-02' },
        { movie: '영화 2', seat: '2B', date: '2024-12-01' },
    ];

    return (
        <div className="booking-history-page">
            <h1 className="booking-history-title">예매 내역</h1>
            <ul className="booking-history-list">
                {bookingHistory.map((history, index) => (
                    <li key={index} className="history-item">
                        <span>{history.movie}</span> - <span>{history.seat}</span> - <span>{history.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingHistoryPage;
