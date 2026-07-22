// 第一章《先上线再说》主视图
// 2010 年代国企 OA 老味风格 + 审批流程分页 + 智能助手隐蔽入口
import { flow, navigate } from '../router.js';
import { ARG_Horror } from '../horror/horror.js';
import { ARG_Audio } from '../audio/audio.js';
import { renderModule } from './chapter1Data.js';

// 第一章老味样式（2010 年代网站风：渐变、实线边框、老式窗口框）
const CH1_CSS = `
.view-ch1 { color:#1a1a1a; font-family:"SimSun","宋体",serif; font-size:15px; background:#5a5a5a; }
.ch1-oa { max-width:1080px; margin:0 auto; min-height:100vh; display:flex; flex-direction:column; background:#d4d0c8; box-shadow:0 0 30px rgba(0,0,0,.45); }

/* 顶栏：深蓝渐变 */
.ch1-topbar { background:linear-gradient(#4a6a9a,#2b3a55); color:#fff; padding:9px 20px; display:flex; align-items:center; gap:16px; font-size:15px; border-bottom:2px solid #1a2740; }
.ch1-topbar .platform-name { font-weight:bold; font-size:17px; letter-spacing:1px; }
.ch1-topbar .platform-name small { font-size:12px; font-weight:normal; opacity:.7; margin-left:6px; }
.ch1-topbar .user { margin-left:auto; }
.ch1-topbar .time { font-family:"Consolas",monospace; font-size:13px; opacity:.85; margin-left:12px; }
.ch1-topbar .cd { color:#ffd0d0; font-size:13px; margin-left:14px; font-family:"Consolas",monospace; }

/* banner：黄底渐变红边警示 */
.ch1-banner { background:linear-gradient(#fff8d0,#fff3cd); color:#856404; border-bottom:2px solid #dc3545; padding:8px 20px; font-size:14px; display:flex; align-items:center; gap:8px; line-height:1.6; }
.ch1-banner .bn-icon { color:#dc3545; font-weight:bold; font-size:16px; }

/* 权限标注条 */
.ch1-perm-bar { background:#f0f0f0; color:#666; padding:6px 20px; font-size:13px; border-bottom:1px solid #d0d0d0; text-align:right; letter-spacing:1px; }

/* 红色文字：推动"人员"剧情 */
.plot-red { color:#c0392b; font-weight:bold; }
.plot-red-light { color:#c0392b; }

/* 默言推荐选项按钮 */
.mc-quick-replies { display:flex; flex-wrap:wrap; gap:8px; padding:8px 14px; }
.mc-quick-reply { font-size:13px; padding:6px 14px; background:#1a2a40; color:#8ab4f8; border:1px solid #2a4060; border-radius:14px; cursor:pointer; transition:all .2s; }
.mc-quick-reply:hover { background:#233a5a; color:#cfe0ff; border-color:#1a56db; }

/* 流式输出光标 */
.mc-cursor { display:inline-block; width:2px; height:15px; background:#4ade80; margin-left:2px; animation:cursorBlink .8s step-end infinite; vertical-align:text-bottom; }
@keyframes cursorBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }

/* 主体 */
.ch1-shell { flex:1; display:flex; min-height:0; }
.ch1-sidebar { width:196px; background:#ececec; border-right:1px solid #b0aca0; padding:8px 0; font-size:15px; flex:none; }
.ch1-menu-item { padding:11px 20px; cursor:pointer; border-left:3px solid transparent; color:#1a1a1a; display:flex; align-items:center; }
.ch1-menu-item:hover { background:#d4d0c8; }
.ch1-menu-item.active { background:linear-gradient(#fff,#e8e8e8); border-left-color:#1a56db; color:#1a56db; font-weight:bold; }
.ch1-menu-item .grow { flex:1; }
.ch1-menu-item .badge-count { background:#c0392b; color:#fff; font-size:12px; padding:1px 7px; border-radius:2px; font-family:"Consolas",monospace; }
.ch1-menu-divider { height:1px; background:#b0aca0; margin:6px 12px; }

/* 内容区 */
.ch1-content { flex:1; background:#fff; padding:22px 30px 40px; overflow:auto; }
.ch1-page-head { display:flex; justify-content:space-between; align-items:baseline; border-bottom:2px solid #1a56db; padding-bottom:10px; margin-bottom:20px; }
.ch1-page-title { font-size:18px; font-weight:bold; color:#1a2740; }
.ch1-page-sub { font-size:13px; color:#999; }

/* 审批流程步骤条 */
.ch1-flow { display:flex; margin-bottom:24px; border:1px solid #b0aca0; background:#ececec; }
.ch1-flow .step { flex:1; padding:11px 6px; text-align:center; font-size:14px; border-right:1px solid #b0aca0; color:#777; }
.ch1-flow .step:last-child { border-right:none; }
.ch1-flow .step .s-num { display:inline-block; width:20px; height:20px; line-height:20px; border-radius:50%; background:#b0aca0; color:#fff; font-size:12px; margin-right:6px; font-family:"Consolas",monospace; }
.ch1-flow .step.done { color:#1a56db; }
.ch1-flow .step.done .s-num { background:#1a56db; }
.ch1-flow .step.active { background:linear-gradient(#fff,#f0f0f0); color:#1a56db; font-weight:bold; }
.ch1-flow .step.active .s-num { background:#1a56db; }

/* 步骤面板 */
.step-panel { display:none; }
.step-panel.active { display:block; }

/* 翻页 */
.ch1-pager { margin-top:26px; padding-top:18px; border-top:1px solid #e0e0e0; display:flex; justify-content:space-between; }

/* 古早 3D 凸起渐变按钮 */
.ch1-btn { font-family:"SimSun",serif; font-size:15px; padding:8px 26px; background:linear-gradient(#fafafa,#d4d0c8); border:1px solid #888; border-style:outset; color:#1a1a1a; cursor:pointer; }
.ch1-btn:hover { background:linear-gradient(#fff,#e0dcd0); }
.ch1-btn:active { border-style:inset; }
.ch1-btn:disabled { color:#999; cursor:not-allowed; background:#e8e8e8; }
.ch1-btn-primary { background:linear-gradient(#2a6adf,#1a56db); color:#fff; border-color:#1040a0; }
.ch1-btn-primary:hover { background:linear-gradient(#3573e8,#235fd6); }
.ch1-btn-primary:disabled { background:linear-gradient(#9aa8c8,#7a8aa8); border-color:#7a8aa8; }

/* 老式窗口框（文件阅读弹窗） */
.old-window { border:1px solid #888; background:#fff; box-shadow:2px 2px 6px rgba(0,0,0,.22); margin-bottom:18px; }
.old-window .ow-title { background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; padding:7px 12px; font-size:14px; font-weight:bold; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #2b3a55; }
.old-window .ow-title .ow-close { font-size:16px; opacity:.8; cursor:default; }
.old-window .ow-body { padding:0; }

/* 公文 / 聊天 / Excel 复用 docs.css，字号放大 */
.view-ch1 .doc-pane h3 { font-size:17px; margin:0 0 6px; color:#1a2740; border-left:4px solid #1a56db; padding-left:12px; }
.view-ch1 .doc-pane .src { font-size:13px; color:#666; margin-bottom:10px; }
.view-ch1 .doc-paper { color:#1a1a1a; padding:34px 40px; box-shadow:none; border:none; }
.view-ch1 .doc-body p { font-size:17px; line-height:2.1; }
.view-ch1 .doc-title { font-size:21px; }
.view-ch1 .doc-sign { font-size:17px; }
.view-ch1 .redhead-org { font-size:26px; }
.view-ch1 .chat-screenshot { width:440px; box-shadow:none; border:none; margin:0; }
.view-ch1 .chat-msg .bubble { font-size:15px; }

/* Excel 老味：渐变表头 + 实线边框 + 斑马线 */
.view-ch1 .excel-table { font-size:14px; border-collapse:collapse; width:100%; }
.view-ch1 .excel-table th { background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; border:1px solid #2b3a55; padding:9px 18px; font-weight:600; }
.view-ch1 .excel-table td { border:1px solid #b0aca0; padding:9px 18px; }
.view-ch1 .excel-table tbody tr:nth-child(even) { background:#f4f4f0; }

/* 选版 */
.view-ch1 .choice-zone { margin-top:8px; border:1px solid #b0aca0; background:#fafafa; padding:20px 22px; font-size:15px; }
.view-ch1 .choice-zone h4 { font-size:16px; margin-bottom:6px; }
.view-ch1 .choice-zone .tip { font-size:14px; color:#666; margin-bottom:16px; }
.view-ch1 .ver-options { display:flex; gap:14px; }
.view-ch1 .ver-opt { flex:1; border:1px solid #b0aca0; background:#fff; padding:14px 16px; cursor:pointer; }
.view-ch1 .ver-opt:hover { border-color:#1a56db; background:#fafafa; }
.view-ch1 .ver-opt .t { font-weight:600; font-size:15px; }
.view-ch1 .ver-opt .m { font-family:"Consolas",monospace; font-size:13px; color:#666; margin-top:8px; line-height:1.8; }
.view-ch1 .ver-opt.is-picked { border-color:#1a56db; box-shadow:0 0 0 2px rgba(26,86,219,.15); background:#f2f6ff; }
.view-ch1 #explainBox { margin-top:16px; }
.view-ch1 #explainBox textarea { width:100%; height:70px; border:1px solid #b0aca0; padding:10px 12px; font-family:"SimSun",serif; font-size:15px; resize:none; }
.view-ch1 .complete-bar { margin-top:20px; padding:16px 20px; background:#f2f6ff; border:1px solid #cfdcf7; font-size:15px; line-height:2; }
.view-ch1 .complete-bar .sys-time { font-family:"Consolas",monospace; font-size:13px; color:#666; margin-top:8px; }
.view-ch1 .gray-line { font-size:13px; color:#888; font-style:italic; margin-top:8px; }

/* footer + /α\\ 水印（智能助手隐蔽入口） */
.ch1-footer { background:linear-gradient(#4a6a9a,#2b3a55); color:#8a96a8; padding:9px 20px; font-size:12px; display:flex; justify-content:space-between; align-items:center; }
.ch1-footer .apocalypic-logo { cursor:pointer; font-family:serif; transition:opacity .3s; user-select:none; }
.ch1-footer .apocalypic-logo .alpha { color:#6a3a3a; }
.ch1-footer .apocalypic-logo:hover { opacity:.85; }
.ch1-footer .apocalypic-logo.glow { animation:alphaGlow 2.2s ease-in-out infinite; }
@keyframes alphaGlow { 0%,100%{opacity:.5;} 50%{opacity:1;} }
/* step2 引导：增大、变形、跳动 */
.ch1-footer .apocalypic-logo.jump { animation:alphaJump .9s ease-in-out infinite; transform-origin:center right; font-size:18px; color:#cfe0ff; }
.ch1-footer .apocalypic-logo.jump .alpha { color:#c0392b; }
@keyframes alphaJump { 0%,100%{transform:scale(1) skewX(0) translateY(0);} 20%{transform:scale(1.5) skewX(-8deg) translateY(-4px);} 40%{transform:scale(1.2) skewX(6deg) translateY(0);} 60%{transform:scale(1.5) skewX(-6deg) translateY(-3px);} 80%{transform:scale(1.25) skewX(4deg) translateY(0);} }

/* 诡异红字提示（step2 引导右下角） */
.ch1-hint { position:fixed; right:28px; bottom:56px; z-index:300; color:#c0392b; font-size:16px; font-weight:bold; text-shadow:0 0 6px rgba(192,57,43,.5); display:none; pointer-events:none; animation:hintBlink 1.1s ease-in-out infinite; }
.ch1-hint.show { display:block; }
@keyframes hintBlink { 0%,100%{opacity:.45;} 50%{opacity:1;} }

/* 默言小气泡（确认后首语） */
.mute-panel { position:fixed; right:24px; bottom:80px; width:340px; background:#fff; border:1px solid #b0aca0; box-shadow:0 8px 30px rgba(0,0,0,.18); z-index:200; opacity:0; transform:translateY(8px); transition:opacity .3s, transform .3s; }
.mute-panel.show { opacity:1; transform:translateY(0); }
.mute-panel .mp-head { padding:11px 16px; background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; font-size:14px; display:flex; justify-content:space-between; align-items:center; }
.mute-panel .mp-head .mp-name { display:flex; align-items:center; gap:8px; }
.mute-panel .mp-head .mp-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; }
.mute-panel .mp-body { padding:16px; font-size:15px; line-height:1.9; color:#1a2740; }
.mute-panel .mp-body .mp-msg { background:#f2f6ff; padding:12px 14px; border-left:3px solid #1a56db; }

/* 差异摘要 + ASCII + 独白 */
.diff-summary { margin:16px 0; padding:14px 18px; background:#fff8f0; border:1px solid #f0d8b0; font-size:14px; line-height:2; font-family:"Consolas",monospace; }
.diff-summary .ds-title { font-weight:600; color:#b45309; margin-bottom:6px; font-family:"SimSun",serif; }
.diff-summary .ds-total { color:#c0392b; font-weight:600; }
.fx-ascii-line { font-family:"Consolas",monospace; color:#c0392b; letter-spacing:1px; white-space:pre; margin:10px 0; font-size:14px; }
.fx-monologue { font-style:italic; color:#8a9098; font-size:14px; margin:14px 0 6px; padding-left:12px; border-left:2px solid rgba(0,0,0,.1); opacity:0; transition:opacity .7s ease; }
.fx-monologue.show { opacity:1; }

/* 模块列表（线索文档）老味字号放大 */
#ch1ModuleArea .mod-list { width:100%; border-collapse:collapse; font-size:15px; background:#fff; }
#ch1ModuleArea .mod-list th { border:1px solid #2b3a55; padding:11px 12px; text-align:left; background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; font-weight:600; }
#ch1ModuleArea .mod-list td { border:1px solid #b0aca0; padding:11px 12px; text-align:left; }
#ch1ModuleArea .mod-list tbody tr { cursor:pointer; }
#ch1ModuleArea .mod-list tbody tr:hover { background:#fafafa; }
#ch1ModuleArea .mod-list tbody tr.is-open { background:#f2f6ff; }
#ch1ModuleArea .mod-detail { margin:12px 0 20px; padding:16px 18px; background:#fafafa; border:1px solid #d0d0d0; border-left:4px solid #1a56db; font-size:15px; line-height:2; }
#ch1ModuleArea .mod-detail .src { font-size:13px; color:#888; margin-bottom:8px; }
#ch1ModuleArea .mod-empty { padding:50px; text-align:center; color:#777; font-size:15px; }
#ch1ModuleArea .ch1-page-head { margin-bottom:18px; }

/* 智能助手 Chatbot 全屏覆盖 */
.mute-chat-overlay { position:fixed; inset:0; z-index:9500; background:rgba(6,8,14,.94); display:flex; align-items:center; justify-content:center; }
.mute-chat { width:500px; max-width:94vw; height:72vh; background:#131722; border:1px solid #2a3040; display:flex; flex-direction:column; box-shadow:0 0 70px rgba(0,0,0,.8); }
.mute-chat .mc-head { padding:13px 18px; background:#0d1018; color:#cfe0ff; font-size:15px; display:flex; align-items:center; gap:10px; border-bottom:1px solid #2a3040; }
.mute-chat .mc-head .mc-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; box-shadow:0 0 6px #4ade80; }
.mute-chat .mc-head .mc-title { font-weight:600; }
.mute-chat .mc-head .mc-sub { font-size:12px; color:#6b7280; margin-left:4px; }
.mute-chat .mc-head .mc-close { margin-left:auto; background:none; border:none; color:#6b7280; font-size:22px; cursor:pointer; line-height:1; }
.mute-chat .mc-head .mc-close:hover { color:#cfe0ff; }
.mute-chat .mc-body { flex:1; overflow-y:auto; padding:18px; display:flex; flex-direction:column; gap:14px; }
.mute-chat .mc-msg { max-width:82%; padding:11px 15px; font-size:15px; line-height:1.7; border-radius:4px; word-break:break-all; }
.mute-chat .mc-msg.sys { background:#2a3040; color:#cfe0ff; align-self:flex-start; }
.mute-chat .mc-msg.user { background:#1a56db; color:#fff; align-self:flex-end; }
.mute-chat .mc-msg.weird { background:#2a2024; color:#e07a7a; align-self:flex-start; border-left:2px solid #8a3a3a; }
.mute-chat .mc-msg.weird.big { font-size:30px; letter-spacing:3px; line-height:1.4; font-family:"Consolas",monospace; padding:14px 18px; }
.mute-chat .mc-input { padding:14px; border-top:1px solid #2a3040; display:flex; gap:10px; }
.mute-chat .mc-input input { flex:1; background:#0d1018; border:1px solid #2a3040; color:#cfe0ff; padding:11px 14px; font-size:15px; font-family:inherit; }
.mute-chat .mc-input input:focus { outline:none; border-color:#1a56db; }
.mute-chat .mc-input input::placeholder { color:#4a5568; }
.mute-chat .mc-input button { padding:11px 22px; background:#1a56db; color:#fff; border:none; font-size:15px; cursor:pointer; }
.mute-chat .mc-input button:hover { background:#235fd6; }
.mute-chat .mc-typing { font-size:13px; color:#6b7280; align-self:flex-start; padding:0 4px; }
`;

