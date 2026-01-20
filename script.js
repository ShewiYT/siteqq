// Основной скрипт X-GEN HACK
document.addEventListener('DOMContentLoaded', function() {
    // ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================
    let currentLang = 'ru';
    let translations = {};
    let gamesData = [];
    let chatMessages = [];
    
    // ==================== ЗАЩИТНЫЙ ЭКРАН ====================
    const checkpoint = document.getElementById('checkpoint');
    const captchaInput = document.getElementById('captchaInput');
    const verifyBtn = document.getElementById('verifyBtn');
    const statusText = document.getElementById('statusText');
    const mainContent = document.getElementById('mainContent');
    
    verifyBtn.addEventListener('click', verifyCaptcha);
    captchaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verifyCaptcha();
    });
    
    function verifyCaptcha() {
        const answer = captchaInput.value.trim();
        
        // Простая проверка: 2+3=5 или "5"
        if (answer === '5' || answer === '2+3=5' || answer === '2 + 3 = 5') {
            statusText.textContent = '[ПРОВЕРКА ПРОЙДЕНА. ДОСТУП РАЗРЕШЕН...]';
            statusText.style.color = '#39ff14';
            
            setTimeout(() => {
                checkpoint.classList.remove('active');
                mainContent.classList.remove('hidden');
                initSite();
            }, 1500);
        } else {
            statusText.textContent = '[ОШИБКА. ПОВТОРИТЕ...]';
            statusText.style.color = '#ff5555';
            captchaInput.value = '';
            captchaInput.focus();
        }
    }
    
    // ==================== ИНИЦИАЛИЗАЦИЯ САЙТА ====================
    function initSite() {
        // Определение языка
        detectLanguage();
        
        // Загрузка переводов
        loadTranslations();
        
        // Инициализация игр
        initGames();
        
        // Инициализация чата
        initChat();
        
        // Счетчик онлайн
        updateOnlineCounter();
        
        // Инициализация переключателя языка
        initLangSwitcher();
        
        // Показать чат через 5 секунд
        setTimeout(() => {
            document.querySelector('.chat-widget').style.display = 'block';
        }, 5000);
    }
    
    // ==================== МНОГОЯЗЫЧНОСТЬ ====================
    function detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Поддерживаемые языки
        if (langCode === 'en') {
            currentLang = 'en';
        } else {
            currentLang = 'ru'; // По умолчанию
        }
        
        // Проверяем сохраненный выбор
        const savedLang = localStorage.getItem('xgen_lang');
        if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
            currentLang = savedLang;
        }
        
        // Устанавливаем атрибут lang
        document.documentElement.lang = currentLang;
    }
    
    function loadTranslations() {
        // Выбираем нужный файл переводов (уже загружен в HTML)
        if (currentLang === 'en' && typeof translations_en !== 'undefined') {
            translations = translations_en.en;
        } else {
            translations = translations_ru.ru;
        }
        
        // Применяем переводы
        applyTranslations();
    }
    
    function applyTranslations() {
        // Текстовые элементы
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        // Placeholder'ы
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });
        
        // Обновляем флаг и код языка
        const langFlag = document.querySelector('.lang-flag');
        const langCode = document.querySelector('.lang-code');
        
        if (currentLang === 'en') {
            langFlag.textContent = '🇬🇧';
            langCode.textContent = 'EN';
        } else {
            langFlag.textContent = '🇷🇺';
            langCode.textContent = 'RU';
        }
    }
    
    function initLangSwitcher() {
        document.getElementById('langToggle').addEventListener('click', function() {
            currentLang = currentLang === 'ru' ? 'en' : 'ru';
            localStorage.setItem('xgen_lang', currentLang);
            document.documentElement.lang = currentLang;
            loadTranslations();
            initChat(); // Перезагружаем сообщения чата
        });
    }
    
    // ==================== СИСТЕМА ИГР ====================
    function initGames() {
        // Данные игр (в реальности можно загружать из JSON)
        gamesData = [
            {
                id: 1,
                name: 'Rust',
                category: 'other',
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'ESP Vision', desc_key: 'rust_cheat1' },
                    { name: 'Aimbot Pro', desc_key: 'rust_cheat2' },
                    { name: 'Resource Radar', desc_key: 'rust_cheat3' }
                ]
            },
            {
                id: 2,
                name: 'Roblox',
                category: 'other',
                image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'Script Executor', desc_key: 'roblox_cheat1' },
                    { name: 'Speed Hack', desc_key: 'roblox_cheat2' }
                ]
            },
            {
                id: 3,
                name: 'GTA 5 Online',
                category: 'other',
                image: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'Money Drop', desc_key: 'gta_cheat1' },
                    { name: 'God Mode', desc_key: 'gta_cheat2' },
                    { name: 'Vehicle Spawner', desc_key: 'gta_cheat3' }
                ]
            },
            {
                id: 4,
                name: 'The Finals',
                category: 'fps',
                image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'Wallhack Ultimate', desc_key: 'finals_cheat1' },
                    { name: 'Perfect Aim', desc_key: 'finals_cheat2' }
                ]
            },
            {
                id: 5,
                name: 'Apex Legends',
                category: 'battle',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'ESP Pro', desc_key: 'apex_cheat1' },
                    { name: 'No Recoil', desc_key: 'apex_cheat2' },
                    { name: 'Speed Hack', desc_key: 'apex_cheat3' }
                ]
            },
            {
                id: 6,
                name: 'CS2',
                category: 'fps',
                image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'Triggerbot', desc_key: 'cs2_cheat1' },
                    { name: 'Skin Changer', desc_key: 'cs2_cheat2' },
                    { name: 'Bunny Hop', desc_key: 'cs2_cheat3' }
                ]
            },
            {
                id: 7,
                name: 'Warzone',
                category: 'battle',
                image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'Aimbot Lite', desc_key: 'warzone_cheat1' },
                    { name: 'ESP Advanced', desc_key: 'warzone_cheat2' }
                ]
            },
            {
                id: 8,
                name: 'Escape from Tarkov',
                category: 'fps',
                image: 'https://images.unsplash.com/photo-1618331833071-1c0c6ee3d19e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'Loot ESP', desc_key: 'tarkov_cheat1' },
                    { name: 'Radar Hack', desc_key: 'tarkov_cheat2' }
                ]
            },
            {
                id: 9,
                name: 'PUBG',
                category: 'battle',
                image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'ESP Vision', desc_key: 'pubg_cheat1' },
                    { name: 'Aimbot', desc_key: 'pubg_cheat2' }
                ]
            },
            {
                id: 10,
                name: 'Destiny 2',
                category: 'fps',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                cheats: [
                    { name: 'Auto Aim', desc_key: 'destiny_cheat1' },
                    { name: 'Unlimited Ammo', desc_key: 'destiny_cheat2' }
                ]
            }
        ];
        
        // Генерация карточек
        renderGames();
        
        // Фильтрация
        initFilters();
        
        // Обработчики скачивания
        initDownloadButtons();
    }
    
    function renderGames() {
        const grid = document.getElementById('gamesGrid');
        grid.innerHTML = '';
        
        gamesData.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.category = game.category;
            
            // Генерация описаний читов на текущем языке
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
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Активный класс
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const cards = document.querySelectorAll('.game-card');
                
                cards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    function initDownloadButtons() {
        // Используем делегирование событий
        document.addEventListener('click', function(e) {
            if (e.target.closest('.download-btn')) {
                const button = e.target.closest('.download-btn');
                const gameName = button.dataset.game;
                
                // Показываем "загрузку"
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-i18n="downloading">ЗАГРУЗКА...</span>';
                button.disabled = true;
                
                // Применяем перевод к новой кнопке
                applyTranslations();
                
                // Создаем фейковую загрузку
                setTimeout(() => {
                    // Скачиваем loader.exe
                    const link = document.createElement('a');
                    link.href = '/loader.exe'; // Относительный путь
                    link.download = `X-GEN_${gameName.replace(/\s+/g, '_')}_Cheat.exe`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Восстанавливаем кнопку
                    button.innerHTML = originalText;
                    button.disabled = false;
                    applyTranslations();
                    
                    // Показываем уведомление
                    showNotification(
                        currentLang === 'ru' 
                            ? `Чит для ${gameName} успешно скачан!` 
                            : `Cheat for ${gameName} downloaded!`
                    );
                }, 2000);
            }
        });
    }
    
    // ==================== ЧАТ ПОДДЕРЖКИ ====================
    function initChat() {
        const chatMessagesDiv = document.getElementById('chatMessages');
        chatMessagesDiv.innerHTML = '';
        
        // Сообщения в зависимости от языка
        if (currentLang === 'en') {
            chatMessages = [
                { type: 'bot', text: 'Support Bot: Hello! How can I help you?' },
                { type: 'user', text: 'User1337: Downloaded cheat for Rust, works perfect!' },
                { type: 'bot', text: 'Support Bot: Great to hear! Remember to run as administrator.' },
                { type: 'user', text: 'HackerPro: When will the Valorant cheat be updated?' },
                { type: 'bot', text: 'Support Bot: Update is planned for tomorrow. Stay tuned!' }
            ];
        } else {
            chatMessages = [
                { type: 'bot', text: 'Поддержка: Здравствуйте! Чем могу помочь?' },
                { type: 'user', text: 'User1337: Скачал чит на Rust, работает идеально!' },
                { type: 'bot', text: 'Поддержка: Отлично! Не забудьте запускать от администратора.' },
                { type: 'user', text: 'HackerPro: Когда обновится чит на Valorant?' },
                { type: 'bot', text: 'Поддержка: Обновление запланировано на завтра. Следите за новостями!' }
            ];
        }
        
        // Отображаем сообщения
        chatMessages.forEach(msg => {
            addChatMessage(msg.text, msg.type);
        });
        
        // Обработчик отправки
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');
        
        sendBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
    
    function sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            // Сообщение пользователя
            addChatMessage(`Вы: ${message}`, 'user');
            input.value = '';
            
            // Ответ бота через 1-3 секунды
            setTimeout(() => {
                let responses;
                
                if (currentLang === 'en') {
                    responses = [
                        'Support Bot: Please check the FAQ section.',
                        'Support Bot: Our cheats are updated daily.',
                        'Support Bot: Make sure your antivirus is disabled.',
                        'Support Bot: Download the latest loader from our site.',
                        'Support Bot: Thank you for your feedback!'
                    ];
                } else {
                    responses = [
                        'Поддержка: Пожалуйста, проверьте раздел FAQ.',
                        'Поддержка: Наши читы обновляются ежедневно.',
                        'Поддержка: Убедитесь, что антивирус отключен.',
                        'Поддержка: Скачайте последний лоадер с нашего сайта.',
                        'Поддержка: Спасибо за отзыв!'
                    ];
                }
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addChatMessage(randomResponse, 'bot');
            }, 1000 + Math.random() * 2000);
        }
    }
    
    function addChatMessage(text, type) {
        const chatMessagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        
        chatMessagesDiv.appendChild(messageDiv);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
    
    // ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
    function updateOnlineCounter() {
        const counter = document.getElementById('onlineCount');
        let count = 8421;
        
        // Обновляем каждые 30 секунд
        setInterval(() => {
            // Случайное изменение +/- 50
            const change = Math.floor(Math.random() * 100) - 50;
            count = Math.max(8000, count + change);
            counter.textContent = count.toLocaleString();
        }, 30000);
    }
    
    function showNotification(message) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 238, 255, 0.9);
            color: #000;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-weight: bold;
            box-shadow: 0 0 20px #00eeff;
            animation: slideIn 0.5s, fadeOut 0.5s 2.5s;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Добавляем стили для анимации уведомления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});