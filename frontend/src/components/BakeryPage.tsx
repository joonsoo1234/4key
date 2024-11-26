import React, { useState } from 'react';
import '../styles/common.css';
import '../styles/BakeryPage.css';

interface BakeryItem {
    name: string;
    price: number;
    description?: string;
}

interface BakeryCategories {
    [key: string]: BakeryItem[];
}

const BakeryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('브레드');

    const bakeryCategories: BakeryCategories = {
        브레드: [
            { name: '발효버터 소금빵', price: 3500 },
            { name: '부드럽고 촉촉한 굿모닝롤', price: 4000 },
            { name: '길어서 더 든든한 롱롱소시지빵', price: 4500 },
            { name: '두번쫄깃 플레인 베이글', price: 3800 },
            { name: '소보루빵', price: 3000 },
            { name: '단팥빵', price: 3200 },
            { name: '프렌치크라상', price: 3800 },
        ],
        케이크: [
            { name: '생딸기프레지에', price: 35000 },
            { name: '딸기 블라썸 케이크', price: 38000 },
            { name: '고구마반생크림반케이크', price: 32000 },
            { name: '마이넘버원3', price: 33000 },
            { name: '블루베리 쉬폰케이크', price: 29000 },
            { name: '클래식치즈케이크', price: 31000 },
        ],
        '샌드위치/샐러드': [
            { name: '런치샌드위치', price: 6500 },
            { name: '미니버거 샌드위치', price: 5500 },
            { name: '치킨디럭스 샌드위치', price: 6800 },
            { name: '에그샐러드샌드위치', price: 5800 },
            { name: '치킨커틀릿 샐러드랩', price: 7200 },
            { name: '크리스피 치킨 샐러드', price: 7500 },
        ],
        '디저트/스낵': [
            { name: '치즈가 부드러운 시간', price: 4500 },
            { name: '미스터베어', price: 4800 },
            { name: '정통 에그타르트', price: 3500 },
            { name: '초코마카롱', price: 2800 },
            { name: '초콜릿 머핀', price: 4000 },
            { name: '오리지널 머핀', price: 3800 },
        ],
    };

    return (
        <div className="main-page bakery-page">
            <main className="main-content">
                <nav className="menu-categories">
                    {Object.keys(bakeryCategories).map((category) => (
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
                        {bakeryCategories[selectedCategory].map((item) => (
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
                            <li>소보루빵 x 2</li>
                            <li>에그타르트 x 1</li>
                        </ul>
                    </div>
                    <div className="total">
                        <span>총 주문금액</span>
                        <span className="total-price">₩9,500</span>
                    </div>
                    <button className="checkout-button">결제하기</button>
                </footer>
            </main>
        </div>
    );
};

export default BakeryPage;