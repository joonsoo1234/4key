import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Cinema/SeatSelectionPage.css";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","K","L"];
const seatsPerRow = 15;

interface Seat {
    row: string;
    number: number;
    isUnavailable: boolean;
}

const generateSeats = () => {
    const seats: Seat[] = [];
    rows.forEach((row) => {
        for (let i = 1; i <= seatsPerRow; i++) {
            seats.push({
                row,
                number: i,
                isUnavailable: Math.random() < 0.2,
            });
        }
    });
    return seats;
};

const SeatSelectionPage: React.FC = () => {
    const [seats] = useState<Seat[]>(generateSeats());
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
    const navigate = useNavigate();

    const [generalCount, setGeneralCount] = useState(0);
    const [teenCount, setTeenCount] = useState(0);
    const [seniorCount, setSeniorCount] = useState(0);
    const [priorityCount, setPriorityCount] = useState(0);

    const totalCount = generalCount + teenCount + seniorCount + priorityCount;

    const calculateTotalPrice = () => {
        const generalPrice = generalCount * 12000;
        const teenPrice = teenCount * 10000;
        const seniorPrice = seniorCount * 8000;
        const priorityPrice = priorityCount * 8000;
        return generalPrice + teenPrice + seniorPrice + priorityPrice;
    };

    const handleModalClose = () => {
        if (totalCount === 0) {
            alert("최소 1명을 선택해야 합니다.");
        } else {
            setIsModalOpen(false);
        }
    };

    const handleSeatClick = (seat: Seat, event: React.MouseEvent<HTMLDivElement>) => {
        if (seat.isUnavailable) return;
    
        const isSeatSelected = selectedSeats.some(
            (selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number
        );
    
        if (isSeatSelected) {
            setSelectedSeats(prevSeats => 
                prevSeats.filter(s => !(s.row === seat.row && s.number === seat.number))
            );
            event.currentTarget.classList.remove("selected");
        } else {
            if (selectedSeats.length >= totalCount) {
                alert(`최대 ${totalCount}개의 좌석만 선택할 수 있습니다.`);
                return;
            }
            setSelectedSeats(prevSeats => [...prevSeats, seat]);
            event.currentTarget.classList.add("selected");
        }
    };

    const handlePaymentClick = () => {
        if (selectedSeats.length !== totalCount) {
            alert(`정확히 ${totalCount}명을 선택해야 결제가 가능합니다.`);
        } else {
            setShowPaymentConfirm(true);
        }
    };

    const handlePaymentConfirm = () => {
        alert("결제가 완료되었습니다!");
        setShowPaymentConfirm(false);
        navigate('/');
    };

    return (
        <div className="seat-selection-page">
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>관람 인원수를 선택해 주세요</h2>
                        <p>인원수 선택은 일반, 청소년을 더해 최대 6명까지 가능합니다</p>
                        <div className="total-count">총 <span>{totalCount}</span>명</div>

                        <div className="people-category">
                            <div className="category-row">
                                <span>일반</span>
                                <div className="count-buttons">
                                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                                        <button
                                            key={num}
                                            className={generalCount === num ? "selected" : ""}
                                            onClick={() => setGeneralCount(num)}
                                            disabled={totalCount - generalCount + num > 6}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="category-row">
                                <span>청소년</span>
                                <div className="count-buttons">
                                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                                        <button
                                            key={num}
                                            className={teenCount === num ? "selected" : ""}
                                            onClick={() => setTeenCount(num)}
                                            disabled={totalCount - teenCount + num > 6}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="category-row">
                                <span>경로</span>
                                <div className="count-buttons">
                                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                                        <button
                                            key={num}
                                            className={seniorCount === num ? "selected" : ""}
                                            onClick={() => setSeniorCount(num)}
                                            disabled={totalCount - seniorCount + num > 6}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="category-row">
                                <span>우대</span>
                                <div className="count-buttons">
                                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                                        <button
                                            key={num}
                                            className={priorityCount === num ? "selected" : ""}
                                            onClick={() => setPriorityCount(num)}
                                            disabled={totalCount - priorityCount + num > 6}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className="modal-confirm-button" onClick={handleModalClose}>
                            확인
                        </button>
                    </div>
                </div>
            )}

            {!isModalOpen && (
                <>
                    <header className="header" style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '0.3rem',
                        paddingLeft: '2rem'
                    }}>
                        <div className="movie-poster">
                            <img 
                                src="https://i.namu.wiki/i/CHQV9S1_2Ril3Obs7-whPG-9H4qllYxClH3jwgc9XXOgYyEOVoFGkWUx-kyqOIOUkRR9VpbPbsqXMm64eFxcrw.webp" 
                                alt="모아나 포스터" 
                            />
                        </div>
                        <div className="movie-info" style={{ 
                            flex: 1, 
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <h1>모아나2</h1>
                            <p>2024.12.24(화)</p>
                            <p>1관 10:00 ~ 11:30</p>
                            <p>신흥 롯데시네마</p>
                        </div>
                    </header>

                    <div className="screen">스크린</div>

                    <div className="seats-grid">
                        {rows.map((row) => (
                            <div key={row} className="seat-row">
                                <span className="row-label">{row}</span>
                                {seats
                                    .filter((seat) => seat.row === row)
                                    .map((seat) => (
                                        <div
                                            key={`${seat.row}${seat.number}`}
                                            className={`seat ${
                                                seat.isUnavailable ? "unavailable" : ""
                                            }`}
                                            onClick={(event) => handleSeatClick(seat, event)}
                                        >
                                            {seat.row}
                                            {seat.number}
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>

                    <div className="payment-section">
                        <button className="payment-button" onClick={handlePaymentClick}>
                            결제하기
                        </button>
                    </div>
                </>
            )}

            {showPaymentConfirm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>결제 확인</h2>
                        <p>총 결제 금액 {calculateTotalPrice().toLocaleString()}원입니다.</p>
                        <p>결제 하시겠습니까?</p>
                        <div className="modal-buttons">
                            <button onClick={handlePaymentConfirm}>예</button>
                            <button onClick={() => setShowPaymentConfirm(false)}>아니오</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSelectionPage;