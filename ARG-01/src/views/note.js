import { parseRaw } from '../raw.js';
import { navigate, flow } from '../router.js';
import rawFront from '../../../assets/documents/note-front.html?raw';
import rawBack from '../../../assets/documents/note-back.html?raw';

export default {
  mount: function (container) {
    flow.step = 'note';
    const pf = parseRaw(rawFront);
    const pb = parseRaw(rawBack);

    container.innerHTML =
      '<div class="view-note">' +
        '<style>' + pf.css + pb.css + '</style>' +
        '<div class="note-stage" id="noteStage">' + pf.body + '</div>' +
        '<div class="note-bar">' +
          '<button class="note-return" id="noteBackBtn">◀ 返回 307 室</button>' +
          '<button class="note-flip" id="flipBtn">翻到背面 ▶</button>' +
        '</div>' +
      '</div>';

    const stage = container.querySelector('#noteStage');
    const flipBtn = container.querySelector('#flipBtn');
    const backBtn = container.querySelector('#noteBackBtn');
    let flipped = false;

    // 物理空间 → 网络空间：以浏览器新标签页打开 /lcms，物理空间保留在当前标签
    flipBtn.addEventListener('click', function () {
      if (!flipped) {
        stage.innerHTML = pb.body;
        flipped = true;
        flipBtn.textContent = '前往登录 ▶';
      } else {
        flow.noteRead = true;
        window.open(location.pathname + '?d=1#/lcms', 'arg-digital');
      }
    });

    backBtn.addEventListener('click', function () {
      navigate('/physical/room307');
    });
  },
  unmount: function () {}
};
