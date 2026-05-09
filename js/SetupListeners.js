document.getElementById('startBtn').addEventListener('click', () => { startRun(); document.getElementById('menu').style.display = 'none'; });
document.getElementById('multiplayerBtn').addEventListener('click', () => {
    state.multiplayer = !state.multiplayer;
    const btn = document.getElementById('multiplayerBtn');
    btn.innerText = state.multiplayer ? "2 Spieler: AN" : "2 Spieler: AUS";
    btn.style.background = state.multiplayer ? "#ff9800" : "#555";
});
document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Willst du wirklich ALLES zurücksetzen?')) { localStorage.clear(); location.reload(); }
});

document.getElementById('openChallengeMenuBtn').addEventListener('click', () => { 
    document.getElementById('menu').style.display = 'none'; 
    document.getElementById('challengeModal').style.display = 'flex'; 
    if(unlockedLevels.length > 0) document.getElementById('bonusTab').style.display='block';
    renderChallengeList(); 
});
document.getElementById('openEditorBtn').addEventListener('click', () => { startEditor(); });
document.getElementById('closeChallengeModal').addEventListener('click', () => { document.getElementById('challengeModal').style.display = 'none'; document.getElementById('menu').style.display = 'flex'; });
document.querySelectorAll('.challenge-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.challenge-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderChallengeList(tab.getAttribute('data-diff'));
    });
});
function renderChallengeList(diff = 'easy') {
    const list = document.getElementById('challengeList'); list.innerHTML = '';
    const levels = CHALLENGES[diff];
    if(!levels || levels.length === 0) { list.innerHTML = '<div style="color:#666;">Keine Challenges...</div>'; return; }
    levels.forEach((lvl, idx) => {
        const lvlId = diff + '-' + idx;
        const item = document.createElement('div');
        item.className = 'challenge-item' + (completedLevels.includes(lvlId) ? ' completed' : '');
        item.innerHTML = `<div style="display:flex;align-items:center;"><div class="challenge-check">✓</div><div><h3>${lvl.name}</h3><p>Level ${idx+1}</p></div></div><button class="btn-small" style="background:var(--accent);color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;">Starten</button>`;
        item.addEventListener('click', () => startChallenge(lvl, lvlId));
        list.appendChild(item);
    });
}
document.getElementById('retryChallengeBtn').addEventListener('click', () => {
    document.getElementById('failOverlay').style.display = 'none';
    if(state.currentLevelData) startChallenge(state.currentLevelData, state.challengeId);
});
document.getElementById('exitChallengeBtn').addEventListener('click', () => {
    state.isChallenge = false;
    state.isEEGreenLevel = false;
    state.isEERedLevel = false;
    document.getElementById('failOverlay').style.display = 'none';
    document.getElementById('challengeHud').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
});

