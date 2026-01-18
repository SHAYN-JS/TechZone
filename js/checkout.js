/**
 * CheckoutManager - Buyurtma berish jarayonini boshqarish
 */
class CheckoutManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.renderSummary();
        this.setupEventListeners();
    }

    renderSummary() {
        const listEl = document.getElementById('checkoutSummaryList');
        const subtotalEl = document.getElementById('subtotal');
        const totalAmountEl = document.getElementById('totalAmount');

        if (!listEl) return;

        if (this.cart.length === 0) {
            listEl.innerHTML = '<div class="text-gray-500">Savat bo\'sh</div>';
            return;
        }

        listEl.innerHTML = '';
        let total = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            listEl.innerHTML += `
                <div class="flex justify-between items-center py-4 border-b border-zinc-800 animate-fade-in">
                    <div class="flex flex-col">
                        <span class="text-white font-medium">${item.name}</span>
                        <span class="text-xs text-zinc-500">${this.formatPrice(item.price)} so'm x ${item.quantity}</span>
                    </div>
                    <span class="text-blue-500 font-bold">${this.formatPrice(itemTotal)} so'm</span>
                </div>
            `;
        });

        const formattedTotal = this.formatPrice(total) + " so'm";
        if (subtotalEl) subtotalEl.innerText = formattedTotal;
        if (totalAmountEl) totalAmountEl.innerText = formattedTotal;
    }

    setupEventListeners() {
        const form = document.getElementById('checkoutForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleOrderSubmission(form);
            });
        }
    }

    async handleOrderSubmission(form) {
        if (this.cart.length === 0) {
            if (window.showPremiumToast) {
                window.showPremiumToast("Savat bo'sh! Buyurtma berish uchun mahsulot tanlang.", "error");
            } else {
                alert("Savat bo'sh! Buyurtma berish uchun mahsulot tanlang.");
            }
            return;
        }

        const formData = new FormData(form);
        const orderData = {
            name: formData.get('name'),
            surname: formData.get('surname'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            paymentMethod: formData.get('paymentMethod'),
            comment: formData.get('comment'),
            items: this.cart,
            total: document.getElementById('totalAmount').innerText
        };

        // Adminni xabardor qilish
        if (window.AdminNotify) {
            try {
                await window.AdminNotify.onOrder(orderData);
            } catch (err) {
                console.error("Order notification failed:", err);
            }
        }

        // Muvaffaqiyatli xabar
        if (window.showPremiumToast) {
            window.showPremiumToast("Rahmat! Buyurtmangiz qabul qilindi. Tez orada operatorlarimiz bog'lanishadi.", "success");
        } else {
            alert("Rahmat! Buyurtmangiz qabul qilindi. Tez orada operatorlarimiz bog'lanishadi.");
        }

        // Savatni tozalash va indexga qaytish
        localStorage.removeItem('cart');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000); // Toastni ko'rishga ulgurishi uchun
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.checkoutManager = new CheckoutManager();
});
