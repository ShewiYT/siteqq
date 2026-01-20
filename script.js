// X-GEN HACK - ФИНАЛЬНАЯ ВЕРСИЯ
console.log('[X-GEN] System initializing...');

let currentLang = 'ru';
let translations = {};
let gamesData = [];

// ==================== ЗАЩИТНЫЙ ЭКРАН ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('[X-GEN] DOM loaded, initializing checkpoint...');
    
    const checkpoint = document.getElementById('checkpoint');
    const captchaInput = document.getElementById('captchaInput');
    const verifyBtn = document.getElementById('verifyBtn');
    const statusText = document.getElementById('statusText');
    const mainContent = document.getElementById('mainContent');
    
    // Фокус на поле ввода
    setTimeout(() => {
        if (captchaInput) {
            captchaInput.focus();
        }
    }, 500);
    
    function verifyCaptcha() {
        const answer = captchaInput.value.trim();
        
        if (answer === '5' || answer === '2+3=5' || answer === '2 + 3 = 5') {
            statusText.textContent = '[ПРОВЕРКА ПРОЙДЕНА. ДОСТУП РАЗРЕШЕН...]';
            statusText.style.color = '#39ff14';
            
            setTimeout(() => {
                checkpoint.style.opacity = '0';
                checkpoint.style.transition = 'opacity 0.8s ease';
                
                setTimeout(() => {
                    checkpoint.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    mainContent.style.opacity = '0';
                    mainContent.style.display = 'block';
                    
                    setTimeout(() => {
                        mainContent.style.transition = 'opacity 1s ease';
                        mainContent.style.opacity = '1';
                        initSite();
                    }, 50);
                }, 800);
            }, 1500);
        } else {
            statusText.textContent = '[ОШИБКА. ПОВТОРИТЕ...]';
            statusText.style.color = '#ff5555';
            captchaInput.value = '';
            captchaInput.focus();
        }
    }
    
    if (verifyBtn) {
        verifyBtn.addEventListener('click', verifyCaptcha);
    }
    
    if (captchaInput) {
        captchaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') verifyCaptcha();
        });
    }
});

// ==================== ИНИЦИАЛИЗАЦИЯ САЙТА ====================
function initSite() {
    // 1. Определение языка
    detectLanguage();
    
    // 2. Загрузка переводов
    loadTranslations();
    
    // 3. Инициализация игр
    initGames();
    
    // 4. Инициализация обновлений
    generateDailyUpdates();
    
    // 5. Обновление счетчика
    updateOnlineCounter();
    
    // 6. Инициализация переключателя языка
    initLangSwitcher();
    
    // 7. Инициализация FAQ (аккордеон)
    initFAQ();
    
    // 8. Typewriter эффект
    initTypewriter();
    
    // 9. Инициализация SEO блока
    initSeoBlock();
}

// ==================== МНОГОЯЗЫЧНОСТЬ ====================
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    if (langCode === 'en') {
        currentLang = 'en';
    } else {
        currentLang = 'ru';
    }
    
    const savedLang = localStorage.getItem('xgen_lang');
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
        currentLang = savedLang;
    }
    
    document.documentElement.lang = currentLang;
}

function loadTranslations() {
    if (currentLang === 'en' && typeof translations_en !== 'undefined') {
        translations = translations_en.en;
    } else {
        translations = translations_ru.ru;
    }
    
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });
    
    const langFlag = document.querySelector('.lang-flag');
    const langCode = document.querySelector('.lang-code');
    
    if (currentLang === 'en') {
        if (langFlag) langFlag.textContent = '🇬🇧';
        if (langCode) langCode.textContent = 'EN';
    } else {
        if (langFlag) langFlag.textContent = '🇷🇺';
        if (langCode) langCode.textContent = 'RU';
    }
}

function initLangSwitcher() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('xgen_lang', currentLang);
        document.documentElement.lang = currentLang;
        
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        loadTranslations();
        initGames();
        generateDailyUpdates();
        initFAQ();
        initSeoBlock();
    });
}

