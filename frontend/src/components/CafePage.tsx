import React from 'react';
import { FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../styles/CafePage.css';

// 메인 페이지 컴포넌트
const CafePage = () => {
    return (
        <div className="main-page">
            {/* 메뉴와 바구니 섹션을 포함하는 메인 컨텐츠 */}
            <main className="main-content">
                {/* 메뉴 리스트 */}
                <section className="menu-list">
                    <h2>Menu</h2>
                    <ul>
                        <li>Americano</li>
                        <li>Latte</li>
                        <li>Espresso</li>
                        {/* 더 많은 메뉴 추가 */}
                    </ul>
                </section>

                {/* 바구니 */}
                <aside className="basket">
                    <h2>Your Basket</h2>
                    <ul>
                        <li>Latte x 1</li>
                        <li>Espresso x 2</li>
                        {/* 선택된 메뉴 표시 */}
                    </ul>
                    <button className="checkout-button">Checkout</button>
                </aside>
            </main>
        </div>
    );
};

export default CafePage;
