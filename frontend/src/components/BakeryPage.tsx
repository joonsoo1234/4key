import React, { useEffect, useState } from 'react';
import '../styles/common.css';
import '../styles/BakeryPage.css';

interface BakeryItem {
    id: number;
    name: string;
    price: number;
    itemImage: string;
    type: string;
}

interface MyCart {
    id: number;
    item: BakeryItem;
    quantity: number;
    shot: number;
    size: string;
}

const BakeryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('브레드');
    const [menuItems, setMenuItems] = useState<BakeryItem[]>([]);
    const [cartItems, setCartItems] = useState<MyCart[]>([]);

    const categoryMapping: { [key: string]: string } = {
        '브레드': '브레드',
        '케이크': '케이크',
        '샌드위치/샐러드': '샌드위치-샐러드',
        '디저트/스낵': '디저트-스낵'
    };

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

    useEffect(() => {
        fetchCartItems();
    }, []);

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

    const handleAddToCart = async (item: BakeryItem) => {
        const cartItem = {
            item: {
                id: item.id
            },
            size: "N",
            shot: 0,
            quantity: 1
        };

        try {
            const response = await fetch('/api/items/choice/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            // 장바구니 데이터 다시 불러오기
            await fetchCartItems();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleClearCart = async () => {
        const isConfirmed = window.confirm('장바구니를 모두 비우시겠습니까?');
        
        if (!isConfirmed) {
            return;
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

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const basePrice = item.item.price;
            const shotPrice = item.shot * 500;
            const sizePrice = item.size === 'M' ? 700 : item.size === 'L' ? 1400 : 0;
            return total + ((basePrice + shotPrice + sizePrice) * item.quantity);
        }, 0);
    };

    return (
        <div className="main-page bakery-page">
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
                            <div 
                                key={item.id} 
                                className="menu-item"
                                onClick={() => handleAddToCart(item)}
                            >
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
                                <li key={cartItem.id}>
                                    {cartItem.item.name} x {cartItem.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="total">
                        <span>총 주문금액</span>
                        <span className="total-price">₩{calculateTotalPrice().toLocaleString()}</span>
                    </div>
                    <button className="checkout-button">결제하기</button>
                </footer>
            </main>
        </div>
    );
};

export default BakeryPage;