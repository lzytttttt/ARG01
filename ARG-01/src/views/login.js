import { parseRaw } from '../raw.js';
import { navigate, flow } from '../router.js';
import { ARG_Audio } from '../audio/audio.js';
import { ARG_Horror } from '../horror/horror.js';
import raw from '../../../assets/oa/login.html?raw';

export default {
  mount: function (container) {
    flow.step = 'login';
    ARG_Horror.setIntensity('login');
    const p = parseRaw(raw);
    container.innerHTML =
      '<div class="view-login"><style>' + p.css + '</style>' +
      '<div class="login-host">' + p.body + '</div></div>';

    const form = container.querySelector('#loginForm');
    const tip = container.querySelector('#loginTip');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const u = container.querySelector('#u').value.trim();
      const pw = container.querySelector('#p').value.trim();
      if (u === 'ao.man' && pw === '200203') {
        ARG_Audio.playPing();
        flow.loggedIn = true;
        const submitBtn = form.querySelector('button');
        if (submitBtn) submitBtn.disabled = true;
        // 剧本：登录按钮点击反馈慢了 0.5s；进入 OA 前 0.15s 黑闪
        setTimeout(function () {
          ARG_Horror.blackFlash(150);
          setTimeout(function () { navigate('/lcms/oa'); }, 180);
        }, 500);
      } else {
        tip.textContent = '账号或密码错误。提示：密码是"那一天，第一个谎言"。';
        tip.style.color = '#e34d59';
      }
    });
  },
  unmount: function () {}
};
