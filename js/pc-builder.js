/**
 * PC Builder Logic
 */

const components = {
    cpu: [
        { name: "Intel Core i9-14900K", price: 8500000, img: "images/cpu.jfif" },
        { name: "AMD Ryzen 9 7950X", price: 7900000, img: "images/cpu.jfif" },
        { name: "Intel Core i7-13700K", price: 5500000, img: "images/cpu.jfif" }
    ],
    gpu: [
        { name: "NVIDIA RTX 4090 24GB", price: 25000000, img: "images/3060.jfif" },
        { name: "NVIDIA RTX 4080 16GB", price: 18000000, img: "images/3060.jfif" },
        { name: "NVIDIA RTX 3060 12GB", price: 4500000, img: "images/3060.jfif" }
    ],
    ram: [
        { name: "Corsair Vengeance 32GB DDR5", price: 1800000, img: "images/ram.jfif" },
        { name: "Kingston Fury 16GB DDR4", price: 650000, img: "images/ram.jfif" }
    ],
    storage: [
        { name: "Samsung 990 Pro 1TB", price: 1600000, img: "images/ssd.jfif" },
        { name: "Crucial P3 2TB SSD", price: 1900000, img: "images/ssd.jfif" }
    ]
};

let selectedParts = {};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('selectionModal');
    const modalList = document.getElementById('modalList');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.getElementById('closeModal');

    document.querySelectorAll('.select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.closest('.builder-step').dataset.category;
            openModal(category);
        });
    });

    closeModal.onclick = () => modal.classList.remove('active');

    function openModal(category) {
        modalTitle.innerText = `Tanlang: ${category.toUpperCase()}`;
        modalList.innerHTML = '';

        components[category].forEach(item => {
            const div = document.createElement('div');
            div.className = 'glass-card';
            div.style.padding = '15px';
            div.style.cursor = 'pointer';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';

            div.innerHTML = `
                <span>${item.name}</span>
                <b>${item.price.toLocaleString()} so'm</b>
            `;

            div.onclick = () => {
                selectItem(category, item);
                modal.classList.remove('active');
            };
            modalList.appendChild(div);
        });

        modal.classList.add('active');
    }

    function selectItem(category, item) {
        selectedParts[category] = item;
        const step = document.querySelector(`.builder-step[data-category="${category}"]`);
        step.querySelector('.selected-text').innerText = item.name;
        step.querySelector('.selected-text').style.color = 'var(--premium-primary)';

        updateSummary();
    }

    function updateSummary() {
        const list = document.getElementById('summaryList');
        const totalPriceEl = document.getElementById('totalPrice');
        const addAllBtn = document.getElementById('addAllToCart');

        let total = 0;
        let html = '';

        Object.keys(selectedParts).forEach(cat => {
            const item = selectedParts[cat];
            total += item.price;
            html += `<li style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 14px; opacity: 0.8;">
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} so'm</span>
            </li>`;
        });

        list.innerHTML = html + `<hr style="border: 0.5px solid var(--premium-dark-border); margin: 10px 0;">
            <li style="display: flex; justify-content: space-between;">
                <b>Jami:</b>
                <b style="color: var(--premium-primary)">${total.toLocaleString()} so'm</b>
            </li>`;

        totalPriceEl.innerText = `${total.toLocaleString()} so'm`;

        if (Object.keys(selectedParts).length >= 1) {
            addAllBtn.disabled = false;
        }
    }

    document.getElementById('addAllToCart').onclick = () => {
        const app = new TechZoneApp();
        Object.values(selectedParts).forEach(part => {
            app.addToCart(part);
        });
        this.showToast("Barcha qismlar savatga qo'shildi!");
    };
});
