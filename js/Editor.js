function startEditor(importData = null) {
    state.running = false;
    state.isEditor = true;
    state.editorCameraY = 0;
    state.editorSelectedPlat = -1;
    state.isEEGreenLevel = false;
    state.isEERedLevel = false;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('editorUI').style.display = 'flex';
    document.getElementById('editorHudInfo').style.display = 'block';
    document.getElementById('challengeHud').style.display = 'none';
    document.getElementById('stopTestBtn').style.display = 'none'; 
    state.platforms = [];
    if(importData && importData.platforms) {
         importData.platforms.forEach(p => {
            const t = p.type || p.color || 'green';
            state.platforms.push(createPlatform(p.x, p.y, p.w, t, p.speed || 0));
        });
        if(state.platforms.length === 0) {
            state.platforms.push(createPlatform(state.width/2 - 120, state.height - 40, 240, 'red'));
        }
    } else {
        state.platforms.push(createPlatform(state.width/2 - 120, state.height - 40, 240, 'red'));
    }
    renderEditor();
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = state.width / rect.width;
    const scaleY = state.height / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

let isDragging = false;
let dragOffset = { x: 0, y: 0 };
const HIT_PADDING = 20;

canvas.addEventListener('mousedown', (e) => {
    if(!state.isEditor) return;
    const m = getMousePos(canvas, e);
    const worldY = m.y - state.editorCameraY;
    let clicked = -1;
    for(let i = state.platforms.length-1; i >= 0; i--) {
        const p = state.platforms[i];
        if (m.x >= p.x - HIT_PADDING && m.x <= p.x + p.w + HIT_PADDING && 
            worldY >= p.y - HIT_PADDING && worldY <= p.y + p.h + HIT_PADDING) {
            clicked = i;
            isDragging = true;
            dragOffset.x = m.x - p.x;
            dragOffset.y = worldY - p.y;
            break;
        }
    }
    state.editorSelectedPlat = clicked;
    updateEditorUI();
    renderEditor();
});

canvas.addEventListener('mousemove', (e) => {
    if(!state.isEditor) return;
    const m = getMousePos(canvas, e);
    const worldY = m.y - state.editorCameraY;
    if (isDragging && state.editorSelectedPlat !== -1) {
        const p = state.platforms[state.editorSelectedPlat];
        p.x = m.x - dragOffset.x;
        p.y = worldY - dragOffset.y;
        updateEditorUI();
        renderEditor();
        canvas.style.cursor = 'grabbing';
        return;
    }
    let hovering = false;
    for(let i = state.platforms.length-1; i >= 0; i--) {
        const p = state.platforms[i];
        if (m.x >= p.x - HIT_PADDING && m.x <= p.x + p.w + HIT_PADDING && 
            worldY >= p.y - HIT_PADDING && worldY <= p.y + p.h + HIT_PADDING) {
            hovering = true;
            break;
        }
    }
    canvas.style.cursor = hovering ? 'grab' : 'default';
});

canvas.addEventListener('mouseup', () => {
    if(state.isEditor) { isDragging = false; canvas.style.cursor = 'grab'; }
});
canvas.addEventListener('mouseleave', () => {
    if(state.isEditor) isDragging = false;
});
canvas.addEventListener('wheel', (e) => {
    if(!state.isEditor) return;
    state.editorCameraY -= e.deltaY;
    if(state.editorCameraY < 0) state.editorCameraY = 0; 
    renderEditor();
});

function updateEditorUI() {
    const props = document.getElementById('edSelectedProps');
    if(state.editorSelectedPlat === -1) { props.style.display = 'none'; return; }
    props.style.display = 'block';
    const p = state.platforms[state.editorSelectedPlat];
    document.getElementById('edInW').value = Math.round(p.w);
    document.getElementById('edValW').innerText = Math.round(p.w);
    const userY = Math.round(state.height - p.y);
    document.getElementById('edInY').value = userY;
    document.getElementById('edValY').innerText = userY;
    document.getElementById('edInX').value = Math.round(p.x);
    document.getElementById('edValX').innerText = Math.round(p.x);
    const speedGroup = document.getElementById('edSpeedGroup');
    if (p.color === 'blue' || p.color === 'orange') {
        speedGroup.style.display = 'block';
        document.getElementById('edInSpeed').value = p.speed || 0;
        document.getElementById('edValSpeed').innerText = Math.round(p.speed || 0);
    } else {
        speedGroup.style.display = 'none';
    }
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.type === p.color) btn.classList.add('active');
    });
}

