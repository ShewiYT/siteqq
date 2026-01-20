// X-GEN HACK - ИСПРАВЛЕННЫЙ СКРИПТ
console.log('[X-GEN] System initializing...');

// Глобальные переменные
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
    
    console.log('[X-GEN] Elements found:', {
        checkpoint: !!checkpoint,
        captchaInput: !!captchaInput,
        verifyBtn: !!verifyBtn,
        mainContent: !!mainContent
    });
    
    // Фокус на поле ввода
    setTimeout(() => {
        if (captchaInput) {
            captchaInput.focus();
            console.log('[X-GEN] Focus set on captcha input');
        }
    }, 500);
    
    // Проверка капчи
    function verifyCaptcha() {
        console.log('[X-GEN] Captcha verification triggered');
        const answer = captchaInput.value.trim();
        console.log('[X-GEN] User input:', answer);
        
        // Проверяем ответ
        if (answer === '5' || answer === '2+3=5' || answer === '2 + 3 = 5') {
            console.log('[X-GEN] Captcha passed');
            statusText.textContent = '[ПРОВЕРКА ПРОЙДЕНА. ДОСТУП РАЗРЕШЕН...]';
            statusText.style.color = '#39ff14';
            
            // Анимация завершения
            setTimeout(() => {
                // Прямая манипуляция с DOM
                checkpoint.style.opacity = '0';
                checkpoint.style.transition = 'opacity 0.8s ease';
                
                setTimeout(() => {
                    checkpoint.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    mainContent.style.opacity = '0';
                    mainContent.style.display = 'block';
                    
                    // Плавное появление
                    setTimeout(() => {
                        mainContent.style.transition = 'opacity 1s ease';
                        mainContent.style.opacity = '1';
                        console.log('[X-GEN] Main content revealed');
                        initSite();
                    }, 50);
                }, 800);
            }, 1500);
        } else {
            console.log('[X-GEN] Captcha failed');
            statusText.textContent = '[ОШИБКА. ПОВТОРИТЕ...]';
            statusText.style.color = '#ff5555';
            captchaInput.value = '';
            captchaInput.focus();
            
            // Анимация ошибки
            captchaInput.style.borderColor = '#ff5555';
            captchaInput.style.boxShadow = '0 0 10px #ff5555';
            setTimeout(() => {
                captchaInput.style.borderColor = '#00eeff';
                captchaInput.style.boxShadow = 'none';
            }, 1000);
        }
    }
    
    // Обработчики событий
    if (verifyBtn) {
        verifyBtn.addEventListener('click', verifyCaptcha);
        console.log('[X-GEN] Verify button event listener attached');
    }
    
    if (captchaInput) {
        captchaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('[X-GEN] Enter pressed in captcha');
                verifyCaptcha();
            }
        });
    }
});

// ==================== ИНИЦИАЛИЗАЦИЯ САЙТА ====================
function initSite() {
    console.log('[X-GEN] Site initialization started');
    
    // 1. Определение языка
    detectLanguage();
    
    // 2. Загрузка переводов
    loadTranslations();
    
    // 3. Инициализация игр
    initGames();
    
    // 4. Инициализация чата
    initChat();
    
    // 5. Обновление счетчика
    updateOnlineCounter();
    
    // 6. Инициализация переключателя языка
    initLangSwitcher();
    
    // 7. Показать чат
    setTimeout(() => {
        const chatWidget = document.querySelector('.chat-widget');
        if (chatWidget) {
            chatWidget.style.display = 'block';
            chatWidget.style.opacity = '0';
            setTimeout(() => {
                chatWidget.style.transition = 'opacity 0.5s ease';
                chatWidget.style.opacity = '1';
            }, 100);
        }
    }, 3000);
    
    console.log('[X-GEN] Site initialization complete');
}

