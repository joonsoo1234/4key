import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('main-page-body');

        return () => {
            document.body.classList.remove('main-page-body');
        };
    }, []);

    return (
        <div className="selection-page">
            <h1 className="selection-title">키오스크 선택</h1>

            <div className="selection-buttons">
                <button
                    className="selection-button cafe"
                    onClick={() => navigate('/cafe')}
                >
                    <span className="icon">☕</span>
                    <span className="text">카페</span>
                </button>

                <button
                    className="selection-button bakery"
                    onClick={() => navigate('/bakery')}
                >
                    <span className="icon">🥨</span>
                    <span className="text">빵집</span>
                </button>

                <button
                    className="selection-button cinema"
                    onClick={() => navigate('/cinema')}
                >
                    <span className="icon">🎬</span>
                    <span className="text">영화관</span>
                </button>
            </div>
        </div>
    );
};

export default MainPage;