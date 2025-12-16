// js/main.js - TechZone Tozalangan va Yangilangan Versiya (2025)

class TechZoneApp {
    constructor() {
        // Savatni localStorage'dan yuklash
        this.cart = JSON.parse(localStorage.getItem('techzone_cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
        this.setupEventListeners();
        // Agar sahifada mahsulotlar konteyneri bo'lsa, ularni yuklaymiz
        if (document.getElementById('discountProducts') || document.getElementById('bestsellerProducts')) {
            this.loadProducts();
        }
    }

    // Mahsulotlar bazasi (Buni keyinchalik API-dan olishingiz mumkin)
    getProducts() {
        return [
            { id: '1', name: 'Lenovo Legion 5 Pro', price: 18000000, image: 'images/ideapad.jfif', category: 'discount' },
            { id: '2', name: 'Samsung Odyssey G9', price: 14500000, image: 'images/samsung.jfif', category: 'discount' },
            { id: '3', name: 'ASUS TUF RTX 4070 Ti', price: 12500000, image: 'images/rtx4070.jpg', category: 'bestseller' },
            { id: '4', name: 'Logitech G PRO X', price: 2800000, image: 'https://images.unsplash.com/photo-1616766436940-d66838a6a6f1', category: 'bestseller' }
        ];
    }

    // Mahsulot kartasi HTML shabloni
    createCard(product) {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h4>${product.name}</h4>
                <p class="current-price">${this.formatPrice(product.price)} so'm</p>
                <button class="btn btn-primary" onclick="app.addToCart('${product.id}')">
                    Savatga qo'shish
                </button>
            </div>
        `;
    }

    loadProducts() {
        const allProducts = this.getProducts();
        
        const discountDiv = document.getElementById('discountProducts');
        const bestsellerDiv = document.getElementById('bestsellerProducts');

        if (discountDiv) {
            discountDiv.innerHTML = allProducts
                .filter(p => p.category === 'discount')
                .map(p => this.createCard(p)).join('');
        }

        if (bestsellerDiv) {
            bestsellerDiv.innerHTML = allProducts
                .filter(p => p.category === 'bestseller')
                .map(p => this.createCard(p)).join('');
        }
    }

    // SAVAT LOGIKASI (100% Ishlaydigan)
    addToCart(productId) {
        const product = this.getProducts().find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        alert(`${product.name} savatga qo'shildi!`);
    }

    saveCart() {
        localStorage.setItem('techzone_cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-count');
        if (cartBadge) cartBadge.textContent = count;
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    setupEventListeners() {
        // Kelajakda qo'shimcha eventlar uchun
    }
}

// Ilovani ishga tushirish
const app = new TechZoneApp();