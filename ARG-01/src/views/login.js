import { parseRaw } from '../raw.js';
import { navigate, flow } from '../router.js';
import { ARG_Audio } from '../audio/audio.js';
import raw from '../../../assets/oa/login.html?raw';

export default {
  mount: function (container) {
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
        navigate('/lcms/oa');
      } else {
        tip.textContent = '账号或密码错误。提示：密码是"那一天，第一个谎言"。';
        tip.style.color = '#e34d59';
      }
    });
  },
  unmount: function () {}
};
