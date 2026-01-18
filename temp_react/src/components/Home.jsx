import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <section className="hero-section" style={{ marginBottom: '40px' }}>
                <img
                    src="/logo images/techzone2.jpg"
                    alt="Asosiy Aksiya Banneri"
                    style={{ width: '100%', borderRadius: '0px' }}
                />
            </section>

            <section className="products-section" id="specialOffersSection">
                <div className="section-header">
                    <h2 className="section-title" data-i18n="offers_title">🔥 Maxsus aksiyalar</h2>
                    <div className="discount-timer" id="discountTimer" data-i18n="timer_text_placeholder">
                        Aksiya tugashiga: 02:15:30
                    </div>
                </div>

                <div className="products-grid" id="discountProducts">
                    <div className="product-card">
                        <img src="/images/nogiron.jfif" alt="Aksiyadagi Noutbuk" className="product-image" />
                        <h4 className="product-title">Acer Predator Helios 300</h4>
                        <p className="product-specs">i7 | 16GB | RTX 3060</p>
                        <p className="product-price">
                            <del style={{ color: 'var(--text-secondary)' }}>15 000 000 so'm</del>{' '}
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>12 500 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>

                    <div className="product-card">
                        <img src="/images/samsung.jfif" alt="Aksiyadagi Monitor" className="product-image" />
                        <h4 className="product-title">Samsung Odyssey G7</h4>
                        <p className="product-specs">32" | 240Hz | QHD</p>
                        <p className="product-price">
                            <del style={{ color: 'var(--text-secondary)' }}>7 000 000 so'm</del>{' '}
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>5 800 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>

                    <div className="product-card">
                        <img src="/images/3060.jfif" alt="Aksiyadagi Videokarta" className="product-image" />
                        <h4 className="product-title">RTX 4070 Founders Edition</h4>
                        <p className="product-specs">12GB VRAM | NVIDIA</p>
                        <p className="product-price">
                            <del style={{ color: 'var(--text-secondary)' }}>11 500 000 so'm</del>{' '}
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>9 999 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>
                </div>
                <Link to="/products?filter=discount" className="btn btn-secondary load-more" style={{ marginTop: '20px' }} data-i18n="view_offers_btn">
                    Barcha aksiyalarni ko'rish
                </Link>
            </section>

            <hr style={{ borderColor: 'var(--border)', margin: '40px 0' }} />

            <section className="products-section" id="bestSellersSection">
                <div className="section-header">
                    <h2 className="section-title" data-i18n="bestsellers_title">⭐ Eng ko'p sotilayotganlar</h2>
                </div>

                <div className="products-grid" id="bestSellingProducts">
                    <div className="product-card">
                        <img src="/images/gamingz.jfif" alt="Gaming Kompyuter" className="product-image" />
                        <h4 className="product-title">Gaming PC "Mid-Range"</h4>
                        <p className="product-specs">i5-13400F | 16GB | RTX 4060</p>
                        <p className="product-price">
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>11 000 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>

                    <div className="product-card">
                        <img src="/images/ssd3.jfif" alt="SSD" className="product-image" />
                        <h4 className="product-title">Samsung 980 Pro SSD 1TB</h4>
                        <p className="product-specs">1TB | NVMe | Yuqori tezlik</p>
                        <p className="product-price">
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>1 600 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>

                    <div className="product-card">
                        <img src="/images/asus rog.jfif" alt="Quloqchin" className="product-image" />
                        <h4 className="product-title">Asus ROG Strix G15</h4>
                        <p className="product-specs">i7 | 16GB | 512SSD | RTX 4060</p>
                        <p className="product-price">
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>850 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>
                </div>
                <Link to="/products?sort=popular" className="btn btn-secondary load-more" style={{ marginTop: '20px' }} data-i18n="view_bestsellers_btn">
                    Barcha bestsellerlarni ko'rish
                </Link>
            </section>

            <hr style={{ borderColor: 'var(--border)', margin: '40px 0' }} />

            <section className="products-section" id="newArrivalsSection">
                <div className="section-header">
                    <h2 className="section-title" data-i18n="new_arrivals_title">✨ Eng so'nggi texnologiyalar</h2>
                </div>

                <div className="products-grid" id="newArrivalsProducts">
                    <div className="product-card">
                        <img src="/images/333333333333333.jfif" alt="Mini PC" className="product-image" />
                        <h4 className="product-title">Intel NUC 13 Pro Mini PC</h4>
                        <p className="product-specs">i7 | 32GB RAM | 1TB SSD | Minimal o'lcham</p>
                        <p className="product-price">
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>9 500 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>

                    <div className="product-card">
                        <img src="/images/ideapad.jfif" alt="Gaming Klaviatura" className="product-image" />
                        <h4 className="product-title">Razer Huntsman V3 Pro Klaviatura</h4>
                        <p className="product-specs">Analog Optik Switchlar | 8K Polling</p>
                        <p className="product-price">
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>2 400 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>

                    <div className="product-card">
                        <img src="/images/nogiron.jfif" alt="Webcam" className="product-image" />
                        <h4 className="product-title">Logitech Brio Stream 4K</h4>
                        <p className="product-specs">4K Ultra HD | HDR | Stream uchun</p>
                        <p className="product-price">
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>1 900 000 so'm</span>
                        </p>
                        <button className="btn btn-primary add-to-cart" data-i18n="add_to_cart_btn">Savatga qo'shish</button>
                    </div>
                </div>
                <Link to="/products?sort=new" className="btn btn-secondary load-more" style={{ marginTop: '20px' }} data-i18n="view_new_btn">
                    Barcha yangi mahsulotlarni ko'rish
                </Link>
            </section>

            <hr style={{ borderColor: 'var(--border)', margin: '40px 0' }} />

            <section className="categories-section">
                <h2 className="section-title" data-i18n="categories_title">Kategoriyalar</h2>
                <div className="categories-grid">
                    <Link to="/category/laptops" className="category-card">
                        <img src="/images/asus rog.jfif" alt="Noutbuklar Rasmi" className="category-image" />
                        <h3 data-i18n="cat_laptops">Noutbuklar</h3>
                    </Link>

                    <Link to="/category/desktops" className="category-card">
                        <img src="/images/gamingz.jfif" alt="Sistem Bloklar Rasmi" className="category-image" />
                        <h3 data-i18n="cat_desktops">Sistem bloklar</h3>
                    </Link>

                    <Link to="/category/monitors" className="category-card">
                        <img src="/images/samsung.jfif" alt="Monitorlar Rasmi" className="category-image" />
                        <h3 data-i18n="cat_monitors">Monitorlar</h3>
                    </Link>

                    <Link to="/category/gpu" className="category-card">
                        <img src="/images/3060.jfif" alt="Videokartalar Rasmi" className="category-image" />
                        <h3 data-i18n="cat_gpu">Videokartalar</h3>
                    </Link>

                    <Link to="/category/storage" className="category-card">
                        <img src="/images/ssd2.jfif" alt="SSD va HDD Rasmi" className="category-image" />
                        <h3 data-i18n="cat_storage">SSD va HDD</h3>
                    </Link>
                </div>
            </section>

            <hr style={{ borderColor: 'var(--border)', margin: '40px 0' }} />

            <section className="brands-section">
                <h2 className="section-title" data-i18n="brands_title">Hamkor brendlar</h2>
                <div className="brands-grid">
                    <Link to="/products?brand=asus" className="brand-item">
                        <img src="/logo images/download (2).jfif" alt="ASUS Logo" className="brand-logo" />
                    </Link>

                    <Link to="/products?brand=dell" className="brand-item">
                        <img src="/logo images/del.png" alt="DELL Logo" className="brand-logo" />
                    </Link>

                    <Link to="/products?brand=hp" className="brand-item">
                        <img src="/logo images/hp.png" alt="HP Logo" className="brand-logo" />
                    </Link>

                    <Link to="/products?brand=samsung" className="brand-item">
                        <img src="/logo images/samsung.png" alt="SAMSUNG Logo" className="brand-logo" />
                    </Link>

                    <Link to="/products?brand=lenovo" className="brand-item">
                        <img src="/logo images/lenova.jfif" alt="LENOVO Logo" className="brand-logo" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
