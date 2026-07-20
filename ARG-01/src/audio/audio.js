// ARG-01「六年一夜」声音模块（全局单例，由 chapter1/audio.js 提升为 ESM）
// 原则：零音频文件，全部 Web Audio 实时合成。
// - startDrone() ：极低频底噪（35Hz），首次用户交互后启动
// - playPing()   ：系统"已处理"提示脉冲音
// - toggleMute() ：静音开关，返回当前是否静音
// 浏览器自动播放限制：必须在用户手势后调用 startDrone()

let ctx = null;
let masterGain = null;
let muted = false;
let started = false;

function ensure() {
  if (ctx) return true;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  masterGain = ctx.createGain();
  masterGain.gain.value = muted ? 0 : 0.5;
  masterGain.connect(ctx.destination);
  return true;
}

function resume() {
  if (ctx && ctx.state === 'suspended') ctx.resume();
}

// 极低频底噪 + 极慢 LFO，制造"房间在低频下隐隐发闷"的不安感
function startDrone() {
  if (!ensure()) return;
  resume();
  if (started) return;
  started = true;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 35; // 30-40Hz，耳机才觉

  const g = ctx.createGain();
  g.gain.value = 0.05;

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.08;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain).connect(g.gain);

  osc.connect(g).connect(masterGain);
  osc.start();
  lfo.start();
}

// 系统"已处理"提示音：短促下行脉冲
function playPing() {
  if (!ensure()) return;
  resume();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(680, t);
  osc.frequency.exponentialRampToValueAtTime(300, t + 0.18);

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);

  osc.connect(g).connect(masterGain || ctx.destination);
  osc.start(t);
  osc.stop(t + 0.46);
}

function toggleMute() {
  muted = !muted;
  if (masterGain) masterGain.gain.value = muted ? 0 : 0.5;
  return muted;
}

function isMuted() {
  return muted;
}

export const ARG_Audio = { startDrone, playPing, toggleMute, isMuted };
