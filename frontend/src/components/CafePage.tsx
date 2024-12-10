import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../styles/CafePage.css';
import MenuPopup from './MenuPopup';
import '../styles/MenuPopup.css';

// 메뉴 아이템 인터페이스 수정
interface CafeItem {
    item_id: number;
    name: string;
    price: number;
    itemImage: string;
    type: string;
}

// 메뉴 카테고리 인터페이스 정의
interface MenuCategories {
    [key: string]: CafeItem[];
}

// 메인 페이지 컴포넌트
const CafePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('시즌메뉴');
    const [menuItems, setMenuItems] = useState<CafeItem[]>([]);
    const [popupItem, setPopupItem] = useState<CafeItem | null>(null);

    const categoryMapping: { [key: string]: string } = {
        '시즌메뉴': '시즌메뉴',
        '커피(HOT)': '커피(HOT)',
        '커피(ICE)': '커피(ICE)'
    };

    // API에서 메뉴 데이터 가져오기
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const mappedCategory = categoryMapping[selectedCategory];
                const response = await fetch(`/api/items/${mappedCategory}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('받아온 데이터:', data); // 디버깅용
                if (data.data) {
                    setMenuItems(data.data);
                }
            } catch (error) {
                console.error('메뉴 데이터 로딩 실패:', error);
                console.error('에러 상세:', error.message); // 더 자세한 에러 정보
            }
        };

        fetchMenuItems();
    }, [selectedCategory]);

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

    const handleItemClick = (item: CafeItem) => {
        setPopupItem(item);
    };

    const handleClosePopup = () => {
        setPopupItem(null);
    };

    const handleAddToCart = (item: CafeItem, size: string, shot: number, quantity: number) => {
        // 장바구니에 추가하는 로직 구현
        console.log('장바구니에 추가:', item, size, shot, quantity);
    };

    return (
        <div className="main-page cafe-page">
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
                        {menuItems.map((item) => (
                            <div key={item.item_id} className="menu-item" onClick={() => handleItemClick(item)}>
                                <div className="menu-image">
                                    <img src={item.itemImage} alt={item.name} />
                                </div>
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
            {popupItem && (
                <>
                    <div className="menu-popup-overlay" onClick={handleClosePopup}></div>
                    <MenuPopup
                        item={popupItem}
                        onClose={handleClosePopup}
                        onAddToCart={handleAddToCart}
                    />
                </>
            )}
        </div>
    );
};

export default CafePage;
