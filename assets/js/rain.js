/* ============================================================
   雨效生成器（纯氛围，无游戏逻辑）
   - data-rain="N"       ：在容器内生成 N 条室外雨丝
   - data-glass-rain="N" ：在窗玻璃上生成 N 条流淌雨痕 + 2N 颗水珠
   ============================================================ */
(function () {
  document.querySelectorAll('[data-rain]').forEach(function (box) {
    var n = parseInt(box.getAttribute('data-rain'), 10) || 60;
    for (var i = 0; i < n; i++) {
      var d = document.createElement('i');
      d.className = 'raindrop';
      d.style.left = (Math.random() * 104 - 2) + '%';
      d.style.animationDelay = (-Math.random() * 2) + 's';
      d.style.animationDuration = (0.55 + Math.random() * 0.65) + 's';
      d.style.opacity = (0.12 + Math.random() * 0.28).toFixed(2);
      d.style.height = (26 + Math.random() * 46) + 'px';
      box.appendChild(d);
    }
  });

  document.querySelectorAll('[data-glass-rain]').forEach(function (box) {
    var n = parseInt(box.getAttribute('data-glass-rain'), 10) || 12;
    for (var i = 0; i < n; i++) {
      var s = document.createElement('i');
      s.className = 'glass-streak';
      s.style.left = (Math.random() * 96) + '%';
      s.style.animationDelay = (-Math.random() * 6) + 's';
      s.style.animationDuration = (3 + Math.random() * 4) + 's';
      box.appendChild(s);
    }
    for (var j = 0; j < n * 2; j++) {
      var b = document.createElement('b');
      b.className = 'glass-bead';
      b.style.left = (Math.random() * 97) + '%';
      b.style.top = (Math.random() * 97) + '%';
      var sz = 2 + Math.random() * 4;
      b.style.width = b.style.height = sz + 'px';
      box.appendChild(b);
    }
  });
})();
