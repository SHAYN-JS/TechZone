/**
 * TechZone Mahsulotlar Ma'lumotlar Bazasi (Simulyatsiya)
 */
const productsData = {
    // --- Homepage Products ---
    "H1": {
        name: "Acer Predator Helios 300",
        category: "Noutbuklar",
        price: "12 500 000 so'm",
        image: "images/nogiron.jfif",
        description: "Acer Predator Helios 300 - bu o'yin ixlosmandlari uchun yaratilgan haqiqiy hayvon. Intel Core i7 protsessori va RTX 3060 videokartasi bilan har qanday o'yinni maksimal sozlamalarda o'ynashingiz mumkin.",
        specs: {
            processor: "Intel Core i7-12700H",
            ram: "16GB DDR4 3200MHz",
            storage: "512GB NVMe SSD",
            gpu: "NVIDIA GeForce RTX 3060 6GB"
        }
    },
    "H2": {
        name: "Samsung Odyssey G7",
        category: "Monitorlar",
        price: "5 800 000 so'm",
        image: "images/samsung.jfif",
        description: "Samsung Odyssey G7 - 1000R egrilik darajasiga ega dunyodagi birinchi monitor. 240Hz yangilanish tezligi va QHD aniqligi sizga mislsiz tasvir sifatini taqdim etadi.",
        specs: {
            display: "32\" QHD (2560x1440)",
            refresh: "240Hz / 1ms",
            panel: "VA (QLED)",
            hdr: "DisplayHDR 600"
        }
    },
    "H3": {
        name: "RTX 4070 Founders Edition",
        category: "Videokartalar",
        price: "9 999 000 so'm",
        image: "images/3060.jfif",
        description: "NVIDIA GeForce RTX 4070 - bu Ada Lovelace arxitekturasidagi eng samarali videokartalardan biri. DLSS 3 va Ray Tracing yordamida o'yinlaringiz mutlaqo yangi darajaga chiqadi.",
        specs: {
            vram: "12GB GDDR6X",
            interface: "PCI-Express 4.0",
            cores: "5888 CUDA Cores",
            power: "200W (TDP)"
        }
    },
    // --- Bestsellers ---
    "B1": {
        name: "Gaming PC \"Mid-Range\"",
        category: "Kompyuterlar",
        price: "11 000 000 so'm",
        image: "images/gamingz.jfif",
        description: "O'rta darajadagi o'yinlar va ishlar uchun ideal yechim. Barcha zamonaviy qismlardan yig'ilgan ushbu tizim blok uzoq yillar xizmat qiladi.",
        specs: {
            processor: "Intel Core i5-13400F",
            ram: "16GB DDR5 5200MHz",
            storage: "1TB Gen4 SSD",
            gpu: "RTX 4060 8GB"
        }
    },
    "B2": {
        name: "Samsung 980 Pro SSD 1TB",
        category: "SSD/HDD",
        price: "1 600 000 so'm",
        image: "images/ssd3.jfif",
        description: "Dunyoning eng tezkor SSD xotiralaridan biri. Fayllarni uzatish va o'yinlarni yuklash tezligi bir necha barobar ortadi.",
        specs: {
            speed: "7000 MB/s gacha",
            capacity: "1TB",
            interface: "PCIe 4.0 x4",
            type: "NVMe M.2"
        }
    },
    "B3": {
        name: "Asus ROG Strix G15",
        category: "Noutbuklar",
        price: "14 500 000 so'm",
        image: "images/asus rog.jfif",
        description: "Asus ROG seriyasidagi eng mashhur model. Ajoyib dizayn, RGB yoritgich va yuqori unumdorlikning uyg'unligi.",
        specs: {
            processor: "Intel Core i7-13650HX",
            ram: "16GB DDR5",
            storage: "512GB NVMe Gen4",
            gpu: "RTX 4060 8GB"
        }
    }
};
