/* ---- EASTER EGG: Blue Level (Horizontal, rightward) ---- */
function buildBlueLevel() {
    // Horizontal level: player jumps rightward through platforms.
    // Start platform is at x=60, y≈504. Gold at x≈2600 (right edge of world).
    // Platforms alternate heights so player must jump & drift right.
    const baseY = Math.round(state.height * 0.56); // same as startPlatY in startChallenge for ee_blue
    const plats = [];
    const layout = [
        { dx:  320, dy:   0 }, 
		{ dx: 990, dy:  90 }, 	
        { dx: 1560, dy:  50 }, 
        { dx: 2100, dy: -60 }, 
		{ dx: 2670, dy:  -30 },
        { dx: 3300, dy:  -60 },
		{ dx: 4090, dy:  85 },
    ];
    for (const pos of layout) {
        plats.push({ x: pos.dx, y: baseY + pos.dy, w: 160, type: 'orange' });
    }
    // Gold at the far right
    plats.push({ x: 4280, y: baseY + 85, w: 20, type: 'gold' });
    return plats;
}

/* ---- EASTER EGG: VerticalJumper Level (Green Key) ---- */
function buildVerticalJumperLevel() {
    // 3 green platforms + 1 gold
    // Single jump max height ≈ 202px. Gap = 250px → needs double jump (max ≈ 405px).
    // Start platform is at state.height-40 ≈ 860.
    const cx = Math.round(state.width / 2) - 80;
    return [
        { x: cx, y: 610, w: 160, type: 'green' },   // gap 250 from start
        { x: cx, y: 270, w: 160, type: 'green' },   // gap 240
        { x: cx, y: -20, w: 160, type: 'green' },   // gap 230
        { x: cx, y: -290, w: 160, type: 'gold' }     // gap 230
    ];
}

/* ---- EASTER EGG: Deep Level (Red Key) ---- */
function buildDeepLevel() {
    // FALLING level: platforms go DOWNWARD from y=100 (start platform override).
    // Score counts negative as player descends: score = -floor(depth / 10).
    // Gold is at depth 2000 → score -200.
    // Non-tief skins: no camera follow → fall off screen → die normally.
    // Tief skin: camera follows downward, no death → can reach the gold.
    const cx = Math.round(state.width / 2) - 100;
    const baseY = -230; // start platform y (set by startChallenge for ee_red)
    const gap = -150;
    const plats = [];
    for (let i = 0; i < 2000; i++) {
        const side = i % 2 === 0 ? -70 : 80;
        plats.push({ x: cx + side, y: baseY + 150 + i * gap, w: 80, type: 'blue', speed: 60 });
    }
    // Gold at depth 2000 from start (score = -200)
    plats.push({ x: cx, y: baseY + 2000, w: 40, type: 'gold' });
    return plats;
}

function startChallenge(levelData, levelId) {
    state.isChallenge = true;
    state.challengeId = levelId;
    state.currentLevelData = levelData;
    state.isEEGreenLevel = (levelId === 'ee_green');
    state.isEERedLevel   = (levelId === 'ee_red');
    state.isEEBlueLevel  = (levelId === 'ee_blue');
    state.eeRedDepth     = 0;
    state.eeBlueScrollX  = 0;
    document.getElementById('challengeModal').style.display = 'none';
    document.getElementById('failOverlay').style.display = 'none';
    document.getElementById('challengeHud').style.display = 'block';
    state.isEditor = false;
    document.getElementById('editorUI').style.display = 'none';
    document.getElementById('editorHudInfo').style.display = 'none';
    state.platforms = [];
    // Red EE level: starts at top (falling downward). Blue EE level: starts at left (going right).
    const startPlatY = (levelId === 'ee_red') ? 100 : (levelId === 'ee_blue') ? Math.round(state.height * 0.56) : state.height - 40;
    const startPlatX = (levelId === 'ee_blue') ? 60 : state.width / 2 - 120;
    const startPlatW = (levelId === 'ee_blue') ? 200 : 240;
    const startPlat = createPlatform(startPlatX, startPlatY, startPlatW, 'red');
    startPlat.start = true;
    state.platforms.push(startPlat);
    levelData.platforms.forEach(p => {
        const t = p.type || p.color || 'green';
        state.platforms.push(createPlatform(p.x, p.y, p.w, t, p.speed || 0));
    });
    state.players = [createPlayer(state.width/2, startPlat.y - PLAYER_H*1.5, 'arrows', selectedSkin)];
    state.scrollY = 0; state.maxHeight = 0;
    score = 0; document.getElementById('score').innerText = 0;
    state.started = false;
    state.running = true;
    requestAnimationFrame(loop);
}