// ==================== МНОГОЯЗЫЧНОСТЬ ====================
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    console.log('[X-GEN] Browser language detected:', browserLang, '->', langCode);
    
    if (langCode === 'en') {
        currentLang = 'en';
    } else {
        currentLang = 'ru';
    }
    
    // Проверка сохраненного выбора
    const savedLang = localStorage.getItem('xgen_lang');
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
        currentLang = savedLang;
        console.log('[X-GEN] Using saved language:', currentLang);
    }
    
    document.documentElement.lang = currentLang;
    console.log('[X-GEN] Current language set to:', currentLang);
}

function loadTranslations() {
    console.log('[X-GEN] Loading translations for:', currentLang);
    
    if (currentLang === 'en' && typeof translations_en !== 'undefined') {
        translations = translations_en.en;
        console.log('[X-GEN] English translations loaded');
    } else {
        translations = translations_ru.ru;
        console.log('[X-GEN] Russian translations loaded');
    }
    
    applyTranslations();
}

function applyTranslations() {
    console.log('[X-GEN] Applying translations...');
    let translatedCount = 0;
    
    // Текстовые элементы
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
            translatedCount++;
        }
    });
    
    // Placeholder'ы
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
            translatedCount++;
        }
    });
    
    // Обновление флага и кода языка
    const langFlag = document.querySelector('.lang-flag');
    const langCode = document.querySelector('.lang-code');
    
    if (currentLang === 'en') {
        if (langFlag) langFlag.textContent = '🇬🇧';
        if (langCode) langCode.textContent = 'EN';
    } else {
        if (langFlag) langFlag.textContent = '🇷🇺';
        if (langCode) langCode.textContent = 'RU';
    }
    
    console.log(`[X-GEN] ${translatedCount} elements translated`);
}

function initLangSwitcher() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', function() {
        console.log('[X-GEN] Language toggle clicked');
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('xgen_lang', currentLang);
        document.documentElement.lang = currentLang;
        
        // Анимация переключения
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        loadTranslations();
        initGames(); // Перерисовываем игры с новыми переводами
        initChat(); // Перезагружаем чат
    });
}

// ==================== СИСТЕМА ИГР ====================
function initGames() {
    console.log('[X-GEN] Initializing games system');
    
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
            image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
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
            image: 'https://images.unsplash.com/photo-1618331833071-1c0c6ee3d19e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            cheats: [
                { name: 'Loot ESP', desc_key: 'tarkov_cheat1' },
                { name: 'Radar Hack', desc_key: 'tarkov_cheat2' }
            ]
        }
    ];
    
    renderGames();
    initFilters();
    initDownloadButtons();
}

function renderGames() {
    const grid = document.getElementById('gamesGrid');
    if (!grid) {
        console.error('[X-GEN] Games grid not found!');
        return;
    }
    
    console.log('[X-GEN] Rendering', gamesData.length, 'games');
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
                    <span data-i18n="download_btn">СКАЧАТЬ ЧИТ</span>
                </button>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Применяем переводы к новым элементам
    applyTranslations();
}

function initFilters() {
    console.log('[X-GEN] Initializing filters');
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
    console.log('[X-GEN] Setting up download buttons');
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.download-btn')) {
            const button = e.target.closest('.download-btn');
            const gameName = button.dataset.game;
            
            console.log('[X-GEN] Download requested for:', gameName);
            
            // Анимация загрузки
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-i18n="downloading">ЗАГРУЗКА...</span>';
            button.disabled = true;
            applyTranslations();
            
            // Имитация загрузки
            setTimeout(() => {
                // Создаем фейковый файл
                const fakeContent = `X-GEN Cheat Loader for ${gameName}\nVersion: 4.2\nStatus: Undetected\n\nThis is a demo file. Real cheat would be here.`;
                const blob = new Blob([fakeContent], { type: 'application/octet-stream' });
                const url = window.URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = `X-GEN_${gameName.replace(/\s+/g, '_')}_Cheat.exe`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                
                // Восстановление кнопки
                button.innerHTML = originalHTML;
                button.disabled = false;
                applyTranslations();
                
                // Уведомление
                showNotification(
                    currentLang === 'ru' 
                        ? `Чит для "${gameName}" скачан!` 
                        : `Cheat for "${gameName}" downloaded!`
                );
            }, 2000);
        }
    });
}

