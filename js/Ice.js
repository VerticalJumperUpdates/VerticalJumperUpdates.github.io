let iceParticles = [];

function createIceParticle() {
    const isSnowflake = Math.random() > 0.3;
    return {
        x: Math.random() * state.width,
        y: Math.random() * -state.height,
        size: isSnowflake ? (Math.random() * 5 + 3) : (Math.random() * 2 + 1),
        speed: Math.random() * 50 + 20,
        opacity: Math.random() * 0.6 + 0.3,
        drift: Math.random() * 1.2 - 0.6,
        spin: (Math.random() - 0.5) * 2,
        angle: Math.random() * Math.PI * 2,
        isSnowflake: isSnowflake
    };
}

if (iceModeActive) {
    for (let i = 0; i < 90; i++) iceParticles.push(createIceParticle());
}

function drawSnowflake(ctx, x, y, size, angle, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = 'rgba(200, 230, 255, 0.95)';
    ctx.lineWidth = Math.max(1, size * 0.18);
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(180, 220, 255, 0.8)';
    ctx.translate(x, y);
    ctx.rotate(angle);
    const arms = 6;
    for (let i = 0; i < arms; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / arms) * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        const branchLen = size * 0.4;
        const branchY = -size * 0.55;
        ctx.moveTo(0, branchY);
        ctx.lineTo(-branchLen, branchY - branchLen * 0.5);
        ctx.moveTo(0, branchY);
        ctx.lineTo(branchLen, branchY - branchLen * 0.5);
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}