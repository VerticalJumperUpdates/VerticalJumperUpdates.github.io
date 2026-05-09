function makeKeySvg(color) {
    // color: 'black'/'#00bcd4'/'#4caf50'/'#ff7043'
    const fill = color || '#222';
    const accent = color === '#222' ? '#555' : '#fff';
    return `<svg viewBox="0 0 22 38" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="10" r="8.5" fill="${fill}" stroke="${accent}" stroke-width="1.5"/>
      <circle cx="11" cy="10" r="4.2" fill="${accent}" opacity="0.55"/>
      <rect x="9" y="17" width="4" height="14" rx="2" fill="${fill}" stroke="${accent}" stroke-width="1"/>
      <rect x="13" y="22" width="4" height="3" rx="1.2" fill="${fill}" stroke="${accent}" stroke-width="1"/>
      <rect x="13" y="27" width="3" height="2.5" rx="1" fill="${fill}" stroke="${accent}" stroke-width="1"/>
    </svg>`;
}

function updateKeyHud() {
    const colors = ['#00bcd4', '#4caf50', '#ff7043']; // blue, green, red
    const silhouette = '#222';
    const found = [eeKeyBlue, eeKeyGreen, eeKeyRed];
    for (let i = 0; i < 3; i++) {
        const slot = document.getElementById('keySlot' + i);
        if (slot) slot.innerHTML = makeKeySvg(found[i] ? colors[i] : silhouette);
    }
}

// Blue key slot: clicking opens the blue horizontal level (with loading bar)
document.getElementById('keySlot0').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'none') return; // only from menu
    menu.style.display = 'none';
    startEEBlueLevel();
});

function startEEBlueLevel() {
    const loader = document.getElementById('eeBlueLoader');
    const bar    = document.getElementById('eeBlueLoaderBar');
    loader.style.display = 'flex';
    bar.style.width = '0%';
    const duration = 3000; // ms
    const startTime = performance.now();
    function tick(now) {
        const pct = Math.min(100, ((now - startTime) / duration) * 100);
        bar.style.width = pct + '%';
        if (pct < 100) {
            requestAnimationFrame(tick);
        } else {
            loader.style.display = 'none';
            const lvlData = { name: "BlueLevel", platforms: buildBlueLevel() };
            startChallenge(lvlData, 'ee_blue');
        }
    }
    requestAnimationFrame(tick);
}

// Red key slot: clicking opens the deep level
document.getElementById('keySlot2').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'none') return; // only from menu
    menu.style.display = 'none';
    const lvlData = { name: "TiefLevel", platforms: buildDeepLevel() };
    startChallenge(lvlData, 'ee_red');
});

/* -------------------- EASTER EGG: KEY CAPTURE SCREEN -------------------- */

function showKeyCaptureScreen(color) {
    state.running = false;
    document.getElementById('challengeHud').style.display = 'none';
    document.getElementById('menu').style.display = 'none';

    const overlay = document.getElementById('keyCaptureOverlay');
    const titleEl = document.getElementById('keyCaptureTitle');
    const imgEl = document.getElementById('keyCaptureKeyImg');

    const configs = {
        blue:  { label: 'Blauer',  bg: 'linear-gradient(135deg,#80deea,#26c6da)', keyColor: '#00bcd4' },
        green: { label: 'Grüner',  bg: 'linear-gradient(135deg,#a5d6a7,#43a047)', keyColor: '#4caf50' },
        red:   { label: 'Roter',   bg: 'linear-gradient(135deg,#ffcc80,#fb8c00)', keyColor: '#ff7043' }
    };
    const cfg = configs[color] || configs.blue;

    titleEl.innerText = cfg.label + ' Schlüssel erhalten';
    overlay.style.background = cfg.bg;

    // Rebuild key SVG with color
    imgEl.innerHTML = `
      <circle cx="30" cy="26" r="22" fill="${cfg.keyColor}" stroke="#222" stroke-width="3"/>
      <circle cx="30" cy="26" r="12" fill="white" opacity="0.45"/>
      <rect x="26" y="46" width="8" height="44" rx="3" fill="${cfg.keyColor}" stroke="#222" stroke-width="2"/>
      <rect x="34" y="62" width="10" height="7" rx="2" fill="${cfg.keyColor}" stroke="#222" stroke-width="2"/>
      <rect x="34" y="76" width="8" height="6" rx="2" fill="${cfg.keyColor}" stroke="#222" stroke-width="2"/>
    `;

    overlay.style.display = 'flex';
    updateKeyHud();

    // Check if all keys are found
    if (eeKeyBlue && eeKeyGreen && eeKeyRed) {
        checkTitles();
    }
}

document.getElementById('keyCaptureBackBtn').addEventListener('click', () => {
    document.getElementById('keyCaptureOverlay').style.display = 'none';
    state.isEEGreenLevel = false;
    state.isEERedLevel = false;
    state.isEEBlueLevel = false;

    if (eeKeyBlue && eeKeyGreen && eeKeyRed) {
        showAllKeysOverlay();
    } else {
        document.getElementById('menu').style.display = 'flex';
    }
});

/* ---- EASTER EGG: Blue key – currently awarded via game mechanic for Ying&Yang ---- */
// The blue key is awarded when the Ying&Yang (MJ) skin reaches a score milestone in normal play
// Specifically: first time the player reaches score 500 with Ying&Yang skin selected
function checkMJKeyAward() {
    if (!eeKeyBlue && selectedSkin === '9' && score >= 500) {
        eeKeyBlue = true;
        localStorage.setItem(EE_KEY_BLUE, 'true');
        // Show key capture after current run ends – store pending award
        state._pendingBlueKey = true;
    }
}

/* -------------------- EASTER EGG: ALL KEYS OVERLAY -------------------- */

function showAllKeysOverlay() {
    const overlay = document.getElementById('allKeysOverlay');
    const row = document.getElementById('allKeysRow');
    row.innerHTML = '';
    const colors = ['#00bcd4', '#4caf50', '#ff7043'];
    for (let i = 0; i < 3; i++) {
        const wrap = document.createElement('div');
        wrap.innerHTML = makeKeySvg(colors[i]);
        wrap.style.width = '40px';
        wrap.style.height = '64px';
        row.appendChild(wrap);
    }
    overlay.style.display = 'flex';
}

document.getElementById('allKeysBackBtn').addEventListener('click', () => {
    document.getElementById('allKeysOverlay').style.display = 'none';
    showTrueCredits();
});

/* -------------------- EASTER EGG: TRUE CREDITS -------------------- */

function showTrueCredits() {
    document.getElementById('trueCreditScreen').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('trueCreditScreen').style.display = 'none';
        document.getElementById('menu').style.display = 'flex';
    }, 40000);
}