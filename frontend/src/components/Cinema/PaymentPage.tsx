import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cinema/PaymentPage.css';

const PaymentPage = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-page">
            <h1 className="payment-title">결제</h1>
            <button
                className="payment-button"
                onClick={() => navigate('/payment-success')}
            >
                결제 완료
            </button>
        </div>
    );
};

export default PaymentPage;
