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

// MyCart 인터페이스 추가
interface MyCart {
    id: number;
    item: CafeItem;
    size: string;
    shot: number;
    quantity: number;
}

// 메인 페이지 컴포넌트
const CafePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('시즌메뉴');
    const [menuItems, setMenuItems] = useState<CafeItem[]>([]);
    const [popupItem, setPopupItem] = useState<CafeItem | null>(null);
    const [cartItems, setCartItems] = useState<MyCart[]>([]);

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

    // 장바구니 데이터 불러오기
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('/api/items/mycart');
                if (!response.ok) {
                    throw new Error('장바구니 데이터를 불러오는데 실패했습니다');
                }
                const data = await response.json();
                setCartItems(data.data);
            } catch (error) {
                console.error('장바구니 데이터 로딩 실패:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleItemClick = (item: CafeItem) => {
        setPopupItem(item);
    };

    const handleClosePopup = () => {
        setPopupItem(null);
    };

    const handleAddToCart = async (item: CafeItem, size: string, shot: number, quantity: number) => {
        try {
            // 장바구니 데이터 다시 불러오기
            const response = await fetch('/api/items/mycart');
            if (!response.ok) {
                throw new Error('장바구니 데이터를 불러오는데 실패했습니다');
            }
            const data = await response.json();
            setCartItems(data.data);
        } catch (error) {
            console.error('장바구니 데이터 로딩 실패:', error);
        }
    };

    // 총 주문금액 계산 함수 추가
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const basePrice = item.item.price;
            const shotPrice = item.shot * 500;
            const sizePrice = item.size === 'M' ? 700 : item.size === 'L' ? 1400 : 0;
            return total + ((basePrice + shotPrice + sizePrice) * item.quantity);
        }, 0);
    };

    // 장바구니 비우기 함수 수정
    const handleClearCart = async () => {
        // 확인 창 표시
        const isConfirmed = window.confirm('장바구니를 모두 비우시겠습니까?');

        if (!isConfirmed) {
            return; // 사용자가 취소를 선택한 경우
        }

        try {
            const response = await fetch('/api/items/clear', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('장바구니 비우기 실패');
            }

            setCartItems([]);
        } catch (error) {
            console.error('장바구니 비우기 실패:', error);
        }
    };


    // 결제하기
    const handlePay = async () => {
        // 확인 창 표시
        const isConfirmed = window.confirm('주문을 하시겠습니까?');

        if (!isConfirmed) {
            return; // 사용자가 취소를 선택한 경우
        }

        try {
            const response = await fetch('/api/items/clear', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('실패');
            }

            // 결제 성공 시 알림창 표시
            window.alert('주문이 완료되었습니다.');

            // 메인 화면으로 이동
            window.location.href = '/';

            // 장바구니 비우기
            setCartItems([]);
        } catch (error) {
            console.error('결제 실패:', error);
        }
    };

    // 수량 변경 함수 추가
    const handleQuantityChange = async (cartItem: MyCart, change: number) => {
        try {
            const newQuantity = cartItem.quantity + change;
            if (newQuantity <= 0) {
                // 수량이 0이하면 항목 삭제
                const response = await fetch(`/api/items/mycart/${cartItem.id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('항목 삭제 실패');
            } else {
                // 수량 업데이트
                const response = await fetch(`/api/items/mycart/${cartItem.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: newQuantity })
                });
                if (!response.ok) throw new Error('수량 업데이트 실패');
            }

            // 장바구니 데이터 새로고침
            const cartResponse = await fetch('/api/items/mycart');
            const cartData = await cartResponse.json();
            setCartItems(cartData.data);
        } catch (error) {
            console.error('수량 변경 실패:', error);
        }
    };

    return (
        <div className="main-page cafe-page">
            <main className="main-content">
                <nav className="menu-categories">
                    {Object.keys(categoryMapping).map((category) => (
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
                        <div className="basket-header">
                            <h2>주문 내역</h2>
                            <button
                                className="clear-cart-btn"
                                onClick={handleClearCart}
                            >
                                장바구니 비우기
                            </button>
                        </div>
                        <ul>
                            {cartItems.map((cartItem) => (
                                <li key={cartItem.id} className="cart-item">
                                    <div className="cart-item-info">
                                        {cartItem.item.name} x {cartItem.quantity}
                                        {cartItem.size !== 'N' && ` (${cartItem.size})`}
                                        {cartItem.shot > 0 && `, 샷 ${cartItem.shot}`}
                                    </div>
                                    <div className="cart-item-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(cartItem, -1)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{cartItem.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(cartItem, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="total">
                        <span>총 주문금액</span>
                        <span className="total-price">₩{calculateTotalPrice().toLocaleString()}</span>
                    </div>
                    <button className="checkout-button" onClick={handlePay}>결제하기</button>
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
