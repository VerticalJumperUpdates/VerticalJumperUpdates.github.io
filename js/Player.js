const PLAYER_H = 48;

let lavaRunUnlocked = localStorage.getItem(LAVARUN_UNLOCK_KEY) === 'true';
let lavaRunActive = false;
let lavaY = 700;
let iceModeActive = localStorage.getItem('vj_ice_active') === 'true' || false;

const iceModeBtn = document.getElementById('iceModeBtn');
const lavaModeBtn = document.getElementById('lavaModeBtn');

if (iceModeBtn) {
  iceModeBtn.innerText = "Ice-Mode: " + (iceModeActive ? "AN" : "AUS");
  document.body.classList.toggle('ice-bg', iceModeActive);
}

const createPlayer = (x, y, controls, skinId) => ({
  x: x, y: y, w: PLAYER_H, h: PLAYER_H,
  vx: 0, vy: 0, speed: PHYS_MOVE_SPEED, jumpImpulse: PHYS_JUMP_IMPULSE,
  onPlatform: false, jumpAnim: 0, controls: controls, skinId: skinId, lastPlatformId: null,
  coyoteAvailable: false,
  wasOnPlatformLastFrame: false,
  jumpedFromCurrentPlatform: false,
  doubleJumpAvailable: false,
  doubleJumpUsed: false
});

let player = createPlayer(0,0,'arrows','dirt');

const input = {};
window.addEventListener('keydown', (e) => {
  if(e.target.tagName === 'INPUT') return;
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ', 'w', 'a', 's', 'd'].includes(e.key)) e.preventDefault();
  input[e.key] = true;
  const menuEl = document.getElementById('menu');
  const inShop = document.getElementById('lavaShopModal').style.display !== 'none';
  const inChallenges = document.getElementById('challengeModal').style.display !== 'none';
  const inCodes = document.getElementById('codeModal').style.display !== 'none';

  if (!state.running && !state.isEditor && menuEl.style.display !== 'none' && !inShop && !inChallenges && !inCodes) {
    if ([' ', 'ArrowUp', 'w', 'ArrowLeft', 'a', 'ArrowRight', 'd'].includes(e.key)) {
      startRun();
      menuEl.style.display = 'none';
      return;
    }
  }
 
  if (state.running) {
      state.players.forEach(p => {
          let jumpKey = false;
          if (p.controls === 'arrows') jumpKey = (e.key === ' ' || e.key === 'ArrowUp');
          if (p.controls === 'wasd') jumpKey = (e.key === 'w');
          if (jumpKey) {
              const skin = SKINS.find(s => s.id === p.skinId) || SKINS[0];
              if (p.onPlatform) {
                  // Normal jump
                  p.vy = -p.jumpImpulse;
                  p.onPlatform = false;
                  p.jumpAnim = 1;
                  p.jumpedFromCurrentPlatform = true;
                  p.coyoteAvailable = false;
                  // Hopp: give double jump after leaving platform in green level
                  if (skin.attribute === 'hopp' && state.isEEGreenLevel) {
                      p.doubleJumpAvailable = true;
                      p.doubleJumpUsed = false;
                  }
                  if (!state.started) state.started = true;
                  if (p === state.players[0]) {
                      totalStats.totalJumps = (Number(localStorage.getItem(TOTAL_JUMPS_KEY) || 0)) + 1;
                      localStorage.setItem(TOTAL_JUMPS_KEY, totalStats.totalJumps);
                  }
              } else {
                  // MJ: coyote jump – used when slid off platform without jumping
                  if (skin.attribute === 'MJ' && p.coyoteAvailable) {
                      p.vy = -p.jumpImpulse;
                      p.jumpAnim = 1;
                      p.coyoteAvailable = false;
                      if (!state.started) state.started = true;
                  }
                  // Hopp: double jump in green level
                  if (skin.attribute === 'hopp' && state.isEEGreenLevel && p.doubleJumpAvailable && !p.doubleJumpUsed) {
                      p.vy = -p.jumpImpulse;
                      p.jumpAnim = 1;
                      p.doubleJumpUsed = true;
                      p.doubleJumpAvailable = false;
                      if (!state.started) state.started = true;
                  }
              }
          }
      });
  }
});
window.addEventListener('keyup', (e) => { input[e.key] = false; });