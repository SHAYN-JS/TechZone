import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">TechZone</Link>

                    <div className="search-bar">
                        <input
                            type="text"
                            data-i18n="search_placeholder"
                            placeholder="Mahsulotlarni qidirish..."
                            id="searchInput"
                        />
                    </div>

                    <div className="header-actions">
                        <button id="theme-btn" title="Rejimni o'zgartirish">
                            <i id="theme-icon" className="fas fa-moon"></i>
                        </button>

                        <div className="language-selector">
                            <button className="lang-btn active" data-lang="UZ">UZ</button>
                            <button className="lang-btn" data-lang="RU">RU</button>
                            <button className="lang-btn" data-lang="EN">EN</button>
                        </div>

                        <Link to="/cart" className="cart-icon">
                            🛒
                            <span className="cart-count" id="cartCount">0</span>
                        </Link>

                        <div id="authButtons" className="auth-buttons">
                            <Link to="/login" className="btn" data-i18n="login_btn">Kirish</Link>
                            <Link to="/register" className="btn" data-i18n="register_btn">Ro'yxatdan o'tish</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
