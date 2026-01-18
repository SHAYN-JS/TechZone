import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>TechZone</h3>
                        <p data-i18n="footer_slogan">
                            Eng yangi va eng sifatli texnologiya mahsulotlari faqat bizda.
                            O'zingizga mos kompyuter tizimini yig'ing!
                        </p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/profile.php?id=100076328040599&locale=ru_RU" className="social-icon" target="_blank" rel="noreferrer">📘</a>
                            <a href="https://www.instagram.com/shayn_top/" className="social-icon" target="_blank" rel="noreferrer">📷</a>
                            <a href="https://github.com/SHAYN-JS/TechZone?tab=readme-ov-file#readme" className="social-icon" target="_blank" rel="noreferrer">✈️</a>
                            <a href="#" className="social-icon">📱</a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3 data-i18n="footer_categories_title">Kategoriyalar</h3>
                        <ul className="footer-links">
                            <li><Link to="/category/laptops" data-i18n="cat_laptops">Noutbuklar</Link></li>
                            <li><Link to="/category/desktops" data-i18n="cat_desktops">Sistem bloklar</Link></li>
                            <li><Link to="/category/monitors" data-i18n="cat_monitors">Monitorlar</Link></li>
                            <li><Link to="/category/gpu" data-i18n="cat_gpu">Videokartalar</Link></li>
                            <li><Link to="/category/storage" data-i18n="cat_storage">SSD va HDD</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 data-i18n="footer_links_title">Foydali havolalar</h3>
                        <ul className="footer-links">
                            <li><Link to="/about" data-i18n="footer_about">Biz haqimizda</Link></li>
                            <li><Link to="/delivery" data-i18n="footer_delivery">Yetkazib berish</Link></li>
                            <li><Link to="/payment" data-i18n="footer_payment">To'lov usullari</Link></li>
                            <li><Link to="/credit" data-i18n="footer_credit">Kredit</Link></li>
                            <li><Link to="/warranty" data-i18n="footer_warranty">Kafolat</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 data-i18n="footer_contact_title">Aloqa</h3>
                        <ul className="footer-links">
                            <li>📍 Toshkent sh., Yunusobod tumani</li>
                            <li>📞 +998 90 123 45 67</li>
                            <li>✉️ info@techzone.uz</li>
                            <li data-i18n="footer_hours">🕒 Dushanba - Yakshanba: 9:00 - 20:00</li>
                        </ul>
                    </div>
                </div>

                <div className="copyright" data-i18n="footer_copyright">
                    &copy; 2025 TechZone. Barcha huquqlar himoyalangan.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
