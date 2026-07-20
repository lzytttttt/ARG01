import { parseRaw } from '../raw.js';
import { flow } from '../router.js';
import raw from '../../../assets/oa/layout.html?raw';

export default {
  mount: function (container) {
    flow.step = 'oa';
    const p = parseRaw(raw);

    // 序章范围内不开放后续章节：剥离第一章跳转，并移除"点击进入第一章"提示
    let body = p.body
      .replace(/onclick="window\.location\.href='[^"]*'"/g, '')
      .replace(/<span class="tk-sub" style="color:var\(--oa-primary-blue\);">▶ 点击进入第一章《先上线再说》<\/span>/, '');

    container.innerHTML =
      '<div class="view-oa"><style>' + p.css + '</style>' +
      '<div class="oa-host">' + body + '</div></div>';

    // 数据保留倒计时（后台持续运行）
    const cd = container.querySelector('.corner-countdown');
    let total = 23 * 3600 + 41; // 00:23:41
    const timer = setInterval(function () {
      if (total <= 0) {
        clearInterval(timer);
        if (cd) cd.textContent = '数据保留倒计时 00:00:00';
        return;
      }
      total--;
      const h = String(Math.floor(total / 3600)).padStart(2, '0');
      const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
      const s = String(total % 60).padStart(2, '0');
      if (cd) cd.textContent = '数据保留倒计时 ' + h + ':' + m + ':' + s;
    }, 1000);
    this._timer = timer;

    // 关闭通知弹窗（保留内联 onclick，另加监听兜底）
    const closeBtn = container.querySelector('.sm-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        const ov = container.querySelector('#shutdownOverlay');
        if (ov) ov.classList.add('is-closed');
      });
    }
  },
  unmount: function () {
    if (this._timer) clearInterval(this._timer);
  }
};
