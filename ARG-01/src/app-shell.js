import { ARG_Audio } from './audio/audio.js';
import { ARG_Horror } from './horror/horror.js';
import { flow } from './router.js';

// 共享壳：#view 容器 + 音频开关 + 恐怖层（序章按 flow.step 渐进激活）+ 首次交互启动底噪
export function initShell(root) {
  root.innerHTML = `
    <div id="shell">
      <div id="view"></div>
      <button id="audio-toggle" title="声音开关" aria-label="声音开关">♪</button>
      <div id="terror"></div>
    </div>`;

  ARG_Horror.init(root.querySelector('#terror'));

  const btn = root.querySelector('#audio-toggle');
  btn.addEventListener('click', function () {
    const muted = ARG_Audio.toggleMute();
    flow.muted = muted;
    btn.classList.toggle('muted', muted);
    btn.textContent = muted ? '✕' : '♪';
  });

  // 浏览器自动播放限制：必须在用户手势后启动底噪
  function boot() {
    ARG_Audio.startDrone();
    window.removeEventListener('pointerdown', boot);
    window.removeEventListener('keydown', boot);
  }
  window.addEventListener('pointerdown', boot);
  window.addEventListener('keydown', boot);
}
