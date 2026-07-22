import { parseRaw } from '../raw.js';
import { flow, navigate } from '../router.js';
import { ARG_Horror } from '../horror/horror.js';
import raw from '../../../assets/oa/layout.html?raw';

export default {
  mount: function (container) {
    flow.step = 'oa';
    ARG_Horror.setIntensity('oa');
    ARG_Horror.bloodTint();   // OA 偶发血色一闪（克制，CSS 周期内约 4% 触发）
    const p = parseRaw(raw);

    // 恢复第一章入口：剥离原 onclick（指向原型页会破坏 SPA hash 路由），保留 ▶ 提示
    let body = p.body
      .replace(/onclick="window\.location\.href='[^"]*'"/g, '')
      .replace(/▶ 点击进入第一章《先上线再说》/, '▶ 已严重超时，请立即处理！');

    container.innerHTML =
      '<div class="view-oa"><style>' + p.css + '</style>' +
      '<div class="oa-host">' + body + '</div></div>';

    // 第一章入口：点击 TK-2026-0001-1 行进入第一章
    const ch1Row = container.querySelector('.oa-table tbody tr[style*="cursor"]');
    if (ch1Row) {
      ch1Row.addEventListener('click', function () { navigate('/lcms/oa/ch1'); });
      if (flow.ch1Completed) {
        // 第一章已验收：待办递减 7→6，该行标记已处理
        ch1Row.style.cursor = 'default';
        const badge = ch1Row.querySelector('.badge');
        if (badge) { badge.textContent = '已处理'; badge.classList.remove('badge-pending'); }
        const hint = ch1Row.querySelector('.tk-sub');
        if (hint) hint.textContent = '已完成验收。材料已归档。';
      }
    }
    if (flow.ch1Completed) {
      const bc = container.querySelector('.oa-sidebar .badge-count');
      if (bc) bc.textContent = '6';
      const sumRed = container.querySelector('.sum-card .num.red');
      if (sumRed) sumRed.textContent = '6';
    }

    // ===== 第二章入口：第一章完成后，TK-2026-0001-2 行变为可点击 =====
    const allRows = container.querySelectorAll('.oa-table tbody tr');
    let ch2Row = null;
    allRows.forEach(function (r) {
      if (r.textContent.indexOf('TK-2026-0001-2') >= 0) ch2Row = r;
    });
    if (ch2Row && flow.ch1Completed && !flow.ch2Completed) {
      ch2Row.style.cursor = 'pointer';
      ch2Row.title = '▶ 已严重超时，请立即处理！';
      const titleCell = ch2Row.querySelector('td:nth-child(2)');
      if (titleCell) {
        titleCell.innerHTML += '<span class="tk-sub" style="display:block;font-weight:normal;font-size:12px;color:var(--oa-primary-blue);margin-top:4px;line-height:1.7;">▶ 已严重超时，请立即处理！</span>';
      }
      ch2Row.addEventListener('click', function () { navigate('/lcms/oa/ch2'); });
    }
    if (ch2Row && flow.ch2Completed) {
      ch2Row.style.cursor = 'default';
      const badge2 = ch2Row.querySelector('.badge');
      if (badge2) { badge2.textContent = '已处理'; badge2.classList.remove('badge-pending'); }
      const hint2 = ch2Row.querySelector('.tk-sub');
      if (hint2) hint2.textContent = '已完成验收。材料已归档。';
    }
    if (flow.ch2Completed) {
      const bc2 = container.querySelector('.oa-sidebar .badge-count');
      if (bc2) bc2.textContent = '5';
      const sumRed2 = container.querySelector('.sum-card .num.red');
      if (sumRed2) sumRed2.textContent = '5';
    }

    // 数据保留倒计时（后台持续运行）：系统时间 18:43 → 24:00 关闭，约 5h17m
    const cd = container.querySelector('.corner-countdown');
    let total = 5 * 3600 + 17 * 60; // 19020s
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
    ARG_Horror.clearBlood();
  }
};