// Skins UI
function renderSkinGrid() {
  const grid = document.getElementById('skinGrid'); 
  grid.innerHTML = '';
  const skinCoinCount = document.getElementById('skinCoinCount');
  if(skinCoinCount) skinCoinCount.innerText = totalCoins;
  SKINS.forEach((s, idx) => {
    if (s.chestOnly && !unlocked[s.id]) return;
    const isUnlocked = Boolean(unlocked[s.id]);
    const card = document.createElement('div'); 
    card.className = 'skin-card' + (isUnlocked ? '' : ' locked');
    if (selectedSkin === s.id) { card.style.outline = '4px solid var(--accent)'; }
    const thumb = document.createElement('canvas'); 
    thumb.width = 88; thumb.height = 88; thumb.className = 'skin-thumb';
    const tctx = thumb.getContext('2d');
    const cols = s.colors || ['#999', '#666']; 
    drawPixelBlockToContext(tctx, 88, cols, idx * 1234, s.file || null);
    card.appendChild(thumb);
    const nameEl = document.createElement('div'); 
    nameEl.innerText = s.name; nameEl.style.fontWeight = '800'; card.appendChild(nameEl);
    // Attribute badge – show ??? for special skins so the name/mechanic stays hidden
    if (!isUnlocked && s.price) {
        const coinDisplay = document.createElement('div');
        coinDisplay.className = 'coin-display';
        coinDisplay.innerHTML = `<div class="coin-icon"></div><span>${s.price}</span>`;
        card.appendChild(coinDisplay);
        const note = document.createElement('div'); note.innerText = "Klicken zum Kaufen"; note.style.fontSize="12px"; note.style.color="#555"; card.appendChild(note);
    } else if (isUnlocked) {
        const note = document.createElement('div'); note.style.marginTop="8px"; note.style.fontWeight="600";
        if (selectedSkin === s.id) { note.innerText = "Ausgewählt ✓"; note.style.color = "var(--accent)"; note.style.fontSize = "16px"; } 
        else { note.innerText = "Bereit"; note.style.fontSize = "14px"; note.style.color = "#333"; }
        card.appendChild(note);
    } else {
        const note = document.createElement('div'); note.innerText = s.unlock.type==='score' ? `Benötigt Highscore: ${s.unlock.value}` : 'Gesperrt'; note.style.fontSize="10px"; card.appendChild(note);
    }
    card.onclick = () => {
      if (isUnlocked) { selectedSkin = s.id; localStorage.setItem(SKIN_KEY, selectedSkin); showToast(s.name + ' ausgewählt'); renderSkinGrid(); }
      else if (s.price && totalCoins >= s.price) { totalCoins -= s.price; unlocked[s.id] = true; localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked)); saveCoins(); showToast('Skin gekauft!'); renderSkinGrid(); checkTitles(); } 
      else if (s.price) { showToast('Zu wenig Gold'); }
    };
    grid.appendChild(card);
  });
}
document.getElementById('openSkinsMain').addEventListener('click', ()=>{ state.running=false; resetGame(); renderSkinGrid(); document.getElementById('skinModal').style.display = 'block'; document.getElementById('menu').style.display = 'none'; });
document.getElementById('openSkinsHUD').addEventListener('click', ()=>{ state.running=false; resetGame(); renderSkinGrid(); document.getElementById('skinModal').style.display = 'block'; document.getElementById('menu').style.display = 'none'; });
document.getElementById('closeSkinModal').addEventListener('click', ()=>{ document.getElementById('skinModal').style.display = 'none'; document.getElementById('menu').style.display = 'flex'; });

// Titles UI
function checkTitles() {
    TITLES.forEach(t => {
        if (t.hidden && !(eeKeyBlue && eeKeyGreen && eeKeyRed)) return; // Hidden EE title only after all keys
        let isUnlocked = false;
        if (t.condition === 'all_skins') isUnlocked = SKINS.filter(s=>!s.chestOnly && s.price).every(s=>unlocked[s.id]);
        else if (t.condition === 'lava_unlock') isUnlocked = lavaRunUnlocked;
        else if (t.condition === 'highscore_10k') isUnlocked = savedHighscore >= 10000;
        else if (t.condition === 'highscore_1000k') isUnlocked = savedHighscore >= 1000000;
        else if (t.condition === 'all_challenges') { let total = 0; for(let k in CHALLENGES) total += CHALLENGES[k].length; isUnlocked = completedLevels.length >= total; }
        else if (t.condition === 'all_easter_eggs') isUnlocked = eeKeyBlue && eeKeyGreen && eeKeyRed;
        if (isUnlocked && !localStorage.getItem(TITLE_PREFIX + t.id)) { localStorage.setItem(TITLE_PREFIX + t.id, 'true'); showToast('Titel: ' + t.name); }
    });
}
document.getElementById('openTitlesBtn').addEventListener('click', () => { checkTitles(); renderTitleList(); document.getElementById('menu').style.display = 'none'; document.getElementById('titleModal').style.display = 'flex'; });
document.getElementById('closeTitleModal').addEventListener('click', () => { document.getElementById('titleModal').style.display = 'none'; document.getElementById('menu').style.display = 'flex'; });
function renderTitleList() {
    const list = document.getElementById('titleList'); list.innerHTML = '';
    TITLES.forEach(t => {
        // Hidden EE title only shown if all keys found
        if (t.hidden && !(eeKeyBlue && eeKeyGreen && eeKeyRed)) return;
        const isUnlocked = localStorage.getItem(TITLE_PREFIX + t.id) === 'true';
        const isEi = (t.id === 'Ei');
        let cls = 'title-item' + (isUnlocked ? ' unlocked' : '') + (selectedTitle===t.id ? ' active-title' : '') + (isEi ? ' ei-title-item' : '');
        const item = document.createElement('div'); item.className = cls;
        item.innerHTML = `<h3>${t.name}</h3><p>${t.desc}</p>`;
        if(isUnlocked) item.addEventListener('click', () => { selectedTitle = t.id; localStorage.setItem(SELECTED_TITLE_KEY, t.id); updateActiveTitleDisplay(); renderTitleList(); });
        list.appendChild(item);
    });
}

