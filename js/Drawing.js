function makeRNG(seed){ let s = seed >>> 0; return function(){ s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function shadeColor(hex, percent){ if(!hex || hex[0] !== '#') return hex || '#888'; const f = parseInt(hex.slice(1),16); const t = percent < 0 ? 0 : 255; const p = Math.abs(percent)/100; const R = Math.round((t - (f>>16)) * p) + (f>>16); const G = Math.round((t - (f>>8 & 0x00FF)) * p) + (f>>8 & 0x00FF); const B = Math.round((t - (f & 0x0000FF)) * p) + (f & 0x0000FF); return "#" + (0x1000000 + (R<<16) + (G<<8) + B).toString(16).slice(1); }
function roundRect(ctx, x, y, w, h, r, fill, stroke){ if (typeof r === 'undefined') r = 5; if (typeof r === 'number') r = {tl:r,tr:r,br:r,bl:r}; ctx.beginPath(); ctx.moveTo(x + r.tl, y); ctx.lineTo(x + w - r.tr, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr); ctx.lineTo(x + w, y + h - r.br); ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h); ctx.lineTo(x + r.bl, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl); ctx.lineTo(x, y + r.tl); ctx.quadraticCurveTo(x, y, x + r.tl, y); ctx.closePath(); if (fill) ctx.fill(); if (stroke) ctx.stroke(); }

function drawPixelBlockToContext(g, size, colors, seed, skinFile){
  g.clearRect(0,0,size,size);
  if (skinFile) {
    const img = loadSkinImage(skinFile);
    if (img.complete && img.naturalWidth > 0 && !img._failed) {
      drawSkinImageToContext(g, size, img);
      return;
    }
    if (!img._failed) {
      img.onload = () => { renderSkinGrid(); };
      g.fillStyle = '#b0c8e0'; g.fillRect(0, 0, size, size);
      g.fillStyle = 'rgba(0,0,0,0.2)'; g.font = `${Math.round(size*0.12)}px sans-serif`;
      g.textAlign = 'center'; g.fillText('...', size/2, size/2 + size*0.04);
      return;
    }
  }
  const base = (colors && colors[0]) ? colors[0] : '#777';
  const detail = (colors && colors[1]) ? colors[1] : shadeColor(base, -12);
  g.fillStyle = base; g.fillRect(0,0,size,size);
  const rng = makeRNG((seed || 1) ^ (base.length<<3));
  const gridN = 8; const cell = Math.floor(size/gridN);
  for(let y=0;y<gridN;y++){
    for(let x=0;x<gridN;x++){
      const r = rng();
      if(r > 0.7){ g.fillStyle = detail; g.fillRect(x*cell+1, y*cell+1, cell-2, cell-2);
      } else if (r > 0.88) { g.fillStyle = shadeColor(base, 14); g.fillRect(x*cell+1, y*cell+1, cell-2, cell-2); }
    }
  }
}