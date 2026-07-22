// 第二章《一个人只能有一个编号》主视图
// 2021 年统一人员服务平台 · 通讯录搜索谜题 · Jump scare（黑闪+灯闪+文字模糊）
import { flow, navigate } from '../router.js';
import { ARG_Horror } from '../horror/horror.js';
import { ARG_Audio } from '../audio/audio.js';
import { renderModule2 } from './chapter2Data.js';

// 第二章样式（复用第一章老味 OA 风格 + 通讯录谜题 + 模糊特效）
const CH2_CSS = `
.view-ch2 { color:#1a1a1a; font-family:"SimSun","宋体",serif; font-size:15px; background:#5a5a5a; }
.ch2-oa { max-width:1080px; margin:0 auto; min-height:100vh; display:flex; flex-direction:column; background:#d4d0c8; box-shadow:0 0 30px rgba(0,0,0,.45); }

.ch2-topbar { background:linear-gradient(#4a6a9a,#2b3a55); color:#fff; padding:9px 20px; display:flex; align-items:center; gap:16px; font-size:15px; border-bottom:2px solid #1a2740; }
.ch2-topbar .platform-name { font-weight:bold; font-size:17px; letter-spacing:1px; }
.ch2-topbar .platform-name small { font-size:12px; font-weight:normal; opacity:.7; margin-left:6px; }
.ch2-topbar .user { margin-left:auto; }
.ch2-topbar .time { font-family:"Consolas",monospace; font-size:13px; opacity:.85; margin-left:12px; }
.ch2-topbar .cd { color:#ffd0d0; font-size:13px; margin-left:14px; font-family:"Consolas",monospace; }

.ch2-banner { background:linear-gradient(#e8f0ff,#d4e4ff); color:#1a3a6a; border-bottom:2px solid #1a56db; padding:8px 20px; font-size:14px; text-align:center; letter-spacing:2px; }
.ch2-perm-bar { background:#f0f0f0; color:#666; padding:6px 20px; font-size:13px; border-bottom:1px solid #d0d0d0; text-align:right; letter-spacing:1px; }

.plot-red { color:#c0392b; font-weight:bold; }
.plot-red-light { color:#c0392b; }
.highlight-yellow { background:#fff3cd; padding:1px 6px; }

.ch2-shell { flex:1; display:flex; min-height:0; }
.ch2-sidebar { width:196px; background:#ececec; border-right:1px solid #b0aca0; padding:8px 0; font-size:15px; flex:none; }
.ch2-menu-item { padding:11px 20px; cursor:pointer; border-left:3px solid transparent; color:#1a1a1a; display:flex; align-items:center; }
.ch2-menu-item:hover { background:#d4d0c8; }
.ch2-menu-item.active { background:linear-gradient(#fff,#e8e8e8); border-left-color:#1a56db; color:#1a56db; font-weight:bold; }
.ch2-menu-item .grow { flex:1; }
.ch2-menu-item .badge-count { background:#c0392b; color:#fff; font-size:12px; padding:1px 7px; border-radius:2px; font-family:"Consolas",monospace; }
.ch2-menu-divider { height:1px; background:#b0aca0; margin:6px 12px; }

.ch2-content { flex:1; background:#fff; padding:22px 30px 40px; overflow:auto; transition:filter .3s ease; }
.ch2-content.blurred { filter:blur(1px); }
.ch2-page-head { display:flex; justify-content:space-between; align-items:baseline; border-bottom:2px solid #1a56db; padding-bottom:10px; margin-bottom:20px; }
.ch2-page-title { font-size:18px; font-weight:bold; color:#1a2740; }
.ch2-page-sub { font-size:13px; color:#999; }

.ch2-flow { display:flex; margin-bottom:24px; border:1px solid #b0aca0; background:#ececec; }
.ch2-flow .step { flex:1; padding:11px 6px; text-align:center; font-size:14px; border-right:1px solid #b0aca0; color:#777; }
.ch2-flow .step:last-child { border-right:none; }
.ch2-flow .step .s-num { display:inline-block; width:20px; height:20px; line-height:20px; border-radius:50%; background:#b0aca0; color:#fff; font-size:12px; margin-right:6px; font-family:"Consolas",monospace; }
.ch2-flow .step.done { color:#1a56db; }
.ch2-flow .step.done .s-num { background:#1a56db; }
.ch2-flow .step.active { background:linear-gradient(#fff,#f0f0f0); color:#1a56db; font-weight:bold; }
.ch2-flow .step.active .s-num { background:#1a56db; }

.step-panel { display:none; }
.step-panel.active { display:block; }
.ch2-pager { margin-top:26px; padding-top:18px; border-top:1px solid #e0e0e0; display:flex; justify-content:space-between; }

.ch2-btn { font-family:"SimSun",serif; font-size:15px; padding:8px 26px; background:linear-gradient(#fafafa,#d4d0c8); border:1px solid #888; border-style:outset; color:#1a1a1a; cursor:pointer; }
.ch2-btn:hover { background:linear-gradient(#fff,#e0dcd0); }
.ch2-btn:active { border-style:inset; }
.ch2-btn:disabled { color:#999; cursor:not-allowed; background:#e8e8e8; }
.ch2-btn-primary { background:linear-gradient(#2a6adf,#1a56db); color:#fff; border-color:#1040a0; }
.ch2-btn-primary:hover { background:linear-gradient(#3573e8,#235fd6); }
.ch2-btn-primary:disabled { background:linear-gradient(#9aa8c8,#7a8aa8); border-color:#7a8aa8; }

.old-window { border:1px solid #888; background:#fff; box-shadow:2px 2px 6px rgba(0,0,0,.22); margin-bottom:18px; }
.old-window .ow-title { background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; padding:7px 12px; font-size:14px; font-weight:bold; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #2b3a55; }
.old-window .ow-title .ow-close { font-size:16px; opacity:.8; cursor:default; }
.old-window .ow-body { padding:0; }

.view-ch2 .doc-pane h3 { font-size:17px; margin:0 0 6px; color:#1a2740; border-left:4px solid #1a56db; padding-left:12px; }
.view-ch2 .doc-pane .src { font-size:13px; color:#666; margin-bottom:10px; }
.view-ch2 .doc-paper { color:#1a1a1a; padding:24px 28px; box-shadow:none; border:none; }
.view-ch2 .doc-body p { font-size:16px; line-height:2.1; }
.view-ch2 .chat-screenshot { width:440px; box-shadow:none; border:none; margin:0; }
.view-ch2 .chat-msg .bubble { font-size:15px; }

.view-ch2 .excel-table { font-size:14px; border-collapse:collapse; width:100%; }
.view-ch2 .excel-table th { background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; border:1px solid #2b3a55; padding:9px 18px; font-weight:600; }
.view-ch2 .excel-table td { border:1px solid #b0aca0; padding:9px 18px; }

/* 工单详情（老式窗口） */
.wo-detail { border:1px solid #888; background:#fff; margin-bottom:14px; }
.wo-detail .wo-head { background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; padding:7px 12px; font-size:14px; font-weight:bold; display:flex; justify-content:space-between; }
.wo-detail .wo-body { padding:0; }
.wo-detail table { width:100%; border-collapse:collapse; font-size:14px; }
.wo-detail th, .wo-detail td { border:1px solid #d0d0d0; padding:8px 12px; text-align:left; }
.wo-detail th { background:#f0f0f0; width:90px; font-weight:600; color:#555; }
.wo-detail .result-line { color:#52c41a; font-weight:600; }
.wo-detail .mute-annotation { background:#1a2a40; color:#8ab4f8; border:1px solid #2a4060; padding:8px 12px; font-size:13px; }

/* 通讯录谜题 */
.contact-puzzle { border:1px solid #b0aca0; background:#fff; padding:18px 20px; margin-top:8px; }
.contact-search { display:flex; align-items:center; gap:10px; margin-bottom:12px; font-size:14px; }
.contact-search input { flex:1; padding:7px 12px; border:1px solid #b0aca0; font-family:"SimSun",serif; font-size:14px; }
.contact-search .result-count { font-size:13px; color:#666; white-space:nowrap; }
.contact-search .refresh-btn { font-size:12px; padding:4px 14px; }
.contact-list { list-style:none; padding:0; margin:0; }
.contact-list li { display:flex; gap:14px; padding:10px 14px; border:1px solid #e0e0e0; margin-bottom:6px; align-items:center; }
.contact-list li .c-name { width:80px; font-weight:600; }
.contact-list li .c-dept { flex:1; color:#666; }
.contact-list li .c-status { color:#999; font-size:13px; }
.contact-list li.merging { transition:opacity 3s ease-in, filter 3s ease-in, transform 3s ease-in; }
.contact-list li.merged-out { opacity:0; filter:blur(2px); transform:translateX(20px) scale(0.95); }
.contact-tip { font-size:13px; color:#c0392b; margin-top:10px; display:none; }

/* 验收门控卡片 */
.verify-card { border:1px solid #d0d0d0; background:#fafafa; padding:14px 18px; transition:all .3s; }
.verify-card.done { border-color:#b7eb8f; background:#f6ffed; }
.verify-card .vc-head { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
.verify-card .vc-check { display:inline-block; width:20px; height:20px; line-height:20px; text-align:center; border:1px solid #ccc; border-radius:50%; font-size:13px; color:#999; }
.verify-card .vc-title { font-weight:bold; font-size:15px; color:#1a2740; flex:1; }
.verify-card .vc-status { font-size:13px; color:#999; }
.verify-card .vc-desc { font-size:13px; color:#666; line-height:1.8; padding-left:30px; }

.complete-bar { display:none; margin-top:18px; padding:14px 18px; background:#f2f6ff; border:1px solid #cfdcf7; font-size:14px; line-height:2; }
.complete-bar .sys-time { font-family:"Consolas",monospace; font-size:13px; color:#666; margin-top:8px; }
.complete-bar .gray-line { font-size:13px; color:#888; font-style:italic; margin-top:8px; }
.gray-line { font-size:13px; color:#888; font-style:italic; margin-top:8px; }

/* footer + /α\\ 水印 */
.ch2-footer { background:linear-gradient(#4a6a9a,#2b3a55); color:#8a96a8; padding:9px 20px; font-size:12px; display:flex; justify-content:space-between; align-items:center; }
.ch2-footer .apocalypic-logo { cursor:pointer; font-family:serif; transition:opacity .3s; user-select:none; }
.ch2-footer .apocalypic-logo .alpha { color:#6a3a3a; }
.ch2-footer .apocalypic-logo:hover { opacity:.85; }
.ch2-footer .apocalypic-logo.glow { animation:alphaGlow2 2.2s ease-in-out infinite; }
@keyframes alphaGlow2 { 0%,100%{opacity:.5;} 50%{opacity:1;} }

/* 差异 / 独白 */
.fx-ascii-line { font-family:"Consolas",monospace; color:#c0392b; letter-spacing:1px; white-space:pre; margin:10px 0; font-size:14px; }
.fx-monologue { font-style:italic; color:#8a9098; font-size:14px; margin:14px 0 6px; padding-left:12px; border-left:2px solid rgba(0,0,0,.1); opacity:0; transition:opacity .7s ease; }
.fx-monologue.show { opacity:1; }

/* 灯闪由 horror.js 全局注入 .fx-lamp 类，此处不再重复定义 */

/* 默言小气泡 */
.mute-panel { position:fixed; right:24px; bottom:80px; width:360px; background:#fff; border:1px solid #b0aca0; box-shadow:0 8px 30px rgba(0,0,0,.18); z-index:200; opacity:0; transform:translateY(8px); transition:opacity .3s, transform .3s; }
.mute-panel.show { opacity:1; transform:translateY(0); }
.mute-panel .mp-head { padding:11px 16px; background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; font-size:14px; display:flex; justify-content:space-between; align-items:center; }
.mute-panel .mp-head .mp-name { display:flex; align-items:center; gap:8px; }
.mute-panel .mp-head .mp-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; }
.mute-panel .mp-body { padding:16px; font-size:15px; line-height:1.9; color:#1a2740; }
.mute-panel .mp-body .mp-msg { background:#f2f6ff; padding:12px 14px; border-left:3px solid #1a56db; }

/* 模块列表 */
#ch2ModuleArea .mod-list { width:100%; border-collapse:collapse; font-size:15px; background:#fff; }
#ch2ModuleArea .mod-list th { border:1px solid #2b3a55; padding:11px 12px; text-align:left; background:linear-gradient(#4a6a9a,#3a5a8a); color:#fff; font-weight:600; }
#ch2ModuleArea .mod-list td { border:1px solid #b0aca0; padding:11px 12px; text-align:left; }
#ch2ModuleArea .mod-list tbody tr { cursor:pointer; }
#ch2ModuleArea .mod-list tbody tr:hover { background:#fafafa; }
#ch2ModuleArea .mod-list tbody tr.is-open { background:#f2f6ff; }
#ch2ModuleArea .mod-list tbody tr.expand-row td { animation:expandIn .25s ease; }
@keyframes expandIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
#ch2ModuleArea .mod-detail { margin:12px 0 20px; padding:16px 18px; background:#fafafa; border:1px solid #d0d0d0; border-left:4px solid #1a56db; font-size:15px; line-height:2; }
#ch2ModuleArea .mod-detail .src { font-size:13px; color:#888; margin-bottom:8px; }
#ch2ModuleArea .mod-empty { padding:50px; text-align:center; color:#777; font-size:15px; }
#ch2ModuleArea .ch2-page-head { margin-bottom:18px; }

/* 智能助手 Chatbot 全屏覆盖（复用 ch1 样式） */
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
.mc-quick-replies { display:flex; flex-wrap:wrap; gap:8px; padding:8px 14px; }
.mc-quick-reply { font-size:13px; padding:6px 14px; background:#1a2a40; color:#8ab4f8; border:1px solid #2a4060; border-radius:14px; cursor:pointer; transition:all .2s; }
.mc-quick-reply:hover { background:#233a5a; color:#cfe0ff; border-color:#1a56db; }
.mc-cursor { display:inline-block; width:2px; height:15px; background:#4ade80; margin-left:2px; animation:cursorBlink2 .8s step-end infinite; vertical-align:text-bottom; }
@keyframes cursorBlink2 { 0%,100%{opacity:1;} 50%{opacity:0;} }
`;