// ==================== СИСТЕМА ИГР ====================
function initGames() {
    gamesData = [
        {
            id: 1, name: 'Rust', category: 'other',
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'ESP Vision', desc_key: 'rust_cheat1' },
                { name: 'Aimbot Pro', desc_key: 'rust_cheat2' },
                { name: 'Resource Radar', desc_key: 'rust_cheat3' }
            ]
        },
        {
            id: 2, name: 'Roblox', category: 'other',
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Script Executor', desc_key: 'roblox_cheat1' },
                { name: 'Speed Hack', desc_key: 'roblox_cheat2' }
            ]
        },
        {
            id: 3, name: 'GTA 5 Online', category: 'other',
            image: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Money Drop', desc_key: 'gta_cheat1' },
                { name: 'God Mode', desc_key: 'gta_cheat2' },
                { name: 'Vehicle Spawner', desc_key: 'gta_cheat3' }
            ]
        },
        {
            id: 4, name: 'The Finals', category: 'fps',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Wallhack Ultimate', desc_key: 'finals_cheat1' },
                { name: 'Perfect Aim', desc_key: 'finals_cheat2' }
            ]
        },
        {
            id: 5, name: 'Apex Legends', category: 'battle',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'ESP Pro', desc_key: 'apex_cheat1' },
                { name: 'No Recoil', desc_key: 'apex_cheat2' },
                { name: 'Speed Hack', desc_key: 'apex_cheat3' }
            ]
        },
        {
            id: 6, name: 'CS2', category: 'fps',
            image: 'https://media.discordapp.net/attachments/1460673185237172409/1463150964247629915/ChatGPT_Image_Jan_20_2026_12_35_28_PM.png?ex=6970c905&is=696f7785&hm=bf88c0743e4101c628d0243d5746e19c3d9e1f9efab09e421606bba1cbdc9786&=&format=webp&quality=lossless&width=1533&height=1022',
            cheats: [
                { name: 'Triggerbot', desc_key: 'cs2_cheat1' },
                { name: 'Skin Changer', desc_key: 'cs2_cheat2' },
                { name: 'Bunny Hop', desc_key: 'cs2_cheat3' }
            ]
        },
        {
            id: 7, name: 'Warzone', category: 'battle',
            image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Aimbot Lite', desc_key: 'warzone_cheat1' },
                { name: 'ESP Advanced', desc_key: 'warzone_cheat2' }
            ]
        },
        {
            id: 8, name: 'Escape from Tarkov', category: 'fps',
            image: 'https://images.unsplash.com/photo1618331833071-1c0c6ee3d19e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Loot ESP', desc_key: 'tarkov_cheat1' },
                { name: 'Radar Hack', desc_key: 'tarkov_cheat2' }
            ]
        },
        {
            id: 9, name: 'PUBG', category: 'battle',
            image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'ESP Vision', desc_key: 'pubg_cheat1' },
                { name: 'Aimbot', desc_key: 'pubg_cheat2' }
            ]
        },
        {
            id: 10, name: 'Valorant', category: 'fps',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Aimbot', desc_key: 'valorant_cheat1' },
                { name: 'Wallhack', desc_key: 'valorant_cheat2' }
            ]
        },
        {
            id: 11, name: 'Fortnite', category: 'battle',
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Soft Aim', desc_key: 'fortnite_cheat1' },
                { name: 'ESP', desc_key: 'fortnite_cheat2' }
            ]
        },
        {
            id: 12, name: 'Destiny 2', category: 'fps',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Auto Aim', desc_key: 'destiny_cheat1' },
                { name: 'Unlimited Ammo', desc_key: 'destiny_cheat2' }
            ]
        }
    ];
    
    renderGames();
    initFilters();
    initDownloadButtons();
}

