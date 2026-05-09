const openLavaShopBtn = document.getElementById('openLavaShopBtn');
if (lavaRunUnlocked) {
  if (lavaModeBtn) lavaModeBtn.style.display = 'inline-block';
  if (openLavaShopBtn) openLavaShopBtn.style.display = 'inline-block';
}

function updateModeButtons() {
    if (!lavaModeBtn || !iceModeBtn) return;
    if (iceModeActive) {
        lavaModeBtn.classList.add('mode-disabled');
        lavaModeBtn.disabled = true;
    } else {
        lavaModeBtn.classList.remove('mode-disabled');
        lavaModeBtn.disabled = false;
    }
    if (lavaRunActive) {
        iceModeBtn.classList.add('mode-disabled');
        iceModeBtn.disabled = true;
    } else {
        iceModeBtn.classList.remove('mode-disabled');
        iceModeBtn.disabled = false;
    }
}

if (lavaModeBtn) {
    lavaModeBtn.addEventListener('click', () => {
        if (iceModeActive) return;
        lavaRunActive = !lavaRunActive;
        lavaModeBtn.innerText = "Lava-Modus: " + (lavaRunActive ? "AN" : "AUS");
        document.body.classList.toggle('lava-bg', lavaRunActive);
        if (lavaRunActive && iceModeActive) {
            iceModeActive = false;
            localStorage.setItem('vj_ice_active', 'false');
            iceModeBtn.innerText = "Ice-Mode: AUS";
            document.body.classList.remove('ice-bg');
            iceParticles = [];
        }
        updateModeButtons();
        updateCoinUI();
    });
}

if (iceModeBtn) {
    iceModeBtn.addEventListener('click', () => {
        if (lavaRunActive) return;
        iceModeActive = !iceModeActive;
        localStorage.setItem('vj_ice_active', iceModeActive);
        iceModeBtn.innerText = "Ice-Mode: " + (iceModeActive ? "AN" : "AUS");
        document.body.classList.toggle('ice-bg', iceModeActive);
        if (iceModeActive && lavaRunActive) {
            lavaRunActive = false;
            lavaModeBtn.innerText = "Lava-Modus: AUS";
            document.body.classList.remove('lava-bg');
        }
        if (iceModeActive) {
            iceParticles = [];
            for (let i = 0; i < 90; i++) iceParticles.push(createIceParticle());
        } else {
            iceParticles = [];
        }
        updateModeButtons();
    });
}