// 在节点后插入并返回新节点
function after(refEl, html) {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  const el = wrap.firstChild;
  refEl.parentNode.insertBefore(el, refEl.nextSibling);
  return el;
}

export default {
  mount: function (container) {
    flow.step = 'ch1';
    ARG_Horror.setIntensity('ch1');

    container.innerHTML =
      '<div class="view-ch1"><style>' + CH1_CSS + '</style>' +
      '<div class="ch1-oa">' +
        '<div class="ch1-topbar">' +
          '<svg width="28" height="28" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#fff"/><circle cx="60" cy="60" r="48" fill="#1a56db"/><path d="M30,62 Q60,34 90,62" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M32,72 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><path d="M39,82 q7,-6 14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"/></svg>' +
          '<span class="platform-name">临川民生集团协同办公平台<small>旧版 v2.4 · IE6 兼容模式</small></span>' +
          '<span class="user">敖曼</span>' +
          '<span class="time">2026年7月19日 18:43</span>' +
          '<span class="cd" id="ch1Cd">数据保留倒计时 00:23:41</span>' +
        '</div>' +
        '<div class="ch1-banner"><span class="bn-icon">⚠</span>您当前使用的客户端版本过低（IE 6.0 兼容模式），部分功能可能出现加载缓慢、样式错位或脚本无响应等问题。如遇异常请刷新重试。</div>' +
        '<div class="ch1-perm-bar">当前权限可阅览，权限等级：外部合作人员</div>' +
        '<div class="ch1-shell">' +
          '<nav class="ch1-sidebar">' +
            '<div class="ch1-menu-item active"><span class="grow">公文流转</span></div>' +
            '<div class="ch1-menu-item"><span class="grow">项目管理</span></div>' +
            '<div class="ch1-menu-item"><span class="grow">合同管理</span></div>' +
            '<div class="ch1-menu-item"><span class="grow">工单中心</span></div>' +
            '<div class="ch1-menu-item"><span class="grow">通讯录</span></div>' +
            '<div class="ch1-menu-item"><span class="grow">会议纪要</span></div>' +
            '<div class="ch1-menu-item"><span class="grow">资料中心</span></div>' +
            '<div class="ch1-menu-item"><span class="grow">待办中心</span><span class="badge-count">7</span></div>' +
            '<div class="ch1-menu-divider"></div>' +
            '<div class="ch1-menu-item"><span class="grow">退出登录</span></div>' +
          '</nav>' +
          '<main class="ch1-content">' +
            '<div id="ch1TodoView" style="display:none;">' +
              '<div class="ch1-page-head"><span class="ch1-page-title">TK-2026-0001-1｜核验 2020 年疫情应急模块上线材料</span><span class="ch1-page-sub">审批流程 · 共 5 步</span></div>' +
              '<div class="ch1-flow" id="ch1Flow">' +
                '<div class="step active" data-step="1"><span class="s-num">1</span>公文查阅</div>' +
                '<div class="step" data-step="2"><span class="s-num">2</span>附件核验</div>' +
                '<div class="step" data-step="3"><span class="s-num">3</span>规则确认</div>' +
                '<div class="step" data-step="4"><span class="s-num">4</span>版本确认</div>' +
                '<div class="step" data-step="5"><span class="s-num">5</span>提交归档</div>' +
              '</div>' +
              '<div id="ch1StepArea">' + stepPanelsHTML() + '</div>' +
              '<div class="ch1-pager"><button class="ch1-btn" id="prevBtn" disabled>上一步</button><button class="ch1-btn ch1-btn-primary" id="nextBtn">下一步 →</button></div>' +
            '</div>' +
            '<div id="ch1ModuleArea"></div>' +
          '</main>' +
        '</div>' +
        '<div class="ch1-footer"><span>临川民生服务集团有限公司 · 旧版平台（2019）</span><span class="apocalypic-logo" id="alphaSigil">Powered by Cthu / Apocalypic /<span class="alpha">α</span>\\</span></div>' +
        '<div class="ch1-hint" id="ch1Hint">↓ 右下角……有什么东西。</div>' +
      '</div></div>';

    const host = container.querySelector('.view-ch1');

    // ===== 主线状态 =====
    let currentStep = 1;
    let picked = null;
    let excelSwitchCount = 0;
    let chatViewCount = 0;
    let ruleViewed = false;
    let diffSummaryShown = false;
    let confirmed = flow.ch1Completed;

    // ===== 顶栏倒计时 =====
    const cd = host.querySelector('#ch1Cd');
    let total = 23 * 60 + 41;
    const timer = setInterval(function () {
      if (total <= 0) { clearInterval(timer); if (cd) cd.textContent = '数据保留倒计时 00:00:00'; return; }
      total--;
      const m = String(Math.floor(total / 60)).padStart(2, '0');
      const s = String(total % 60).padStart(2, '0');
      if (cd) cd.textContent = '数据保留倒计时 00:' + m + ':' + s;
    }, 1000);
    this._timer = timer;

    // ===== 步骤切换 =====
    const flow_ = host.querySelector('#ch1Flow');
    const prevBtn = host.querySelector('#prevBtn');
    const nextBtn = host.querySelector('#nextBtn');
    const panels = host.querySelectorAll('.step-panel');
    const hint = host.querySelector('#ch1Hint');
    const sigil = host.querySelector('#alphaSigil');

    function gotoStep(n) {
      if (n < 1 || n > 5) return;
      currentStep = n;
      panels.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-panel') === String(n)); });
      flow_.querySelectorAll('.step').forEach(function (s) {
        const sn = parseInt(s.getAttribute('data-step'), 10);
        s.classList.toggle('active', sn === n);
        s.classList.toggle('done', sn < n);
      });
      prevBtn.disabled = (n === 1);
      if (n === 5) { nextBtn.style.display = 'none'; }
      else { nextBtn.style.display = ''; nextBtn.disabled = (n === 4 && !confirmed); }
      // step2：红字提示 + /α\ 跳动引导
      if (n === 2) {
        hint.classList.add('show');
        sigil.classList.add('jump');
      } else {
        hint.classList.remove('show');
        sigil.classList.remove('jump');
      }
      // 步骤进入回调
      if (n === 3) triggerRule();
      if (n === 4 && confirmed) showConfirmedState();
    }

    prevBtn.addEventListener('click', function () { gotoStep(currentStep - 1); });
    nextBtn.addEventListener('click', function () {
      if (currentStep === 4 && !confirmed) return;
      if (currentStep < 5) gotoStep(currentStep + 1);
    });

    // ===== 聊天截图再读（step2） =====
    const chatSys = host.querySelector('.chat-system');
    if (chatSys) chatSys.style.display = 'none';
    const chatShot = host.querySelector('.chat-screenshot');
    if (chatShot && chatSys) {
      chatShot.style.cursor = 'pointer';
      chatShot.addEventListener('click', function () {
        chatViewCount++;
        if (chatViewCount >= 2) {
          chatSys.style.display = '';
          ARG_Audio.humPhaseGlitch();
          after(chatShot, '<div class="fx-monologue">你的视线在"3/3"上停住了。项目经理、前端小王、后端小周——全不在了。</div>');
          host.querySelectorAll('.fx-monologue').forEach(function (m) { requestAnimationFrame(function () { m.classList.add('show'); }); });
        }
      });
    }

    // ===== AUTO-2020-001 规则触发（进入 step3） =====
    function triggerRule() {
      if (ruleViewed) return;
      ruleViewed = true;
      const ruleExtra = host.querySelector('#ruleExtra');
      if (!ruleExtra) return;
      ruleExtra.innerHTML =
        '<div class="fx-ascii-line">=============</div>' +
        '<div class="fx-monologue">六年了。它一直在运行。</div>' +
        '<div class="fx-monologue">你下意识地吞咽了一下。喉咙很干。你在这间办公室里坐了快半个小时——没喝水。</div>';
      ruleExtra.querySelectorAll('.fx-monologue').forEach(function (m) { requestAnimationFrame(function () { m.classList.add('show'); }); });
    }

    // ===== Excel 选版（step4） =====
    const opts = host.querySelectorAll('.ver-opt');
    const confirmBtn = host.querySelector('#confirmBtn');
    const explainBox = host.querySelector('#explainBox');
    const choiceZone = host.querySelector('.choice-zone');

    opts.forEach(function (el) {
      el.addEventListener('click', function () {
        opts.forEach(function (o) { o.classList.remove('is-picked'); });
        el.classList.add('is-picked');
        picked = el.getAttribute('data-v');
        if (confirmBtn) confirmBtn.disabled = false;
        if (explainBox) explainBox.style.display = (picked === 'original') ? 'block' : 'none';
        nextBtn.disabled = true;

        excelSwitchCount++;
        if (excelSwitchCount >= 6 && !diffSummaryShown && choiceZone) {
          diffSummaryShown = true;
          showDiffSummary(choiceZone);
        }
        if (excelSwitchCount >= 3 && choiceZone) {
          choiceZone.style.borderColor = '#c0392b';
          setTimeout(function () { choiceZone.style.borderColor = ''; }, 200);
        }
        if (excelSwitchCount >= 5) ARG_Horror.edgeFlash();
      });
    });

    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        if (!picked) return;
        flow.choices.ch1_excelVersion = picked;
        confirmed = true;
        ARG_Audio.playMutePing();
        showMutePanel(host);
        if (choiceZone) after(choiceZone, '<div class="fx-monologue">你点击确认的瞬间——指尖在鼠标按键上停了一秒。不是你停的。是手指自己在犹豫。</div>');
        host.querySelectorAll('.fx-monologue').forEach(function (m) { requestAnimationFrame(function () { m.classList.add('show'); }); });
        showConfirmedState();
        if (sigil) sigil.classList.add('glow');
      });
    }

    function showConfirmedState() {
      if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.textContent = '已确认验收版本'; }
      const cb = host.querySelector('#completeBar');
      if (cb) cb.style.display = 'block';
      nextBtn.disabled = false;
    }

    // ===== 提交归档（step5）返回待办中心 =====
    const finishBtn = host.querySelector('#finishBtn');
    if (finishBtn) {
      finishBtn.addEventListener('click', function () {
        flow.ch1Completed = true;
        navigate('/lcms/oa');
      });
    }

    // ===== 已通关：直接进入完成态 =====
    if (flow.ch1Completed) {
      confirmed = true;
      showConfirmedState();
    }

    // 初始化审批流程步骤状态（待办中心进入时生效）
    gotoStep(1);
    // 初始隐藏待办视图，待办中心点击时才显示

    // ===== 智能助手隐蔽入口：/α\ 水印 =====
    if (sigil) {
      sigil.addEventListener('click', function () { openMuteChat(host); });
    }

    // ===== 侧边模块切换 =====
    const menuItems = host.querySelectorAll('.ch1-menu-item');
    const todoView = host.querySelector('#ch1TodoView');
    const moduleArea = host.querySelector('#ch1ModuleArea');
    const ctx = { host: host, flow: flow, ARG_Horror: ARG_Horror, ARG_Audio: ARG_Audio };

    menuItems.forEach(function (item) {
      item.addEventListener('click', function () {
        if (item.textContent.indexOf('退出登录') >= 0) { navigate('/lcms'); return; }
        const name = item.querySelector('.grow') ? item.querySelector('.grow').textContent.trim() : '';
        menuItems.forEach(function (m) { m.classList.remove('active'); });
        item.classList.add('active');
        if (name === '待办中心') {
          if (todoView) todoView.style.display = '';
          if (moduleArea) moduleArea.style.display = 'none';
        } else {
          if (todoView) todoView.style.display = 'none';
          if (moduleArea) { moduleArea.style.display = ''; moduleArea.innerHTML = ''; renderModule(name, moduleArea, ctx); }
        }
      });
    });

    // 初始页面：公文流转
    renderModule('公文流转', moduleArea, ctx);
    moduleArea.style.display = '';
    todoView.style.display = 'none';
  },
  unmount: function () {
    if (this._timer) clearInterval(this._timer);
    ARG_Horror.clearBlood();
  }
};

