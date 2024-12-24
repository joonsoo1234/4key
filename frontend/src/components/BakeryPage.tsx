import { useEffect, useState } from 'react';
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
                console.log('받아온 데이터:', data);
                if (data.data) {
                    setMenuItems(data.data);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error('메뉴 데이터 로딩 실패:', error);
                    console.error('에러 상세:', error.message);
                }
            }
        };

        fetchMenuItems();
    }, [selectedCategory]);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('/api/items/mycart');
            if (!response.ok) {
                throw new Error('장바구니 데이터를 불러오는데 실패했습니다');
            }
            const data = await response.json();
            setCartItems(data.data);
        } catch (error) {
            if (error instanceof Error) {
                console.error('장바구니 데이터 로딩 실패:', error);
            }
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

            await fetchCartItems();
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error adding to cart:', error);
                alert('장바구니에 담기 실패했습니다.');
            }
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
            if (error instanceof Error) {
                console.error('장바구니 비우기 실패:', error);
            }
        }
    };

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

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const basePrice = item.item.price;
            const shotPrice = item.shot * 500;
            const sizePrice = item.size === 'M' ? 700 : item.size === 'L' ? 1400 : 0;
            return total + ((basePrice + shotPrice + sizePrice) * item.quantity);
        }, 0);
    };

    const handleQuantityChange = async (cartItem: MyCart, change: number) => {
        try {
            const response = await fetch('/api/items/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: cartItem.id,
                    quantity: change
                })
            });

            if (!response.ok) throw new Error('수량 업데이트 실패');

            const cartResponse = await fetch('/api/items/mycart');
            const cartData = await cartResponse.json();
            setCartItems(cartData.data);
        } catch (error) {
            if (error instanceof Error) {
                console.error('수량 변경 실패:', error);
            }
        }
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
                                <li key={cartItem.id} className="cart-item">
                                    <div className="cart-item-info">
                                        {cartItem.item.name} x {cartItem.quantity}
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
        </div>
    );
};

export default BakeryPage;