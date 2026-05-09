const imageCache = {};
function loadSkinImage(filename) {
    if (imageCache[filename]) return imageCache[filename];
    const img = new Image();
    img.src = 'Skins/' + filename;
    img.onerror = () => { img._failed = true; };
    imageCache[filename] = img;
    return img;
}

const skinImages = {};
const skinsLoaded = {};

function preloadAllSkinImages() {
  SKINS.forEach(s => {
    if (s.file) {
      const img = new Image();
      img.onload = () => { 
        skinsLoaded[s.id] = true; 
        console.log("Skin geladen: " + s.id);
      };
      img.onerror = () => {
        console.error("FEHLER: Bild konnte nicht geladen werden!");
        console.error("Gesuchter Pfad: Skins/" + s.file);
        console.error("ID im Code: " + s.id);
      };
      img.src = 'Skins/' + s.file;
      skinImages[s.id] = img;
    }
  });
}

function drawSkinImageToContext(g, size, img) {
    g.save();
    g.beginPath();
    const r = Math.max(4, size * 0.12);
    g.moveTo(r, 0);
    g.lineTo(size - r, 0);
    g.quadraticCurveTo(size, 0, size, r);
    g.lineTo(size, size - r);
    g.quadraticCurveTo(size, size, size - r, size);
    g.lineTo(r, size);
    g.quadraticCurveTo(0, size, 0, size - r);
    g.lineTo(0, r);
    g.quadraticCurveTo(0, 0, r, 0);
    g.closePath();
    g.clip();
    g.drawImage(img, 0, 0, size, size);
    g.restore();
}

function drawPlayerBlock(g, size, skin) {
  const half = size / 2;
  if (skin.file) {
    const img = loadSkinImage(skin.file);
    if (img.complete && img.naturalWidth > 0 && !img._failed) {
      g.save();
      g.beginPath();
      const r = Math.max(4, size * 0.12);
      g.moveTo(-half + r, -half); g.lineTo(half - r, -half);
      g.quadraticCurveTo(half, -half, half, -half + r);
      g.lineTo(half, half - r);
      g.quadraticCurveTo(half, half, half - r, half);
      g.lineTo(-half + r, half);
      g.quadraticCurveTo(-half, half, -half, half - r);
      g.lineTo(-half, -half + r);
      g.quadraticCurveTo(-half, -half, -half + r, -half);
      g.closePath();
      g.clip();
      g.drawImage(img, -half, -half, size, size);
      g.restore();
      return;
    }
    if (!img._failed) {
      g.fillStyle = '#b0c8e0';
      roundRect(g, -half, -half, size, size, Math.max(4, size * 0.12), true, false);
      return;
    }
  }
  const cols = skin.colors || ['#ff6b6b', '#ff9f9f'];
  const grad = g.createLinearGradient(-half, -half, -half, half);
  grad.addColorStop(0, cols[0]);
  grad.addColorStop(1, cols[1] || cols[0]);
  g.fillStyle = grad;
  roundRect(g, -half, -half, size, size, Math.max(4, size * 0.12), true, false);
  g.fillStyle = '#00000099';
  const eyeY = -half + size * 0.28;
  g.fillRect(-size * 0.18, eyeY, size * 0.07, size * 0.07);
  g.fillRect(size * 0.10, eyeY, size * 0.07, size * 0.07);
  g.strokeStyle = shadeColor(cols[1] || cols[0], 30);
  g.lineWidth = Math.max(1, size * 0.02);
  g.strokeRect(-half + 1, -half + 1, size - 2, size - 2);
}