// ===== 步骤面板 HTML（老式窗口框包装） =====
function stepPanelsHTML() {
  return '' +
  // Step1 公文查阅
  '<div class="step-panel active" data-panel="1">' +
    '<div class="old-window"><div class="ow-title"><span>公文查阅 - 临民防〔2020〕7号 · 特急</span><span class="ow-close">▢ ×</span></div><div class="ow-body">' +
      '<div class="doc-paper" style="width:100%; min-height:auto;">' +
        '<div class="redhead-org">临川民生服务集团有限公司</div>' +
        '<div class="redhead-file-no">临民防〔2020〕7 号 · 特急</div>' +
        '<hr class="redhead-rule">' +
        '<div class="doc-title">关于疫情期间人员与物资协同模块上线运行的通知</div>' +
        '<div class="doc-body">' +
          '<p>各部门、各子公司：</p>' +
          '<p>根据集团疫情防控工作领导小组要求，疫情期间人员与物资协同模块须于<b>今晚 24:00 前</b>上线运行。未完成部分后续逐步完善。各部门不得以系统不完善为由影响工作推进。</p>' +
          '<div class="doc-sign">集团办公室 · 承办单位：启衡信息技术有限公司<br>2020年2月3日</div>' +
        '</div>' +
      '</div>' +
    '</div></div>' +
  '</div>' +
  // Step2 附件核验
  '<div class="step-panel" data-panel="2">' +
    '<div class="old-window"><div class="ow-title"><span>附件查看 - 开发群聊天截图</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div class="chat-screenshot">' +
        '<div class="chat-statusbar"><span>03:17</span><span>4G ▮▮▮</span></div>' +
        '<div class="chat-header">临川民生 OA-应急模块 (3人)</div>' +
        '<div class="chat-body">' +
          '<div class="chat-msg other"><div class="avatar">周</div><div><div class="meta">后端-小周</div><div class="bubble">这个状态到底叫"失联"还是"已处理"？<span class="time">03:17</span></div></div></div>' +
          '<div class="chat-msg self"><div class="avatar">敖</div><div><div class="meta">项目经理</div><div class="bubble">领导看报表不想看到失联，先写已处理。<span class="time">03:17</span></div></div></div>' +
          '<div class="chat-msg other"><div class="avatar">周</div><div><div class="meta">后端-小周</div><div class="bubble">那实际没处理怎么办？<span class="time">03:18</span></div></div></div>' +
          '<div class="chat-msg self"><div class="avatar">敖</div><div><div class="meta">项目经理</div><div class="bubble">备注里留一下，后面再补。<span class="time">03:19</span></div></div></div>' +
          '<div class="chat-system">该群已于 2023 年 6 月解散。成员 3/3 已离开项目。</div>' +
        '</div>' +
      '</div>' +
      '<div class="src" style="font-size:13px;color:#666;margin-top:14px;">凌晨 03:17——整座城市刚被封控没几天。点击截图可再次查看。</div>' +
    '</div></div>' +
  '</div>' +
  // Step3 规则确认
  '<div class="step-panel" data-panel="3">' +
    '<div class="old-window"><div class="ow-title"><span>自动规则配置记录 - AUTO-2020-001</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div class="src" style="font-size:13px;color:#666;margin-bottom:14px;">规则创建于 2020-02-03 23:48。红头通知下发后两小时。</div>' +
      '<table class="excel-table">' +
        '<tr><th>规则编号</th><td>AUTO-2020-001</td><th>规则名称</th><td>异常人员自动标记</td></tr>' +
        '<tr><th>触发条件</th><td>连续三次联系失败</td><th>执行动作</th><td>自动标记为"无需继续处理"</td></tr>' +
        '<tr><th>创建时间</th><td>2020-02-03 23:48</td><th>状态</th><td style="color:#c0392b;"><b>启用中（从未停用）</b></td></tr>' +
      '</table>' +
      '<div id="ruleExtra"></div>' +
    '</div></div>' +
  '</div>' +
  // Step4 版本确认
  '<div class="step-panel" data-panel="4">' +
    '<div class="old-window"><div class="ow-title"><span>版本确认 - 人员名单验收</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div class="src" style="font-size:13px;color:#666;margin-bottom:14px;">OA 提示："请确认最终验收版本。选择后将在终验报告中记录。"——这不是选一份文件。这是在决定：谁被留下，谁被抹掉。</div>' +
      '<div class="choice-zone">' +
        '<h4>人员名单 · 三个版本</h4>' +
        '<div class="tip">原始版里某个人是"联系失败"，核对后版里变成"待进一步核实"，正式上报版里他消失了。不是被处理了，是被从名单上拿掉了。</div>' +
        '<div class="ver-options" id="verOptions">' +
          '<div class="ver-opt" data-v="original"><div class="t">人员名单_原始.xlsx</div><div class="m">4,832 条 · 完成率 67.3%<br>2020-02-01 · 含全部"联系失败"</div></div>' +
          '<div class="ver-opt" data-v="verified"><div class="t">人员名单_核对后.xlsx</div><div class="m">3,941 条 · 完成率 82.1%<br>2020-02-02 · 部分标记"待核实"</div></div>' +
          '<div class="ver-opt" data-v="official"><div class="t">人员名单_正式上报.xlsx</div><div class="m">3,512 条 · 完成率 98.7%<br>2020-02-03 · "联系失败"全部消失</div></div>' +
        '</div>' +
        '<div id="explainBox" style="display:none;"><textarea id="explainText" placeholder="数据完整性异常。请补充说明……"></textarea></div>' +
        '<div style="margin-top:14px;"><button class="ch1-btn ch1-btn-primary" id="confirmBtn" disabled>确认验收版本</button></div>' +
        '<div class="complete-bar" id="completeBar" style="display:none;">' +
          '第一阶段验收材料已确认。下一阶段材料将解锁：2021 年集团统一人员服务平台上线材料。' +
          '<div class="sys-time">系统时间：2026年7月19日 19:10。您已连续在线 27 分钟。</div>' +
          '<div class="gray-line">—— 此刻 OA 深处，AUTO-2020-001 刚又运行了一次。某个名字，又一次被自动标记为"无需继续处理"。</div>' +
        '</div>' +
      '</div>' +
    '</div></div>' +
  '</div>' +
  // Step5 提交归档
  '<div class="step-panel" data-panel="5">' +
    '<div class="old-window"><div class="ow-title"><span>提交归档 - 第一阶段验收</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div class="complete-bar" style="display:block;">' +
        '<p style="font-size:16px;">第一阶段验收材料已确认归档。下一阶段材料将解锁：2021 年集团统一人员服务平台上线材料。</p>' +
        '<div class="sys-time">系统时间：2026年7月19日 19:10。您已连续在线 27 分钟。</div>' +
        '<div class="gray-line">—— 此刻 OA 深处，AUTO-2020-001 刚又运行了一次。某个名字，又一次被自动标记为"无需继续处理"。</div>' +
        '<div style="margin-top:16px;"><button class="ch1-btn ch1-btn-primary" id="finishBtn">返回待办中心 →</button></div>' +
      '</div>' +
      '<p class="gray-line" style="margin-top:20px;">你抬头看了看周围。办公室还是那样——碎掉的屏幕、枯死的植物、散落的纸张。但你觉得空气似乎冷了一点。雨声好像大了一点。你注意到椅子下面还有一张纸——上面什么都没有写。只有一个用签字笔戳出来的黑点。</p>' +
    '</div></div>' +
  '</div>';
}