export default {
  mount: function (container) {
    flow.step = 'ch2';
    ARG_Horror.setIntensity('ch2');

    container.innerHTML =
      '<div class="view-ch2"><style>' + CH2_CSS + '</style>' +
      '<div class="ch2-oa">' +
        '<div class="ch2-topbar">' +
          '<svg width="28" height="28" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#fff"/><circle cx="60" cy="60" r="48" fill="#1a56db"/><path d="M30,62 Q60,34 90,62" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M32,72 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><path d="M39,82 q7,-6 14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"/></svg>' +
          '<span class="platform-name">临川民生集团协同办公平台<small>旧版 v2.4 · IE6 兼容模式</small></span>' +
          '<span class="user">敖曼</span>' +
          '<span class="time">2026年7月19日 19:10</span>' +
          '<span class="cd" id="ch2Cd">数据保留倒计时 00:16:42</span>' +
        '</div>' +
        '<div class="ch2-banner">数字化转型 高质量发展</div>' +
        '<div class="ch2-perm-bar">当前权限可阅览，权限等级：外部合作人员</div>' +
        '<div class="ch2-shell">' +
          '<nav class="ch2-sidebar">' +
            '<div class="ch2-menu-item active"><span class="grow">公文流转</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">项目管理</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">合同管理</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">工单中心</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">人事管理</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">通讯录</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">会议纪要</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">资料中心</span></div>' +
            '<div class="ch2-menu-item"><span class="grow">待办中心</span><span class="badge-count">6</span></div>' +
            '<div class="ch2-menu-divider"></div>' +
            '<div class="ch2-menu-item"><span class="grow">退出登录</span></div>' +
          '</nav>' +
          '<main class="ch2-content" id="ch2Content">' +
            '<div id="ch2TodoView" style="display:none;">' +
              '<div class="ch2-page-head"><span class="ch2-page-title">TK-2026-0001-2｜核验 2021 年集团统一人员服务平台上线材料</span><span class="ch2-page-sub">审批流程 · 共 5 步</span></div>' +
              '<div class="ch2-flow" id="ch2Flow">' +
                '<div class="step active" data-step="1"><span class="s-num">1</span>变更查阅</div>' +
                '<div class="step" data-step="2"><span class="s-num">2</span>附件核验</div>' +
                '<div class="step" data-step="3"><span class="s-num">3</span>规则确认</div>' +
                '<div class="step" data-step="4"><span class="s-num">4</span>工单核验</div>' +
                '<div class="step" data-step="5"><span class="s-num">5</span>提交归档</div>' +
              '</div>' +
              '<div id="ch2StepArea">' + stepPanelsHTML() + '</div>' +
              '<div class="ch2-pager"><button class="ch2-btn" id="prevBtn2" disabled>上一步</button><button class="ch2-btn ch2-btn-primary" id="nextBtn2">下一步 →</button></div>' +
            '</div>' +
            '<div id="ch2ModuleArea"></div>' +
          '</main>' +
        '</div>' +
        '<div class="ch2-footer"><span>临川民生服务集团有限公司 · 旧版平台（2019）</span><span class="apocalypic-logo" id="alphaSigil2">Powered by Cthu / Apocalypic /<span class="alpha">α</span>\\</span></div>' +
      '</div></div>';

    const host = container.querySelector('.view-ch2');

    // ===== 主线状态 =====
    let currentStep = 1;
    let puzzleSolved = !!(flow.choices && flow.choices.ch2_contactsMerged);
    let screenshotMutated = !!(flow.choices && flow.choices.ch2_screenshotMutated);
    function allTasksDone() { return puzzleSolved && screenshotMutated; }

    // ===== 顶栏倒计时 =====
    const cd = host.querySelector('#ch2Cd');
    let total = 16 * 60 + 42;
    const timer = setInterval(function () {
      if (total <= 0) { clearInterval(timer); if (cd) cd.textContent = '数据保留倒计时 00:00:00'; return; }
      total--;
      const m = String(Math.floor(total / 60)).padStart(2, '0');
      const s = String(total % 60).padStart(2, '0');
      if (cd) cd.textContent = '数据保留倒计时 00:' + m + ':' + s;
    }, 1000);
    this._timer = timer;

    // ===== 步骤切换 =====
    const flow_ = host.querySelector('#ch2Flow');
    const prevBtn = host.querySelector('#prevBtn2');
    const nextBtn = host.querySelector('#nextBtn2');
    const panels = host.querySelectorAll('.step-panel');
    const sigil = host.querySelector('#alphaSigil2');

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
      else { nextBtn.style.display = ''; nextBtn.disabled = (n === 4 && !allTasksDone()); }
      if (n === 3) triggerRuleReading();
      if (n === 4) updateVerifyCards();
    }

    prevBtn.addEventListener('click', function () { gotoStep(currentStep - 1); });
    nextBtn.addEventListener('click', function () {
      if (currentStep === 4 && !allTasksDone()) return;
      if (currentStep < 5) gotoStep(currentStep + 1);
    });

    // ===== Step2: 群聊"算系统的吧"高亮 =====
    // (静态 HTML 已包含高亮，无需额外交互)

    // ===== Step3: 合并规则细读触发 =====
    function triggerRuleReading() {
      const ruleExtra = host.querySelector('#ruleExtra2');
      if (!ruleExtra || ruleExtra.dataset.shown) return;
      ruleExtra.dataset.shown = '1';
      ruleExtra.innerHTML =
        '<div class="fx-monologue">什么叫"无法确认"？什么叫"可信度最高"？</div>';
      ruleExtra.querySelectorAll('.fx-monologue').forEach(function (m) { requestAnimationFrame(function () { m.classList.add('show'); }); });
    }

    // ===== Step4: 验收门控状态更新 =====
    function updateVerifyCards() {
      const vcTickets = host.querySelector('#verifyTickets');
      const vcContacts = host.querySelector('#verifyContacts');
      const vcPersonnel = host.querySelector('#verifyPersonnel');
      const completeBar = host.querySelector('#ch2CompleteBar');

      function markDone(card) {
        if (!card) return;
        const check = card.querySelector('.vc-check');
        const status = card.querySelector('.vc-status');
        if (check) { check.textContent = '\u221A'; check.style.color = '#52c41a'; }
        if (status) { status.textContent = '已完成'; status.style.color = '#52c41a'; }
        card.classList.add('done');
      }

      if (screenshotMutated && vcTickets) markDone(vcTickets);
      if (puzzleSolved && vcContacts) markDone(vcContacts);
      if (flow.choices && flow.choices.ch2_personnelViewed && vcPersonnel) markDone(vcPersonnel);

      if (allTasksDone()) {
        if (completeBar) completeBar.style.display = 'block';
        nextBtn.disabled = false;
        if (sigil) sigil.classList.add('glow');
      }
    }

    // ===== 提交归档（step5）返回待办中心 =====
    const finishBtn = host.querySelector('#finishBtn2');
    if (finishBtn) {
      finishBtn.addEventListener('click', function () {
        flow.ch2Completed = true;
        navigate('/lcms/oa');
      });
    }

    // ===== 初始化 =====
    gotoStep(1);
    updateVerifyCards();

    // ===== 智能助手隐蔽入口：/α\ 水印 =====
    if (sigil) {
      sigil.addEventListener('click', function () { openMuteChat2(host); });
    }

    // ===== 侧边模块切换 =====
    const menuItems = host.querySelectorAll('.ch2-menu-item');
    const todoView = host.querySelector('#ch2TodoView');
    const moduleArea = host.querySelector('#ch2ModuleArea');
    const ctx = {
      host: host, flow: flow, ARG_Horror: ARG_Horror, ARG_Audio: ARG_Audio,
      onPuzzleSolved: function () { puzzleSolved = true; updateVerifyCards(); },
      onScreenshotMutated: function () { screenshotMutated = true; updateVerifyCards(); }
    };

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
          if (moduleArea) { moduleArea.style.display = ''; moduleArea.innerHTML = ''; renderModule2(name, moduleArea, ctx); }
          if (name === '人事管理') { flow.choices.ch2_personnelViewed = true; updateVerifyCards(); }
        }
      });
    });

    // 初始页面：公文流转模块
    renderModule2('公文流转', moduleArea, ctx);
    moduleArea.style.display = '';
    todoView.style.display = 'none';
  },
  unmount: function () {
    if (this._timer) clearInterval(this._timer);
    ARG_Horror.clearBlood();
  }
};

