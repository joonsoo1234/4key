import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cinema/SeatSelectionPage.css';

const SeatSelectionPage = () => {
    const navigate = useNavigate();

    const seats = ['1A', '1B', '1C', '2A', '2B', '2C']; // 예시 좌석 목록

    return (
        <div className="seat-selection-page">
            <h1 className="seat-selection-title">좌석 선택</h1>
            <ul className="seat-list">
                {seats.map((seat, index) => (
                    <li key={index} className="seat-item">
                        <span>{seat}</span>
                        <button onClick={() => navigate('/payment')}>선택</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeatSelectionPage;