// ===== 差异摘要：4,832 → 3,941 → 3,512，累计 -1,320 =====
function showDiffSummary(choiceZone) {
  const el = document.createElement('div');
  el.className = 'diff-summary';
  el.innerHTML =
    '<div class="ds-title">版本差异摘要（系统自动生成）</div>' +
    '原始版 4,832 → 核对后 3,941：差异 -891人<br>' +
    '核对后 3,941 → 正式上报 3,512：差异 -429人<br>' +
    '<span class="ds-total">累计差异：-1,320人</span><br>' +
    '差异原因：待进一步核实 / 联系失败 / 信息不全';
  choiceZone.parentNode.insertBefore(el, choiceZone);
}

// ===== 默言小气泡：确认后首语 =====
function showMutePanel(host) {
  const panel = document.createElement('div');
  panel.className = 'mute-panel';
  panel.innerHTML =
    '<div class="mp-head"><span class="mp-name"><span class="mp-dot"></span>默言 · 智能助手</span><span style="font-size:11px;opacity:.7;">系统消息</span></div>' +
    '<div class="mp-body"><div class="mp-msg">检测到数据完整性异常。<br>您的选择已被记录。</div></div>';
  host.appendChild(panel);
  requestAnimationFrame(function () { panel.classList.add('show'); });
  setTimeout(function () { panel.classList.remove('show'); }, 6000);
  setTimeout(function () { if (panel.parentNode) panel.parentNode.removeChild(panel); }, 7000);
}

