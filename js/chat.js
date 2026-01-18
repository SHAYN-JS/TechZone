/**
 * TechZone Chat Bot Logic
 * Creator: Davlat Norbotayev
 * Tech: HTML, CSS, JS
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.getElementById('toggleChat');
    const closeChat = document.getElementById('closeChat');
    const chatWindow = document.getElementById('chatWindow');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle Chat Window
    chatBtn.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        if (chatWindow.style.display === 'flex') {
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Send Message Logic
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        chatInput.value = '';

        // Bot Response (delay for realism)
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 600);
    }

    function addMessage(text, side) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${side}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(input) {
        const text = input.toLowerCase();

        // 1. Help & Capabilities
        if (text.includes('nimalar') || text.includes('savol bera') || text.includes('yordam') || text.includes('bilasan') || text.includes('help')) {
            return "Men quyidagi mavzularda sizga yordam bera olaman:\n" +
                "• 👥 Asoschilar (Davlat va Dilshod)\n" +
                "• 💻 Texnologiyalar (HTML, CSS, JS)\n" +
                "• 🛡️ Kafolat va sifat\n" +
                "• 🚚 Yetkazib berish (Dostavka)\n" +
                "• 💳 To'lov usullari va Kredit\n" +
                "• 📍 Manzil va Ish vaqti\n" +
                "• 📞 Aloqa ma'lumotlari\n" +
                "• 🔄 Qaytarish (Refund) shartlari\n" +
                "• 💼 Ishga joylashish (Vakansiya)";
        }

        // 2. Creator & Team
        if (text.includes('kim yaratgan') || text.includes('muallif') || text.includes('egasi') || text.includes('creator') || text.includes('kimlar')) {
            return "Ushbu loyihani Davlat Norbotayev va Dilshod Sayfiddinov hamkorlikda (collab) yaratishgan. Ular tajribali dasturchilar va ushbu premium platformaning asoschilaridir.";
        }

        // 3. Tech stack
        if (text.includes('nimalar ishlatilgan') || text.includes('texnologiya') || text.includes('stack') || text.includes('qanday yozilgan') || text.includes('tillar')) {
            return "TechZone loyihasi HTML5, CSS3, Vanilla JavaScript, FontAwesome 6 va zamonaviy UI/UX tamoyillari asosida yaratilgan. Hech qanday og'ir freymvorklarsiz maksimal tezlikka erishilgan.";
        }

        // 4. Greeting & Well-being
        if (text.includes('salom') || text.includes('assalom') || text.includes('hello') || text.includes('qale')) {
            return "Assalomu alaykum! TechZone yordamchisi sizga xizmat qilishdan xursand. Savollaringiz bo'lsa, javob berishga tayyorman.";
        }

        // 5. Products & Warranty & Returns
        if (text.includes('kafolat') || text.includes('warranty')) {
            return "Bizning barcha mahsulotlarimizga 1 yildan 3 yilgacha rasmiy kafolat beriladi. Kafolat talonini har bir xarid bilan birga olasiz.";
        }

        if (text.includes('qaytarish') || text.includes('vosvrat') || text.includes('refund')) {
            return "Mahsulotda nuqson bo'lsa yoki sizga ma'qul kelmasa, 24 soat ichida qaytarish yoki almashtirish imkoniyati mavjud (agar qadoq buzilmagan bo'lsa).";
        }

        if (text.includes('yetkazish') || text.includes('dostavka') || text.includes('delivery')) {
            return "O'zbekiston bo'ylab yetkazib berish xizmati mavjud. Toshkent shahar ichida 24 soatda, viloyatlarga 2-3 ish kunida yetkazamiz.";
        }

        if (text.includes('kredit') || text.includes('muddatli')) {
            return "Ha, bizda muddatli to'lov (kredit) imkoniyati mavjud. Buning uchun sizga faqat pasport yoki ID-karta kerak bo'ladi.";
        }

        if (text.includes('to\'lov') || text.includes('pay') || text.includes('pul')) {
            return "Bizda Click, Payme, Uzum Pay va Naqd pul orqali to'lovlarni amalga oshirishingiz mumkin.";
        }

        // 6. Contact & Location & Hours
        if (text.includes('manzil') || text.includes('qayerdasiz') || text.includes('location')) {
            return "Bizning asosiy ofisimiz Toshkent shahrida, Yunusobod tumanida joylashgan. Xaritadagi aniq manzilni 'Biz haqimizda' sahifasidan ko'rishingiz mumkin.";
        }

        if (text.includes('vaqt') || text.includes('ochiq') || text.includes('soat')) {
            return "Biz har kuni 09:00 dan 21:00 gacha dam olish kunisiz ishlaymiz. Onlayn buyurtmalar esa 24/7 qabul qilinadi.";
        }

        if (text.includes('telefon') || text.includes('aloqa') || text.includes('contact')) {
            return "Biz bilan bog'lanish uchun: +998 90 123 45 67 raqamiga qo'ng'iroq qiling yoki Telegram: @TechZone_Support";
        }

        // 7. Career
        if (text.includes('ishga') || text.includes('vakansiya') || text.includes('job') || text.includes('ish bormi')) {
            return "Biz doimo iqtidorli yoshlarni jamoamizga chorlaymiz. Rezyumengizni hr@techzone.uz manziliga yuboring.";
        }

        // 8. Default
        return "Tushuna olmadim. Savollarni to'g'ri yozganingizga ishonch hosil qiling yoki 'Nimalarni bilasan?' deb so'rang.";
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