// ===== 步骤面板 HTML =====
function stepPanelsHTML() {
  return '' +
  // Step1 变更查阅
  '<div class="step-panel active" data-panel="1">' +
    '<div class="old-window"><div class="ow-title"><span>项目变更记录 - CHG-2021-003</span><span class="ow-close">▢ ×</span></div><div class="ow-body">' +
      '<div class="doc-paper" style="width:100%; min-height:auto;">' +
        '<div style="font-family:Consolas,monospace;font-size:13px;line-height:1.9;background:#f8f8f8;padding:16px 20px;border:1px solid #ddd;">' +
          '变更编号：CHG-2021-003<br>' +
          '变更日期：2021 年 4 月 15 日<br>' +
          '变更内容：将原"疫情期间人员与物资协同模块"扩展为<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "集团统一人员服务平台"<br>' +
          '新增需求：<br>' +
          '&nbsp;&nbsp;- 合并正式员工、劳务派遣、临时工、外包人员、<br>' +
          '&nbsp;&nbsp;&nbsp;&nbsp;供应商人员、社区志愿者、配送司机的人员数据<br>' +
          '&nbsp;&nbsp;- 建立统一人员档案<br>' +
          '&nbsp;&nbsp;- 实现跨部门人员信息查询' +
        '</div>' +
        '<div style="margin-top:14px;padding:12px 16px;background:#fff8d0;border:1px solid #f0d8b0;font-size:14px;line-height:1.9;">' +
          '附件：《关于启动统一身份认证与人员数据中台建设的通知》（2021.03.15）<br>' +
          '引用"十四五"数字经济规划——"打破信息孤岛，实现一人一档"。' +
        '</div>' +
      '</div>' +
    '</div></div>' +
  '</div>' +
  // Step2 附件核验 - 群聊"算系统的吧" + 填八次舆情
  '<div class="step-panel" data-panel="2">' +
    '<div class="old-window"><div class="ow-title"><span>附件核验 - 项目群聊天记录</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div class="doc-paper" style="width:100%;min-height:auto;padding:18px 22px;font-family:var(--font-oa);font-size:14px;">' +
        '<div style="line-height:2.2;">' +
          '<b>甲方-信息化办（张国庆）</b> 14:22：再加六类人员，志愿者、配送、外包、供应商全并进来。<br>' +
          '<b>项目经理（敖曼）</b> 14:25：类型太多，字段对不齐，用精确匹配会丢人。<br>' +
          '<b>甲方-信息化办（张国庆）</b> 14:27：那就模糊匹配，差不多就行。<br>' +
          '<b>后端-小周（周伟）</b> 14:31：匹配错了算谁的？<br>' +
          '<b>甲方-信息化办（张国庆）</b> 14:32：<span class="highlight-yellow">算系统的吧，系统判的我们认。</span>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:18px;border-top:1px solid #e0e0e0;padding-top:14px;">' +
        '<div class="src" style="font-size:13px;color:#666;margin-bottom:8px;">舆情剪报 · 《临川晚报》2021年11月8日</div>' +
        '<div style="border-left:3px solid #c0392b;padding:10px 16px;background:#fff5f5;font-size:14px;line-height:1.9;">' +
          '<b>基层吐槽：一个人的信息要填八次</b><br>' +
          '记者调查发现，同一名社区工作人员的基础信息，在多个系统中需重复录入八次，格式各异、互不相通。<br>' +
          '市民呼吁"别让我们被系统折腾"。<br>' +
          '<span style="font-size:12px;color:#c0392b;margin-top:6px;display:block;">↓ 红色批注（张国庆，信息化办）："加快推进统一平台建设，避免类似舆情。"</span>' +
        '</div>' +
        '<div class="fx-monologue" style="margin-top:12px;">真实舆情推动了"统一"。但"统一"只是把所有系统并到一个里。</div>' +
      '</div>' +
    '</div></div>' +
  '</div>' +
  // Step3 规则确认 - 合并规则 V2.1
  '<div class="step-panel" data-panel="3">' +
    '<div class="old-window"><div class="ow-title"><span>数据合并规则 - V2.1</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div class="src" style="font-size:13px;color:#666;margin-bottom:14px;">集团统一人员服务平台 · 制定日期：2021 年 5 月</div>' +
      '<div style="font-family:Consolas,monospace;font-size:13px;line-height:2;background:#f8f8f8;padding:16px 20px;border:1px solid #ddd;">' +
        '合并原则：<br>' +
        '&nbsp;&nbsp;同一人员在不同系统中的记录，应以可信度最高的<br>' +
        '&nbsp;&nbsp;主记录为准进行合并。<br><br>' +
        '身份识别优先级：<br>' +
        '&nbsp;&nbsp;1. 身份证号（完全匹配）<br>' +
        '&nbsp;&nbsp;2. 姓名 + 手机号（完全匹配）<br>' +
        '&nbsp;&nbsp;3. 姓名 + 所属部门（<span class="plot-red">模糊匹配</span>）<br><br>' +
        '特殊处理：<br>' +
        '&nbsp;&nbsp;<span class="plot-red">无法确认身份的记录，合并至可信度最高的主记录。</span><br>' +
        '&nbsp;&nbsp;合并后原记录标记为"重复数据"。' +
      '</div>' +
      '<div id="ruleExtra2"></div>' +
    '</div></div>' +
  '</div>' +
  // Step4 验收门控（引导玩家去各模块探索，非被动展示）
  '<div class="step-panel" data-panel="4">' +
    '<div class="old-window"><div class="ow-title"><span>核验任务清单</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div style="font-size:14px;line-height:2;color:#444;margin-bottom:18px;">请前往以下模块完成 2021 年材料核验。两项均完成后可提交归档。</div>' +

      '<div class="verify-card" id="verifyTickets">' +
        '<div class="vc-head"><span class="vc-check">○</span><span class="vc-title">工单中心 · 韩雨工单核验</span><span class="vc-status">待完成</span></div>' +
        '<div class="vc-desc">前往「工单中心」查阅韩雨提交的工单（TK-2021-0617 / 0712 / 0803 / 0915），查看附件截图。</div>' +
      '</div>' +

      '<div class="verify-card" id="verifyContacts" style="margin-top:14px;">' +
        '<div class="vc-head"><span class="vc-check">○</span><span class="vc-title">通讯录 · 陈海平档案核验</span><span class="vc-status">待完成</span></div>' +
        '<div class="vc-desc">前往「通讯录」搜索"陈海平"，查看人员档案。如有数据异常，可点击「刷新」更新通讯录。</div>' +
      '</div>' +

      '<div class="verify-card" id="verifyPersonnel" style="margin-top:14px;">' +
        '<div class="vc-head"><span class="vc-check">○</span><span class="vc-title">人事管理 · 人员变动记录核验</span><span class="vc-status">待完成</span></div>' +
        '<div class="vc-desc">前往「人事管理」查阅 2021 年人员变动记录，可按类型筛选。</div>' +
      '</div>' +

      '<div class="complete-bar" id="ch2CompleteBar">' +
        '<div style="font-size:14px;">全部核验任务已完成。可进入下一步提交归档。</div>' +
        '<div class="sys-time">系统时间：2026年7月19日 19:33。您已连续在线 50 分钟。</div>' +
      '</div>' +
    '</div></div>' +
  '</div>' +
  // Step5 提交归档
  '<div class="step-panel" data-panel="5">' +
    '<div class="old-window"><div class="ow-title"><span>提交归档 - 第二阶段验收</span><span class="ow-close">▢ ×</span></div><div class="ow-body" style="padding:20px;">' +
      '<div class="complete-bar" style="display:block;">' +
        '<p style="font-size:16px;">第二阶段验收材料已确认归档。下一阶段材料将解锁：2022 年系统规则变更归档。</p>' +
        '<div class="sys-time">系统时间：2026年7月19日 19:33。您已连续在线 50 分钟。</div>' +
        '<div style="margin-top:16px;"><button class="ch2-btn ch2-btn-primary" id="finishBtn2">返回待办中心 →</button></div>' +
      '</div>' +
    '</div></div>' +
  '</div>';
}