function renderGames() {
    const grid = document.getElementById('gamesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    gamesData.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.category = game.category;
        
        let cheatsHTML = '';
        game.cheats.forEach(cheat => {
            const desc = translations[cheat.desc_key] || cheat.name;
            cheatsHTML += `
                <div class="cheat-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${cheat.name}: ${desc}</span>
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="game-image" style="background-image: url('${game.image}')">
                <div class="game-badge" data-i18n="top_cheats">Топ читы</div>
            </div>
            <div class="game-content">
                <h3 class="game-title">${game.name}</h3>
                <div class="game-cheats">
                    ${cheatsHTML}
                </div>
                <button class="download-btn" data-game="${game.name}">
                    <i class="fas fa-download"></i>
                    <span data-i18n="download_btn">СКАЧАТЬ X-GEN.EXE</span>
                </button>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    applyTranslations();
}

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const cards = document.querySelectorAll('.game-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initDownloadButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.download-btn')) {
            const button = e.target.closest('.download-btn');
            const gameName = button.dataset.game;
            
            // Анимация загрузки
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-i18n="downloading">ЗАГРУЗКА...</span>';
            button.disabled = true;
            applyTranslations();
            
            setTimeout(() => {
                // Всегда скачиваем один файл x-gen.exe из папки assets
                const link = document.createElement('a');
                link.href = 'assets/x-gen.exe';
                link.download = 'x-gen.exe';
                
                // Добавляем и кликаем
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Восстановление кнопки
                button.innerHTML = originalHTML;
                button.disabled = false;
                applyTranslations();
                
                showNotification(
                    currentLang === 'ru' 
                        ? `X-GEN.EXE скачан для ${gameName}! Запустите от имени администратора.` 
                        : `X-GEN.EXE downloaded for ${gameName}! Run as administrator.`
                );
            }, 2000);
        }
    });
}

// ==================== ДИНАМИЧЕСКИЕ ОБНОВЛЕНИЯ ====================
function generateDailyUpdates() {
    const updatesList = document.getElementById('updatesList');
    if (!updatesList) return;
    
    updatesList.innerHTML = '';
    
    const updates = [
        { game: 'Valorant', type: 'Aimbot улучшен', desc: 'Обновлен алгоритм прицеливания, уменьшена задержка, исправлен детект Vanguard' },
        { game: 'Fortnite', type: 'ESP обновлен', desc: 'Добавлено отображение лута и сундуков, улучшена стабильность на DX12' },
        { game: 'Rust', type: 'Обход EAC', desc: 'Исправлена проблема с детектом новой версии EAC, добавлен спуфер сигнатур' },
        { game: 'CS2', type: 'Skin Changer', desc: 'Добавлены новые скины и паттерны, улучшена скорость замены моделей' },
        { game: 'Apex Legends', type: 'No Recoil v2.5', desc: 'Улучшена система контроля отдачи, добавлены профили для каждого оружия' },
        { game: 'The Finals', type: 'Wallhack v3.1', desc: 'Исправлено отображение через разрушаемые стены, добавлена подсветка оборудования' },
        { game: 'Warzone', type: 'Обновление лоадера', desc: 'Улучшена скорость инжекта, уменьшено время загрузки чита в память' },
        { game: 'Escape from Tarkov', type: 'Radar Hack', desc: 'Обновлена карта всех локаций, добавлены метки ключей и квестовых предметов' }
    ];
    
    // Берем последние 4 обновления
    const recentUpdates = updates.slice(0, 4);
    
    // Генерируем даты за последние 4 дня
    const today = new Date();
    
    recentUpdates.forEach((update, index) => {
        const date = new Date(today);
        date.setDate(date.getDate() - index);
        
        const day = date.getDate();
        const monthNames = currentLang === 'ru' 
            ? ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
            : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = monthNames[date.getMonth()];
        
        const updateCard = document.createElement('div');
        updateCard.className = 'update-card';
        updateCard.innerHTML = `
            <div class="update-date">
                <span class="date-day">${day}</span>
                <span class="date-month">${month}</span>
            </div>
            <div class="update-content">
                <h3>${update.game} - ${update.type}</h3>
                <p>${update.desc}</p>
            </div>
        `;
        
        updatesList.appendChild(updateCard);
    });
}

// ==================== FAQ СИСТЕМА (АККОРДЕОН) ====================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Закрываем все FAQ при открытии нового
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Если текущий FAQ уже открыт, закрываем его
            const isActive = item.classList.contains('active');
            
            // Закрываем все FAQ
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Если текущий FAQ был закрыт, открываем его
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // По умолчанию открываем первый FAQ
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

// ==================== SEO БЛОК ====================
function initSeoBlock() {
    const seoBlocks = document.querySelectorAll('.seo-block');
    
    // Показываем блок для текущего языка, скрываем остальные
    seoBlocks.forEach(block => {
        if (block.dataset.lang === currentLang) {
            block.style.display = 'block';
        } else {
            block.style.display = 'none';
        }
    });
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
function updateOnlineCounter() {
    const counter = document.getElementById('onlineCount');
    if (!counter) return;
    
    let count = 12847;
    
    setInterval(() => {
        const change = Math.floor(Math.random() * 200) - 100;
        count = Math.max(12000, count + change);
        counter.textContent = count.toLocaleString();
        
        // Анимация обновления
        counter.style.color = '#ff00ff';
        setTimeout(() => {
            counter.style.color = '#39ff14';
        }, 200);
    }, 30000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #00eeff, #ff00ff);
        color: #000;
        padding: 12px 24px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 0 20px #00eeff;
        transform: translateX(120%);
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

function initTypewriter() {
    const heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// ==================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ====================
// Создаем фейковый файл x-gen.exe при необходимости
function createFakeExeFile() {
    // Это функция только для демонстрации
    // В реальном проекте здесь был бы код для создания файла
    console.log('[X-GEN] Fake EXE file would be created here');
}

// Инициализация после полной загрузки
window.addEventListener('load', function() {
    console.log('[X-GEN] Window fully loaded');
    // Дополнительные инициализации при необходимости
});

