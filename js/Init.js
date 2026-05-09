if (lavaRunUnlocked) { document.getElementById('lavaModeBtn').style.display = 'inline-block'; document.getElementById('openLavaShopBtn').style.display = 'inline-block'; }
document.getElementById('highscore').innerText = savedHighscore;
document.getElementById('score').innerText = score;
updateCoinUI();
updateKeyHud();
updateActiveTitleDisplay();
checkSkinUnlocks();

// Blue key: also check if Ying&Yang score milestone was already met before (retroactive)
// It will be awarded during gameplay in checkMJKeyAward() called from score updates
// Hook into score update – patch the score display update
const _origScoreUpdate = () => {
    if (!state.isChallenge && !eeKeyBlue) checkMJKeyAward();
};

// Patch the game loop to check MJ key during normal play
const _origLoop = loop;

// Intercept score changes: add to the update after scoring section
// We'll add a check in the render tick instead
let _mjKeyCheckTick = 0;
const _checkMJKey = setInterval(() => {
    if (state.running && !state.isChallenge && !eeKeyBlue && selectedSkin === '9' && score >= 500) {
        checkMJKeyAward();
        if (state._pendingBlueKey) {
            state._pendingBlueKey = false;
            // Will show after run ends – hook into death handler
        }
    }
}, 500);

// Patch death screen to check for pending blue key after run
const _origAnyDeathHandler = () => {};
// Override: add post-death blue key screen
// We monitor in the update function by adding a check at the end of the game
// Blue key display: hook run end
const _menuObs = new MutationObserver(() => {
    const menu = document.getElementById('menu');
    if (menu && menu.style.display !== 'none' && state._pendingBlueKey) {
        state._pendingBlueKey = false;
        menu.style.display = 'none';
        showKeyCaptureScreen('blue');
    }
});
_menuObs.observe(document.getElementById('menu'), { attributes: true, attributeFilter: ['style'] });