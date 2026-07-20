import { navigate } from '../router.js';
import { ARG_Audio } from '../audio/audio.js';
import { initRain } from '../rain.js';

export default {
  mount: function (container) {
    container.innerHTML = `
      <div class="view-portal">
        <div class="rain-field" data-rain="80"></div>
        <div class="portal-inner">
          <div class="portal-logo">
            <svg width="64" height="64" viewBox="0 0 120 120" aria-label="临川民生">
              <circle cx="60" cy="60" r="56" fill="#fff"/>
              <circle cx="60" cy="60" r="48" fill="#1a56db"/>
              <path d="M30,62 Q60,34 90,62" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
              <path d="M32,72 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
              <path d="M39,82 q7,-6 14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>
            </svg>
          </div>
          <h1 class="portal-title">六年一夜</h1>
          <p class="portal-sub">临川民生服务集团 · 协同办公平台 · 序章</p>
          <button class="portal-start" id="startBtn">开始游戏</button>
          <div class="portal-foot">Powered by Cthu / Apocalypic /<span style="font-family:var(--font-hei,serif)">α</span>\</div>
        </div>
      </div>`;
    initRain(container);
    container.querySelector('#startBtn').addEventListener('click', function () {
      ARG_Audio.startDrone();
      navigate('/physical/building');
    });
  },
  unmount: function () {}
};
