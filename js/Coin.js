let totalCoins = parseInt(localStorage.getItem(COINS_KEY)) || 0;
let totalLavaCoins = parseInt(localStorage.getItem(LAVA_COINS_KEY)) || 0;
let completedLevels = JSON.parse(localStorage.getItem(COMPLETED_LEVELS_KEY) || '[]');
let usedCodes = JSON.parse(localStorage.getItem(USED_CODES_KEY) || '[]');
let unlockedLevels = JSON.parse(localStorage.getItem(UNLOCKED_LEVELS_KEY) || '[]');
let selectedTitle = localStorage.getItem(SELECTED_TITLE_KEY) || null;
let devMode = JSON.parse(localStorage.getItem(DEV_KEY) || 'false') || false;
let score = 0;

const totalStats = {
  totalJumps: Number(localStorage.getItem(TOTAL_JUMPS_KEY) || 0),
  totalRedLandings: Number(localStorage.getItem(TOTAL_RED_LANDINGS_KEY) || 0),
  totalBlueLandings: Number(localStorage.getItem(TOTAL_BLUE_LANDINGS_KEY) || 0),
  totalOrangeLandings: Number(localStorage.getItem(TOTAL_ORANGE_LANDINGS_KEY) || 0),
  totalFalls: Number(localStorage.getItem(TOTAL_FALLS_KEY) || 0)
};

function saveCoins() { localStorage.setItem(COINS_KEY, totalCoins); localStorage.setItem(LAVA_COINS_KEY, totalLavaCoins); updateCoinUI(); }
function updateCoinUI() {
    const hudVal = document.getElementById('coinCountHUD');
    const modalVal = document.getElementById('skinCoinCount');
    if(hudVal) hudVal.innerText = totalCoins;
    if(modalVal) modalVal.innerText = totalCoins;
    const lavaShopVal = document.getElementById('lavaShopCoinCount');
    if(lavaShopVal) lavaShopVal.innerText = totalLavaCoins;
    const hudIcon = document.getElementById('hudCoinIcon');
    const hudDisplay = document.getElementById('hudCoinDisplay');
    if (lavaRunActive) {
        hudIcon.classList.add('red');
        hudDisplay.classList.add('red-mode');
        if(hudVal) hudVal.innerText = totalLavaCoins;
    } else {
        hudIcon.classList.remove('red');
        hudDisplay.classList.remove('red-mode');
    }
    updateLavaCollectionCount();
}
function spawnCoinAnim(isLava = false) {
    const container = document.getElementById('coin-anim-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'coin-fly-up' + (isLava ? ' red' : '');
    const iconClass = isLava ? 'coin-icon red' : 'coin-icon';
    const text = isLava ? '+1 Rote Münze' : '+1 Gold';
    el.innerHTML = `<div class="${iconClass}"></div> ${text}`;
    container.appendChild(el);
    setTimeout(() => { el.remove(); }, 1200);
}
function addCoin() { totalCoins++; spawnCoinAnim(false); saveCoins(); }
function addLavaCoin() { totalLavaCoins++; spawnCoinAnim(true); saveCoins(); }