// ARG-01 恐怖层模块（序章渐进激活，操作 #terror 与 body）
// 复用 assets/css/horror.css 的 fx-* 类；黑闪自注入样式。
// 全部受 ARG_Audio 静音态约束（嗡声/雷声）。
import { ARG_Audio } from '../audio/audio.js';

let terrorEl = null;
let styleInjected = false;

const HORROR_CSS = `
.fx-blackflash { position: fixed; inset: 0; z-index: 9800; background: #000; pointer-events: none; opacity: 1; }
.fx-blackflash.out { opacity: 0; transition: opacity .12s ease; }
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
  const humSteps = ['room307', 'office', 'note', 'login', 'oa'];
  if (humSteps.indexOf(step) >= 0) ARG_Audio.startHum();
  else ARG_Audio.stopHum();
  if (step !== 'oa') clearBlood();
}

export const ARG_Horror = { init, blackFlash, bloodTint, clearBlood, phaseHum, setIntensity };
