import React from 'react';
import '../styles/MainPage.css';

// 메인 페이지 컴포넌트
const MainPage: React.FC = () => {
    return (
        <div className="main-page">
            {/* 상단 네비게이션 바 */}
            <header>
                <nav className="navbar">
                    <button className="home-button">home</button>
                    <h1 className="navbar-title">Cafe Kiosk</h1>
                    <button className="menu-button">menu</button>
                </nav>
            </header>

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

            {/* 하단 푸터 */}
            <footer className="footer">
                <p>&copy; 2024 Cafe Kiosk</p>
            </footer>
        </div>
    );
};

export default MainPage;
