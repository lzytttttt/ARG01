import { parseRaw } from '../../raw.js';
import { initRain } from '../../rain.js';
import { navigate, flow } from '../../router.js';
import { ARG_Audio } from '../../audio/audio.js';
import { openDocument } from '../documentModal.js';
import { ARG_Horror } from '../../horror/horror.js';

// 物理空间场景通用工厂
// opts: { raw, step, next, narrate, btn, mode }
//   mode 省略          -> 底部按钮直接前进
//   mode: 'door'       -> 按钮先"敲门"再"推开房门"（corridor3f）
//   mode: 'note'       -> 场景内 .the-note 与底部按钮均跳转 /note（office）
// 雷声：仅 step 为 building/corridor1f/corridor3f 时偶发（S01-S03），进入 307 后停止
const THUNDER_STEPS = { building: 'near', corridor1f: 'far', corridor3f: 'far' };

export function sceneView(opts) {
  const parsed = parseRaw(opts.raw);
  let thunderTimer = null;

  function scheduleThunder() {
    const delay = 8000 + Math.random() * 12000; // 8-20s 随机间隔
    thunderTimer = setTimeout(function () {
      ARG_Audio.playThunder(THUNDER_STEPS[opts.step]);
      scheduleThunder();
    }, delay);
  }

  function startThunder() {
    if (!THUNDER_STEPS[opts.step]) return;
    // 首声稍快，建立雨夜氛围
    thunderTimer = setTimeout(function () {
      ARG_Audio.playThunder(THUNDER_STEPS[opts.step]);
      scheduleThunder();
    }, 2500 + Math.random() * 3500);
  }

  function stopThunder() {
    if (thunderTimer) { clearTimeout(thunderTimer); thunderTimer = null; }
  }

  return {
    mount: function (container) {
      if (opts.step) {
        flow.step = opts.step;
        ARG_Horror.setIntensity(opts.step);
      }

      container.innerHTML =
        '<div class="view-physical">' +
          '<style>' + parsed.css + '</style>' +
          '<div class="scene-host">' + parsed.body + '</div>' +
          '<div class="scene-bar">' +
            '<div class="scene-narrate">' + (opts.narrate || '') + '</div>' +
            '<div class="scene-actions">' +
              (opts.back ? '<button class="scene-back" id="backBtn">' + (opts.backBtn || '◀ 返回上一步') + '</button>' : '') +
              '<button class="scene-next" id="nextBtn">' + (opts.btn || '前进 ▶') + '</button>' +
            '</div>' +
          '</div>' +
        '</div>';

      initRain(container);
      startThunder();

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

      // 返回上一步（物理空间内回退，如办公室返回 307 室）
      if (opts.back) {
        const backBtn = container.querySelector('#backBtn');
        if (backBtn) backBtn.addEventListener('click', function () { navigate(opts.back); });
      }

      // 可交互热点：.hotspot[data-doc] → openDocument(opts.docs[name])
      if (opts.docs) {
        const spots = container.querySelectorAll('.hotspot[data-doc]');
        spots.forEach(function (sp) {
          const name = sp.getAttribute('data-doc');
          const rawDoc = opts.docs[name];
          if (rawDoc) {
            sp.addEventListener('click', function () { openDocument(rawDoc); });
          } else {
            sp.style.display = 'none';
          }
        });
      }
    },
    unmount: function () {
      stopThunder();
    }
  };
}
