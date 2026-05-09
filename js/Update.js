let lastFrame = performance.now();
function loop(now){
  if (!state.running) return;
  const dt = Math.min(0.033, (now - lastFrame)/1000);
  update(dt);
  render();
  lastFrame = now;
  requestAnimationFrame(loop);
}

function update(dt) {
    // --- Schneepartikel bewegen ---
    if (iceModeActive) {
        if (iceParticles.length < 120 && Math.random() < 0.08) {
            iceParticles.push(createIceParticle());
        }
        iceParticles.forEach(p => {
            p.y += p.speed * dt;
            p.x += p.drift * p.speed * dt;
            p.angle += p.spin * dt;
            if (p.y > state.height + 20) {
                p.y = -20;
                p.x = Math.random() * state.width;
                p.opacity = Math.random() * 0.4 + 0.3;
            }
        });
        iceParticles = iceParticles.filter(p => p.y < state.height + 50);
    }

    const accel = 2500, maxSpeed = PHYS_MOVE_SPEED, gravity = PHYS_GRAVITY;
    const damping = iceModeActive ? 0.985 : PHYS_HORIZONTAL_DAMPING;

    state.players.forEach(p => {
        let moveLeft = false, moveRight = false;
        if (p.controls === 'arrows') { moveLeft = input['ArrowLeft']; moveRight = input['ArrowRight']; } 
        else if (p.controls === 'wasd') { moveLeft = input['a']; moveRight = input['d']; }

        if (moveLeft) p.vx -= accel * dt; else if (moveRight) p.vx += accel * dt; else p.vx *= damping;
        p.vx = Math.max(-maxSpeed, Math.min(maxSpeed, p.vx));
        p.x += p.vx * dt;

        if (!state.isEEBlueLevel) {
            if (p.x < -p.w / 2) p.x = state.width + p.w / 2;
            if (p.x > state.width + p.w / 2) p.x = -p.w / 2;
        }

        p.vy += gravity * dt;
        const previousPlayerBottomY = p.y + p.h / 2;
        p.y += p.vy * dt;
        const currentPlayerBottomY = p.y + p.h / 2;

        // Save coyote state before platform detection
        const wasOnPlatform = p.onPlatform;

        let landedThisFrame = false; p.onPlatform = false;
        if (lavaRunActive && !state.isChallenge && currentPlayerBottomY > lavaY) p.y = state.height + 500; 

        for (let plat of state.platforms) {
            if (p.vy >= 0 && !plat.broken && plat.y < state.height + 10) {
                const withinX = (p.x + p.w * 0.4 > plat.x) && (p.x - p.w * 0.4 < plat.x + plat.w);
                if (withinX && previousPlayerBottomY <= plat.y && currentPlayerBottomY >= plat.y) {
                    p.y = plat.y - p.h / 2; p.vy = 0; p.onPlatform = true; landedThisFrame = true;
                    if (plat.moving) p.x += plat.dir * plat.speed * dt;
                    
                    // Reset coyote state when landing
                    p.coyoteAvailable = false;
                    p.jumpedFromCurrentPlatform = false;
                    p.doubleJumpUsed = false;
                    
                    if (state.isChallenge && plat.color === 'gold') {
                        state.running = false;
                        // Easter Egg key awards
                        if (state.challengeId === 'ee_blue' && !eeKeyBlue) {
                            eeKeyBlue = true;
                            localStorage.setItem(EE_KEY_BLUE, 'true');
                            if (!completedLevels.includes(state.challengeId)) {
                                completedLevels.push(state.challengeId);
                                localStorage.setItem(COMPLETED_LEVELS_KEY, JSON.stringify(completedLevels));
                            }
                            showKeyCaptureScreen('blue');
                            return;
                        }
                        if (state.challengeId === 'ee_green' && !eeKeyGreen) {
                            eeKeyGreen = true;
                            localStorage.setItem(EE_KEY_GREEN, 'true');
                            if (state.challengeId && state.challengeId !== "custom_test" && !completedLevels.includes(state.challengeId)) {
                                completedLevels.push(state.challengeId);
                                localStorage.setItem(COMPLETED_LEVELS_KEY, JSON.stringify(completedLevels));
                            }
                            showKeyCaptureScreen('green');
                            return;
                        }
                        if (state.challengeId === 'ee_red' && !eeKeyRed) {
                            eeKeyRed = true;
                            localStorage.setItem(EE_KEY_RED, 'true');
                            if (state.challengeId && state.challengeId !== "custom_test" && !completedLevels.includes(state.challengeId)) {
                                completedLevels.push(state.challengeId);
                                localStorage.setItem(COMPLETED_LEVELS_KEY, JSON.stringify(completedLevels));
                            }
                            showKeyCaptureScreen('red');
                            return;
                        }
                        if (state.challengeId && state.challengeId !== "custom_test" && !completedLevels.includes(state.challengeId)) {
                            completedLevels.push(state.challengeId);
                            localStorage.setItem(COMPLETED_LEVELS_KEY, JSON.stringify(completedLevels));
                        }
                        checkTitles(); 
                        alert("CHALLENGE / LEVEL GESCHAFFT!");
                        
                        if (state.challengeId === "custom_test") {
                             document.getElementById('stopTestBtn').click();
                        } else {
                            document.getElementById('menu').style.display = 'flex';
                            document.getElementById('challengeHud').style.display = 'none';
                        }
                        return;
                    }
                    if (p.lastPlatformId !== plat.id && p === state.players[0] && plat.color === 'orange') {
                         if (plat.breakTimer === 0) plat.breakTimer = 0.01;
                    }
                    p.lastPlatformId = plat.id;
                }
            }
        }

        // MJ coyote: if was on platform, now not on platform, and didn't jump from platform → coyote available
        const skin = SKINS.find(s => s.id === p.skinId) || SKINS[0];
        if (wasOnPlatform && !p.onPlatform && !p.jumpedFromCurrentPlatform && skin.attribute === 'MJ') {
            p.coyoteAvailable = true;
        }
        // Clear coyote once player starts moving up from a real jump
        if (p.jumpedFromCurrentPlatform && p.vy < 0) {
            p.coyoteAvailable = false;
        }
        // Reset coyote after brief window (0.25s of falling)
        if (!p.onPlatform && p.vy > PHYS_GRAVITY * 0.5) {
            p.coyoteAvailable = false;
        }

        if (p.onPlatform) p.jumpAnim = landedThisFrame ? 5 : 0; else p.jumpAnim = p.vy < -10 ? 2 : 3;
    });

    if (lavaRunActive && !state.isChallenge) lavaY -= 130 * dt;
    for (let p of state.platforms) {
        if (p.moving) {
            p.x += p.dir * p.speed * dt;
            if (p.x < 0) { p.x = 0; p.dir = 1; } if (p.x + p.w > state.width) { p.x = state.width - p.w; p.dir = -1; }
        }
        if (p.color === 'orange' && p.breakTimer > 0) {
            p.breakTimer += dt; if (p.breakTimer > 1.5) p.broken = true;
        }
    }

    // EE Blue level: camera scrolls RIGHT following the leading player
    if (state.isEEBlueLevel) {
        const rightmost = Math.max(...state.players.map(p => p.x));
        const scrollRight = state.width * 0.6;
        if (rightmost > scrollRight) {
            const dx = scrollRight - rightmost; // negative → shift everything left
            state.eeBlueScrollX += (-dx);
            state.players.forEach(p => p.x += dx);
            for (let p of state.platforms) p.x += dx;
        }
    }

    const highestPlayerY = Math.min(...state.players.map(p => p.y));
    const scrollTrigger = state.height * 0.4;
    if (highestPlayerY < scrollTrigger && !state.isEEBlueLevel) {
        let dy = scrollTrigger - highestPlayerY;
        state.players.forEach(p => p.y += dy);
        for (let p of state.platforms) p.y += dy;
        if (lavaRunActive) lavaY += dy;
        state.scrollY += dy;
        state.maxHeight = Math.max(state.maxHeight, state.scrollY);
        let newScore = Math.floor(state.maxHeight / 10);
        if (newScore > score) {
            if (Math.floor(newScore / 100) > Math.floor(score / 100)) { lavaRunActive ? addLavaCoin() : addCoin(); }
            score = newScore; document.getElementById('score').innerText = score;
        }
    }

    // EE Red level: camera follows player downward ONLY when using tief skin
    if (state.isEERedLevel) {
        const tiefPlayer = state.players.find(p => {
            const sk = SKINS.find(s => s.id === p.skinId) || SKINS[0];
            return sk.attribute === 'tief';
        });
        if (tiefPlayer && tiefPlayer.vy > 0 && !tiefPlayer.onPlatform) {
            const scrollDownTrigger = state.height * 0.7;
            if (tiefPlayer.y > scrollDownTrigger) {
                const dy = scrollDownTrigger - tiefPlayer.y; // negative → shift everything up
                state.eeRedDepth += (-dy); // accumulate total downward world distance
                state.players.forEach(p => p.y += dy);
                for (let p of state.platforms) p.y += dy;
                // Score goes negative based on depth (gold at depth 2000 = score -200)
                const depthScore = -Math.floor(state.eeRedDepth / 10);
                score = depthScore;
                document.getElementById('score').innerText = depthScore;
            }
        }
    }

    if (!state.isChallenge) {
        let highestY = state.height;
        if (state.platforms.length > 0) highestY = Math.min(...state.platforms.map(p => p.y));
        let safety = 0;
        while (highestY > -200 && safety < 10) {
            safety++;
            const difficulty = Math.min(2, score / 500);
            const pw = Math.max(50, 90 - difficulty * 20 + Math.random() * 50);
            const px = Math.random() * (state.width - pw);
            const py = highestY - (85 + Math.random() * 45);
            let type = 'green', spd = 0;
            let rand = Math.random();
            if (rand < 0.15) { type = 'blue'; spd = 60 + Math.random() * 60; }
            else if (score > 600 && rand < 0.25) { type = 'orange'; }
            state.platforms.push(createPlatform(px, py, pw, type, spd));
            highestY = py;
        }
        state.platforms = state.platforms.filter(p => p.y < state.height + 400 && !p.broken);
    } else if (!state.isEERedLevel) {
        // Normal challenge: filter broken platforms
        state.platforms = state.platforms.filter(p => !p.broken);
    } else {
        // Red EE level: keep all platforms (no filter by y), only remove broken
        state.platforms = state.platforms.filter(p => !p.broken);
    }

    let anyDeath = false;
    state.players.forEach(p => {
        // In EE red level with tief skin: no death from falling
        const skin = SKINS.find(s => s.id === p.skinId) || SKINS[0];
        if (state.isEERedLevel && skin.attribute === 'tief') return;
        if (p.y > state.height + 250) anyDeath = true;
        // In EE blue level: also die when falling off the back (too far left)
        if (state.isEEBlueLevel && p.x < -300) anyDeath = true;
    });

    if (anyDeath) {
        state.running = false;
        
        if (state.isChallenge) {
            if(state.challengeId === "custom_test") {
                 document.getElementById('stopTestBtn').click();
                 return;
            }
            state.isEEGreenLevel = false;
            state.isEERedLevel = false;
            document.getElementById('failOverlay').style.display = 'flex';
            return;
        }

        if (lavaRunActive) lavaY = state.height + 100;
        if (score > savedHighscore) {
          savedHighscore = score; localStorage.setItem(HS_KEY, savedHighscore);
          document.getElementById('highscore').innerText = savedHighscore;
          checkTitles(); 
          checkSkinUnlocks();
        }
        if(savedHighscore >= 2000 && localStorage.getItem(LAVARUN_UNLOCK_KEY) !== 'true') {
            localStorage.setItem(LAVARUN_UNLOCK_KEY, 'true'); lavaRunUnlocked = true;
            document.getElementById('lavaModeBtn').style.display = 'inline-block';
            document.getElementById('openLavaShopBtn').style.display = 'inline-block';
            showToast('Lava-Run freigeschaltet!');
        }
        if (score >= 2000) {
            document.getElementById('creditScreen').style.display = 'flex';
            setTimeout(() => location.reload(), 30000);
        } else {
            if (state._pendingBlueKey) {
                state._pendingBlueKey = false;
                showKeyCaptureScreen('blue');
            } else {
                document.getElementById('menu').style.display = 'flex';
            }
        }
    }
}

