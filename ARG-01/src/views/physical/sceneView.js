import { parseRaw } from '../../raw.js';
import { initRain } from '../../rain.js';
import { navigate, flow } from '../../router.js';

// 物理空间场景通用工厂
// opts: { raw, step, next, narrate, btn, mode }
//   mode 省略          -> 底部按钮直接前进
//   mode: 'door'       -> 按钮先"敲门"再"推开房门"（corridor3f）
//   mode: 'note'       -> 场景内 .the-note 与底部按钮均跳转 /note（office）
export function sceneView(opts) {
  const parsed = parseRaw(opts.raw);
  return {
    mount: function (container) {
      if (opts.step) flow.step = opts.step;

      container.innerHTML =
        '<div class="view-physical">' +
          '<style>' + parsed.css + '</style>' +
          '<div class="physical-rain" data-rain="120" aria-hidden="true"></div>' +
          '<div class="scene-host">' + parsed.body + '</div>' +
          '<div class="scene-bar">' +
            '<div class="scene-narrate">' + (opts.narrate || '') + '</div>' +
            '<button class="scene-next" id="nextBtn">' + (opts.btn || '前进 ▶') + '</button>' +
          '</div>' +
        '</div>';

      initRain(container);

      const nextBtn = container.querySelector('#nextBtn');
      const narrate = container.querySelector('.scene-narrate');

      if (opts.mode === 'door') {
        nextBtn.textContent = '敲门';
        nextBtn.addEventListener('click', function () {
          if (nextBtn.textContent === '敲门') {
            narrate.innerHTML = '（你屈指敲了敲门，回声在空走廊里散开。无人应答。你摸出钥匙串——307 的备用钥匙，标签纸还是六年前的，字迹早磨淡了。你插进锁孔，锁舌没有卡住。门是虚掩的。你推了一下，门开了，门缝里渗出一线黑——那黑不像是房间的暗，更像是被什么东西吸进去的光。）';
            nextBtn.textContent = '推开房门 ▶';
          } else {
            navigate(opts.next);
          }
        });
      } else if (opts.mode === 'note') {
        const theNote = container.querySelector('.the-note');
        if (theNote) {
          theNote.removeAttribute('href');
          theNote.addEventListener('click', function (e) { e.preventDefault(); navigate('/note'); });
        }
        nextBtn.textContent = '拾起字条 ▶';
        nextBtn.addEventListener('click', function () { navigate('/note'); });
      } else {
        nextBtn.addEventListener('click', function () { navigate(opts.next); });
      }
    },
    unmount: function () {}
  };
}
