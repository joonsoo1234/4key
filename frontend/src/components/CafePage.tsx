import React from 'react';
import { FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../styles/CafePage.css';
import { useState } from 'react';

// 메뉴 아이템 인터페이스 정의
interface MenuItem {
    name: string;
    price: number;
}

// 메뉴 카테고리 인터페이스 정의
interface MenuCategories {
    [key: string]: MenuItem[];
}

// 메인 페이지 컴포넌트
const CafePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('시즌메뉴');

    const menuCategories: MenuCategories = {
        시즌메뉴: [
            { name: '달고나 라떼', price: 5500 },
            { name: '흑임자 프라페', price: 6000 },
            { name: '자몽에이드', price: 5000 },
            { name: '망고스무디', price: 5500 },
        ],
        '커피(HOT)': [
            { name: '아메리카노', price: 4000 },
            { name: '카페라떼', price: 4500 },
            { name: '에스프레소', price: 3500 },
            { name: '카푸치노', price: 4500 },
        ],
        '커피(ICE)': [
            { name: '아이스 아메리카노', price: 4000 },
            { name: '아이스 카페라떼', price: 4500 },
            { name: '콜드브루', price: 5000 },
            { name: '바닐라라떼', price: 5000 },
        ],
    };

    return (
        <div className="main-page">
            <main className="main-content">
                <nav className="menu-categories">
                    {Object.keys(menuCategories).map((category) => (
                        <button
                            key={category}
                            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>

                <section className="menu-list">
                    <h2>{selectedCategory}</h2>
                    <div className="menu-grid">
                        {menuCategories[selectedCategory].map((item) => (
                            <div key={item.name} className="menu-item">
                                <div className="menu-image"></div>
                                <div className="menu-info">
                                    <h3>{item.name}</h3>
                                    <p>₩{item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="order-summary">
                    <div className="basket">
                        <h2>주문 내역</h2>
                        <ul>
                            <li>카페라떼 x 1</li>
                            <li>에스프레소 x 2</li>
                        </ul>
                    </div>
                    <div className="total">
                        <span>총 주문금액</span>
                        <span className="total-price">₩12,500</span>
                    </div>
                    <button className="checkout-button">결제하기</button>
                </footer>
            </main>
        </div>
    );
};

export default CafePage;
