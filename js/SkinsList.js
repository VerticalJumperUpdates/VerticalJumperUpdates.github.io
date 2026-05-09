const SKINS = [
  { id:'Gras', name:'Grasblock', colors:['#77b255','#4b7b2f'], unlock:{type:'score',value:100}, secret:false, attribute:'hopp' },
  { id:'redt', name:'Roter Terrakotta', colors:['#722426','#450001'], unlock:{type:'score',value:250}, secret:false },
  { id:'Diablock', name:'Diamantblock', colors:['#7fd7ff','#2fa8d6'], unlock:{type:'score',value:500}, secret:false },
  { id:'redstone', name:'Redstoneblock',colors:['#ff4f4f','#b32020'], unlock:{type:'score',value:750}, secret:false },
  { id:'Sculk', name:'Sculkblock', colors:['#04A7BC','#2B656C'], unlock:{type:'score',value:1050}, secret:false },
  { id:'FeuerundWasser', name:'Feuer und Wasser', colors:['#34ebd8','#f70202'], unlock:{type:'score',value:1350}, secret:false },
  { id:'Tiefseeblock', name:'Tiefseeblock', colors:['#1F0A8F','#2E4BE8'], unlock:{type:'score',value:1750}, secret:false, attribute:'tief' },
  { id:'enderrite', name:'Enderriteblock', colors:['#0b2a4a','#6a2fb0'], unlock:{type:'score',value:2100}, secret:false },
  { id:'Aquamarinblock', name:'Aquamarinblock', colors:['#0c9692','#59ebe6'], unlock:{type:'score',value:2350}, secret:false },
  { id:'Nordlichter 2', name:'Nordlichter 2', colors:['#969fd9','#2fe9c3'], unlock:{type:'score',value:2600}, secret:false },
  { id:'Wichtig', name:'Am Wichtigsten', colors:['#85ddf3','#f2b3f3'], unlock:{type:'score',value:2999}, secret:false },
  { id:'Drachenfrucht', name:'Drachenfruchtblock', colors:['#6d008b','#ec40be'], unlock:{type:'score',value:3456}, secret:false },
  { id:'Kraft', name:'Kräftig', colors:['#f5f5dc','#5a0a0d'], unlock:{type:'score',value:10000}, secret:false },
  
  { id:'1', name:'Cloud ', colors:['#e6fbff','#bfeeff'], price: 1, secret:false },
  { id:'2', name:'Lava ', colors:['#E35507','#AB3815'], price: 1, secret:false },
  { id:'3', name:'Erdbeere ', colors:['#da68a0','#ed3572'], price: 2, secret:false },
  { id:'4', name:'Leave ', colors:['#8fbf94','#099c18'], price: 2, secret:false }, 
  { id:'5', name:'Grape ', colors:['#3e3c66','#663c5c'], price: 2, secret:false },
  { id:'6', name:' ', colors:['#ED61DF','#C2363E'], price: 3, secret:false },
  { id:'7', name:'Sunset ', colors:['#c4615a','#e9ed91'], price: 3, secret:false },
  { id:'8', name:' ', colors:['#ed3572','#f47a60'], price: 4, secret:false },
  { id:'9', name:'Ying&Yang ', colors:['#000000','#ffffff'], price: 4, secret:false, attribute:'MJ' },
  { id:'10', name:' ', colors:['#871F48','#377089'], price: 4, secret:false },
  { id:'11', name:' ', colors:['#95d1f0','#f0be95'], price: 5, secret:false },
  { id:'12', name:' ', colors:['#8d27c1','#d1f3b3'], price: 5, secret:false },
  { id:'13', name:' ', colors:['#87237f','#238746'], price: 5, secret:false },
  { id:'22', name:' ', colors:['#003170','#3e98f7'], price: 5, secret:false },
  { id:'14', name:' ', colors:['#7e478a','#a5daed'], price: 6, secret:false },
  { id:'15', name:' ', colors:['#060869','#6fecf2'], price: 6, secret:false }, 
  { id:'23', name:' ', colors:['#003170','#8f0000'], price: 7, secret:false },
  { id:'16', name:' ', colors:['#f09595','#95f0bf'], price: 9, secret:false },
  { id:'24', name:' ', colors:['#838caf','#210033'], price: 10, secret:false },
  { id:'17', name:' ', colors:['#98fbd5','#f5d4e5'], price: 10, secret:false },  
  { id:'18', name:' ', colors:['#9595f0','#d495f0'], price: 11, secret:false },
  { id:'19', name:' ', colors:['#f7a6e6','#95adf0'], price: 11, secret:false },  
  { id:'20', name:' ', colors:['#6883bc','#8a307f'], price: 15, secret:false },
  { id:'25', name:' ', colors:['#f5a275','#8940f7'], price: 20, secret:false },

  { id:'Lava1', name:'Lava 1', colors:['#e2f095','#f0cd95'], chestOnly: true, probability: 25 },
  { id:'Lava2', name:'Lava 2', colors:['#f505d1','#7aeef0'], chestOnly: true, probability: 9 },
  { id:'Lava3', name:'Lava 3', colors:['#e3e87b','#e87bcd'], chestOnly: true, probability: 18 },
  { id:'Lava4', name:'Lava 4', colors:['#aed6dc','#ff9a8d'], chestOnly: true, probability: 7 },
  { id:'Lava5', name:'Lava 5', colors:['#f0ed95','#95f0c1'], chestOnly: true, probability: 5 },
  { id:'Lava6', name:'Lava 6', colors:['#69345d','#9e6464'], chestOnly: true, probability: 3 },
  { id:'Lava7', name:'Lava 7', colors:['#7be8b0','#807be8'], chestOnly: true, probability: 3 },
  { id:'Lava8', name:'Lava 8', colors:['#57f789','#3e98f7'], chestOnly: true, probability: 2 },
  { id:'Lava9', name:'Lava 9', colors:['#000000','#e000a5'], chestOnly: true, probability: 3 },
  { id:'Lava10', name:'Lava 10', colors:['#000000','#05ffd5'], chestOnly: true, probability: 2 },
  { id:'Lava11', name:'Lava 11', colors:['#000000','#2b00ff'], chestOnly: true, probability: 3 },
  { id:'Lava12', name:'Lava 12', colors:['#ff4785','#ffffff'], chestOnly: true, probability: 10 },
  { id:'Lava13', name:'Lava 13', colors:['#00f7b4','#8f10b2'], chestOnly: true, probability: 2 },
  { id:'Lava14', name:'Lava 14', colors:['#3b26d9','#e88969'], chestOnly: true, probability: 3 },
  { id:'Lava15', name:'Lava 15', colors:['#c22490','#ff2929'], chestOnly: true, probability: 5 },

  { id:'100', name:'Geschenk 1', colors:['#ed803b','#d53ff8'], price: 10000},
  { id:'101', name:'Geschenk 2', colors:['#fef421','#2efbcd'], price: 10000},
  { id:'102', name:'Geschenk 3', colors:['#f15609','#b33dee'], price: 10000},
  { id:'103', name:'Geschenk 4', colors:['#ef0606','#de36ca'], price: 10000},
  { id:'104', name:'Geschenk 5', colors:['#3056d5','#de36ca'], price: 10000},

  { id:'eisblock_png', name:'Eisblock', file:'eisblock.png', price: 3, secret:false },
  { id:'lavastein_png', name:'Lavastein', file:'lavastein.png', price: 3, secret:false },
  { id:'bigmac_png', name:'Big Mac', file:'bigmac.png', price: 1, secret:false },
];
SKINS.unshift({ id:'dirt', name:'Dirtblock', colors:['#7a4f20','#4e2e0b'], unlock:{type:'score',value:0}, secret:false });

let savedHighscore = Number(localStorage.getItem(HS_KEY) || 0);
let selectedSkin = localStorage.getItem(SKIN_KEY) || 'dirt';
let unlocked = JSON.parse(localStorage.getItem(UNLOCK_KEY) || 'null');
if (!unlocked || typeof unlocked !== 'object') {
  unlocked = {};
  SKINS.forEach(s => { unlocked[s.id] = (s.unlock && s.unlock.value === 0) || false; });
  unlocked['dirt'] = true;
  localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked));
}

let toastTimer = null;
function showToast(text){
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.innerText = text;
  toast.style.display = 'block';
  toast.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ 
      toast.style.transition = 'opacity 300ms'; 
      toast.style.opacity = '0'; 
      setTimeout(()=> toast.style.display = 'none', 320); 
  }, 1400);
}