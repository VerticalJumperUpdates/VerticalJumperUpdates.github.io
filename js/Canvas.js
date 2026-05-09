const canvas = document.getElementById('game');
const ctx = canvas.getContext ? canvas.getContext('2d') : null;
if(!ctx) { alert('Canvas wird nicht unterstützt.'); throw new Error('Canvas context not available'); }
function fitCanvas(){
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
canvas.style.width = canvas.getAttribute('width') + 'px';
canvas.style.height = canvas.getAttribute('height') + 'px';
fitCanvas();
window.addEventListener('resize', fitCanvas);

const state = { 
    width: canvas.width / (window.devicePixelRatio || 1), 
    height: canvas.height / (window.devicePixelRatio || 1), 
    platforms: [], scrollY:0, maxHeight:0, 
    running:false, started:false, 
    isChallenge: false, challengeId: null, currentLevelData: null,
    multiplayer: false, players: [],
    isEditor: false,
    editorCameraY: 0,
    editorSelectedPlat: -1,
    isEEGreenLevel: false,   
    isEERedLevel: false,     
    isEEBlueLevel: false,    
    eeBlueScrollX: 0
};