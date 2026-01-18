/**
 * Admin Notification System
 * Ushbu skript foydalanuvchi harakatlarini (ro'yxatdan o'tish, kirish, buyurtma) 
 * sayt egasiga Telegram orqali yuboradi.
 */

const ADMIN_CONFIG = {
    token: '8522145575:AAFc_4_VvOMSNzDYgzYfpa60nUrRgGdf0-Y',
    chatId: '763254396'
};

/**
 * Telegram botiga xabar yuborish
 * @param {string} message - Yuboriladigan xabar
 */
async function notifyAdmin(message) {
    const url = `https://api.telegram.org/bot${ADMIN_CONFIG.token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: ADMIN_CONFIG.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("Telegram API Error:", result);
            return false;
        }
        console.log("Telegram notification sent successfully!");
        return true;
    } catch (error) {
        console.error("Telegram Network Error:", error);
        return false;
    }
}

// Global obyektga biriktiramiz
window.AdminNotify = {
    send: notifyAdmin,

    // Ro'yxatdan o'tish haqida xabar
    onRegister: async (data) => {
        const msg = `🆕 <b>Yangi foydalanuvchi!</b>\n\n` +
            `👤 Ism: ${data.firstName} ${data.lastName}\n` +
            `📧 Email: ${data.email}\n` +
            `📞 Tel: ${data.phone}\n` +
            `🕒 Vaqt: ${new Date().toLocaleString()}`;
        await notifyAdmin(msg);
    },

    // Kirish haqida xabar
    onLogin: async (email) => {
        const msg = `🔑 <b>Tizimga kirish</b>\n\n` +
            `📧 Email: ${email}\n` +
            `🕒 Vaqt: ${new Date().toLocaleString()}`;
        await notifyAdmin(msg);
    },

    // Buyurtma haqida xabar
    onOrder: async (orderData) => {
        let itemsText = orderData.items.map(item => `   - ${item.name} (${item.quantity} ta)`).join('\n');
        const msg = `🛍️ <b>YANGI BUYURTMA!</b>\n\n` +
            `👤 Mijoz: ${orderData.name} ${orderData.surname}\n` +
            `📞 Tel: ${orderData.phone}\n` +
            `📍 Manzil: ${orderData.address}\n` +
            `💳 To'lov: ${orderData.paymentMethod}\n\n` +
            `📦 Mahsulotlar:\n${itemsText}\n\n` +
            `💰 Jami: <b>${orderData.total}</b>\n` +
            `💬 Izoh: ${orderData.comment || 'Yo\'q'}`;
        await notifyAdmin(msg);
    },

    // Savatchadan to'lovga o'tish
    onCartProceed: async (cartData) => {
        let itemsText = cartData.items.map(item => `   - ${item.name} (${item.quantity} ta)`).join('\n');
        const msg = `🛒 <b>Savatdan to'lovga o'tildi!</b>\n\n` +
            `📦 Mahsulotlar:\n${itemsText}\n\n` +
            `💰 Umumiy summa: <b>${cartData.total}</b>\n` +
            `🕒 Vaqt: ${new Date().toLocaleString()}`;
        await notifyAdmin(msg);
    }
};
