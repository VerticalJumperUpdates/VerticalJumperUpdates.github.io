function createPlatform(x,y,w,type='green',speed=0){ 
    return { 
        id: Math.random().toString(36).slice(2,9), 
        x,y,w,h:14, 
        color:type, 
        dir:1, 
        moving: (type === 'blue' || speed > 0), 
        speed, 
        breakTimer:0, 
        broken:false 
    }; 
}
function initPlatforms(){
  state.platforms = [];
  const startPlat = createPlatform(state.width/2 - 120, state.height - 40, 240, 'red');
  startPlat.start = true;
  state.platforms.push(startPlat);
  let y = state.height - 120;
  while (y > -1400) {
    const pw = 80 + Math.random()*120;
    const px = Math.random() * (state.width - pw);
    const t = Math.random() < 0.18 ? 'blue' : 'green';
    const spd = t === 'blue' ? 50 + Math.random()*80 : 0;
    state.platforms.push(createPlatform(px, y, pw, t, spd));
    y -= 90 + Math.random()*40;
  }
}