function updateActiveTitleDisplay() {
    const el = document.getElementById('activeTitleDisplay');
    if (!el) return;
    const t = TITLES.find(t => t.id === selectedTitle);
    if (t) {
        el.innerText = t.name;
        if (t.id === 'Ei') {
            el.classList.add('ei-blue');
        } else {
            el.classList.remove('ei-blue');
        }
    } else {
        el.innerText = '';
        el.classList.remove('ei-blue');
    }
}

// Lava Shop & Chest Logic
function updateLavaCollectionCount() {
    const lavaSkins = SKINS.filter(s => s.chestOnly);
    const owned = lavaSkins.filter(s => unlocked[s.id]).length;
    const el = document.getElementById('lavaSkinCounter');
    if (el) el.innerText = `${owned} / ${lavaSkins.length}`;
}
document.getElementById('openLavaShopBtn').addEventListener('click', () => { state.running=false; resetGame(); document.getElementById('menu').style.display='none'; document.getElementById('lavaShopModal').style.display='flex'; resetLavaShop(); });
document.getElementById('closeLavaShop').addEventListener('click', () => { document.getElementById('lavaShopModal').style.display='none'; document.getElementById('menu').style.display='flex'; });

const chestElement = document.getElementById('chestElement');
const rewardReveal = document.getElementById('rewardReveal');
const buyChestBtn = document.getElementById('buyChestBtn');
const resetChestBtn = document.getElementById('resetChestBtn');
function resetLavaShop() { chestElement.className = 'chest-box'; chestElement.classList.remove('hidden'); rewardReveal.classList.remove('show'); buyChestBtn.style.display = 'block'; buyChestBtn.disabled = false; resetChestBtn.style.display = 'none'; document.getElementById('rewardThumbContainer').innerHTML = ''; }
buyChestBtn.addEventListener('click', () => { if(totalLavaCoins>=10) { totalLavaCoins-=10; saveCoins(); buyChestBtn.disabled = true; chestElement.classList.add('shake'); setTimeout(()=>{ chestElement.classList.remove('shake'); chestElement.classList.add('open'); setTimeout(revealLoot, 400); }, 800); } else showToast('Zu wenig Lava Coins'); });
function revealLoot() {
    const chestSkins = SKINS.filter(s=>s.chestOnly);
    const totalWeight = chestSkins.reduce((sum, s) => sum + s.probability, 0);
    let random = Math.random() * totalWeight;
    let win = chestSkins[0];
    for (let s of chestSkins) { if (random < s.probability) { win = s; break; } random -= s.probability; }
    chestElement.classList.add('hidden'); buyChestBtn.style.display = 'none'; resetChestBtn.style.display = 'block';
    const rewardContainer = document.getElementById('rewardThumbContainer'); rewardContainer.innerHTML = '';
    const thumb = document.createElement('canvas'); thumb.width = 100; thumb.height = 100; thumb.style.borderRadius = '12px';
    drawPixelBlockToContext(thumb.getContext('2d'), 100, win.colors, 999);
    rewardContainer.appendChild(thumb);
    document.getElementById('rewardName').innerText = win.name;
    document.getElementById('duplicateMsg').style.display = unlocked[win.id] ? 'block' : 'none';
    if(!unlocked[win.id]) { unlocked[win.id]=true; } else { totalLavaCoins+=5; }
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked)); saveCoins(); rewardReveal.classList.add('show'); updateLavaCollectionCount();
}
resetChestBtn.addEventListener('click', resetLavaShop);