document.getElementById('edAddPlat').addEventListener('click', () => {
    const newY = (state.height / 2) - state.editorCameraY;
    state.platforms.push(createPlatform(state.width/2 - 60, newY, 120, 'green'));
    state.editorSelectedPlat = state.platforms.length - 1;
    updateEditorUI(); renderEditor();
});
document.getElementById('edDeletePlat').addEventListener('click', () => {
    if(state.editorSelectedPlat !== -1) {
        state.platforms.splice(state.editorSelectedPlat, 1);
        state.editorSelectedPlat = -1;
        updateEditorUI(); renderEditor();
    }
});
document.getElementById('edInW').addEventListener('input', (e) => {
    if(state.editorSelectedPlat !== -1) { state.platforms[state.editorSelectedPlat].w = Number(e.target.value); document.getElementById('edValW').innerText = e.target.value; renderEditor(); }
});
document.getElementById('edInX').addEventListener('input', (e) => {
    if(state.editorSelectedPlat !== -1) { state.platforms[state.editorSelectedPlat].x = Number(e.target.value); document.getElementById('edValX').innerText = e.target.value; renderEditor(); }
});
document.getElementById('edInY').addEventListener('input', (e) => {
    if(state.editorSelectedPlat !== -1) {
        const val = Number(e.target.value);
        state.platforms[state.editorSelectedPlat].y = state.height - val;
        document.getElementById('edValY').innerText = val; renderEditor();
    }
});
document.getElementById('edInSpeed').addEventListener('input', (e) => {
    if(state.editorSelectedPlat !== -1) {
        const val = Number(e.target.value);
        state.platforms[state.editorSelectedPlat].speed = val;
        document.getElementById('edValSpeed').innerText = val; renderEditor();
    }
});
document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if(state.editorSelectedPlat !== -1) {
            const t = btn.dataset.type;
            const p = state.platforms[state.editorSelectedPlat];
            p.color = t;
            if(t === 'blue') { p.speed = p.speed > 0 ? p.speed : 100; p.moving = true; } 
            else { p.moving = false; }
            updateEditorUI(); renderEditor();
        }
    });
});
document.getElementById('edExit').addEventListener('click', () => {
    state.isEditor = false;
    document.getElementById('editorUI').style.display = 'none';
    document.getElementById('editorHudInfo').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
});
document.getElementById('edTestLevel').addEventListener('click', () => {
    const levelData = { name: "Custom Level", platforms: JSON.parse(JSON.stringify(state.platforms)) };
    startChallenge(levelData, "custom_test");
    document.getElementById('stopTestBtn').style.display = 'block'; 
});
document.getElementById('stopTestBtn').addEventListener('click', () => {
     document.getElementById('stopTestBtn').style.display = 'none';
     document.getElementById('failOverlay').style.display = 'none';
     startEditor(state.currentLevelData);
});
document.getElementById('edCopyCode').addEventListener('click', () => {
    const exportData = state.platforms.map(p => ({ x: Math.round(p.x), y: Math.round(p.y), w: Math.round(p.w), type: p.color, speed: p.speed }));
    const json = JSON.stringify(exportData);
    const b64 = btoa(json);
    const code = "VJLVL-" + b64;
    navigator.clipboard.writeText(code).then(() => { alert("Level-Code in Zwischenablage kopiert! Teile ihn mit Freunden."); }).catch(() => { prompt("Kopiere diesen Code:", code); });
});

function drawRuler(ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, 50, state.height);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.lineWidth = 1;
    for(let y = 0; y < 20000; y+=100) {
        const screenY = (state.height - y) + state.editorCameraY;
        if(screenY > -20 && screenY < state.height + 20) {
            ctx.beginPath(); ctx.moveTo(0, screenY); ctx.lineTo(15, screenY); ctx.stroke();
            ctx.fillText(y, 20, screenY + 3);
        }
    }
    ctx.restore();
}

function renderEditor() {
    if(!state.isEditor) return;
    ctx.clearRect(0, 0, state.width, state.height);
    ctx.fillStyle = "#e0e0e0"; ctx.fillRect(0, 0, state.width, state.height);
    ctx.strokeStyle = "#ccc"; ctx.lineWidth = 1; ctx.beginPath();
    for(let x=0; x<state.width; x+=100) { ctx.moveTo(x, 0); ctx.lineTo(x, state.height); }
    const offset = state.editorCameraY % 100;
    for(let y=offset; y<state.height; y+=100) { ctx.moveTo(0, y); ctx.lineTo(state.width, y); }
    ctx.stroke();
    ctx.save();
    ctx.translate(0, state.editorCameraY);
    for (let i = 0; i < state.platforms.length; i++) {
        const p = state.platforms[i];
        let base;
        if (p.color === "green") base = "#3fa13f";
        else if (p.color === "blue") base = "#3a6ff7";
        else if (p.color === "orange") base = "#ff9c3b";
        else if (p.color === "gold") base = "#FFD700";
        else base = "#d43a3a"; 
        ctx.fillStyle = base;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        if (i === state.editorSelectedPlat) {
            ctx.strokeStyle = "#ff00ff"; ctx.lineWidth = 3;
            ctx.strokeRect(p.x - 2, p.y - 2, p.w + 4, p.h + 4);
        }
    }
    ctx.restore();
    drawRuler(ctx);
}

function checkSkinUnlocks() {
    let changed = false;
    SKINS.forEach(s => {
        if (s.unlock && s.unlock.type === 'score' && !unlocked[s.id]) {
            if (savedHighscore >= s.unlock.value) {
                unlocked[s.id] = true;
                changed = true;
                showToast(`Skin freigeschaltet: ${s.name}`);
            }
        }
    });
    if (changed) { localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked)); }
}