import React, { useState } from 'react';

interface MenuPopupProps {
    item: CafeItem;
    onClose: () => void;
    onAddToCart: (item: CafeItem, size: string, shot: number, quantity: number) => void;
}

// SVG 아이콘 컴포넌트들
const CupSmallIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6zm1-3h12m-6 6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const CupMediumIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 5h16v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm1-3h14m-7 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const CupLargeIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4h18v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm1-3h16m-8 6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const CartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
    </svg>
);

// X 아이콘 컴포넌트 추가
const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MenuPopup: React.FC<MenuPopupProps> = ({ item, onClose, onAddToCart }) => {
    const [size, setSize] = useState('S');
    const [shot, setShot] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const SHOT_PRICE = 500;
    const SIZE_PRICES = {
        'S': 0,
        'M': 700,
        'L': 1400
    };

    // 총 가격 계산 (메뉴 가격 + 사이즈 추가 가격 + 샷 추가 가격)
    const calculateTotalPrice = () => {
        const shotTotal = shot * SHOT_PRICE;
        const sizeTotal = SIZE_PRICES[size];
        return (item.price + shotTotal + sizeTotal) * quantity;
    };

    // 사이즈 변경 시 가격 표시를 위한 함수
    const getSizeAddedPrice = (selectedSize: string) => {
        const price = SIZE_PRICES[selectedSize];
        return price > 0 ? ` (+${price.toLocaleString()}원)` : '';
    };

    const handleAddToCart = () => {
        onAddToCart(item, size, shot, quantity);
        onClose();
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const increaseShot = () => {
        if (shot < 10) {
            setShot(prev => prev + 1);
        }
    };

    const decreaseShot = () => {
        if (shot > 0) {
            setShot(prev => prev - 1);
        }
    };

    return (
        <div className="menu-popup">
            <button className="close-icon-btn" onClick={onClose}>
                <CloseIcon />
            </button>
            <div className="menu-popup-header">
                <div className="menu-image">
                    <img src={item.itemImage} alt={item.name} />
                </div>
                <div className="menu-info">
                    <h2>{item.name}</h2>
                    <p className="menu-price">₩{item.price.toLocaleString()}</p>
                </div>
            </div>
            <div className="menu-popup-content">
                <div className="option-group">
                    <label>사이즈 선택</label>
                    <div className="size-buttons">
                        <button 
                            className={`size-button ${size === 'S' ? 'active' : ''}`}
                            onClick={() => setSize('S')}
                        >
                            <CupSmallIcon />
                            <span>Small</span>
                        </button>
                        <button 
                            className={`size-button ${size === 'M' ? 'active' : ''}`}
                            onClick={() => setSize('M')}
                        >
                            <CupMediumIcon />
                            <span>Medium{getSizeAddedPrice('M')}</span>
                        </button>
                        <button 
                            className={`size-button ${size === 'L' ? 'active' : ''}`}
                            onClick={() => setSize('L')}
                        >
                            <CupLargeIcon />
                            <span>Large{getSizeAddedPrice('L')}</span>
                        </button>
                    </div>
                </div>

                <div className="option-group">
                    <label>샷 추가 (+500원)</label>
                    <div className="shot-controls-container">
                        <div className="quantity-controls">
                            <button onClick={decreaseShot}>-</button>
                            <input
                                type="number"
                                value={shot}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 0 && value <= 10) {
                                        setShot(value);
                                    }
                                }}
                                min="0"
                                max="10"
                                readOnly
                            />
                            <button onClick={increaseShot}>+</button>
                        </div>
                        {shot > 0 && (
                            <p className="shot-price">+ ₩{(shot * SHOT_PRICE).toLocaleString()}</p>
                        )}
                    </div>
                </div>

                <div className="option-group">
                    <label>수량</label>
                    <div className="quantity-controls">
                        <button onClick={decreaseQuantity}>-</button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1"
                            readOnly
                        />
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                </div>

                <div className="button-group">
                    <button className="close-btn" onClick={onClose}>
                        취소
                    </button>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        <CartIcon />
                        <span>₩{calculateTotalPrice().toLocaleString()} 담기</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuPopup; 