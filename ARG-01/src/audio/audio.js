// ARG-01「六年一夜」声音模块（全局单例，由 chapter1/audio.js 提升为 ESM）
// 原则：零音频文件，全部 Web Audio 实时合成。
// - startDrone()    ：极低频底噪（35Hz），首次用户交互后启动
// - playPing()      ：系统"已处理"提示脉冲音
// - playThunder(int)：雷声（near 亮 / far 闷），S01-S03 偶发
// - startHum()/stopHum()：30Hz 低频嗡声 + 相位偏移（第二振荡器微失谐），307 起进入
// - toggleMute()    ：静音开关，返回当前是否静音
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

// 雷声：白噪声爆 + 低通滤波 + 指数衰减包络；near 亮（近）、far 闷（远）
// 静音时直接跳过，节省算力
function playThunder(intensity) {
  if (muted) return;
  if (!ensure()) return;
  resume();
  const t = ctx.currentTime;
  const near = intensity !== 'far';
  const dur = near ? 2.4 : 3.2;

  // 噪声缓冲
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = near ? 380 : 140;
  lp.Q.value = 0.7;

  const g = ctx.createGain();
  const peak = near ? 0.5 : 0.22;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.06);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(lp).connect(g).connect(masterGain || ctx.destination);
  src.start(t);
  src.stop(t + dur + 0.1);

  // 近雷：叠加一道更亮的"裂帛"前刺
  if (near) {
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1200;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    const src2 = ctx.createBufferSource();
    src2.buffer = buf;
    src2.connect(hp).connect(g2).connect(masterGain || ctx.destination);
    src2.start(t);
    src2.stop(t + 0.6);
  }
}

// 30Hz 低频嗡声 + 相位偏移（第二振荡器微失谐制造慢拍频）——"胸骨下方"的低频
let humOsc1 = null, humOsc2 = null, humGain = null;
function startHum() {
  if (!ensure()) return;
  resume();
  if (humOsc1) return;
  humGain = ctx.createGain();
  humGain.gain.value = 0.04; // 受 masterGain 静音统一控制
  humGain.connect(masterGain);

  humOsc1 = ctx.createOscillator();
  humOsc1.type = 'sine';
  humOsc1.frequency.value = 30;
  humOsc1.connect(humGain);
  humOsc1.start();

  // 相位偏移第二振荡器：微微失谐，制造缓慢拍频，嗡声似从另一方向传来
  humOsc2 = ctx.createOscillator();
  humOsc2.type = 'sine';
  humOsc2.frequency.value = 30.4;
  const g2 = ctx.createGain();
  g2.gain.value = 0.5;
  humOsc2.connect(g2).connect(humGain);
  humOsc2.start();
}
function stopHum() {
  if (humOsc1) { try { humOsc1.stop(); } catch (e) {} humOsc1 = null; }
  if (humOsc2) { try { humOsc2.stop(); } catch (e) {} humOsc2 = null; }
  if (humGain) { try { humGain.disconnect(); } catch (e) {} humGain = null; }
}

// 低语：带通滤波白噪声爆（~1100Hz），极弱、缓慢衰减，像一声贴耳的呼吸
function playWhisper() {
  if (muted) return;
  if (!ensure()) return;
  resume();
  const t = ctx.currentTime;
  const dur = 1.6;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1100;
  bp.Q.value = 1.2;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.06, t + 0.4);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(bp).connect(g).connect(masterGain || ctx.destination);
  src.start(t);
  src.stop(t + dur + 0.1);
}

// 第一章：调整嗡声频率（序章 30Hz，第一章 33Hz），保持第二振荡器微失谐拍频
function setHumFreq(hz) {
  if (humOsc1) humOsc1.frequency.value = hz;
  if (humOsc2) humOsc2.frequency.value = hz + 0.4;
}

// 第一章：drone 相位波动（看群聊"3/3 已离开"时触发，声音似"晃"了一下）
function humPhaseGlitch() {
  if (!humOsc2 || !ctx) return;
  const t = ctx.currentTime;
  const orig = humOsc2.frequency.value;
  humOsc2.frequency.setValueAtTime(orig, t);
  humOsc2.frequency.linearRampToValueAtTime(orig + 3.5, t + 0.12);
  humOsc2.frequency.linearRampToValueAtTime(orig, t + 0.4);
}

// 第二章：嗡声骤增至刺耳级别（Jump scare 听觉层，通讯录合并瞬间触发）
// 音量骤增约 15dB（0.04 → 0.2），持续 0.3s 后骤降回正常
function humSpike() {
  if (!humGain || !ctx) return;
  const t = ctx.currentTime;
  const normal = 0.04;
  const peak = 0.2;
  humGain.gain.cancelScheduledValues(t);
  humGain.gain.setValueAtTime(normal, t);
  humGain.gain.linearRampToValueAtTime(peak, t + 0.02);   // 几乎瞬间拉满
  humGain.gain.setValueAtTime(peak, t + 0.3);              // 持续 0.3s
  humGain.gain.linearRampToValueAtTime(normal, t + 0.5);   // 骤降回正常
}

// 第一章：默言提示音——比 OA 普通"叮"更低、更短，像心跳监护仪跳过一拍
function playMutePing() {
  if (muted) return;
  if (!ensure()) return;
  resume();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, t);
  osc.frequency.exponentialRampToValueAtTime(210, t + 0.06);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.13, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  osc.connect(g).connect(masterGain || ctx.destination);
  osc.start(t);
  osc.stop(t + 0.2);
}

function toggleMute() {
  muted = !muted;
  if (masterGain) masterGain.gain.value = muted ? 0 : 0.5;
  return muted;
}

function isMuted() {
  return muted;
}

export const ARG_Audio = { startDrone, playPing, playThunder, startHum, stopHum, setHumFreq, humPhaseGlitch, humSpike, playMutePing, playWhisper, toggleMute, isMuted };
