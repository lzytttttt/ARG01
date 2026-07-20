// 物理空间 ↔ 数字空间 的切换动效：
//   playBoot      物理 → 数字：唤醒电脑（CRT 通电闪光）+ 页面加载进度，加载完成后挂载数字视图
//   playPowerDown 数字 → 物理：关机收缩
// 覆盖层挂在 body 上，z-index 最高，不依赖任何具体视图。

let overlay = null;
let timers = [];

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function ensureOverlay() {
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.className = 'boot-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="boot-crt"></div>' +
    '<div class="boot-screen">' +
      '<div class="boot-logo">LINCHUAN&nbsp;MINSHENG</div>' +
      '<div class="boot-sub">临川民生服务集团有限公司 · 协同办公平台</div>' +
      '<div class="boot-bar"><i></i></div>' +
      '<div class="boot-msg">正在唤醒终端…</div>' +
    '</div>';
  document.body.appendChild(overlay);
  return overlay;
}

// 物理空间 → 数字空间（唤醒电脑 + 加载）
export function playBoot(cb) {
  const ov = ensureOverlay();
  clearTimers();
  ov.classList.remove('boot-powerdown', 'boot-done');
  void ov.offsetWidth; // 强制重排，确保动画可重放
  ov.classList.add('boot-play');
  // 节奏：0-600ms CRT 通电；600-1800ms 加载屏+进度条；1800ms 挂载数字视图；1850ms 淡出
  timers.push(setTimeout(cb, 1800));
  timers.push(setTimeout(function () { ov.classList.add('boot-done'); }, 1850));
  timers.push(setTimeout(function () { ov.classList.remove('boot-play', 'boot-done'); }, 2450));
}

// 数字空间 → 物理空间（关机收缩）
export function playPowerDown(cb) {
  const ov = ensureOverlay();
  clearTimers();
  ov.classList.remove('boot-play', 'boot-done');
  void ov.offsetWidth;
  ov.classList.add('boot-powerdown');
  timers.push(setTimeout(cb, 650));
  timers.push(setTimeout(function () { ov.classList.remove('boot-powerdown'); }, 1300));
}
