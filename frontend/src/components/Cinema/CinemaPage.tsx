import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Cinema/CinemaPage.css";

const CinemaPage: React.FC = () => {
    const navigate = useNavigate();

    const handleTicketPurchaseClick = () => {
        navigate("/movies");
    };

    return (
        <div className="cinema-page">
            <div className="button-container">
                <div
                    className="button ticket-purchase"
                    onClick={handleTicketPurchaseClick}
                >
                    <div className="button-icon">🎟️</div>
                    <p>티켓 구매</p>
                </div>
                <div className="button ticket-print">
                    <div className="button-icon">🖨️</div>
                    <p>예매 티켓 출력</p>
                </div>
            </div>
        </div>
    );
};

export default CinemaPage;