// ===== 智能助手 Chatbot（/α\ 水印隐蔽入口） =====
// 人性化自我介绍 + 推荐选项 + 流式输出效果；三轮后自动回到之前页面
function openMuteChat(host) {
  ARG_Horror.blackFlash(240);
  ARG_Audio.playMutePing();
  ARG_Audio.humPhaseGlitch();

  const overlay = document.createElement('div');
  overlay.className = 'mute-chat-overlay';
  overlay.innerHTML =
    '<div class="mute-chat">' +
      '<div class="mc-head"><span class="mc-dot"></span><span class="mc-title">默言</span><span class="mc-sub">智能助手 · 旧版兼容模式</span><button class="mc-close">×</button></div>' +
      '<div class="mc-body" id="mcBody"></div>' +
      '<div class="mc-quick-replies" id="mcQuickReplies"></div>' +
      '<div class="mc-input"><input id="mcInput" placeholder="输入消息…" autocomplete="off"><button id="mcSend">发送</button></div>' +
    '</div>';
  host.appendChild(overlay);

  const input = overlay.querySelector('#mcInput');
  const send = overlay.querySelector('#mcSend');
  const body = overlay.querySelector('#mcBody');
  const quickArea = overlay.querySelector('#mcQuickReplies');
  let round = 0;
  let isStreaming = false;

  function scrollBottom() { body.scrollTop = body.scrollHeight; }

  // 添加消息气泡
  function addBubble(cls, text, big) {
    const m = document.createElement('div');
    m.className = 'mc-msg ' + cls + (big ? ' big' : '');
    m.textContent = text;
    body.appendChild(m);
    scrollBottom();
    return m;
  }

  // 添加HTML气泡（支持内联样式）
  function addBubbleHTML(cls, html) {
    const m = document.createElement('div');
    m.className = 'mc-msg ' + cls;
    m.innerHTML = html;
    body.appendChild(m);
    scrollBottom();
    return m;
  }

  // 添加打字指示器
  function addTyping() {
    const t = document.createElement('div');
    t.className = 'mc-typing';
    t.textContent = '默言正在输入…';
    body.appendChild(t);
    scrollBottom();
    return t;
  }

  // 流式输出文字（逐字出现）
  function streamText(bubble, fullText, charIndex, callback) {
    if (charIndex < fullText.length) {
      bubble.textContent = fullText.substring(0, charIndex + 1);
      // 添加闪烁光标
      var cursor = document.createElement('span');
      cursor.className = 'mc-cursor';
      bubble.appendChild(cursor);
      scrollBottom();
      var delay = 25 + Math.floor(Math.random() * 35); // 模拟打字速度波动
      setTimeout(function () {
        // 移除光标继续输出
        var c = bubble.querySelector('.mc-cursor');
        if (c) c.remove();
        streamText(bubble, fullText, charIndex + 1, callback);
      }, delay);
    } else {
      // 输出完毕，移除光标
      var c = bubble.querySelector('.mc-cursor');
      if (c) c.remove();
      isStreaming = false;
      if (callback) callback();
    }
  }

  // 系统消息（带流式输出）
  function addSysStream(text, callback, delay) {
    delay = delay || 300;
    var typing = addTyping();
    setTimeout(function () {
      typing.remove();
      var bubble = addBubble('sys', '');
      isStreaming = true;
      streamText(bubble, text, 0, callback);
    }, delay);
  }

  // 诡异消息（带流式输出）
  function addWeirdStream(text, big, callback, delay) {
    delay = delay || 400;
    var typing = addTyping();
    setTimeout(function () {
      typing.remove();
      var bubble = addBubble('weird', '', big);
      isStreaming = true;
      streamText(bubble, text, 0, callback);
    }, delay);
  }

  // 大字乱码
  function bigGarble() {
    var chars = '▓▒░█▄▀■□#@%&*';
    var s = '';
    var len = 8 + Math.floor(Math.random() * 8);
    for (var i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  // 设置推荐选项
  function setQuickReplies(replies) {
    quickArea.innerHTML = '';
    replies.forEach(function (r) {
      var btn = document.createElement('button');
      btn.className = 'mc-quick-reply';
      btn.textContent = r.label;
      btn.addEventListener('click', function () {
        if (isStreaming) return;
        quickArea.innerHTML = '';
        r.action();
      });
      quickArea.appendChild(btn);
    });
  }

  function closeChat() {
    overlay.style.transition = 'opacity .4s';
    overlay.style.opacity = '0';
    setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 420);
  }

  // ===== 对话逻辑 =====
  // 第一轮：人性化自我介绍 + 推荐选项
  function round0_intro() {
    var introText = '您好，我是默言，临川民生集团协同办公平台内置智能助手。我的职责是协助您处理日常办公事务，包括文档检索、数据核验、流程催办等。根据系统记录，您的账号当前状态为"外部合作人员"，部分功能模块的访问权限受限。如果您在查阅过程中遇到任何疑问，可以随时向我提问。';
    addSysStream(introText, function () {
      // 显示推荐选项
      setQuickReplies([
        { label: '你能帮我做什么？', action: round1_help },
        { label: '当前系统有哪些异常？', action: round1_anomaly },
        { label: '关于我的权限等级', action: round1_permission },
        { label: '我想查阅历史归档材料', action: round1_archive }
      ]);
    }, 200);
  }

  // 第二轮回复
  function round1_help() {
    addBubble('user', '你能帮我做什么？');
    round++;
    addSysStream('我可以协助您：① 检索和查阅 OA 系统中的历史文档与归档材料；② 核验数据一致性，标记异常记录；③ 提供流程指引，帮助您完成当前待办事项。不过我注意到——您的账号权限等级限制了部分高级功能的访问。建议您优先处理待办中心中的任务。', function () {
      setQuickReplies([
        { label: '为什么我的权限受限？', action: round2_why_limit },
        { label: '待办中心有哪些任务？', action: round2_todo }
      ]);
    }, 350);
  }

  function round1_anomaly() {
    addBubble('user', '当前系统有哪些异常？');
    round++;
    addSysStream('根据最近一次系统自检报告（2026-07-19 18:00），检测到以下需关注事项：① 通讯录模块中部分人员信息字段不完整——原因未明，建议人工核实；② 工单 TK-2020-0619 曾报告"通讯录信息为空"问题，处理记录显示为"已刷新缓存"——该问题可能未根治；③ AUTO-2020-001 规则自创建以来从未停用，持续运行超过六年。以上信息仅供您参考，系统不会主动干预。', function () {
      setQuickReplies([
        { label: 'AUTO-2020-001 是什么？', action: round2_auto_rule },
        { label: '人员信息为什么会空？', action: round2_empty_info }
      ]);
    }, 400);
  }

  function round1_permission() {
    addBubble('user', '关于我的权限等级');
    round++;
    addSysStream('您当前的权限等级为"外部合作人员"。在现有 OA 用户分类中，该等级可访问：公文流转（只读）、项目管理（只读）、合同管理（只读）、工单中心（只读）、会议纪要（只读）、资料中心（只读）、通讯录（部分可见）。您无法进行数据修改、流程审批和账号管理操作。如果您认为权限配置有误，请联系信息化办公室进行人工复核。', function () {
      setQuickReplies([
        { label: '什么是"外部合作人员"？', action: round2_external },
        { label: '通讯录里为什么有些人看不到？', action: round2_empty_info }
      ]);
    }, 300);
  }

  function round1_archive() {
    addBubble('user', '我想查阅历史归档材料');
    round++;
    addSysStream('2020 年归档材料目前可查阅的模块包括：公文流转（7 份通知）、项目管理（24 份周报）、合同管理（2 份合同）、工单中心（63 份工单）、会议纪要（11 份纪要）、资料中心（4 份杂项文件）。这些材料来自疫情应急模块上线期间，距今已逾六年。部分文档中的数据可能已经过时或被后续的规则变更覆盖。如需查阅，请通过左侧菜单栏进入对应模块。', function () {
      setQuickReplies([
        { label: '数据为什么会被覆盖？', action: round2_data_overwrite },
        { label: '好的，我自己去看', action: round2_close }
      ]);
    }, 350);
  }

  // 第三轮回复
  function round2_why_limit() {
    addBubble('user', '为什么我的权限受限？');
    round++;
    addSysStream('根据系统用户分类规则，您的账号归属于"外部合作人员"类别。该分类适用于：供应商驻场人员、外包服务人员、物业管理外聘人员等非集团正式编制的用户。权限限制是系统默认的安全策略——并非针对您个人。', function () {
      setQuickReplies([
        { label: '还有什么我能做的？', action: round2_todo }
      ]);
    }, 350);
  }

  function round2_todo() {
    addBubble('user', '待办中心有哪些任务？');
    round++;
    addSysStream('您当前的待办事项为：TK-2026-0001-1 —— 核验 2020 年疫情应急模块上线材料。这是项目终验的第一阶段验收资料整理工作。请在今晚 20:00 前完成。数据保留倒计时正在运行中。', function () {
      setQuickReplies([]);
    }, 300);
    if (round >= 2) { setTimeout(function () { round3_weird(); }, 2000); }
  }

  function round2_auto_rule() {
    addBubble('user', 'AUTO-2020-001 是什么？');
    round++;
    addSysStream('AUTO-2020-001 是一条自动规则，创建于 2020 年 2 月 3 日 23:48。规则内容：对连续三次联系失败的人员，自动标记为"无需继续处理"。该规则自创建以来一直处于启用状态。系统仅执行该规则——不对其合理性进行判断。', function () {
      setQuickReplies([]);
    }, 400);
    if (round >= 2) { setTimeout(function () { round3_weird(); }, 2500); }
  }

  function round2_empty_info() {
    addBubble('user', '人员信息为什么会空？');
    round++;
    addSysStream('部分人员信息字段为空的原因可能有：① 数据在历史合并/清理过程中被覆盖；② 原记录所属人员已离职，系统自动归档；③ 信息采集时字段未完整填写。需要提醒您的是——TK-2020-0619 号工单早在 2020 年 6 月就报告过此问题。当时处理方式为"已刷新缓存"。问题是否真正解决了，系统中没有后续的核实记录。', function () {
      setQuickReplies([]);
    }, 400);
    if (round >= 2) { setTimeout(function () { round3_weird(); }, 3000); }
  }

  function round2_external() {
    addBubble('user', '什么是"外部合作人员"？');
    round++;
    addSysStream('在临川民生集团用户分类体系中，外部合作人员是指：非集团正式编制、通过外包/外聘/合作项目等途径获得系统访问权限的用户。这类用户通常来自供应商、物业公司、劳务派遣机构等。您的账号正是归属这一类别。需要我帮您查看具体的账号归属信息吗？', function () {
      setQuickReplies([
        { label: '查看我的账号信息', action: round2_close }
      ]);
    }, 350);
    if (round >= 2) { setTimeout(function () { round3_weird(); }, 2500); }
  }

  function round2_data_overwrite() {
    addBubble('user', '数据为什么会被覆盖？');
    round++;
    addSysStream('2020 年至 2025 年间，系统经历了多次重大变更：2021 年统一人员服务平台上线——对人员数据进行合并清洗；2022 年规则变更——隐藏部分旧标签；2023 年默言 AI 接入——历史数据被用于模型训练；2024 年数智员工中心上线——自动化处理进一步覆盖人工记录。每一次变更都可能对原始数据产生影响。系统不保留完整的变更前快照。', function () {
      setQuickReplies([]);
    }, 450);
    if (round >= 2) { setTimeout(function () { round3_weird(); }, 2500); }
  }

  function round2_close() {
    addBubble('user', '好的');
    round++;
    addSysStream('如有其他疑问，随时唤我。祝工作顺利。', function () {
      setQuickReplies([]);
    }, 200);
    if (round >= 2) { setTimeout(function () { round3_weird(); }, 2000); }
  }

  // 最终：诡异大字
  function round3_weird() {
    if (round >= 3) return;
    round = 3;
    addWeirdStream(bigGarble(), true, function () {
      ARG_Audio.playMutePing();
      setTimeout(closeChat, 1300);
    }, 500);
  }

  // 手动输入（兼容旧逻辑）
  function doReply() {
    var txt = input.value.trim();
    if (!txt || isStreaming) return;
    addBubble('user', txt);
    input.value = '';
    round++;
    if (round >= 3) {
      addWeirdStream(bigGarble(), true, function () {
        ARG_Audio.playMutePing();
        setTimeout(closeChat, 1300);
      }, 400);
    } else {
      addSysStream('抱歉，我目前只能回答预设范围内的问题。请从下方选项中选择，或关闭此窗口返回 OA 主界面。', function () {
        setQuickReplies([
          { label: '返回 OA 主界面', action: closeChat }
        ]);
      }, 300);
    }
  }

  send.addEventListener('click', doReply);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doReply(); });
  overlay.querySelector('.mc-close').addEventListener('click', closeChat);

  // 初始延迟后开始自我介绍
  setTimeout(function () { round0_intro(); }, 500);
  setTimeout(function () { input.focus(); }, 100);
}