// CODE REDEMPTION LOGIC - MIT LEVEL IMPORT
const codeModal = document.getElementById('codeModal');
document.getElementById('openCodeModalBtn').addEventListener('click', () => { codeModal.style.display = 'flex'; });
document.getElementById('cancelCodeBtn').addEventListener('click', () => { codeModal.style.display = 'none'; });
document.getElementById('submitCodeBtn').addEventListener('click', () => {
    const rawInput = document.getElementById('codeInputField').value.trim();
    const inputUpper = rawInput.toUpperCase();
    if (!inputUpper) return;

    // Easter Egg: VerticalJumper level (green key)
    if (inputUpper === 'VERTICALJUMPER') {
        codeModal.style.display = 'none';
        document.getElementById('codeInputField').value = '';
        document.getElementById('menu').style.display = 'none';
        const lvlData = { name: "VerticalJumper", platforms: buildVerticalJumperLevel() };
        startChallenge(lvlData, 'ee_green');
        return;
    }

    if (inputUpper.startsWith('VJLVL-')) {
        try {
            const b64 = rawInput.substring(6);
            const json = atob(b64);
            const platforms = JSON.parse(json);
            codeModal.style.display = 'none';
            alert("Level erfolgreich geladen!");
            startEditor({ platforms: platforms });
            return;
        } catch(e) { alert("Fehlerhafter Level-Code."); return; }
    }
    if (usedCodes.includes(inputUpper)) { alert("Dieser Code wurde bereits eingelöst!"); return; }
    if (uwhduhaufhushg[inputUpper]) {
        const reward = uwhduhaufhushg[inputUpper];
        let msg = "";
        if (reward.type === 'coin') { totalCoins += reward.value; saveCoins(); msg = `+${reward.value} Gold erhalten!`; } 
        else if (reward.type === 'lava') { totalLavaCoins += reward.value; saveCoins(); msg = `+${reward.value} Lava Coins erhalten!`; }
        else if (reward.type === 'skin') { unlocked[reward.value]=true; localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked)); msg = `Skin freigeschaltet!`; }
        else if (reward.type === 'title') { localStorage.setItem(TITLE_PREFIX + reward.value, 'true'); msg = `Titel freigeschaltet!`; }
        else if (reward.type === 'level') { unlockedLevels.push(reward.value); localStorage.setItem(UNLOCKED_LEVELS_KEY, JSON.stringify(unlockedLevels)); msg = "Bonus Level freigeschaltet! Siehe Challenges."; }
        usedCodes.push(inputUpper); localStorage.setItem(USED_CODES_KEY, JSON.stringify(usedCodes));
        alert("ERFOLG: " + msg); codeModal.style.display = 'none'; document.getElementById('codeInputField').value = '';
    } else { alert("Code ungültig."); }
});

function resetGame(){
  state.isChallenge = false;
  state.challengeId = null;
  state.currentLevelData = null;
  state.scrollY = 0;
  state.maxHeight = 0;
  state.started = false;
  state.isEEGreenLevel = false;
  state.isEERedLevel = false;
  lavaY = 1000; 
  initPlatforms();
  score = 0; document.getElementById('score').innerText = 0;
  state.players = [createPlayer(state.width/2, state.height-200, 'arrows', selectedSkin)];
  if(state.multiplayer) { state.players.push(createPlayer(state.width/2+40, state.height-200, 'wasd', 'redt')); }
  if (!SKINS.find(s=>s.id===selectedSkin)) { selectedSkin = 'dirt'; localStorage.setItem(SKIN_KEY, selectedSkin); }
  checkSkinUnlocks();
}
function startRun(){ resetGame(); state.running = true; requestAnimationFrame(loop); }