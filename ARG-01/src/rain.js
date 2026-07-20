// 雨效生成器（由 assets/js/rain.js 提升为可挂载模块）
// - data-rain="N"        ：容器内生成 N 条室外雨丝
// - data-glass-rain="N"  ：窗玻璃上生成 N 条流淌雨痕 + 2N 颗水珠
let styleInjected = false;

function injectStyle() {
  if (styleInjected) return;
  styleInjected = true;
  const s = document.createElement('style');
  s.textContent = `
    .rain-field { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:3; }
    .raindrop {
      position:absolute; top:-40px; width:1px; height:40px;
      background:linear-gradient(to bottom, rgba(200,215,230,0), rgba(200,215,230,.45));
      animation: argRain linear infinite;
    }
    @keyframes argRain { to { transform: translateY(110vh); } }
    .glass-streak {
      position:absolute; top:-40px; width:1px; height:40px;
      background:linear-gradient(to bottom, rgba(200,215,230,.35), rgba(200,215,230,0));
      animation: argGlass linear infinite;
    }
    @keyframes argGlass { to { transform: translateY(440px); } }
    .glass-bead {
      position:absolute; border-radius:50%;
      background:rgba(205,218,230,.35); box-shadow:0 0 3px rgba(205,218,230,.3);
    }
  `;
  document.head.appendChild(s);
}

export function initRain(root) {
  injectStyle();

  root.querySelectorAll('[data-rain]').forEach(function (box) {
    const n = parseInt(box.getAttribute('data-rain'), 10) || 60;
    for (let i = 0; i < n; i++) {
      const d = document.createElement('i');
      d.className = 'raindrop';
      d.style.left = (Math.random() * 104 - 2) + '%';
      d.style.animationDelay = (-Math.random() * 2) + 's';
      d.style.animationDuration = (0.55 + Math.random() * 0.65) + 's';
      d.style.opacity = (0.12 + Math.random() * 0.28).toFixed(2);
      d.style.height = (26 + Math.random() * 46) + 'px';
      box.appendChild(d);
    }
  });

  root.querySelectorAll('[data-glass-rain]').forEach(function (box) {
    const n = parseInt(box.getAttribute('data-glass-rain'), 10) || 12;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i');
      s.className = 'glass-streak';
      s.style.left = (Math.random() * 96) + '%';
      s.style.animationDelay = (-Math.random() * 6) + 's';
      s.style.animationDuration = (3 + Math.random() * 4) + 's';
      box.appendChild(s);
    }
    for (let j = 0; j < n * 2; j++) {
      const b = document.createElement('b');
      b.className = 'glass-bead';
      b.style.left = (Math.random() * 97) + '%';
      b.style.top = (Math.random() * 97) + '%';
      const sz = 2 + Math.random() * 4;
      b.style.width = b.style.height = sz + 'px';
      box.appendChild(b);
    }
  });
}
