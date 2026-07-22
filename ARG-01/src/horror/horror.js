// ARG-01 恐怖层模块（序章渐进激活，操作 #terror 与 body）
// 复用 assets/css/horror.css 的 fx-* 类；黑闪自注入样式。
// 全部受 ARG_Audio 静音态约束（嗡声/雷声）。
import { ARG_Audio } from '../audio/audio.js';

let terrorEl = null;
let styleInjected = false;

const HORROR_CSS = `
.fx-blackflash { position: fixed; inset: 0; z-index: 9800; background: #000; pointer-events: none; opacity: 1; }
.fx-blackflash.out { opacity: 0; transition: opacity .12s ease; }
/* 第一章恐怖增强 */
.fx-edge-flash { position: fixed; inset: 0; z-index: 9700; pointer-events: none; box-shadow: inset 0 0 60px 12px #330000; opacity: 0; transition: opacity .08s ease; }
.fx-edge-flash.on { opacity: 1; }
.fx-cell-break { border-color: transparent !important; }
.fx-monologue { font-style: italic; color: #8a9098; font-size: 13px; margin: 14px 0 6px; padding-left: 12px; border-left: 2px solid rgba(0,0,0,.1); opacity: 0; transition: opacity .7s ease; }
.fx-monologue.show { opacity: 1; }
.fx-ascii-anom { font-family: var(--font-mono, monospace); color: #c0392b; letter-spacing: 1px; }
`;

function injectStyle() {
  if (styleInjected) return;
  const s = document.createElement('style');
  s.textContent = HORROR_CSS;
  document.head.appendChild(s);
  styleInjected = true;
}

function init(rootEl) {
  terrorEl = rootEl || null;
  injectStyle();
}

// 0.15s 黑闪：登录公告弹出 / 关键节点
function blackFlash(ms) {
  ms = ms || 150;
  injectStyle();
  const fl = document.createElement('div');
  fl.className = 'fx-blackflash';
  document.body.appendChild(fl);
  requestAnimationFrame(function () { fl.classList.add('out'); });
  setTimeout(function () { if (fl.parentNode) fl.parentNode.removeChild(fl); }, ms + 220);
}

// H09 血色 / 异常红晕：叠加到 #terror（全屏），CSS 周期内偶发一闪
function bloodTint(opts) {
  if (!terrorEl) return;
  terrorEl.classList.add('fx-blood');
  if (opts && opts.duration) {
    setTimeout(function () { terrorEl.classList.remove('fx-blood'); }, opts.duration);
  }
}

function clearBlood() {
  if (terrorEl) terrorEl.classList.remove('fx-blood');
}

// 30Hz 低频嗡声 + 相位偏移（委托 ARG_Audio）
function phaseHum(on) {
  if (on) ARG_Audio.startHum(); else ARG_Audio.stopHum();
}

// 按 flow.step 渐进激活：
//   室外/走廊(building/corridor1f/corridor3f) —— 停止嗡声（仅雷声/底噪）
//   307/office/note/login/oa —— 启动 30Hz 嗡声
//   离开 OA 清除血色
function setIntensity(step) {
  const humSteps = ['room307', 'office', 'note', 'login', 'oa', 'ch1'];
  if (humSteps.indexOf(step) >= 0) {
    ARG_Audio.startHum();
    // 第一章 drone 略升至 33Hz（序章为 30Hz），增幅极小但为第二章 40Hz 铺垫
    if (step === 'ch1') ARG_Audio.setHumFreq(33);
  } else {
    ARG_Audio.stopHum();
  }
  if (step !== 'oa') clearBlood();
}

// 第一章：暗红边框闪烁（Jump scare 预埋，Excel 切换 ≥5 次触发）
function edgeFlash() {
  injectStyle();
  const fl = document.createElement('div');
  fl.className = 'fx-edge-flash';
  document.body.appendChild(fl);
  requestAnimationFrame(function () { fl.classList.add('on'); });
  setTimeout(function () { fl.classList.remove('on'); }, 200);
  setTimeout(function () { if (fl.parentNode) fl.parentNode.removeChild(fl); }, 420);
}

// 第一章：表格边框随机断裂（Excel 切换 ≥3 次触发，位置每次不同）
function glitchTable(tableEl) {
  if (!tableEl) return;
  const cells = Array.prototype.slice.call(tableEl.querySelectorAll('td, th'));
  if (!cells.length) return;
  const count = Math.min(2 + Math.floor(Math.random() * 3), cells.length);
  const picked = [];
  for (let i = 0; i < count; i++) {
    let idx;
    do { idx = Math.floor(Math.random() * cells.length); } while (picked.indexOf(idx) >= 0);
    picked.push(idx);
    cells[idx].classList.add('fx-cell-break');
  }
  setTimeout(function () {
    picked.forEach(function (i) { cells[i].classList.remove('fx-cell-break'); });
  }, 200);
}

// 第一章：内心独白注入（斜体淡入，看 AUTO-2020-001"从未停用"时触发）
function injectMonologue(container, text) {
  if (!container) return null;
  const el = document.createElement('div');
  el.className = 'fx-monologue';
  el.textContent = text;
  container.appendChild(el);
  requestAnimationFrame(function () { el.classList.add('show'); });
  return el;
}

export const ARG_Horror = { init, blackFlash, bloodTint, clearBlood, phaseHum, setIntensity, edgeFlash, glitchTable, injectMonologue };