function render(){
    ctx.clearRect(0, 0, state.width, state.height);
    const bg = ctx.createLinearGradient(0, 0, 0, state.height);
    
    if (lavaRunActive && !state.isChallenge) { 
        bg.addColorStop(0, '#4a0000'); bg.addColorStop(1, '#990000'); 
    } else if (iceModeActive && !state.isChallenge) {
        bg.addColorStop(0, '#f0f8ff'); bg.addColorStop(1, '#e3f2fd');
    } else { 
        bg.addColorStop(0, '#87CEEB'); bg.addColorStop(1, '#eaf6ff'); 
    }
    
    ctx.fillStyle = bg; ctx.fillRect(0, 0, state.width, state.height);

    if (iceModeActive) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        iceParticles.forEach(p => {
            if (p.isSnowflake) {
                drawSnowflake(ctx, p.x, p.y, p.size, p.angle, p.opacity);
            } else {
                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.shadowBlur = 6;
                ctx.shadowColor = "white";
                ctx.fill();
            }
        });
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
    }

    if (lavaRunActive && !state.isChallenge) {
        ctx.save(); ctx.shadowBlur = 25; ctx.shadowColor = "#ff4500"; ctx.fillStyle = "rgba(255, 69, 0, 0.95)";
        ctx.fillRect(0, lavaY, state.width, state.height - lavaY + 500);
        ctx.fillStyle = "#ffcc00";
        const time = Date.now() / 250;
        for (let i = 0; i < state.width; i += 15) {
            let wave = Math.sin(time + (i / 30)) * 6;
            ctx.fillRect(i, lavaY + wave - 4, 16, 8);
        }
        ctx.restore();
    }
    
    for (let p of state.platforms) {
        ctx.save();
        
        if (iceModeActive) {
            ctx.globalAlpha = 0.35;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.shadowColor = "rgba(255,255,255,0.7)";
            ctx.shadowBlur = 8;
        } else if (p.color === 'orange' && p.breakTimer > 0) {
            ctx.globalAlpha = 1 - Math.min(1, p.breakTimer / 2);
        }
        
        let base, dark, light;
        if (p.color === "green") { base = "#3fa13f"; dark = "#2b6e2b"; light = "#74d174"; } 
        else if (p.color === "blue") { base = "#3a6ff7"; dark = "#2647a8"; light = "#7fa5ff"; } 
        else if (p.color === "orange") { base = "#ff9c3b"; dark = "#b86522"; light = "#ffd18f"; } 
        else if (p.color === "red") { base = "#d43a3a"; dark = "#8a2222"; light = "#ffd18f"; } 
        else if (p.color === "gold") { base = "#FFD700"; dark = "#B8860B"; light = "#FFFACD"; } 
        else { base = p.color; dark = "#222"; light = "#ccc"; }
        
        ctx.fillStyle = base; ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = dark; ctx.fillRect(p.x, p.y + p.h - 4, p.w, 4);
        ctx.fillStyle = light; ctx.fillRect(p.x, p.y, p.w, 3);
        
        if (iceModeActive) {
            ctx.globalAlpha = 0.9;
            ctx.strokeRect(p.x + 1.5, p.y + 1.5, p.w - 3, p.h - 3);
            ctx.globalAlpha = 1.0;
        }
        
        ctx.restore();
    }

    state.players.forEach(p => {
        let scaleY = 1, scaleX = 1;
        if (p.jumpAnim === 4) { scaleY = 0.87; scaleX = 1.13; } 
        else if (p.jumpAnim === 1 || p.jumpAnim === 2) { scaleY = 1.17; scaleX = 0.88; } 
        else if (p.jumpAnim === 3) { scaleY = 1.12; scaleX = 0.9; }

        const drawX = Math.round(p.x);
        const drawY = Math.round(p.y);
        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.scale(scaleX, scaleY);
    
        const skin = SKINS.find(s => s.id === p.skinId) || SKINS[0];
        drawPlayerBlock(ctx, p.h, skin);

        ctx.restore();
    });
}