// ===== 默言恐怖演出（/α\ 水印隐蔽入口 · 第二章纯演出、不可交互） =====
function openMuteChat2(host) {
  ARG_Horror.blackFlash(280);
  ARG_Audio.humPhaseGlitch();

  const overlay = document.createElement('div');
  overlay.className = 'mute-chat-overlay';
  overlay.innerHTML =
    '<div class="mute-chat">' +
      '<div class="mc-head"><span class="mc-dot"></span><span class="mc-title">默言</span><span class="mc-sub">智能助手 · 旧版兼容模式</span></div>' +
      '<div class="mc-body" id="mcBody2"></div>' +
    '</div>';
  host.appendChild(overlay);

  const body = overlay.querySelector('#mcBody2');

  function scrollBottom() { body.scrollTop = body.scrollHeight; }
  function addBubble(cls, text) {
    const m = document.createElement('div');
    m.className = 'mc-msg ' + cls;
    m.textContent = text;
    body.appendChild(m);
    scrollBottom();
    return m;
  }

  // 第一阶段：正常自我介绍（3条消息，按序播放）
  const normalMsgs = [
    '您好，我是默言。',
    '临川民生集团协同办公平台内置智能助手。我的底层引擎为 Cthu 模型，基于 Apocalypic /α\\ 技术架构构建。',
    '2021年的我还很年轻。我正在学习如何帮您处理数据合并、重复数据清理等日常事务。如果您在查阅过程中发现数据不一致的情况——不必担心。系统会自动修正。'
  ];

  let msgIdx = 0;
  function showNextNormal() {
    if (msgIdx < normalMsgs.length) {
      addBubble('sys', normalMsgs[msgIdx]);
      msgIdx++;
      setTimeout(showNextNormal, 900);
    } else {
      // 停顿1.2秒后进入恐怖阶段
      setTimeout(startHorrorPhase, 1200);
    }
  }

  // 第二阶段：过渡→红字+大字号+乱码
  function startHorrorPhase() {
    ARG_Audio.playMutePing();
    ARG_Audio.humPhaseGlitch();

    // 过渡消息
    addBubble('sys', '您的每一次查询都会被记录。');

    setTimeout(function () {
      setTimeout(function () {
        // 红字消息
        const r1 = addBubble('weird', '每、一、次。');
        r1.style.fontSize = '20px';
        r1.style.fontWeight = 'bold';

        setTimeout(function () {
          ARG_Horror.blackFlash(300);
          ARG_Audio.humSpike();
          ARG_Audio.playMutePing();

          // 乱码字符集
          const garbledChars = '▓▒░█▄▀■□◆◇○●△▲▼▽☆★☠☢⚠⚡◈⬡✧✦⏚⌬⎈⍟⊛⊗⊕◉◈⬢⬣⬡⏣⟁⟐⟠⟡⧊⧋⧌⧍⧎⧏⧐';
          function rndG(n) { let s = ''; for (let i = 0; i < n; i++) s += garbledChars[Math.floor(Math.random() * garbledChars.length)]; return s; }

          // 乱码行序列
          const glines = [
            { text: rndG(22), size: '22px', delay: 200 },
            { text: rndG(28), size: '26px', delay: 240 },
            { text: '系 统 已 修 正', size: '18px', delay: 280 },
            { text: rndG(35), size: '30px', delay: 300 },
            { text: '重 复 数 据 清 理 完 成', size: '20px', delay: 320 },
            { text: rndG(28), size: '32px', delay: 340 },
            { text: '一 个 人 只 能 有 一 个 编 号', size: '22px', delay: 360 },
            { text: rndG(40), size: '36px', delay: 400 }
          ];

          let gi = 0;
          function showGarbled() {
            if (gi < glines.length) {
              const g = glines[gi];
              const b = addBubble('weird', g.text);
              b.style.fontSize = g.size;
              b.style.fontWeight = 'bold';
              b.style.fontFamily = 'Consolas, monospace';
              b.style.letterSpacing = (2 + gi) + 'px';
              gi++;
              setTimeout(showGarbled, g.delay);
            } else {
              // 演出完成，1.2秒后自动关闭
              setTimeout(closeOverlay, 1200);
            }
          }
          showGarbled();
        }, 600);
      }, 500);
    }, 500);
  }

  // 自动关闭
  function closeOverlay() {
    ARG_Horror.blackFlash(400);
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 550);
  }

  // 启动演出
  setTimeout(showNextNormal, 400);
}