// ==================== ЧАТ ПОДДЕРЖКИ ====================
function initChat() {
    console.log('[X-GEN] Initializing chat system');
    const chatMessagesDiv = document.getElementById('chatMessages');
    if (!chatMessagesDiv) return;
    
    chatMessagesDiv.innerHTML = '';
    
    let messages;
    if (currentLang === 'en') {
        messages = [
            { type: 'bot', text: 'Support Bot: Hello! Need help with cheats?' },
            { type: 'user', text: 'User1337: The Rust cheat works perfectly!' },
            { type: 'bot', text: 'Support Bot: Great! Run as admin for best results.' },
            { type: 'user', text: 'HackerPro: When is Valorant update?' },
            { type: 'bot', text: 'Support Bot: Update scheduled for tomorrow.' }
        ];
    } else {
        messages = [
            { type: 'bot', text: 'Поддержка: Здравствуйте! Нужна помощь?' },
            { type: 'user', text: 'User1337: Чит на Rust работает отлично!' },
            { type: 'bot', text: 'Поддержка: Запускайте от администратора.' },
            { type: 'user', text: 'HackerPro: Когда обновление для Valorant?' },
            { type: 'bot', text: 'Поддержка: Запланировано на завтра.' }
        ];
    }
    
    messages.forEach(msg => {
        addChatMessage(msg.text, msg.type);
    });
    
    // Обработчики чата
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendChatMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Сообщение пользователя
    addChatMessage(`Вы: ${message}`, 'user');
    input.value = '';
    
    // Ответ бота
    setTimeout(() => {
        let responses;
        if (currentLang === 'en') {
            responses = [
                'Support Bot: Please check our FAQ section.',
                'Support Bot: Our cheats are updated daily.',
                'Support Bot: Disable antivirus before use.',
                'Support Bot: Download the latest loader.',
                'Support Bot: Thanks for your feedback!'
            ];
        } else {
            responses = [
                'Поддержка: Проверьте раздел FAQ.',
                'Поддержка: Читы обновляются ежедневно.',
                'Поддержка: Отключите антивирус.',
                'Поддержка: Скачайте последнюю версию.',
                'Поддержка: Спасибо за отзыв!'
            ];
        }
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(response, 'bot');
    }, 1000 + Math.random() * 2000);
}

function addChatMessage(text, type) {
    const chatMessagesDiv = document.getElementById('chatMessages');
    if (!chatMessagesDiv) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.opacity = '0';
    
    chatMessagesDiv.appendChild(messageDiv);
    
    // Анимация появления
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease';
        messageDiv.style.opacity = '1';
    }, 10);
    
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
function updateOnlineCounter() {
    const counter = document.getElementById('onlineCount');
    if (!counter) return;
    
    let count = 8421;
    
    setInterval(() => {
        const change = Math.floor(Math.random() * 100) - 50;
        count = Math.max(8000, count + change);
        counter.textContent = count.toLocaleString();
        
        // Мигание при обновлении
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
    
    // Стили
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
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Автоудаление через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// ==================== ДОПОЛНИТЕЛЬНЫЕ СКРИПТЫ ====================
// Typewriter эффект для заголовка
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

// Инициализация после полной загрузки
window.addEventListener('load', function() {
    console.log('[X-GEN] Window fully loaded');
    initTypewriter();
});

// Создаем фейковый файл loader.exe при необходимости
function createFakeLoader() {
    const fakeExeContent = `X-GEN Cheat Loader v4.2
=========================
This is a demonstration file.
Real cheat loader would be here.

Features:
- Memory Injection
- Anti-Cheat Bypass
- HWID Spoofer
- Auto-Updater

Warning: For educational purposes only!`;
    
    // Можно сохранить в localStorage для демонстрации
    localStorage.setItem('xgen_loader_content', fakeExeContent);
}
