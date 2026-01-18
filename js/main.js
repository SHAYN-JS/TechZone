/**
 * TechZoneApp - Umumiy sayt funksionalligi (Savat, Toast va h.k.)
 */
class TechZoneApp {
    constructor() {
        // Savatni local storage dan olish
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount(); // Savatdagi mahsulotlar sonini yangilash
        this.setupEventListeners();
        this.initLiveSearch();
        this.initFilters();
    }

    // --- SMART SEARCH / LIVE SUGGESTIONS ---
    initLiveSearch() {
        const input = document.getElementById('searchInput');
        const results = document.getElementById('searchResults');

        if (!input || !results) return;

        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length < 2) {
                results.classList.remove('active');
                return;
            }

            // productsData dan qidirish
            const matches = Object.values(productsData).filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            ).slice(0, 5); // Maksimal 5 ta taklif

            if (matches.length > 0) {
                this.renderSearchResults(matches);
                results.classList.add('active');
            } else {
                results.classList.remove('active');
            }
        });

        // Tashqariga bosilganda yopish
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !results.contains(e.target)) {
                results.classList.remove('active');
            }
        });
    }

    renderSearchResults(matches) {
        const results = document.getElementById('searchResults');
        results.innerHTML = matches.map(p => `
            <div class="search-result-item" onclick="window.location.href='product-detail.html?id=${this.getProductID(p.name)}'">
                <img src="${p.image}" class="search-result-image" alt="${p.name}">
                <div class="search-result-info">
                    <span class="search-result-name">${p.name}</span>
                    <span class="search-result-price">${p.price}</span>
                </div>
            </div>
        `).join('');
    }

    getProductID(name) {
        // Ism bo'yicha ID ni topish (productsData dagi key)
        return Object.keys(productsData).find(key => productsData[key].name === name) || '';
    }

    // Savatga mahsulot qo'shish
    addToCart(product) {
        const existingItem = this.cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
        this.showToast(`${product.name} savatga qo'shildi!`);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('cartCount');
        if (badge) badge.textContent = count;
    }

    setupEventListeners() {
        // Savatga qo'shish
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const card = e.target.closest('.product-card');
                let name, image, priceText;

                if (card) {
                    name = card.querySelector('.product-title').innerText;
                    image = card.querySelector('.product-image').getAttribute('src');
                    let priceElement = card.querySelector('.current-price') || card.querySelector('.product-price');
                    priceText = priceElement ? priceElement.innerText : '0';
                } else if (document.getElementById('productName')) {
                    name = document.getElementById('productName').innerText;
                    image = document.getElementById('productImage').getAttribute('src');
                    priceText = document.getElementById('productPrice').innerText;
                } else {
                    return;
                }

                const price = parseInt(priceText.replace(/\D/g, ''));
                this.addToCart({ name, price, image });
            }
        });

        // User Dropdown toggler
        const userBtn = document.getElementById('userIconBtn');
        const userMenu = document.getElementById('userDropdownMenu');
        if (userBtn && userMenu) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenu.classList.toggle('active');
            });
            document.addEventListener('click', () => {
                if (userMenu) userMenu.classList.remove('active');
            });
        }

        // Language Switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const lang = btn.textContent;
                localStorage.setItem('selected-lang', lang);
                this.showToast(`Til ${lang}ga o'zgartirildi`, "success");
            });
        });

        // Mobile Filter Toggle
        const filterToggle = document.getElementById('filterToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const closeSidebar = document.getElementById('closeSidebar');

        if (filterToggle && sidebar && overlay) {
            filterToggle.addEventListener('click', () => {
                sidebar.classList.add('active');
                overlay.classList.add('active');
            });

            const closeAction = () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            };

            overlay.addEventListener('click', closeAction);
            if (closeSidebar) closeSidebar.addEventListener('click', closeAction);
        }

        // --- WISHLIST & COMPARE LOGIC ---
        this.initWishlist();
        this.initCompare();
    }

    // --- WISHLIST FUNKSIYASI ---
    initWishlist() {
        const updateWishlistUI = () => {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            document.querySelectorAll('.add-to-wishlist').forEach(btn => {
                const card = btn.closest('.product-card');
                if (!card) return;
                const name = card.querySelector('.product-title').innerText;
                if (wishlist.some(item => item.name === name)) {
                    btn.classList.add('active');
                    btn.querySelector('i').className = 'fas fa-heart';
                } else {
                    btn.classList.remove('active');
                    btn.querySelector('i').className = 'far fa-heart';
                }
            });
        };

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-wishlist');
            if (btn) {
                const card = btn.closest('.product-card');
                const name = card.querySelector('.product-title').innerText;
                const priceElem = card.querySelector('.current-price') || card.querySelector('.product-price');
                const price = priceElem ? priceElem.innerText : '0';
                const image = card.querySelector('.product-image').src;

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                const index = wishlist.findIndex(item => item.name === name);

                if (index > -1) {
                    wishlist.splice(index, 1);
                    this.showToast(`${name} sevimlilardan olib tashlandi`);
                } else {
                    wishlist.push({ name, price, image });
                    this.showToast(`${name} sevimlilarga qo'shildi!`);
                }

                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                updateWishlistUI();
            }
        });

        updateWishlistUI();
    }

    // --- SOLISHTIRISH FUNKSIYASI ---
    initCompare() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-compare');
            if (btn) {
                const card = btn.closest('.product-card');
                const name = card.querySelector('.product-title').innerText;
                const image = card.querySelector('.product-image').src;
                const specs = card.querySelector('.product-specs')?.innerText || '';

                let compare = JSON.parse(localStorage.getItem('compare')) || [];
                if (compare.some(item => item.name === name)) {
                    compare = compare.filter(item => item.name !== name);
                    this.showToast(`${name} solishtirishdan olib tashlandi`);
                } else {
                    if (compare.length >= 4) {
                        this.showToast('Maksimal 4 ta mahsulotni solishtirish mumkin');
                        return;
                    }
                    compare.push({ name, image, specs });
                    this.showToast(`${name} solishtirishga qo'shildi`);
                }
                localStorage.setItem('compare', JSON.stringify(compare));
                this.updateCompareBar();
            }
        });
        this.updateCompareBar();
    }

    updateCompareBar() {
        let bar = document.getElementById('compareBar');
        const compare = JSON.parse(localStorage.getItem('compare')) || [];

        if (compare.length > 0) {
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'compareBar';
                bar.className = 'compare-bar glass-card';
                document.body.appendChild(bar);
            }
            bar.innerHTML = `
                <div class="compare-info">
                    <span>${compare.length} ta mahsulot solishtirilmoqda</span>
                    <a href="compare.html" class="btn btn-primary btn-sm">Solishtirish</a>
                </div>
                <button onclick="localStorage.removeItem('compare'); location.reload();" class="btn btn-secondary btn-sm" style="padding: 5px 10px;">Tozalash</button>
            `;
            bar.classList.add('active');
        } else if (bar) {
            bar.classList.remove('active');
        }
    }

    // --- CATALOG FILTERS ---
    initFilters() {
        const slider = document.getElementById('priceRange');
        const label = document.getElementById('priceLabel') || (slider ? slider.nextElementSibling : null);
        const filterBtn = document.querySelector('.sidebar .btn-primary');
        const sortSelect = document.getElementById('sort');

        if (slider && label) {
            slider.addEventListener('input', (e) => {
                label.textContent = this.formatPrice(e.target.value) + " so'm gacha";
            });
        }

        if (filterBtn) {
            filterBtn.addEventListener('click', () => this.applyFilters());
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.applySorting(sortSelect.value));
        }
    }

    applyFilters() {
        const priceLimit = parseInt(document.getElementById('priceRange')?.value || 999999999);
        const selectedCheckboxes = Array.from(document.querySelectorAll('.sidebar input[type="checkbox"]:checked')).map(cb => cb.value.toLowerCase());
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const priceText = card.querySelector('.product-price').innerText;
            const price = parseInt(priceText.replace(/\D/g, ''));
            const title = card.querySelector('.product-title').innerText.toLowerCase();
            const specs = card.querySelector('.product-specs')?.innerText.toLowerCase() || "";

            let show = true;

            // Price filter
            if (price > priceLimit) show = false;

            // Checkbox filters (CPU, Brand, Purpose etc)
            if (selectedCheckboxes.length > 0) {
                const matchesAny = selectedCheckboxes.some(val =>
                    title.includes(val) || specs.includes(val)
                );
                if (!matchesAny) show = false;
            }

            if (show) {
                card.classList.remove('hidden-product');
                card.style.removeProperty('display'); // Let CSS handle display
            } else {
                card.classList.add('hidden-product');
                card.style.removeProperty('display'); // Let CSS handle display
            }
        });

        this.showToast("Filtrlar qo'llanildi", "success");
    }

    applySorting(criteria) {
        const container = document.querySelector('.products-grid');
        if (!container) return;

        const cards = Array.from(container.querySelectorAll('.product-card'));

        cards.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.product-price').innerText.replace(/\D/g, ''));
            const priceB = parseInt(b.querySelector('.product-price').innerText.replace(/\D/g, ''));

            if (criteria === 'price_asc') return priceA - priceB;
            if (criteria === 'price_desc') return priceB - priceA;
            return 0;
        });

        cards.forEach(card => container.appendChild(card));
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    showToast(message, type = 'success') {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;

        // Premium styling via JS for reliability, but can be moved to CSS
        const bgColor = type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

        toast.style.cssText = `
            display: flex; 
            align-items: center; 
            background: ${bgColor}; 
            backdrop-filter: blur(10px);
            color: white; 
            padding: 16px 24px; 
            border-radius: 16px; 
            margin-bottom: 12px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.3); 
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); 
            font-weight: 600;
            border: 1px solid rgba(255,255,255,0.1);
            transform: translateX(120%);
            opacity: 0;
            min-width: 300px;
        `;

        toast.innerHTML = `
            <i class="fas ${icon}" style="font-size: 24px; margin-right: 16px;"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);

        // Remove toast
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
}

// Global shortcut for ease of use
window.showPremiumToast = (msg, type) => app.showToast(msg, type);

// Toast uchun kerakli stil (hech narsa o'chmasligi uchun)
const style = document.createElement('style');
style.innerHTML = "#toastContainer { position: fixed; top: 20px; right: 20px; z-index: 10000; }";
document.head.appendChild(style);

const app = new TechZoneApp();

// index.html dagi qidiruv inputini qidiruv sahifasiga yo'naltirish
const homeSearchInput = document.getElementById('searchInput');

if (homeSearchInput) {
    homeSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim(); // Bo'sh joylarni olib tashlaymiz
            if (query) {
                // Qidiruv sahifasiga qidiruv so'zi bilan o'tkazamiz
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}