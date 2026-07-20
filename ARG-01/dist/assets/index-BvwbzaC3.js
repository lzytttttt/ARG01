(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();let d=null,u=null,y=!1,W=!1;function P(){if(d)return!0;const n=window.AudioContext||window.webkitAudioContext;return n?(d=new n,u=d.createGain(),u.gain.value=y?0:.5,u.connect(d.destination),!0):!1}function N(){d&&d.state==="suspended"&&d.resume()}function Y(){if(!P()||(N(),W))return;W=!0;const n=d.createOscillator();n.type="sine",n.frequency.value=35;const e=d.createGain();e.gain.value=.05;const r=d.createOscillator();r.frequency.value=.08;const s=d.createGain();s.gain.value=.02,r.connect(s).connect(e.gain),n.connect(e).connect(u),n.start(),r.start()}function j(){if(!P())return;N();const n=d.currentTime,e=d.createOscillator();e.type="triangle",e.frequency.setValueAtTime(680,n),e.frequency.exponentialRampToValueAtTime(300,n+.18);const r=d.createGain();r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.16,n+.01),r.gain.exponentialRampToValueAtTime(1e-4,n+.42),e.connect(r).connect(u||d.destination),e.start(n),e.stop(n+.46)}function K(){return y=!y,u&&(u.gain.value=y?0:.5),y}function Q(){return y}const C={startDrone:Y,playPing:j,toggleMute:K,isMuted:Q};let b=null,m=[];function H(){m.forEach(clearTimeout),m=[]}function D(){return b||(b=document.createElement("div"),b.className="boot-overlay",b.setAttribute("aria-hidden","true"),b.innerHTML='<div class="boot-crt"></div><div class="boot-screen"><div class="boot-logo">LINCHUAN&nbsp;MINSHENG</div><div class="boot-sub">临川民生服务集团有限公司 · 协同办公平台</div><div class="boot-bar"><i></i></div><div class="boot-msg">正在唤醒终端…</div></div>',document.body.appendChild(b),b)}function _(n){const e=D();H(),e.classList.remove("boot-powerdown","boot-done"),e.offsetWidth,e.classList.add("boot-play"),m.push(setTimeout(n,1800)),m.push(setTimeout(function(){e.classList.add("boot-done")},1850)),m.push(setTimeout(function(){e.classList.remove("boot-play","boot-done")},2450))}function $(n){const e=D();H(),e.classList.remove("boot-play","boot-done"),e.offsetWidth,e.classList.add("boot-powerdown"),m.push(setTimeout(n,650)),m.push(setTimeout(function(){e.classList.remove("boot-powerdown")},1300))}const o=window.__flow={step:"portal",noteRead:!1,loggedIn:!1,muted:!1};let T={},E=null,z=null,M=null;function V(n){T=n}function I(n){return n.startsWith("/physical")||n==="/note"?"physical":n.startsWith("/lcms")?"digital":"other"}function g(n){n===location.hash.slice(1)?L():location.hash=n}function Z(){return location.hash.slice(1)||"/"}function J(n){switch(n){case"/physical/building":return o.step==="portal";case"/physical/corridor1f":return o.step==="building";case"/physical/corridor3f":return o.step==="corridor1f";case"/physical/room307":return o.step==="corridor3f";case"/physical/office":return o.step==="room307";case"/note":return o.step==="office";case"/lcms":return o.noteRead===!0;case"/lcms/about":return o.noteRead===!0;case"/lcms/news":return o.noteRead===!0;case"/lcms/login":return o.noteRead===!0;case"/lcms/oa":return o.loggedIn===!0;default:return!0}}function nn(){return o.loggedIn?"/lcms/oa":o.noteRead?"/lcms":o.step&&o.step!=="portal"?"/"+o.step:"/"}function L(){const n=Z();if(!J(n)){const a=nn();a!==n&&(location.hash=a);return}const e=T[n]||T["/"];if(!e)return;function r(){if(E&&typeof E.unmount=="function")try{E.unmount()}catch(a){}z.innerHTML="",E=e,typeof e.mount=="function"&&e.mount(z),M=n}const s=M?I(M):null,t=I(n);s==="physical"&&t==="digital"?_(r):s==="digital"&&t==="physical"?$(r):r()}function en(){z=document.getElementById("view"),window.addEventListener("hashchange",L),location.hash?L():location.hash="/"}function tn(n){n.innerHTML=`
    <div id="shell">
      <div id="view"></div>
      <button id="audio-toggle" title="声音开关" aria-label="声音开关">♪</button>
      <div id="terror"></div>
    </div>`;const e=n.querySelector("#audio-toggle");e.addEventListener("click",function(){const s=C.toggleMute();o.muted=s,e.classList.toggle("muted",s),e.textContent=s?"✕":"♪"});function r(){C.startDrone(),window.removeEventListener("pointerdown",r),window.removeEventListener("keydown",r)}window.addEventListener("pointerdown",r),window.addEventListener("keydown",r)}let O=!1;function rn(){if(O)return;O=!0;const n=document.createElement("style");n.textContent=`
    .rain-field { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:3; }
    .raindrop {
      position:absolute; top:-40px; width:1px; height:40px;
      background:linear-gradient(to bottom, rgba(200,215,230,0), rgba(200,215,230,.45));
      animation: argRain linear infinite;
    }
    @keyframes argRain { to { transform: translateY(110vh); } }
    .glass-streak {
      position:absolute; top:-40px; width:1px; height:40px;
      background:linear-gradient(to bottom, rgba(200,215,230,.35), rgba(200,215,230,0));
      animation: argGlass linear infinite;
    }
    @keyframes argGlass { to { transform: translateY(440px); } }
    .glass-bead {
      position:absolute; border-radius:50%;
      background:rgba(205,218,230,.35); box-shadow:0 0 3px rgba(205,218,230,.3);
    }
  `,document.head.appendChild(n)}function R(n){rn(),n.querySelectorAll("[data-rain]").forEach(function(e){const r=parseInt(e.getAttribute("data-rain"),10)||60;for(let s=0;s<r;s++){const t=document.createElement("i");t.className="raindrop",t.style.left=Math.random()*104-2+"%",t.style.animationDelay=-Math.random()*2+"s",t.style.animationDuration=.55+Math.random()*.65+"s",t.style.opacity=(.12+Math.random()*.28).toFixed(2),t.style.height=26+Math.random()*46+"px",e.appendChild(t)}}),n.querySelectorAll("[data-glass-rain]").forEach(function(e){const r=parseInt(e.getAttribute("data-glass-rain"),10)||12;for(let s=0;s<r;s++){const t=document.createElement("i");t.className="glass-streak",t.style.left=Math.random()*96+"%",t.style.animationDelay=-Math.random()*6+"s",t.style.animationDuration=3+Math.random()*4+"s",e.appendChild(t)}for(let s=0;s<r*2;s++){const t=document.createElement("b");t.className="glass-bead",t.style.left=Math.random()*97+"%",t.style.top=Math.random()*97+"%";const a=2+Math.random()*4;t.style.width=t.style.height=a+"px",e.appendChild(t)}})}const sn={mount:function(n){n.innerHTML=`
      <div class="view-portal">
        <div class="rain-field" data-rain="80"></div>
        <div class="portal-inner">
          <div class="portal-logo">
            <svg width="64" height="64" viewBox="0 0 120 120" aria-label="临川民生">
              <circle cx="60" cy="60" r="56" fill="#fff"/>
              <circle cx="60" cy="60" r="48" fill="#1a56db"/>
              <path d="M30,62 Q60,34 90,62" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
              <path d="M32,72 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
              <path d="M39,82 q7,-6 14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>
            </svg>
          </div>
          <h1 class="portal-title">六年一夜</h1>
          <p class="portal-sub">临川民生服务集团 · 协同办公平台 · 序章</p>
          <button class="portal-start" id="startBtn">开始游戏</button>
          <div class="portal-foot">Powered by Cthu / Apocalypic /<span style="font-family:var(--font-hei,serif)">α</span></div>
        </div>
      </div>`,R(n),n.querySelector("#startBtn").addEventListener("click",function(){C.startDrone(),g("/physical/building")})},unmount:function(){}};function w(n){let e="",r;const s=/<style[^>]*>([\s\S]*?)<\/style>/gi;for(;(r=s.exec(n))!==null;)e+=r[1]+`
`;const t=n.match(/<body[^>]*>([\s\S]*?)<\/body>/i);let a=t?t[1]:n;return e=e.replace(/body\s*\{[^}]*\}/gi,""),a=a.replace(/<a class="flip-link"[\s\S]*?<\/a>/gi,""),{css:e,body:a}}function k(n){const e=w(n.raw);return{mount:function(r){n.step&&(o.step=n.step),r.innerHTML='<div class="view-physical"><style>'+e.css+'</style><div class="physical-rain" data-rain="120" aria-hidden="true"></div><div class="scene-host">'+e.body+'</div><div class="scene-bar"><div class="scene-narrate">'+(n.narrate||"")+'</div><button class="scene-next" id="nextBtn">'+(n.btn||"前进 ▶")+"</button></div></div>",R(r);const s=r.querySelector("#nextBtn"),t=r.querySelector(".scene-narrate");if(n.mode==="door")s.textContent="敲门",s.addEventListener("click",function(){s.textContent==="敲门"?(t.innerHTML="（你屈指敲了敲门，回声在空走廊里散开。无人应答。你摸出钥匙串——307 的备用钥匙，标签纸还是六年前的，字迹早磨淡了。你插进锁孔，锁舌没有卡住。门是虚掩的。你推了一下，门开了，门缝里渗出一线黑——那黑不像是房间的暗，更像是被什么东西吸进去的光。）",s.textContent="推开房门 ▶"):g(n.next)});else if(n.mode==="note"){const a=r.querySelector(".the-note");a&&(a.removeAttribute("href"),a.addEventListener("click",function(i){i.preventDefault(),g("/note")})),s.textContent="拾起字条 ▶",s.addEventListener("click",function(){g("/note")})}else s.addEventListener("click",function(){g(n.next)})},unmount:function(){}}}const an=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>S01 — 科技市场大楼外部（雨天·傍晚 18:30）</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/scenes.css">\r
<link rel="stylesheet" href="../css/horror.css">\r
<style>\r
  .s01 { background: linear-gradient(180deg, #84898f 0%, #a8adb2 45%, #c2c6ca 62%, #6d7175 100%); }\r
\r
  /* 远处楼影 */\r
  .far { position: absolute; bottom: 26%; background: #5f6468; opacity: .55; }\r
  .far.f1 { left: 2%;  width: 15%; height: 30%; }\r
  .far.f2 { right: 4%; width: 18%; height: 36%; opacity: .45; }\r
  .far.f3 { left: 70%; width: 10%; height: 24%; opacity: .4; }\r
\r
  /* 主楼：米灰色瓷砖外墙 + 斑驳 */\r
  .building {\r
    position: absolute;\r
    left: 20%; bottom: 14%;\r
    width: 46%; height: 58%;\r
    background:\r
      radial-gradient(ellipse at 30% 20%, rgba(90, 80, 60, .18), transparent 45%),\r
      radial-gradient(ellipse at 75% 55%, rgba(70, 70, 60, .22), transparent 40%),\r
      radial-gradient(ellipse at 50% 90%, rgba(60, 55, 45, .25), transparent 50%),\r
      repeating-linear-gradient(0deg,\r
        #d4c9b8 0px, #d4c9b8 48px,\r
        #c4b9a8 48px, #c4b9a8 50px);\r
    box-shadow: 0 0 0 1px #a89d8c, 12px 0 24px rgba(0, 0, 0, .25);\r
  }\r
  /* 女儿墙 */\r
  .building::before {\r
    content: "";\r
    position: absolute; left: -1%; right: -1%; top: -3.5%;\r
    height: 3.5%;\r
    background: #b3a897;\r
    border-bottom: 2px solid #9a8f7e;\r
  }\r
\r
  /* 窗户阵列：深色矩形 + 室内暗影 */\r
  .windows {\r
    position: absolute; left: 7%; right: 7%; top: 8%;\r
    display: grid;\r
    grid-template-columns: repeat(4, 1fr);\r
    grid-template-rows: repeat(3, 1fr);\r
    gap: 12% 8%;\r
    height: 62%;\r
  }\r
  .win {\r
    position: relative;\r
    background: linear-gradient(160deg, #23262b 0%, #2e3136 60%, #26292e 100%);\r
    box-shadow: inset 0 0 12px rgba(0, 0, 0, .8), 0 1px 0 rgba(255, 255, 255, .15);\r
    border: 2px solid #8f8574;\r
  }\r
  /* 窗下雨水锈痕 */\r
  .win::after {\r
    content: "";\r
    position: absolute; left: 20%; right: 20%; top: 100%;\r
    height: 26px;\r
    background: linear-gradient(to bottom, rgba(110, 90, 60, .28), transparent);\r
  }\r
  .win.lit { background: linear-gradient(160deg, #4a4436, #5c5340); }\r
  .win.lit::before {\r
    content: "";\r
    position: absolute; inset: 0;\r
    background: radial-gradient(ellipse at 50% 60%, rgba(220, 200, 140, .28), transparent 70%);\r
  }\r
  .win.broken { clip-path: polygon(0 0, 100% 0, 100% 100%, 55% 100%, 40% 62%, 0 78%); }\r
\r
  /* 褪色灯箱招牌 */\r
  .sign {\r
    position: absolute;\r
    left: 10%; top: 74%;\r
    width: 56%; height: 9%;\r
    background: linear-gradient(180deg, #b9b2a2, #a39c8c);\r
    border: 2px solid #857d6d;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 6%;\r
    box-shadow: inset 0 0 18px rgba(0, 0, 0, .25);\r
  }\r
  .sign span {\r
    font-family: var(--font-hei);\r
    font-size: 26px;\r
    color: #a03a30;\r
    text-shadow: 0 0 8px rgba(220, 120, 100, .35);\r
    letter-spacing: 4px;\r
  }\r
  .sign span.dead { color: #6e443e; text-shadow: none; opacity: .6; }\r
\r
  /* 一楼：卷帘门 + 一家还亮着的店 */\r
  .shops {\r
    position: absolute; left: 0; right: 0; bottom: 0;\r
    height: 17%;\r
    display: flex;\r
    border-top: 3px solid #8f8574;\r
  }\r
  .shops .shutter { flex: 1; border-right: 2px solid #5c6165; }\r
  .shop-open {\r
    flex: 1;\r
    position: relative;\r
    background: linear-gradient(180deg, #3a352c, #2a2721);\r
    border-right: 2px solid #5c6165;\r
  }\r
  .shop-open::before {\r
    content: "";\r
    position: absolute; inset: 12% 18%;\r
    background: radial-gradient(ellipse at 50% 100%, rgba(230, 210, 150, .30), rgba(60, 55, 40, .2) 75%);\r
  }\r
  .shop-open .shop-sign {\r
    position: absolute; top: 4%; left: 50%;\r
    transform: translateX(-50%);\r
    font-size: 10px; color: #cfc39a;\r
    letter-spacing: 2px; white-space: nowrap;\r
  }\r
\r
  /* 街道与积水 */\r
  .street {\r
    position: absolute; left: 0; right: 0; bottom: 0;\r
    height: 14%;\r
    background: linear-gradient(180deg, #3f4245 0%, #2c2f33 100%);\r
  }\r
  .puddle {\r
    position: absolute; bottom: 12%;\r
    border-radius: 50%;\r
    background: linear-gradient(180deg, rgba(150, 158, 165, .5), rgba(90, 96, 102, .35));\r
    filter: blur(1px);\r
    overflow: hidden;\r
  }\r
  .puddle::before {\r
    content: "";\r
    position: absolute; inset: 0;\r
    background: radial-gradient(ellipse at 35% 30%, rgba(200, 205, 210, .35), transparent 55%);\r
    animation: puddleShimmer 4s ease-in-out infinite;\r
  }\r
  .p1 { left: 14%; width: 30%; height: 58%; }\r
  .p2 { left: 58%; width: 24%; height: 44%; }\r
  .p2::after {\r
    content: "";\r
    position: absolute; left: 10%; top: 20%;\r
    width: 40%; height: 30%;\r
    background: rgba(160, 58, 48, .18);  /* 招牌红光的倒影 */\r
    filter: blur(4px);\r
  }\r
  @keyframes puddleShimmer {\r
    0%, 100% { opacity: .7; }\r
    50%      { opacity: 1; }\r
  }\r
\r
  /* 雨幕低霭 */\r
  .mist {\r
    position: absolute; left: 0; right: 0; bottom: 10%;\r
    height: 12%;\r
    background: linear-gradient(to bottom, transparent, rgba(200, 206, 210, .14));\r
    pointer-events: none;\r
  }\r
</style>\r
</head>\r
<body>\r
<div class="scene s01 vignette">\r
  <div class="far f1"></div>\r
  <div class="far f2"></div>\r
  <div class="far f3"></div>\r
\r
  <div class="building">\r
    <div class="windows">\r
      <div class="win"></div><div class="win"></div><div class="win"></div><div class="win broken"></div>\r
      <div class="win"></div><div class="win lit"></div><div class="win"></div><div class="win"></div>\r
      <div class="win"></div><div class="win"></div><div class="win"></div><div class="win"></div>\r
    </div>\r
    <div class="sign"><span>科</span><span>技</span><span class="dead">市</span><span>场</span></div>\r
    <div class="shops">\r
      <div class="shutter"></div>\r
      <div class="shop-open"><div class="shop-sign">二手笔记本·监控器材</div></div>\r
      <div class="shutter"></div>\r
      <div class="shutter"></div>\r
    </div>\r
  </div>\r
\r
  <div class="street">\r
    <div class="puddle p1"></div>\r
    <div class="puddle p2"></div>\r
  </div>\r
  <div class="mist"></div>\r
  <div class="rain-field" data-rain="110"></div>\r
</div>\r
<script src="../js/rain.js"><\/script>\r
</body>\r
</html>\r
`,on=k({raw:an,step:"building",next:"/physical/corridor1f",btn:"上楼 ▶",narrate:"你是这栋楼的管理员。2026年7月19日，雨下了一整天，气象台黄色预警，老城区排水一满，后巷的水就到了脚踝。你五点做最后一趟巡逻：一楼没事，二楼没事。三楼的走廊灯坏了一半，剩下的几根日光灯管发着嗡嗡的、冷白色的光；走廊尽头那台监控摄像头——两年前物业统一装的，联网的那种——红灯还在闪，说明有电，可你从来没去看过它的录像，谁会看呢，这栋楼有什么好拍的。天花板有渗水蔓延出的黄渍，从 2021 年那场把科技市场淹了的大暴雨后就开始了——那一年的水漫进一楼，泡了半条街的档口，你守了三天抽水泵。从那以后，你对这栋楼的漏水格外警觉。今天三楼又有点不对：307 很久没见人，门上方却洇出一片新的湿痕；临街那家二手笔记本、监控器材的小店还亮着灯，空气里是电子元件遇潮后微微发甜的气味。你收起伞，抬头看那块褪了色的「科技市场」灯箱——「市」字的灯管不知灭了多久，推开楼门，往楼梯走去。"}),ln=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>S02 — 一楼走廊（CSS 透视走廊）</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/scenes.css">\r
<link rel="stylesheet" href="../css/horror.css">\r
<style>\r
  /* 走廊几何：梯形 clip-path 伪造透视，灭点在画面中央偏上 */\r
  .s02 { background: #101215; }\r
  .ceil {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(0 0, 100% 0, 63% 31%, 37% 31%);\r
    background: linear-gradient(180deg, #b9beb4 0%, #9aa096 100%);\r
  }\r
  .floor {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(0 100%, 100% 100%, 63% 71%, 37% 71%);\r
    background:\r
      radial-gradient(ellipse at 50% 88%, rgba(210, 214, 200, .16), transparent 55%),\r
      linear-gradient(0deg, #78796f 0%, #8a8a80 100%);\r
  }\r
  .wall-l {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(0 0, 37% 31%, 37% 71%, 0 100%);\r
    background: linear-gradient(90deg, #93a08d 0%, #a8b5a2 100%);\r
  }\r
  .wall-r {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(100% 0, 63% 31%, 63% 71%, 100% 100%);\r
    background: linear-gradient(270deg, #93a08d 0%, #a8b5a2 100%);\r
  }\r
  .back {\r
    position: absolute;\r
    left: 37%; top: 31%; width: 26%; height: 40%;\r
    background: linear-gradient(180deg, #9aa696, #8b9785);\r
    box-shadow: 0 0 40px rgba(0, 0, 0, .35);\r
  }\r
  /* 墙面底部的污渍带 */\r
  .grime-l { position: absolute; inset: 0; clip-path: polygon(0 86%, 37% 65%, 37% 71%, 0 100%); background: rgba(70, 75, 62, .35); }\r
  .grime-r { position: absolute; inset: 0; clip-path: polygon(100% 86%, 63% 65%, 63% 71%, 100% 100%); background: rgba(70, 75, 62, .35); }\r
\r
  /* 左墙卷帘门（顺透视的斜切四边形） */\r
  .feature-l {\r
    position: absolute;\r
    left: 3%; top: 26%;\r
    width: 26%; height: 56%;\r
    clip-path: polygon(0 6%, 100% 20%, 100% 76%, 0 100%);\r
  }\r
  .feature-l.second { left: 31%; top: 34%; width: 12%; height: 34%; clip-path: polygon(0 10%, 100% 16%, 100% 82%, 0 96%); opacity: .85; }\r
\r
  /* 右墙电梯门 */\r
  .elevator {\r
    position: absolute;\r
    right: 6%; top: 30%;\r
    width: 22%; height: 52%;\r
    clip-path: polygon(0 18%, 100% 4%, 100% 100%, 0 80%);\r
    background: linear-gradient(90deg, #8d9296 49.4%, #6f7478 49.6%, #6f7478 50.4%, #8d9296 50.6%);\r
    border-top: 4px solid #5c6165;\r
    box-shadow: inset 0 0 26px rgba(0, 0, 0, .4);\r
  }\r
  /* 电梯门上的"停运通知"黄纸 */\r
  .elevator .notice-paper {\r
    position: absolute;\r
    left: 26%; top: 24%;\r
    width: 46%; height: 26%;\r
    transform: rotate(3deg);\r
    display: flex; flex-direction: column;\r
    align-items: center; justify-content: center;\r
    font-size: 13px; font-weight: bold; letter-spacing: 2px;\r
  }\r
  .elevator .notice-paper small { font-size: 8px; font-weight: normal; letter-spacing: 0; margin-top: 3px; }\r
\r
  /* 尽头黑暗门洞 */\r
  .doorway {\r
    position: absolute;\r
    left: 44%; top: 38%; width: 12%; height: 33%;\r
    background: linear-gradient(180deg, #17191c, #0c0d0f);\r
    box-shadow: inset 0 0 14px #000;\r
  }\r
  .exit-sign {\r
    position: absolute;\r
    left: 44.5%; top: 34.5%;\r
    padding: 1px 6px;\r
    background: #1d5c34;\r
    color: #bfe8c8;\r
    font-size: 9px;\r
    letter-spacing: 2px;\r
    box-shadow: 0 0 8px rgba(80, 200, 120, .5);\r
  }\r
\r
  /* 灯管：顺天花纵深排列，一根灭、一根闪 */\r
  .tube-wrap { position: absolute; left: 50%; transform: translateX(-50%); z-index: 3; }\r
  .t1 { top: 7%;  } .t1 .light-tube { width: 150px; }\r
  .t2 { top: 16%; } .t2 .light-tube { width: 108px; }\r
  .t3 { top: 23%; } .t3 .light-tube { width: 76px; }\r
\r
  /* 灯光在地面上的冷光晕 + 闪烁覆盖层（H03） */\r
  .light-pool {\r
    position: absolute; left: 50%; top: 58%;\r
    width: 46%; height: 34%;\r
    transform: translateX(-50%);\r
    background: radial-gradient(ellipse at 50% 30%, rgba(240, 244, 220, .20), transparent 65%);\r
    pointer-events: none;\r
  }\r
  .flicker-layer {\r
    position: absolute; inset: 0;\r
    background: rgba(245, 248, 225, .05);\r
    pointer-events: none;\r
  }\r
\r
  /* 地面水洼（天花板漏水） */\r
  .floor-puddle {\r
    position: absolute; left: 40%; top: 76%;\r
    width: 20%; height: 9%;\r
    border-radius: 50%;\r
    background: radial-gradient(ellipse at 45% 35%, rgba(190, 198, 195, .35), rgba(90, 95, 90, .2) 70%, transparent);\r
    filter: blur(1px);\r
  }\r
</style>\r
</head>\r
<body>\r
<div class="scene s02 vignette">\r
  <div class="ceil"></div>\r
  <div class="floor"></div>\r
  <div class="wall-l"></div>\r
  <div class="wall-r"></div>\r
  <div class="grime-l"></div>\r
  <div class="grime-r"></div>\r
  <div class="back"></div>\r
\r
  <div class="feature-l shutter"></div>\r
  <div class="feature-l second shutter"></div>\r
\r
  <div class="elevator">\r
    <div class="notice-paper">\r
      电梯停运通知\r
      <small>故障检修 · 恢复时间另行通知 · 物业办</small>\r
    </div>\r
  </div>\r
\r
  <div class="doorway"></div>\r
  <div class="exit-sign">安全出口</div>\r
\r
  <div class="tube-wrap t1"><div class="light-tube"></div></div>\r
  <div class="tube-wrap t2"><div class="light-tube off"></div></div>\r
  <div class="tube-wrap t3"><div class="light-tube fx-flicker"></div></div>\r
\r
  <div class="light-pool"></div>\r
  <div class="floor-puddle"></div>\r
  <div class="flicker-layer fx-flicker"></div>\r
</div>\r
</body>\r
</html>\r
`,dn=k({raw:ln,step:"corridor1f",next:"/physical/corridor3f",btn:"上三楼 ▶",narrate:"电梯停运，通知贴在门上，和往常一样。你熟门熟路地拐向楼梯——钥匙串在腰间叮当作响，这是你每天上下来回好几趟的路。一楼走廊里头顶三根灯管只剩一根亮着，最里头那根每隔几秒抽搐似的闪一下，把影子拉得忽长忽短；天花板渗着水，水珠落进地面那摊浑黄的水洼，叮、咚、叮。墙根积着长年洗不掉的黄渍，空气里是霉味混着铁锈味。今天这安静，比往常重。你踩着楼梯往上走——去三楼，去 307。"}),cn=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>S03 — 三楼走廊 + 307 室门口</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/scenes.css">\r
<link rel="stylesheet" href="../css/horror.css">\r
<style>\r
  /* 与 S02 同一套透视，整体更暗 */\r
  .s03 { background: #0b0c0e; }\r
  .ceil {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(0 0, 100% 0, 63% 31%, 37% 31%);\r
    background: linear-gradient(180deg, #8e9389 0%, #73786e 100%);\r
  }\r
  .floor {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(0 100%, 100% 100%, 63% 71%, 37% 71%);\r
    background:\r
      radial-gradient(ellipse at 50% 90%, rgba(180, 185, 170, .10), transparent 55%),\r
      linear-gradient(0deg, #5c5d55 0%, #6d6e66 100%);\r
  }\r
  .wall-l {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(0 0, 37% 31%, 37% 71%, 0 100%);\r
    background: linear-gradient(90deg, #75816f 0%, #8a9684 100%);\r
  }\r
  .wall-r {\r
    position: absolute; inset: 0;\r
    clip-path: polygon(100% 0, 63% 31%, 63% 71%, 100% 100%);\r
    background: linear-gradient(270deg, #75816f 0%, #8a9684 100%);\r
  }\r
  .back {\r
    position: absolute;\r
    left: 37%; top: 31%; width: 26%; height: 40%;\r
    background: linear-gradient(180deg, #7c8677, #6f7969);\r
    box-shadow: 0 0 40px rgba(0, 0, 0, .5);\r
  }\r
\r
  /* 天花板渗水：307 门口上方的大片水渍（反复回来时 scale 微增） */\r
  .stain-main {\r
    left: 40%; top: 6%;\r
    width: 26%; height: 30%;\r
    transform: scale(1);\r
    transition: transform 20s ease, opacity 20s ease;\r
  }\r
  .stain-small { left: 63%; top: 12%; width: 9%; height: 12%; opacity: .7; }\r
  /* 墙皮被浸湿剥落的斑块 */\r
  .peel {\r
    position: absolute;\r
    left: 37.5%; top: 33%;\r
    width: 8%; height: 14%;\r
    background: radial-gradient(ellipse at 40% 40%, #b9b4a4 30%, rgba(150, 145, 130, .6) 60%, transparent 75%);\r
    filter: blur(.8px);\r
    opacity: .8;\r
  }\r
\r
  /* 307 的门：画面尽头偏左，焦点 */\r
  .door307 {\r
    position: absolute;\r
    left: 40%; top: 36%; width: 11%; height: 35%;\r
    background: linear-gradient(160deg, #6b5a49 0%, #594b3d 100%);\r
    border: 2px solid #453a2e;\r
    box-shadow: inset 2px 0 6px rgba(0, 0, 0, .5), 0 0 18px rgba(0, 0, 0, .5);\r
  }\r
  .door307 .knob {\r
    position: absolute; right: 8%; top: 52%;\r
    width: 7px; height: 7px; border-radius: 50%;\r
    background: #a8a49a;\r
    box-shadow: 0 0 3px rgba(0, 0, 0, .6);\r
  }\r
  /* 门缝：门没锁，虚掩着一线黑 */\r
  .door307::after {\r
    content: "";\r
    position: absolute; right: -2px; top: 0; bottom: 0;\r
    width: 2px;\r
    background: #050505;\r
  }\r
  .door307 .doorplate {\r
    position: absolute;\r
    left: 50%; top: -26%;\r
    transform: translateX(-50%) scale(.62);\r
    transform-origin: bottom center;\r
    white-space: nowrap;\r
  }\r
\r
  /* 水从天花板滴到地面的痕迹 */\r
  .drip-line {\r
    position: absolute; left: 47.5%; top: 30%;\r
    width: 1px; height: 44%;\r
    background: linear-gradient(to bottom, rgba(170, 175, 165, .5), rgba(170, 175, 165, .08));\r
  }\r
  .floor-puddle {\r
    position: absolute; left: 42%; top: 73%;\r
    width: 14%; height: 6%;\r
    border-radius: 50%;\r
    background: radial-gradient(ellipse at 45% 35%, rgba(180, 188, 180, .28), rgba(80, 84, 78, .18) 70%, transparent);\r
    filter: blur(1px);\r
  }\r
\r
  .tube-wrap { position: absolute; left: 50%; transform: translateX(-50%); z-index: 3; }\r
  .t1 { top: 8%;  } .t1 .light-tube { width: 140px; }\r
  .t2 { top: 18%; } .t2 .light-tube { width: 92px; }\r
\r
  /* 右墙：其他空置办公室的门，黑洞洞 */\r
  .door-empty {\r
    position: absolute;\r
    right: 10%; top: 38%;\r
    width: 14%; height: 36%;\r
    clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 88%);\r
    background: linear-gradient(180deg, #141518, #0a0b0d);\r
  }\r
\r
  /* 整体压暗层 */\r
  .dim { position: absolute; inset: 0; background: rgba(8, 10, 16, .28); pointer-events: none; }\r
</style>\r
</head>\r
<body>\r
<div class="scene s03 vignette">\r
  <div class="ceil"></div>\r
  <div class="floor"></div>\r
  <div class="wall-l"></div>\r
  <div class="wall-r"></div>\r
  <div class="back"></div>\r
\r
  <div class="water-stain drip stain-main"></div>\r
  <div class="water-stain stain-small"></div>\r
  <div class="peel"></div>\r
\r
  <div class="door307">\r
    <div class="doorplate">\r
      <span class="room-num">307</span>\r
      <span class="company-name">启衡信息技术有限公司</span>\r
    </div>\r
    <div class="knob"></div>\r
  </div>\r
\r
  <div class="door-empty"></div>\r
\r
  <div class="tube-wrap t1"><div class="light-tube fx-flicker"></div></div>\r
  <div class="tube-wrap t2"><div class="light-tube off"></div></div>\r
\r
  <div class="drip-line"></div>\r
  <div class="floor-puddle"></div>\r
  <div class="dim"></div>\r
</div>\r
</body>\r
</html>\r
`,pn=k({raw:cn,step:"corridor3f",next:"/physical/room307",mode:"door",narrate:"三楼到了。走廊的灯坏了一半，剩下的日光灯管发着冷白色的嗡嗡声，反而显得空得发冷。脚步声在走廊里叠出回声，像另有人在你身后半步跟着。你停在 307 门前——启衡信息租了六年，租金从未逾期，可最近连灯都少见亮起。门口正上方有一片新的湿痕，不是旧的黄渍，是新的、还在沿天花板裂缝缓缓爬的深灰色，水珠顺着门框边缘往下渗。门牌还钉着，「307」的漆字斑驳。你伸出手，敲了敲门。"}),hn=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>S04 — 307 室全景</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/scenes.css">\r
<link rel="stylesheet" href="../css/horror.css">\r
<style>\r
  .s04 { background: #14161a; }\r
\r
  /* 后墙与左侧渗水墨渍 */\r
  .backwall {\r
    position: absolute; left: 0; right: 0; top: 0; height: 62%;\r
    background:\r
      radial-gradient(ellipse at 8% 20%, rgba(116, 96, 58, .25), transparent 30%),\r
      linear-gradient(180deg, #a3a294 0%, #8f8e80 100%);\r
  }\r
  .stain-wall { left: 2%; top: 4%; width: 14%; height: 34%; }\r
\r
  /* 大窗 + 半拉窗帘 + 玻璃雨痕 */\r
  .window {\r
    position: absolute; left: 26%; top: 6%;\r
    width: 34%; height: 46%;\r
    border: 8px solid #4a4f55;\r
    background: linear-gradient(180deg, #7a8a9a 0%, #9aa4ad 70%, #8a939b 100%);\r
    overflow: hidden;\r
    box-shadow: inset 0 0 30px rgba(0, 0, 0, .3);\r
  }\r
  .window .mullion-v { position: absolute; left: 50%; top: 0; bottom: 0; width: 6px; margin-left: -3px; background: #4a4f55; }\r
  .window .mullion-h { position: absolute; top: 50%; left: 0; right: 0; height: 6px; margin-top: -3px; background: #4a4f55; }\r
  .window .cityline {\r
    position: absolute; bottom: 0; left: 0; right: 0; height: 34%;\r
    background:\r
      linear-gradient(0deg, #4a4a50 0 55%, transparent 55%),\r
      repeating-linear-gradient(90deg, transparent 0 18px, rgba(255, 220, 140, .35) 18px 20px, transparent 20px 46px);\r
    opacity: .8;\r
  }\r
  .curtain-l { left: 24.5%; top: 5%; width: 7%; height: 49%; }\r
  .curtain-r { left: 55%; top: 5%; width: 4.5%; height: 49%; animation-delay: -3s; }\r
\r
  /* 地面 */\r
  .floor307 {\r
    position: absolute; left: 0; right: 0; bottom: 0; height: 38%;\r
    background:\r
      radial-gradient(ellipse at 50% 0%, rgba(200, 202, 190, .12), transparent 60%),\r
      linear-gradient(180deg, #74756d 0%, #5e5f58 100%);\r
  }\r
\r
  /* 六张桌子：两排三列 */\r
  .desk {\r
    position: absolute;\r
    width: 15%; height: 9%;\r
    background: linear-gradient(180deg, #c9c9c4 0%, #b3b3ad 85%, #8f8f89 100%);\r
    box-shadow: 0 6px 10px rgba(0, 0, 0, .35);\r
  }\r
  .desk::before, .desk::after {\r
    content: ""; position: absolute; top: 100%;\r
    width: 5%; height: 160%;\r
    background: #6a6a64;\r
  }\r
  .desk::before { left: 4%; } .desk::after { right: 4%; }\r
  .r1 { top: 46%; } .r2 { top: 63%; }\r
  .c1 { left: 8%; } .c2 { left: 30%; } .c3 { left: 52%; }\r
\r
  /* 显示器 */\r
  .monitor {\r
    position: absolute; left: 50%; bottom: 100%;\r
    width: 46%; height: 78%;\r
    transform: translateX(-50%);\r
  }\r
  .monitor .screen {\r
    position: absolute; inset: 0 0 18% 0;\r
    border: 3px solid #26282c;\r
    border-radius: 2px;\r
    background: #c8d6e5;\r
    box-shadow: 0 0 14px rgba(160, 190, 220, .25);\r
  }\r
  .monitor .screen::before {  /* 待机桌面的极简暗示 */\r
    content: ""; position: absolute; left: 6%; right: 6%; top: 8%; height: 10%;\r
    background: rgba(90, 120, 150, .35);\r
  }\r
  .monitor .screen::after {\r
    content: ""; position: absolute; left: 6%; top: 26%; bottom: 12%; width: 30%;\r
    background: repeating-linear-gradient(0deg, rgba(90, 120, 150, .25) 0 3px, transparent 3px 8px);\r
  }\r
  .monitor .stand {\r
    position: absolute; left: 42%; right: 42%; top: 82%; bottom: 0;\r
    background: #26282c;\r
  }\r
  /* 碎裂的屏幕：clip-path 切角 + SVG 裂缝 */\r
  .monitor.broken .screen {\r
    background: #17191d;\r
    box-shadow: none;\r
    clip-path: polygon(0 0, 100% 0, 100% 72%, 72% 100%, 0 100%);\r
  }\r
  .monitor.broken .cracks {\r
    position: absolute; inset: 0 0 18% 0;\r
    pointer-events: none;\r
  }\r
  .monitor.tilted { transform: translateX(-50%) rotate(-7deg); }\r
\r
  /* 键盘 */\r
  .kb {\r
    position: absolute; left: 22%; top: 104%;\r
    width: 38%; height: 26%;\r
    background:\r
      repeating-linear-gradient(90deg, rgba(70, 70, 75, .5) 0 3px, transparent 3px 6px),\r
      #9a9a94;\r
    border: 1px solid #77777A;\r
    transform: rotate(2deg);\r
  }\r
  .kb.fallen { transform: rotate(24deg); top: 128%; left: 60%; }\r
\r
  /* 椅子 */\r
  .chair {\r
    position: absolute; top: 108%; left: 30%;\r
    width: 22%; height: 55%;\r
    background: linear-gradient(180deg, #3c3f45, #2c2e33);\r
    border-radius: 3px 3px 0 0;\r
    opacity: .9;\r
  }\r
\r
  /* 桌面杂物 */\r
  .cup {\r
    position: absolute; left: 8%; top: 18%;\r
    width: 9%; height: 42%;\r
    background: linear-gradient(90deg, #b8b4ac, #d4d0c8, #b0aca4);\r
    border-radius: 0 0 3px 3px;\r
  }\r
  .cup::after {\r
    content: ""; position: absolute; left: -45%; top: 90%;\r
    width: 190%; height: 60%;\r
    background: radial-gradient(ellipse, rgba(92, 64, 40, .4) 20%, transparent 70%);\r
    filter: blur(1px);\r
  }\r
  .plant { position: absolute; right: 6%; top: -30%; width: 22%; height: 130%; }\r
\r
  /* 玻璃隔断办公室（右后角） */\r
  .glass-office {\r
    position: absolute; right: 3%; top: 10%;\r
    width: 26%; height: 56%;\r
    border: 2px solid rgba(170, 175, 180, .5);\r
    background: rgba(200, 210, 220, .06);\r
    box-shadow: inset 0 0 40px rgba(0, 0, 0, .25);\r
  }\r
  .glass-office::before {  /* 玻璃反光高光条 */\r
    content: ""; position: absolute; left: 12%; top: 0; bottom: 0;\r
    width: 5%;\r
    background: linear-gradient(180deg, rgba(230, 238, 245, .14), transparent);\r
    transform: skewX(-6deg);\r
  }\r
  .glass-office .frame-h { position: absolute; left: 0; right: 0; top: 50%; height: 2px; background: rgba(170, 175, 180, .45); }\r
  .glass-office .inner-desk {\r
    position: absolute; left: 18%; bottom: 12%;\r
    width: 56%; height: 16%;\r
    background: linear-gradient(180deg, #8f8a80, #6f6a60);\r
  }\r
  .glass-office .inner-monitor {\r
    position: absolute; left: 34%; bottom: 28%;\r
    width: 20%; height: 14%;\r
    background: #33507a;\r
    box-shadow: 0 0 12px rgba(80, 130, 200, .5);\r
    border: 2px solid #1c1e22;\r
  }\r
  .glass-office .lamp-glow {\r
    position: absolute; right: 8%; bottom: 24%;\r
    width: 34%; height: 34%;\r
    background: radial-gradient(circle, rgba(255, 240, 210, .40), transparent 70%);\r
  }\r
  .glass-office .name-tag {\r
    position: absolute; left: 6%; top: 30%;\r
    background: var(--oa-blue); color: #fff;\r
    font-size: 10px; padding: 2px 8px;\r
    letter-spacing: 1px;\r
    transform: scale(.9);\r
  }\r
\r
  /* 文件柜：门开着，文件夹被翻乱 */\r
  .cabinet {\r
    position: absolute; left: 73%; top: 26%;\r
    width: 9%; height: 34%;\r
    background: linear-gradient(90deg, #7e8288, #9aa0a6, #7e8288);\r
    border: 1px solid #5c6165;\r
  }\r
  .cabinet .shelf {\r
    position: absolute; left: 8%; right: 8%;\r
    height: 4%;\r
    background: #4a4e52;\r
  }\r
  .cabinet .folders {\r
    position: absolute; left: 10%; right: 10%;\r
    background: repeating-linear-gradient(90deg,\r
      #a8524a 0 4px, #4a6a8a 4px 8px, #8a7a4a 8px 12px, #6a6a6a 12px 15px);\r
    transform: rotate(-2deg);\r
  }\r
  .cabinet .door-open {\r
    position: absolute; left: -46%; top: 0;\r
    width: 46%; height: 100%;\r
    background: linear-gradient(90deg, #6e7276, #8a9094);\r
    transform: perspective(120px) rotateY(28deg);\r
    transform-origin: right center;\r
    border: 1px solid #54585c;\r
  }\r
\r
  /* 散落的打印纸/发票/快递信封 */\r
  .pp1 { left: 20%; top: 82%; width: 5%; height: 7%; transform: rotate(14deg); }\r
  .pp2 { left: 44%; top: 88%; width: 6%; height: 8%; transform: rotate(-9deg); }\r
  .pp3 { left: 63%; top: 80%; width: 4.5%; height: 6.5%; transform: rotate(31deg); }\r
  .pp4 { left: 78%; top: 90%; width: 5.5%; height: 7%; transform: rotate(-19deg); background: linear-gradient(175deg, #d8cbb0, #c9bcA0); }\r
  .pp5 { left: 33%; top: 93%; width: 4%; height: 5.5%; transform: rotate(52deg); }\r
</style>\r
</head>\r
<body>\r
<div class="scene s04 vignette cold-overlay">\r
  <div class="backwall">\r
    <div class="water-stain drip stain-wall"></div>\r
  </div>\r
\r
  <div class="window" data-glass-rain="10">\r
    <div class="cityline"></div>\r
    <div class="mullion-v"></div>\r
    <div class="mullion-h"></div>\r
  </div>\r
  <div class="curtain curtain-l"></div>\r
  <div class="curtain curtain-r"></div>\r
\r
  <div class="floor307"></div>\r
\r
  <!-- 第一排：三张桌子，两台亮屏一台碎屏 -->\r
  <div class="desk r1 c1">\r
    <div class="monitor"><div class="screen"></div><div class="stand"></div></div>\r
    <div class="kb"></div>\r
    <div class="cup"></div>\r
    <div class="chair"></div>\r
  </div>\r
  <div class="desk r1 c2">\r
    <div class="monitor broken tilted">\r
      <div class="screen"></div>\r
      <svg class="cracks" viewBox="0 0 100 60" preserveAspectRatio="none">\r
        <polyline points="50,4 44,22 52,34 40,52" stroke="#5a5e64" stroke-width="1" fill="none"/>\r
        <polyline points="44,22 28,30 12,28" stroke="#4a4e54" stroke-width=".8" fill="none"/>\r
        <polyline points="52,34 70,40 88,36" stroke="#4a4e54" stroke-width=".8" fill="none"/>\r
        <polyline points="50,4 62,14 78,12" stroke="#3c4046" stroke-width=".7" fill="none"/>\r
      </svg>\r
      <div class="stand"></div>\r
    </div>\r
    <div class="kb fallen"></div>\r
    <div class="chair" style="transform: rotate(-14deg); left: 55%;"></div>\r
  </div>\r
  <div class="desk r1 c3">\r
    <div class="monitor"><div class="screen"></div><div class="stand"></div></div>\r
    <div class="kb"></div>\r
    <div class="plant">\r
      <svg viewBox="0 0 40 60" width="100%" height="100%">\r
        <polygon points="8,38 32,38 28,58 12,58" fill="#8B7355"/>\r
        <path d="M20,38 Q18,26 15,14 Q14,8 16,2" stroke="#6b5b3a" stroke-width="1.5" fill="none"/>\r
        <path d="M20,38 Q23,24 26,16" stroke="#6b5b3a" stroke-width="1" fill="none"/>\r
        <path d="M20,38 Q17,30 10,24" stroke="#6b5b3a" stroke-width="1" fill="none"/>\r
        <ellipse cx="14" cy="10" rx="4" ry="1.5" fill="#7a6b4a" transform="rotate(-30,14,10)"/>\r
        <ellipse cx="19" cy="4" rx="3" ry="1" fill="#6b5b3a" transform="rotate(15,19,4)"/>\r
        <ellipse cx="26" cy="14" rx="3" ry="1.2" fill="#7a6b4a" transform="rotate(40,26,14)"/>\r
      </svg>\r
    </div>\r
  </div>\r
\r
  <!-- 第二排：三张桌子，一台亮屏一台碎屏一张空桌 -->\r
  <div class="desk r2 c1">\r
    <div class="monitor"><div class="screen"></div><div class="stand"></div></div>\r
    <div class="kb"></div>\r
    <div class="chair"></div>\r
  </div>\r
  <div class="desk r2 c2">\r
    <div class="monitor broken">\r
      <div class="screen"></div>\r
      <svg class="cracks" viewBox="0 0 100 60" preserveAspectRatio="none">\r
        <polyline points="30,2 42,18 38,36 50,56" stroke="#5a5e64" stroke-width="1" fill="none"/>\r
        <polyline points="42,18 60,24 76,20" stroke="#4a4e54" stroke-width=".8" fill="none"/>\r
        <polyline points="38,36 22,44 8,42" stroke="#3c4046" stroke-width=".7" fill="none"/>\r
      </svg>\r
      <div class="stand"></div>\r
    </div>\r
    <div class="kb" style="transform: rotate(-6deg);"></div>\r
  </div>\r
  <div class="desk r2 c3">\r
    <div class="chair" style="left: 38%;"></div>\r
  </div>\r
\r
  <!-- 玻璃隔断办公室：整个 307 唯一的暖色光源在里面 -->\r
  <div class="glass-office">\r
    <div class="frame-h"></div>\r
    <div class="inner-desk"></div>\r
    <div class="inner-monitor"></div>\r
    <div class="lamp-glow"></div>\r
    <div class="name-tag">敖曼 产品经理</div>\r
  </div>\r
\r
  <!-- 文件柜 -->\r
  <div class="cabinet">\r
    <div class="shelf" style="top: 24%;"></div>\r
    <div class="shelf" style="top: 48%;"></div>\r
    <div class="shelf" style="top: 72%;"></div>\r
    <div class="folders" style="top: 6%; height: 18%;"></div>\r
    <div class="folders" style="top: 30%; height: 18%; transform: rotate(3deg);"></div>\r
    <div class="folders" style="top: 54%; height: 12%; opacity: .7;"></div>\r
    <div class="door-open"></div>\r
  </div>\r
\r
  <!-- 散落的纸张 -->\r
  <div class="loose-paper pp1"></div>\r
  <div class="loose-paper pp2"></div>\r
  <div class="loose-paper pp3"></div>\r
  <div class="loose-paper pp4"></div>\r
  <div class="loose-paper pp5"></div>\r
</div>\r
<script src="../js/rain.js"><\/script>\r
</body>\r
</html>\r
`,gn=k({raw:hn,step:"room307",next:"/physical/office",btn:"走向办公室 ▶",narrate:"门开了。307 室里很暗，窗帘半拉着，只有窗外阴沉的天光和走廊漏进的几缕昏黄。空气是封闭了很久的味道——灰尘、旧纸张、电子设备微微发热后的焦味，却没有霉味，干净得反常。你摸到门边的开关，日光灯闪了两下亮了。六张并排的工位，桌面落了薄灰；五台显示器里有两台屏碎成蛛网状的裂痕，像被人狠狠砸过，键盘散落在地上，一把转椅倒着，轮子朝天。角落一盆绿萝早枯死了，土裂成几瓣——那是 2020 年搬进来的那天买的。最里头那块白板上，蓝笔潦草地写着「默言·自动审批」，「审批」被反复描粗，又用力涂掉一个箭头，几乎戳破了板面。尽头那间玻璃隔断的小办公室，门半开着，门上贴着一张泛黄卷边的名牌：项目经理 敖曼。你朝那边走去。"}),vn=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>S05 — 敖曼办公室（玻璃隔间内·发现字条）</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/scenes.css">\r
<link rel="stylesheet" href="../css/horror.css">\r
<style>\r
  .s05 { background: radial-gradient(ellipse at 60% 40%, #23262c 0%, #101215 70%); }\r
\r
  /* 玻璃门框（左侧，门半开着） */\r
  .glass-door {\r
    position: absolute; left: 6%; top: 8%;\r
    width: 10%; height: 74%;\r
    border: 3px solid rgba(160, 168, 175, .55);\r
    border-right: none;\r
    background: linear-gradient(105deg, rgba(210, 220, 230, .10) 0%, rgba(210, 220, 230, .02) 40%);\r
    transform: perspective(300px) rotateY(14deg);\r
    transform-origin: left center;\r
  }\r
  .glass-door .name-tag {\r
    position: absolute; left: 18%; top: 26%;\r
    background: var(--oa-blue); color: #fff;\r
    font-size: 11px; padding: 3px 9px; letter-spacing: 1px;\r
    box-shadow: 0 1px 3px rgba(0, 0, 0, .5);\r
  }\r
  .glass-door .handle {\r
    position: absolute; right: 6%; top: 48%;\r
    width: 5px; height: 14%;\r
    background: #9aa0a6; border-radius: 3px;\r
  }\r
\r
  /* 大桌子 */\r
  .desk-main {\r
    position: absolute; left: 26%; top: 52%;\r
    width: 56%; height: 16%;\r
    background: linear-gradient(180deg, #7d7466 0%, #5f584c 90%, #49433a 100%);\r
    box-shadow: 0 10px 24px rgba(0, 0, 0, .55);\r
  }\r
  .desk-main::before, .desk-main::after {\r
    content: ""; position: absolute; top: 100%;\r
    width: 4%; height: 150%;\r
    background: #3c372f;\r
  }\r
  .desk-main::before { left: 6%; } .desk-main::after { right: 6%; }\r
\r
  /* 桌上的暖光池：整个 307 唯一的暖色光源 */\r
  .warm-pool {\r
    position: absolute; left: 52%; top: 42%;\r
    width: 34%; height: 26%;\r
    background: radial-gradient(ellipse at 70% 60%, rgba(255, 240, 210, .38), rgba(255, 240, 210, .10) 55%, transparent 75%);\r
    pointer-events: none;\r
    z-index: 4;\r
  }\r
\r
  /* 台灯 */\r
  .lamp {\r
    position: absolute; left: 70%; top: 34%;\r
    width: 10%; height: 20%;\r
    z-index: 3;\r
  }\r
  .lamp .base {\r
    position: absolute; bottom: 0; left: 30%;\r
    width: 40%; height: 10%;\r
    background: #2e2a24; border-radius: 50%;\r
  }\r
  .lamp .arm {\r
    position: absolute; bottom: 8%; left: 46%;\r
    width: 4%; height: 62%;\r
    background: #3a352c;\r
    transform: rotate(12deg);\r
    transform-origin: bottom center;\r
  }\r
  .lamp .head {\r
    position: absolute; top: 8%; left: 52%;\r
    width: 34%; height: 24%;\r
    background: linear-gradient(180deg, #4a4438, #322d24);\r
    border-radius: 40% 40% 50% 50%;\r
    transform: rotate(24deg);\r
  }\r
  .lamp .head::after {\r
    content: ""; position: absolute; left: 15%; right: 15%; bottom: -12%;\r
    height: 30%;\r
    background: radial-gradient(ellipse, rgba(255, 236, 190, .9), transparent 70%);\r
    filter: blur(2px);\r
  }\r
\r
  /* 亮着的电脑屏幕：OA 登录页的缩略 */\r
  .screen-big {\r
    position: absolute; left: 34%; top: 22%;\r
    width: 24%; height: 30%;\r
    border: 4px solid #1c1e22;\r
    border-radius: 3px;\r
    background: #e8ecf3;\r
    box-shadow: 0 0 26px rgba(120, 160, 220, .35);\r
    overflow: hidden;\r
  }\r
  .screen-big .mini-banner {\r
    height: 22%;\r
    background: var(--oa-blue);\r
    display: flex; align-items: center; justify-content: center;\r
    color: rgba(255, 255, 255, .85);\r
    font-size: 8px; letter-spacing: 1px;\r
  }\r
  .screen-big .mini-panel {\r
    margin: 8% auto 0;\r
    width: 56%; height: 52%;\r
    background: #fff;\r
    border: 1px solid #b9c4d4;\r
    padding: 4% 6%;\r
  }\r
  .screen-big .mini-panel i {\r
    display: block; height: 8%; margin-bottom: 7%;\r
    background: #dfe4ea; border: 1px solid #c4cdd6;\r
  }\r
  .screen-big .mini-panel b {\r
    display: block; height: 10%;\r
    background: var(--oa-blue);\r
  }\r
  .screen-stand {\r
    position: absolute; left: 44%; top: 52%;\r
    width: 4%; height: 5%;\r
    background: #1c1e22;\r
  }\r
\r
  /* 桌上的字条：发现字条的视角（点击后弹出 note-front.html 大图） */\r
  .the-note {\r
    position: absolute; left: 56%; top: 50%;\r
    width: 13%; height: 9%;\r
    background: linear-gradient(170deg, #f2ede2, #e4ddcd);\r
    transform: rotate(-9deg);\r
    box-shadow: 0 2px 6px rgba(0, 0, 0, .5);\r
    z-index: 5;\r
    cursor: pointer;\r
    transition: transform .3s ease, box-shadow .3s ease;\r
  }\r
  .the-note::before {  /* 远处看不清的手写行 */\r
    content: ""; position: absolute; left: 10%; right: 14%; top: 14%; bottom: 16%;\r
    background: repeating-linear-gradient(0deg,\r
      transparent 0 3px, rgba(40, 40, 40, .5) 3px 4px, transparent 4px 7px);\r
    opacity: .6;\r
  }\r
  .the-note:hover {\r
    transform: rotate(-9deg) scale(1.12);\r
    box-shadow: 0 6px 18px rgba(255, 240, 210, .35);\r
  }\r
  .note-hint {\r
    position: absolute; left: 54%; top: 61%;\r
    font-size: 11px; color: rgba(230, 225, 210, .55);\r
    letter-spacing: 1px;\r
    z-index: 5;\r
  }\r
\r
  /* 桌角杂物 */\r
  .pen { position: absolute; left: 50%; top: 55%; width: 7%; height: 2px; background: #2a2d33; transform: rotate(14deg); z-index: 5; }\r
  .cup-s05 {\r
    position: absolute; left: 29%; top: 46%;\r
    width: 4%; height: 6%;\r
    background: linear-gradient(90deg, #8f8b83, #b0aca4, #8a867e);\r
    border-radius: 0 0 3px 3px;\r
  }\r
\r
  /* 椅子（桌后） */\r
  .chair-s05 {\r
    position: absolute; left: 42%; top: 38%;\r
    width: 10%; height: 14%;\r
    background: linear-gradient(180deg, #33363c, #24262b);\r
    border-radius: 4px 4px 0 0;\r
  }\r
\r
  /* 玻璃墙外：办公区三台显示器的冷光余晖 */\r
  .outer-glow {\r
    position: absolute; top: 26%;\r
    width: 7%; height: 9%;\r
    background: #223246;\r
    border: 2px solid #15171b;\r
    box-shadow: 0 0 16px rgba(120, 160, 220, .18);\r
    opacity: .8;\r
  }\r
  .og1 { right: 6%; } .og2 { right: 15%; top: 30%; } .og3 { right: 24%; top: 27%; }\r
\r
  /* 暖光之外的冷暗部 */\r
  .cold-dim { position: absolute; inset: 0; background: rgba(20, 26, 40, .22); pointer-events: none; }\r
</style>\r
</head>\r
<body>\r
<div class="scene s05 vignette">\r
  <div class="outer-glow og1"></div>\r
  <div class="outer-glow og2"></div>\r
  <div class="outer-glow og3"></div>\r
\r
  <div class="glass-door">\r
    <div class="name-tag">敖曼 产品经理</div>\r
    <div class="handle"></div>\r
  </div>\r
\r
  <div class="chair-s05"></div>\r
\r
  <div class="screen-big">\r
    <div class="mini-banner">临川民生集团协同办公平台</div>\r
    <div class="mini-panel"><i></i><i></i><b></b></div>\r
  </div>\r
  <div class="screen-stand"></div>\r
\r
  <div class="desk-main"></div>\r
  <div class="warm-pool"></div>\r
\r
  <div class="lamp">\r
    <div class="base"></div>\r
    <div class="arm"></div>\r
    <div class="head"></div>\r
  </div>\r
\r
  <div class="cup-s05"></div>\r
  <div class="pen"></div>\r
\r
  <a class="the-note" href="../documents/note-front.html" title="查看字条"></a>\r
  <div class="note-hint">一张手写的纸</div>\r
\r
  <div class="cold-dim"></div>\r
</div>\r
</body>\r
</html>\r
`,fn=k({raw:vn,step:"office",next:"/note",mode:"note",narrate:"玻璃门里是敖曼的办公室。台灯还亮着，暖黄的光只照亮桌面一圈，其余都沉在暗里。一把更大的椅子拉得很开，像人起身时有些仓促。桌上合着一台笔记本电脑，一个空茶杯，墙角一个相框面朝下扣着——你没去翻。桌上压着一张手写的纸，墨迹未干的边角微微翘起，像是匆忙间留下的。你拿了起来。纸边被撕得不齐，背面隐约有合同款号的打印墨迹渗过来。"}),bn=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>D01 — 敖曼的字条（正面 · CSS 降级方案）</title>\r
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap">\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/docs.css">\r
<style>\r
  body {\r
    min-height: 100vh;\r
    background: radial-gradient(ellipse at 50% 30%, #3a3d42 0%, #1e2024 75%);\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 44px 16px;\r
  }\r
  .wrap { display: flex; flex-direction: column; align-items: center; gap: 22px; }\r
  .flip-link { color: #9aa0a8; font-size: 12px; letter-spacing: 1px; text-decoration: none; border-bottom: 1px dashed #6a7078; padding-bottom: 2px; }\r
  .flip-link:hover { color: #d8dce2; }\r
</style>\r
</head>\r
<body>\r
<div class="wrap">\r
  <div class="handwritten-note">\r
    <p class="note-line" style="transform: rotate(-1.2deg)">如果你看到了这个——</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(.4deg)">我叫敖曼。启衡信息的产品经理。</p>\r
    <p class="note-line" style="transform: rotate(-.5deg)">这个项目我做了六年。</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(.7deg)">不要找我。我可能已经不在这里了。</p>\r
    <p class="note-line" style="transform: rotate(-.9deg)">也不要报警。报了也没用。你不会找到任何东西。</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(.3deg)">但是。</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(-.6deg)">如果你有办法进入这个系统——</p>\r
    <p class="note-line" style="transform: rotate(.5deg)">如果你想知道这六年里我们到底做了什么——</p>\r
    <p class="note-line" style="transform: rotate(-.8deg)">如果……你想知道为什么这里一个人都没有了。</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(.6deg); font-family: var(--font-mono); font-size: 14px;">网址：http://oa.linchuang-group.cn</p>\r
    <p class="note-line" style="transform: rotate(-.4deg)">账号：ao.man</p>\r
    <p class="note-line" style="transform: rotate(.8deg); position: relative;">\r
      密码：<span class="scribble">■■■■■■<span class="under">2 0 0 2 0 3</span></span>\r
    </p>\r
    <p class="note-line note-aside" style="margin-left: 52px; margin-top: 22px;">（那一天，第一个谎言。）</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(-.5deg)">登录后你会看到一个叫"默言"的东西。</p>\r
    <p class="note-line" style="transform: rotate(.7deg)">它看起来只是一个办公助手。</p>\r
    <p class="note-line" style="transform: rotate(-1.1deg); font-weight: bold;">它不是。</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(.4deg); font-size: 15px;">下面的符号——我在合同里看到的。在合同的最后一页。</p>\r
    <p class="note-line" style="transform: rotate(-.6deg); font-size: 15px;">在技术文档的每一页页脚。在那个东西说话的每个角落。</p>\r
    <p class="note-symbol" style="transform: rotate(-2deg)">/α\\</p>\r
    <p class="note-line" style="transform: rotate(.5deg)">我不知道它是什么意思。</p>\r
    <p class="note-line" style="transform: rotate(-.7deg)">我已经看了它六年。</p>\r
    <div class="note-gap"></div>\r
    <p class="note-line" style="transform: rotate(.6deg)">祝你好运。如果你能比我幸运的话。</p>\r
    <p class="note-line note-sign" style="transform: rotate(-.8deg)">敖曼<br>2026年X月X日</p>\r
    <span class="note-end">走</span>\r
  </div>\r
  <a class="flip-link" href="note-back.html">把字条翻过来 →</a>\r
</div>\r
</body>\r
</html>\r
`,un=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>D02 — 敖曼的字条（背面 · 合同打印片段）</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/docs.css">\r
<style>\r
  body {\r
    min-height: 100vh;\r
    background: radial-gradient(ellipse at 50% 30%, #3a3d42 0%, #1e2024 75%);\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 44px 16px;\r
  }\r
  .wrap { display: flex; flex-direction: column; align-items: center; gap: 22px; }\r
  .flip-link { color: #9aa0a8; font-size: 12px; letter-spacing: 1px; text-decoration: none; border-bottom: 1px dashed #6a7078; padding-bottom: 2px; }\r
  .flip-link:hover { color: #d8dce2; }\r
</style>\r
</head>\r
<body>\r
<div class="wrap">\r
  <div class="note-back">\r
    <h4>技术服务合同（节选）</h4>\r
    <p>甲方：临川民生服务集团有限公司</p>\r
    <p>乙方：启衡信息技术有限公司</p>\r
    <p style="margin-top:10px;">第十一条【数据一致性】乙方交付之系统应确保各类人员状态数据的唯一性与一致性。同一人员在系统中不得同时存在两个及以上有效记录；如出现重复，系统应自动合并，合并结果以平台记录为准。</p>\r
    <p>第十二条【结果确认】甲方确认，系统出具之统计、汇总及状态判定结果，视为甲方最终认可之结果。系统显示"已处理"的事项，视为已办结。</p>\r
    <p>第十四条【自动化处理】为提高效率，甲方授权系统对例行事项进行自动化处理，处理日志以系统留存为准，乙方不承担人工复核义务。</p>\r
    <p>第十七条【附则】本合同未尽事宜，由双方另行协商解决。本合同一式肆份，甲乙双方各执贰份，具有同等法律效力。</p>\r
    <div class="page-no">- 17 -</div>\r
    <div class="bleed-through">走</div>\r
    <div class="black-dot"></div>\r
    <div class="gray-foot">Powered by Cthu / Apocalypic /α\\</div>\r
    <!-- 铅笔字迹：被橡皮擦过，侧光（悬停纸张）可见 —— novel 序章/终章关键伏笔 -->\r
    <div class="pencil-mark" style="left:48px; bottom:96px; font-size:17px;">她是对的。</div>\r
    <div class="pencil-mark" style="left:48px; bottom:72px; font-size:13px; color:rgba(60,60,60,.10);">管理员敲门那次我应该——</div>\r
  </div>\r
  <a class="flip-link" href="note-front.html">← 翻回正面</a>\r
  <span style="color:#6a7078; font-size:11px;">（把鼠标移到纸面上——像用侧光看。）\r
</div>\r
</body>\r
</html>\r
`,mn={mount:function(n){o.step="note";const e=w(bn),r=w(un);n.innerHTML='<div class="view-note"><style>'+e.css+r.css+'</style><div class="note-stage" id="noteStage">'+e.body+'</div><div class="note-bar"><button class="note-flip" id="flipBtn">翻到背面 ▶</button></div></div>';const s=n.querySelector("#noteStage"),t=n.querySelector("#flipBtn");let a=!1;t.addEventListener("click",function(){a?(o.noteRead=!0,g("/lcms")):(s.innerHTML=r.body,a=!0,t.textContent="前往登录 ▶")})},unmount:function(){}},wn={"WEB-01-home.html":"/lcms","WEB-01-about.html":"/lcms/about","WEB-01-news.html":"/lcms/news"},yn=".lcms-oa-enter{position:fixed;right:22px;bottom:22px;z-index:80;padding:12px 26px;background:#1a3a5c;color:#fff;border:1px solid #2b5a8c;font-family:var(--font-oa);font-size:15px;letter-spacing:2px;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.3);}.lcms-oa-enter:hover{background:#214b76;}.lcms-toast{position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:90;background:rgba(20,30,46,.92);color:#cdd8e6;padding:8px 16px;font-size:13px;border:1px solid rgba(120,150,190,.4);opacity:0;transition:opacity .25s;pointer-events:none;}.lcms-toast.show{opacity:1;}";function A(n,e){return{mount:function(r){o.step="lcms";const s=w(n);let t=s.body;if(e)for(const i in e)t=t.split(i).join(e[i]);r.innerHTML='<div class="view-lcms lc-page web-reset"><style>'+s.css+yn+"</style>"+t+'<button class="lcms-oa-enter" id="oaEnter">员工登录 · 协同办公平台 ▶</button><div class="lcms-toast" id="lcmsToast">该栏目为序章范围外，暂未开放</div></div>',r.querySelector("#oaEnter").addEventListener("click",function(){g("/lcms/login")});let a=null;r.querySelectorAll('a[href^="WEB-01"]').forEach(function(i){i.addEventListener("click",function(c){c.preventDefault();const p=i.getAttribute("href").split("#")[0],l=wn[p];if(l)g(l);else{const v=r.querySelector("#lcmsToast");v.classList.add("show"),clearTimeout(a),a=setTimeout(function(){v.classList.remove("show")},1800)}})})},unmount:function(){}}}const xn=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>临川民生集团</title>
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset lc-page">

  <!-- 顶部条 -->
  <div class="lc-topbar">
    <div class="lc-wrap">
      <svg class="lc-logo" viewBox="0 0 120 120" aria-label="临川民生集团">
        <circle cx="60" cy="60" r="56" fill="#ffffff"/>
        <circle cx="60" cy="60" r="56" fill="none" stroke="#1a3a5c" stroke-width="3"/>
        <path d="M30,64 Q60,36 90,64" fill="none" stroke="#1a3a5c" stroke-width="5" stroke-linecap="round"/>
        <line x1="38" y1="58" x2="38" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <line x1="60" y1="49" x2="60" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <line x1="82" y1="58" x2="82" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <path d="M32,74 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#1a3a5c" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <span class="lc-name">临川民生服务集团有限公司</span>
      <span class="lc-en">LINCHUAN MINSHENG GROUP</span>
    </div>
  </div>

  <!-- 导航 -->
  <nav class="lc-nav">
    <div class="lc-wrap">
      <ul>
        <li><a href="WEB-01-home.html" class="active">首页</a></li>
        <li><a href="WEB-01-about.html">关于我们</a></li>
        <li><a href="WEB-01-news.html">新闻中心</a></li>
        <li><a href="WEB-01-home.html#biz">业务领域</a></li>
        <li><a href="WEB-01-about.html">企业文化</a></li>
        <li><a href="WEB-01-about.html#contact">联系我们</a></li>
      </ul>
    </div>
  </nav>

  <!-- 横幅 hero -->
  <header class="lc-hero">
    <svg class="lc-building" viewBox="0 0 340 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g fill="#ffffff">
        <rect x="20" y="120" width="60" height="120"/>
        <rect x="95" y="60" width="70" height="180"/>
        <rect x="180" y="30" width="80" height="210"/>
        <rect x="275" y="100" width="55" height="140"/>
        <rect x="180" y="30" width="80" height="14" fill="#b30000"/>
      </g>
      <g fill="#b30000" opacity=".5">
        <rect x="105" y="80" width="10" height="14"/><rect x="125" y="80" width="10" height="14"/><rect x="145" y="80" width="10" height="14"/>
        <rect x="105" y="110" width="10" height="14"/><rect x="125" y="110" width="10" height="14"/><rect x="145" y="110" width="10" height="14"/>
        <rect x="192" y="55" width="10" height="14"/><rect x="212" y="55" width="10" height="14"/><rect x="232" y="55" width="10" height="14"/>
        <rect x="192" y="85" width="10" height="14"/><rect x="212" y="85" width="10" height="14"/><rect x="232" y="85" width="10" height="14"/>
      </g>
    </svg>
    <div class="lc-wrap">
      <h1>服务民生　奉献社会</h1>
      <div class="lc-sub">打造一流民生服务集团</div>
    </div>
  </header>

  <!-- 通知公告 + 集团要闻 -->
  <div class="lc-wrap">
    <div class="lc-cols">
      <aside class="lc-col-left">
        <div class="lc-block-title">通知公告</div>
        <ul class="lc-notice">
          <li><span class="lc-date">2020.02.03</span><a href="WEB-01-news.html">关于启动集团疫情防控应急响应的通知</a></li>
          <li><span class="lc-date">2020.02.08</span><a href="WEB-01-news.html">关于进一步加强疫情防控期间保供工作的通知</a></li>
          <li><span class="lc-date">2023.05.18</span><a href="WEB-01-news.html">关于集团信息化办公室机构调整的通知</a></li>
        </ul>
      </aside>
      <section class="lc-col-right">
        <div class="lc-block-title">集团要闻</div>
        <ul class="lc-news">
          <li><span class="lc-date">2020-02-05</span><a href="WEB-01-news.html">“数字防疫”应急平台建设成效显著</a></li>
          <li><span class="lc-date">2020-04-20</span><a href="WEB-01-news.html">集团获评“抗疫先进单位”荣誉称号</a></li>
          <li><span class="lc-date">2023-05-18</span><a href="WEB-01-news.html">集团召开 AI 战略发布会</a></li>
          <li><span class="lc-date">2024-03-20</span><a href="WEB-01-news.html">数智员工中心正式上线</a></li>
          <li><span class="lc-date">2025-02-10</span><a href="WEB-01-news.html">智能助手完成国产化本地化升级</a></li>
        </ul>
      </section>
    </div>
  </div>

  <!-- 集团风采 -->
  <section class="lc-showcase">
    <div class="lc-wrap">
      <div class="lc-block-title">集团风采</div>
      <figure class="lc-photo">
        <img src="../png/linchuan.png" alt="临川民生服务集团有限公司领导班子合影"/>
        <figcaption>临川民生服务集团有限公司 · 领导班子合影</figcaption>
      </figure>
    </div>
  </section>

  <!-- 业务领域 -->
  <div class="lc-wrap lc-biz" id="biz">
    <div class="lc-block-title">业务领域</div>
    <div class="lc-biz-grid">
      <div class="lc-biz-card">城市物流<small>物资配送 · 仓储调度</small></div>
      <div class="lc-biz-card">社区服务<small>便民中心 · 社区配送</small></div>
      <div class="lc-biz-card">商超供应<small>超市运营 · 供应链管理</small></div>
      <div class="lc-biz-card">园区物业<small>产业园区 · 物业管理</small></div>
      <div class="lc-biz-card">公共交通<small>公交运营 · 场站管理</small></div>
    </div>
  </div>

  <!-- 页脚 -->
  <footer class="lc-footer">
    <div class="lc-wrap">
      <div class="lc-fname">临川民生服务集团有限公司</div>
      <div>地址：临川市 XX 区 XX 路 XX 号　　电话：0XXX-XXXXXXXX</div>
      <div>Copyright © 2010-2026 临川民生服务集团有限公司 版权所有</div>
      <div>临ICP备2020000100号-1（虚构）</div>
    </div>
  </footer>

</body>
</html>
`,kn=""+new URL("linchuan-BSX_itue.png",import.meta.url).href,En=A(xn,{"../png/linchuan.png":kn}),qn=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>临川民生集团</title>
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset lc-page">

  <div class="lc-topbar">
    <div class="lc-wrap">
      <svg class="lc-logo" viewBox="0 0 120 120" aria-label="临川民生集团">
        <circle cx="60" cy="60" r="56" fill="#ffffff"/>
        <circle cx="60" cy="60" r="56" fill="none" stroke="#1a3a5c" stroke-width="3"/>
        <path d="M30,64 Q60,36 90,64" fill="none" stroke="#1a3a5c" stroke-width="5" stroke-linecap="round"/>
        <line x1="38" y1="58" x2="38" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <line x1="60" y1="49" x2="60" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <line x1="82" y1="58" x2="82" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <path d="M32,74 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#1a3a5c" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <span class="lc-name">临川民生服务集团有限公司</span>
      <span class="lc-en">LINCHUAN MINSHENG GROUP</span>
    </div>
  </div>

  <nav class="lc-nav">
    <div class="lc-wrap">
      <ul>
        <li><a href="WEB-01-home.html">首页</a></li>
        <li><a href="WEB-01-about.html" class="active">关于我们</a></li>
        <li><a href="WEB-01-news.html">新闻中心</a></li>
        <li><a href="WEB-01-home.html#biz">业务领域</a></li>
        <li><a href="WEB-01-about.html">企业文化</a></li>
        <li><a href="WEB-01-about.html#contact">联系我们</a></li>
      </ul>
    </div>
  </nav>

  <div class="lc-wrap lc-section">
    <div class="lc-crumb"><a href="WEB-01-home.html">首页</a> &gt; 关于我们</div>
    <h2 class="lc-h2">关于我们</h2>

    <div class="lc-prose">
      <p>临川民生服务集团有限公司（简称“临川民生集团”）为省属国有企业，成立于 2005 年，注册资本 8.6 亿元，主要从事城市物流、社区服务、商超供应链、园区物业及公共交通配套等民生保障业务，是临川市公共服务体系的重要支撑力量。</p>
      <p>集团始终坚持以服务民生为己任，围绕城市运行与居民生活需求，持续推进数字化转型与智能化升级，努力建设一流民生服务集团。</p>
    </div>

    <h3 class="lc-block-title">领导班子</h3>
    <div class="lc-leaders">
      <div class="lc-leader"><b>董建国</b><span>党委书记、董事长</span><em>主持集团全面工作，提出“AI 不是选择题，是必答题”战略导向。</em></div>
      <div class="lc-leader"><b>张国庆</b><span>信息化办公室主任（2020-2024）</span><em>分管集团信息化建设与协同办公平台规划。</em></div>
      <div class="lc-leader"><b>刘建国</b><span>信息化办公室副主任（2024-2026）</span><em>推动数智员工中心上线与本地化部署。</em></div>
    </div>

    <h3 class="lc-block-title">发展历程</h3>
    <ul class="lc-timeline">
      <li><span class="lc-yr">2020</span> 应急状态 · 众志成城 共克时艰 <span class="lc-cnt">（年度新闻 12 条）</span></li>
      <li><span class="lc-yr">2021</span> 扩张期 · 数字化转型 高质量发展 <span class="lc-cnt">（年度新闻 10 条）</span></li>
      <li><span class="lc-yr">2022</span> 政策调整 · 后续管理要求另行通知 <span class="lc-cnt">（年度新闻 9 条）</span></li>
      <li><span class="lc-yr">2023</span> AI 转型 · AI 不是选择题是必答题 <span class="lc-cnt">（年度新闻 8 条）</span></li>
      <li><span class="lc-yr">2024</span> 降本增效 · 该优化的优化，该精简的精简 <span class="lc-cnt">（年度新闻 6 条）</span></li>
      <li><span class="lc-yr">2025</span> 自动化替代 · 数据不出域，安全可控 <span class="lc-cnt">（年度新闻 3 条）</span></li>
      <li><span class="lc-yr">2026</span> 系统更迭 · 旧版平台已关闭 <span class="lc-cnt">（年度新闻 — 条）</span></li>
    </ul>

    <h3 class="lc-block-title" id="contact">联系我们</h3>
    <div class="lc-prose">
      <p>地址：临川市 XX 区 XX 路 XX 号　　电话：0XXX-XXXXXXXX　　邮箱：webmaster@linchuang-group.cn</p>
    </div>
  </div>

  <footer class="lc-footer">
    <div class="lc-wrap">
      <div class="lc-fname">临川民生服务集团有限公司</div>
      <div>地址：临川市 XX 区 XX 路 XX 号　　电话：0XXX-XXXXXXXX</div>
      <div>Copyright © 2010-2026 临川民生服务集团有限公司 版权所有</div>
      <div>临ICP备2020000100号-1（虚构）</div>
    </div>
  </footer>

</body>
</html>
`,Cn=A(qn),Bn=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>临川民生集团</title>
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset lc-page">

  <div class="lc-topbar">
    <div class="lc-wrap">
      <svg class="lc-logo" viewBox="0 0 120 120" aria-label="临川民生集团">
        <circle cx="60" cy="60" r="56" fill="#ffffff"/>
        <circle cx="60" cy="60" r="56" fill="none" stroke="#1a3a5c" stroke-width="3"/>
        <path d="M30,64 Q60,36 90,64" fill="none" stroke="#1a3a5c" stroke-width="5" stroke-linecap="round"/>
        <line x1="38" y1="58" x2="38" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <line x1="60" y1="49" x2="60" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <line x1="82" y1="58" x2="82" y2="66" stroke="#1a3a5c" stroke-width="2.6"/>
        <path d="M32,74 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#1a3a5c" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <span class="lc-name">临川民生服务集团有限公司</span>
      <span class="lc-en">LINCHUAN MINSHENG GROUP</span>
    </div>
  </div>

  <nav class="lc-nav">
    <div class="lc-wrap">
      <ul>
        <li><a href="WEB-01-home.html">首页</a></li>
        <li><a href="WEB-01-about.html">关于我们</a></li>
        <li><a href="WEB-01-news.html" class="active">新闻中心</a></li>
        <li><a href="WEB-01-home.html#biz">业务领域</a></li>
        <li><a href="WEB-01-about.html">企业文化</a></li>
        <li><a href="WEB-01-about.html#contact">联系我们</a></li>
      </ul>
    </div>
  </nav>

  <div class="lc-wrap lc-section">
    <div class="lc-crumb"><a href="WEB-01-home.html">首页</a> &gt; 新闻中心 &gt; <strong>集团要闻</strong></div>
    <h2 class="lc-h2">集团要闻</h2>

    <ul class="lc-news" style="display:block;">
      <li style="display:block; border-bottom:1px solid #e0e0e0; padding:18px 4px;">
        <div><span class="lc-date">2025-02-10</span> <a href="WEB-01-news.html" style="font-size:18px;">智能助手完成国产化本地化升级</a></div>
        <div class="lc-excerpt">默言智能助手已完成国产化、本地化升级，实现数据不出域、安全可控的运行环境……</div>
      </li>
      <li style="display:block; border-bottom:1px solid #e0e0e0; padding:18px 4px;">
        <div><span class="lc-date">2024-03-20</span> <a href="WEB-01-news.html" style="font-size:18px;">数智员工中心正式上线</a></div>
        <div class="lc-excerpt">为贯彻落实“人工智能+”战略部署，集团数智员工中心正式投入运行……</div>
      </li>
      <li style="display:block; border-bottom:1px solid #e0e0e0; padding:18px 4px;">
        <div><span class="lc-date">2023-05-18</span> <a href="WEB-01-news.html" style="font-size:18px;">集团召开 AI 战略发布会</a></div>
        <div class="lc-excerpt">董事长董建国在会上强调：AI 不是选择题，是必答题。集团将全面推进智能化转型……</div>
      </li>
    </ul>

    <div class="lc-pager">
      <span class="cur">1</span><a href="WEB-01-news.html">2</a><a href="WEB-01-news.html">3</a><a href="WEB-01-news.html">下一页</a>
    </div>

    <h3 class="lc-block-title">更早的新闻</h3>
    <ul class="lc-news">
      <li><span class="lc-date">2024.02.20</span><a href="WEB-01-news.html">集团开展“降本增效”专项行动</a></li>
      <li><span class="lc-date">2023.02.15</span><a href="WEB-01-news.html">集团召开年度信息化建设工作会议</a></li>
      <li><span class="lc-date">2022.04.20</span><a href="WEB-01-news.html">集团荣获“省级文明单位”称号</a></li>
      <li><span class="lc-date">2021.07.20</span><a href="WEB-01-news.html">关于开展防汛应急响应的紧急通知</a></li>
      <li><span class="lc-date">2020.04.20</span><a href="WEB-01-news.html">集团荣获“抗疫先进单位”称号</a></li>
      <li><span class="lc-date">2020.02.05</span><a href="WEB-01-news.html">集团启动“数字防疫”应急平台建设</a></li>
      <li><span class="lc-date">2026.0X</span><a href="WEB-01-404.html" style="color:#CC0000;">关于旧版协同办公平台即将关闭的通知</a></li>
    </ul>
  </div>

  <footer class="lc-footer">
    <div class="lc-wrap">
      <div class="lc-fname">临川民生服务集团有限公司</div>
      <div>地址：临川市 XX 区 XX 路 XX 号　　电话：0XXX-XXXXXXXX</div>
      <div>Copyright © 2010-2026 临川民生服务集团有限公司 版权所有</div>
      <div>临ICP备2020000100号-1（虚构）</div>
    </div>
  </footer>

</body>
</html>
`,Xn=A(Bn),Mn=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>U06 — OA 登录页</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/oa.css">\r
<style>\r
  .login-logo { display: flex; justify-content: center; margin-bottom: 14px; }\r
  .login-container form { margin-top: 4px; }\r
  .login-tip { margin-top: 10px; font-size: 11px; color: #c0c4ca; text-align: center; }\r
</style>\r
</head>\r
<body>\r
<div class="login-page">\r
  <div class="login-container">\r
    <div class="login-logo">\r
      <!-- L01 临川民生集团 LOGO（小号） -->\r
      <svg width="54" height="54" viewBox="0 0 120 120">\r
        <circle cx="60" cy="60" r="56" fill="#1a56db"/>\r
        <circle cx="60" cy="60" r="48" fill="#fff"/>\r
        <circle cx="60" cy="60" r="44" fill="#1a56db"/>\r
        <path d="M30,62 Q60,34 90,62" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>\r
        <line x1="38" y1="56" x2="38" y2="64" stroke="#fff" stroke-width="2.4"/>\r
        <line x1="60" y1="47" x2="60" y2="64" stroke="#fff" stroke-width="2.4"/>\r
        <line x1="82" y1="56" x2="82" y2="64" stroke="#fff" stroke-width="2.4"/>\r
        <path d="M32,72 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>\r
        <path d="M39,82 q7,-6 14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>\r
      </svg>\r
    </div>\r
    <h1>临川民生集团协同办公平台</h1>\r
    <p class="sub">Linchuan Minsheng Group Collaborative Office Platform</p>\r
    <form id="loginForm">\r
      <input type="text" id="u" placeholder="用户名" value="ao.man">\r
      <input type="password" id="p" placeholder="密码" value="200203">\r
      <button type="submit">登 录</button>\r
    </form>\r
    <p class="login-tip" id="loginTip">推荐使用 Chrome / Edge 浏览器访问本系统</p>\r
    <p class="footer-text">\r
      Powered by Cthu / Apocalypic\r
      <span class="apocalypic-logo">/<span class="alpha">α</span>\\</span>\r
    </p>\r
  </div>\r
</div>\r
<script src="../js/engine.js"><\/script>\r
<script>\r
  document.getElementById('loginForm').addEventListener('submit', function (e) {\r
    e.preventDefault();\r
    var u = document.getElementById('u').value.trim();\r
    var p = document.getElementById('p').value.trim();\r
    if (u === 'ao.man' && p === '200203') {\r
      // 登录成功 → 进入 OA 主界面（关闭通知弹窗 + TK-2026-0001）\r
      ARG.go('layout.html');\r
    } else {\r
      document.getElementById('loginTip').textContent = '账号或密码错误。提示：密码是"那一天，第一个谎言"。';\r
      document.getElementById('loginTip').style.color = '#e34d59';\r
    }\r
  });\r
<\/script>\r
</body>\r
</html>\r
`,Tn={mount:function(n){const e=w(Mn);n.innerHTML='<div class="view-login"><style>'+e.css+'</style><div class="login-host">'+e.body+"</div></div>";const r=n.querySelector("#loginForm"),s=n.querySelector("#loginTip");r.addEventListener("submit",function(t){t.preventDefault();const a=n.querySelector("#u").value.trim(),i=n.querySelector("#p").value.trim();a==="ao.man"&&i==="200203"?(C.playPing(),o.loggedIn=!0,g("/lcms/oa")):(s.textContent='账号或密码错误。提示：密码是"那一天，第一个谎言"。',s.style.color="#e34d59")})},unmount:function(){}},zn=`<!DOCTYPE html>\r
<html lang="zh-CN">\r
<head>\r
<meta charset="UTF-8">\r
<title>OA 主界面 — 序章登录后的第一屏</title>\r
<link rel="stylesheet" href="../css/base.css">\r
<link rel="stylesheet" href="../css/oa.css">\r
<link rel="stylesheet" href="../css/horror.css">\r
<style>\r
  html, body { height: 100%; }\r
  .oa-app { min-height: 100vh; display: flex; flex-direction: column; background: #fff; }\r
  .oa-app .oa-shell { flex: 1; }\r
  /* 结局 D 时在 .oa-app 上加 fx-pixel-shift / fx-hue-drift */\r
\r
  .todo-summary { display: flex; gap: 14px; margin-bottom: 16px; }\r
  .sum-card {\r
    flex: 1; border: 1px solid var(--oa-border); padding: 12px 16px;\r
    background: #fafbfc;\r
  }\r
  .sum-card .num { font-size: 24px; font-family: var(--font-mono); color: var(--oa-dark-blue); }\r
  .sum-card .num.red { color: var(--status-red); }\r
  .sum-card .cap { font-size: 12px; color: var(--oa-text-light); margin-top: 2px; }\r
\r
  .corner-countdown { position: absolute; right: 22px; bottom: 14px; }\r
\r
  /* ---- 旧版OA关闭通知弹窗（登录后自动弹出，WIKI/13 新增） ---- */\r
  .shutdown-overlay {\r
    position: fixed; inset: 0;\r
    background: rgba(20, 28, 44, .52);\r
    display: flex; align-items: center; justify-content: center;\r
    z-index: 900;\r
  }\r
  .shutdown-modal {\r
    width: 600px;\r
    background: var(--oa-primary-blue);\r
    color: #fff;\r
    box-shadow: 0 18px 60px rgba(0,0,0,.5);\r
    font-family: var(--font-gongwen);\r
  }\r
  .shutdown-modal .sm-head {\r
    padding: 22px 30px 18px;\r
    border-bottom: 1px solid rgba(255,255,255,.25);\r
    font-size: 19px;\r
    font-weight: bold;\r
    letter-spacing: 2px;\r
  }\r
  .shutdown-modal .sm-body {\r
    padding: 22px 30px 26px;\r
    font-size: 15px;\r
    line-height: 2;\r
  }\r
  .shutdown-modal .sm-body strong { font-size: 18px; }\r
  .shutdown-modal .sm-foot {\r
    padding: 12px 30px;\r
    border-top: 1px solid rgba(255,255,255,.25);\r
    display: flex; justify-content: space-between; align-items: center;\r
  }\r
  .shutdown-modal .sm-note { font-size: 11px; color: rgba(255,255,255,.65); }\r
  .shutdown-modal .sm-close {\r
    background: #fff; color: var(--oa-primary-blue);\r
    border: none; padding: 7px 26px;\r
    font-size: 14px; font-family: var(--font-oa);\r
    cursor: pointer;\r
  }\r
  .shutdown-modal .sm-close:hover { background: #eef3ff; }\r
  .shutdown-overlay.is-closed { display: none; }\r
\r
  /* TK-2026-0001 置顶行 */\r
  .oa-table tr.tk-primary td {\r
    background: #f2f6ff;\r
    font-weight: 600;\r
    color: var(--oa-dark-blue);\r
  }\r
  .oa-table tr.tk-primary td:first-child { border-left: 3px solid var(--oa-primary-blue); }\r
  .oa-table tr.tk-primary .tk-sub {\r
    display: block; font-weight: normal; font-size: 12px; color: var(--oa-text-light); margin-top: 4px; line-height: 1.7;\r
  }\r
</style>\r
</head>\r
<body>\r
\r
<!-- 旧版OA关闭通知弹窗（登录后立即弹出，可关闭；关闭后倒计时仍在后台运行） -->\r
<div class="shutdown-overlay" id="shutdownOverlay">\r
  <div class="shutdown-modal">\r
    <div class="sm-head">关于旧版协同办公平台即将关闭的通知</div>\r
    <div class="sm-body">\r
      集团新版协同办公平台已正式上线运行。<br>\r
      当前平台（旧版）将于<strong>今日 24:00</strong> 正式关闭。<br>\r
      旧版平台中的历史数据已完成迁移。关闭后，旧版平台将无法访问。<br>\r
      如有任何历史数据查询需求，请联系信息化办公室。\r
    </div>\r
    <div class="sm-foot">\r
      <span class="sm-note">集团信息化办公室 · 系统公告</span>\r
      <button class="sm-close" onclick="document.getElementById('shutdownOverlay').classList.add('is-closed')">知道了</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<div class="oa-app">\r
\r
  <!-- 顶部导航 -->\r
  <div class="oa-topbar">\r
    <svg width="26" height="26" viewBox="0 0 120 120">\r
      <circle cx="60" cy="60" r="56" fill="#fff"/>\r
      <circle cx="60" cy="60" r="48" fill="#1a56db"/>\r
      <path d="M30,62 Q60,34 90,62" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>\r
      <path d="M32,72 q7,-6 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>\r
      <path d="M39,82 q7,-6 14,0 t14,0 t14,0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>\r
    </svg>\r
    <span class="platform-name">临川民生集团协同办公平台</span>\r
    <span class="user">敖曼</span>\r
    <span class="time">2026年7月19日 18:47</span>\r
  </div>\r
\r
  <!-- 当年横幅（2025 国产化） -->\r
  <div class="oa-banner">热烈庆祝默言智能助手完成国产化本地化升级！数据不出域！安全可控！</div>\r
\r
  <div class="oa-shell">\r
    <!-- 侧边导航 -->\r
    <nav class="oa-sidebar">\r
      <div class="oa-menu-item active">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 3h9M2 6.5h9M2 10h6"/><circle cx="12.5" cy="11.5" r="3"/><path d="M12.5 10v1.5l1 1"/></svg>\r
        <span class="grow">待办中心</span>\r
        <span class="badge-count">7</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="2" width="10" height="12"/><path d="M5.5 5h5M5.5 8h5M5.5 11h3"/></svg>\r
        <span class="grow">公文流转</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 5.5A1.5 1.5 0 013.5 4h3l1.5 2h4.5A1.5 1.5 0 0114 7.5v4A1.5 1.5 0 0112.5 13h-9A1.5 1.5 0 012 11.5z"/></svg>\r
        <span class="grow">项目管理</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 2l4 4-7 7H3v-4z"/><path d="M8.5 3.5l4 4"/></svg>\r
        <span class="grow">合同管理</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="8" r="2.4"/><path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.6 3.6l1.4 1.4M11 11l1.4 1.4M12.4 3.6L11 5M5 11l-1.4 1.4"/></svg>\r
        <span class="grow">工单中心</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="5" r="2.6"/><path d="M3 13.5c.6-2.8 2.6-4.2 5-4.2s4.4 1.4 5 4.2"/></svg>\r
        <span class="grow">通讯录</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2.5 3.5h11v7h-7l-3 2.5v-2.5h-1z"/></svg>\r
        <span class="grow">会议纪要</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2.5" y="3" width="11" height="10"/><path d="M2.5 6.5h11M5.5 3v10"/></svg>\r
        <span class="grow">资料中心</span>\r
      </div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 1.8l1.6 3.6 3.9.4-2.9 2.6.8 3.8L8 10.3l-3.4 1.9.8-3.8-2.9-2.6 3.9-.4z"/></svg>\r
        <span class="grow">智能助手</span>\r
      </div>\r
      <div class="oa-menu-divider"></div>\r
      <div class="oa-menu-item">\r
        <svg class="oa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 2.5H3v11h3M10 5l3 3-3 3M13 8H6.5"/></svg>\r
        <span class="grow">退出登录</span>\r
      </div>\r
    </nav>\r
\r
    <!-- 主内容区：待办中心 -->\r
    <main class="oa-content">\r
      <div class="oa-page-head">\r
        <span class="oa-page-title">待办中心</span>\r
        <span>\r
          <button class="btn btn-primary">新建事项</button>\r
          <button class="btn">筛选</button>\r
        </span>\r
      </div>\r
\r
      <div class="todo-summary">\r
        <div class="sum-card"><div class="num red">7</div><div class="cap">待处理</div></div>\r
        <div class="sum-card"><div class="num">0</div><div class="cap">处理中</div></div>\r
        <div class="sum-card"><div class="num">1,284</div><div class="cap">已处理（累计）</div></div>\r
        <div class="sum-card"><div class="num">3</div><div class="cap">已逾期</div></div>\r
      </div>\r
\r
      <table class="oa-table">\r
        <thead>\r
          <tr><th style="width:120px;">编号</th><th>事项</th><th style="width:110px;">来源</th><th style="width:90px;">状态</th><th style="width:120px;">截止时间</th></tr>\r
        </thead>\r
        <tbody>\r
          <!-- TK-2026-0001：旧版OA关闭前终验材料准备（置顶驱动工单） -->\r
          <tr class="tk-primary">\r
            <td>TK-2026-0001</td>\r
            <td>旧版 OA 关闭前终验材料准备\r
              <span class="tk-sub">服务器将于今日 24:00 关闭。请在关闭前完成：1. 核验全部阶段性验收材料（2020–2025）；2. 确认人员清理情况；3. 提交终验报告并签字确认。未完成的流程标记为"已终止"，未清理的账号标记为"历史遗留"。</span>\r
            </td>\r
            <td>项目管理</td>\r
            <td><span class="badge badge-pending">待处理</span></td>\r
            <td>今日 24:00</td>\r
          </tr>\r
          <!-- 以下 6 条为 TK-2026-0001 的子任务，按年份倒序排列，构成"六年"的阅读顺序 -->\r
          <tr><td>TK-2026-0001-6</td><td>【验收】2025 年智能助手本地化部署资料归档</td><td>项目管理</td><td><span class="badge badge-pending">待处理</span></td><td>23:30</td></tr>\r
          <tr><td>TK-2026-0001-5</td><td>【验收】2024 年数智员工中心上线资料归档</td><td>项目管理</td><td><span class="badge badge-pending">待处理</span></td><td>22:30</td></tr>\r
          <tr><td>TK-2026-0001-4</td><td>【验收】2023 年 AI 智能助手"默言"上线资料归档</td><td>项目管理</td><td><span class="badge badge-pending">待处理</span></td><td>21:30</td></tr>\r
          <tr><td>TK-2026-0001-3</td><td>【验收】2022 年系统规则变更归档</td><td>公文流转</td><td><span class="badge badge-pending">待处理</span></td><td>21:00</td></tr>\r
          <tr><td>TK-2026-0001-2</td><td>【验收】2021 年集团统一人员服务平台上线材料归档</td><td>项目管理</td><td><span class="badge badge-pending">待处理</span></td><td>20:30</td></tr>\r
          <tr onclick="window.location.href='../../chapter1/ch1.html'" style="cursor:pointer;" title="点击进入第一章《先上线再说》">\r
            <td>TK-2026-0001-1</td>\r
            <td>【验收】2020 年疫情应急模块上线材料归档<span class="tk-sub" style="color:var(--oa-primary-blue);">▶ 点击进入第一章《先上线再说》</span></td>\r
            <td>项目管理</td>\r
            <td><span class="badge badge-pending">待处理</span></td>\r
            <td>20:00</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
\r
      <!-- H04 倒计时钟：灰色、小字、界面角落（第六章启用） -->\r
      <div class="countdown corner-countdown">数据保留倒计时 00:23:41</div>\r
    </main>\r
  </div>\r
\r
  <!-- 底部 -->\r
  <div class="oa-footer">\r
    <span>临川民生服务集团有限公司</span>\r
    <span class="apocalypic-logo">Powered by Cthu / Apocalypic /<span class="alpha">α</span>\\</span>\r
  </div>\r
\r
</div>\r
</body>\r
</html>\r
`,Ln={mount:function(n){o.step="oa";const e=w(zn);let r=e.body.replace(/onclick="window\.location\.href='[^"]*'"/g,"").replace(/<span class="tk-sub" style="color:var\(--oa-primary-blue\);">▶ 点击进入第一章《先上线再说》<\/span>/,"");n.innerHTML='<div class="view-oa"><style>'+e.css+'</style><div class="oa-host">'+r+"</div></div>";const s=n.querySelector(".corner-countdown");let t=23*3600+41;const a=setInterval(function(){if(t<=0){clearInterval(a),s&&(s.textContent="数据保留倒计时 00:00:00");return}t--;const c=String(Math.floor(t/3600)).padStart(2,"0"),p=String(Math.floor(t%3600/60)).padStart(2,"0"),l=String(t%60).padStart(2,"0");s&&(s.textContent="数据保留倒计时 "+c+":"+p+":"+l)},1e3);this._timer=a;const i=n.querySelector(".sm-close");i&&i.addEventListener("click",function(){const c=n.querySelector("#shutdownOverlay");c&&c.classList.add("is-closed")})},unmount:function(){this._timer&&clearInterval(this._timer)}},An=".web-toast{position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:90;background:rgba(20,30,46,.92);color:#cdd8e6;padding:8px 16px;font-size:13px;border:1px solid rgba(120,150,190,.4);opacity:0;transition:opacity .25s;pointer-events:none;}.web-toast.show{opacity:1;}";function x(n,e){const r=e.imgMap||{},s=e.linkMap||{};return{mount:function(t){const a=w(n);let i=a.body;for(const l in r)i=i.split(l).join(r[l]);t.innerHTML='<div class="view-web web-reset '+(e.pageClass||"")+'"><style>'+a.css+An+"</style>"+i+'<div class="web-toast" id="webToast">该栏目暂未开放</div></div>';const c=t.querySelector(".view-web");c.querySelectorAll('a[href^="#"]').forEach(function(l){l.addEventListener("click",function(v){v.preventDefault();const f=l.getAttribute("href").slice(1),h=c.querySelector("#"+f);h&&h.scrollIntoView({behavior:"smooth"})})});let p=null;c.querySelectorAll('a[href^="WEB-0"]').forEach(function(l){l.addEventListener("click",function(v){v.preventDefault();const f=l.getAttribute("href").split("#")[0],h=s[f];if(h)g(h);else{const S=c.querySelector("#webToast");S.classList.add("show"),clearTimeout(p),p=setTimeout(function(){S.classList.remove("show")},1800)}})}),typeof e.onMount=="function"&&e.onMount(c)},unmount:function(){typeof e.onUnmount=="function"&&e.onUnmount()}}}const Sn=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>启衡信息技术有限公司——企业信息化解决方案提供商</title>
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset qh-page">

  <!-- 顶部导航（sticky） -->
  <header class="qh-nav">
    <div class="qh-wrap">
      <a class="qh-logo" href="WEB-02-home.html">
        <svg viewBox="0 0 200 60" aria-label="启衡信息">
          <text x="44" y="40" font-family="SimHei, 黑体, sans-serif" font-size="34" fill="#0d5e63" transform="rotate(-1 100 40)">启</text>
          <text x="96" y="43" font-family="SimHei, 黑体, sans-serif" font-size="34" fill="#0d5e63" transform="rotate(-1 100 40)">衡</text>
          <line x1="40" y1="54" x2="166" y2="51" stroke="#0d5e63" stroke-width="2.2" opacity=".85"/>
          <text x="44" y="56" font-family="Segoe UI, Consolas, monospace" font-size="9" fill="#7a8a94" letter-spacing="3" transform="rotate(-.6 100 52)">QIHENG INFO.</text>
        </svg>
        <b>启衡信息</b>
      </a>
      <nav>
        <ul>
          <li><a href="WEB-02-home.html" class="active">首页</a></li>
          <li><a href="#services">服务</a></li>
          <li><a href="WEB-02-cases.html">案例</a></li>
          <li><a href="#about">关于</a></li>
          <li><a href="#contact">联系</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- hero -->
  <section class="qh-hero">
    <div class="qh-wrap">
      <h1>企业信息化解决方案提供商</h1>
      <p>专注政府与企业数字化转型</p>
      <a class="qh-cta" href="#services">了解我们的服务</a>
    </div>
  </section>

  <!-- 我们的服务 -->
  <section class="qh-sec" id="services">
    <div class="qh-wrap">
      <h2>我们的服务</h2>
      <div class="qh-sub">从协同办公到 AI 落地，覆盖企业数字化全场景</div>
      <div class="qh-services">
        <div class="qh-svc">
          <div class="qh-ico">OA</div>
          <h3>OA 系统开发</h3>
          <p>协同办公平台定制开发，流程审批、门户集成、移动办公一体化。</p>
        </div>
        <div class="qh-svc">
          <div class="qh-ico">⚙</div>
          <h3>系统集成</h3>
          <p>ERP / MES 对接、数据中台建设，打通既有业务系统数据壁垒。</p>
        </div>
        <div class="qh-svc">
          <div class="qh-ico">AI</div>
          <h3>AI 应用落地</h3>
          <p>大模型私有化部署、智能助手定制，让 AI 真正服务于业务。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 公司环境 -->
  <section class="qh-sec qh-office">
    <div class="qh-wrap">
      <h2>公司环境</h2>
      <div class="qh-sub">启衡信息技术有限公司 · 临川市建国路 127 号</div>
      <div class="qh-flicker-wrap">
        <img class="qh-flicker-base" src="../png/qiheng2.png" alt="启衡办公室"/>
        <img class="qh-flicker-top" src="../png/qiheng1.png" alt="启衡办公室"/>
      </div>
    </div>
  </section>

  <!-- 客户案例 -->
  <section class="qh-sec alt">
    <div class="qh-wrap">
      <h2>客户案例</h2>
      <div class="qh-sub">我们服务过的客户（部分案例详情暂未公开）</div>
      <div class="qh-cases">
        <a class="qh-case" href="WEB-02-cases.html">
          <div class="qh-cname">临川民生服务集团</div>
          <div class="qh-cyr">2020 - 2025</div>
          <p>协同办公平台建设与智能化升级。覆盖 3,000+ 用户，集成 AI 智能助手，办公效率提升 40%。</p>
          <div class="qh-more">查看案例详情 ›</div>
        </a>
        <a class="qh-case qh-dead" href="WEB-02-404.html">
          <div class="qh-cname">某市政务服务中心</div>
          <div class="qh-cyr">案例详情了解</div>
          <p>一体化政务服务平台建设项目。（点击查看详情）</p>
          <div class="qh-more">案例详情 ›</div>
        </a>
        <a class="qh-case qh-dead" href="WEB-02-404.html">
          <div class="qh-cname">某大型物流企业</div>
          <div class="qh-cyr">案例详情了解</div>
          <p>仓储与运输调度系统升级项目。（点击查看详情）</p>
          <div class="qh-more">案例详情 ›</div>
        </a>
      </div>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="qh-footer" id="contact">
    <div class="qh-wrap">
      <b>启衡信息技术有限公司</b>
      <div>地址：临川市老城区建国路 127 号 科技市场大楼 307 室</div>
      <div>电话：0XXX-XXXXXXXX　　邮箱：info@qiheng-info.cn</div>
      <div class="qh-note">Copyright © 2016-2025 启衡信息技术有限公司（最后更新 2025 年）</div>
    </div>
  </footer>

</body>
</html>
`,Wn=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>启衡信息技术有限公司——企业信息化解决方案提供商</title>
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset qh-page">

  <header class="qh-nav">
    <div class="qh-wrap">
      <a class="qh-logo" href="WEB-02-home.html">
        <svg viewBox="0 0 200 60" aria-label="启衡信息">
          <text x="44" y="40" font-family="SimHei, 黑体, sans-serif" font-size="34" fill="#0d5e63" transform="rotate(-1 100 40)">启</text>
          <text x="96" y="43" font-family="SimHei, 黑体, sans-serif" font-size="34" fill="#0d5e63" transform="rotate(-1 100 40)">衡</text>
          <line x1="40" y1="54" x2="166" y2="51" stroke="#0d5e63" stroke-width="2.2" opacity=".85"/>
          <text x="44" y="56" font-family="Segoe UI, Consolas, monospace" font-size="9" fill="#7a8a94" letter-spacing="3" transform="rotate(-.6 100 52)">QIHENG INFO.</text>
        </svg>
        <b>启衡信息</b>
      </a>
      <nav>
        <ul>
          <li><a href="WEB-02-home.html">首页</a></li>
          <li><a href="WEB-02-home.html#services">服务</a></li>
          <li><a href="WEB-02-cases.html" class="active">案例</a></li>
          <li><a href="WEB-02-cases.html#about">关于</a></li>
          <li><a href="WEB-02-cases.html#contact">联系</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section class="qh-sec">
    <div class="qh-wrap">
      <h2 class="qh-h2">项目案例</h2>

      <!-- 真实案例 -->
      <div class="qh-detail">
        <h3>临川民生服务集团 · 协同办公平台</h3>
        <div class="qh-meta">2020 - 2025　|　OA 系统开发 + AI 应用落地</div>
        <p>为集团建设统一协同办公平台，覆盖 3,000+ 用户，打通人事、财务、后勤等多套业务系统；2023 年起集成 AI 智能助手，2025 年完成本地化私有部署。</p>
        <ul>
          <li>统一协同办公平台，覆盖集团及下属事业单位</li>
          <li>集成 AI 智能助手“默言”，办公效率提升约 40%</li>
          <li>2025 年完成国产化、本地化部署，数据不出域</li>
        </ul>
      </div>

      <!-- 失效案例（404） -->
      <div class="qh-cases">
        <a class="qh-case qh-dead" href="WEB-02-404.html">
          <div class="qh-cname">某市政务服务中心</div>
          <div class="qh-cyr">案例详情了解</div>
          <p>一体化政务服务平台建设项目。（点击查看详情）</p>
          <div class="qh-more">案例详情 ›</div>
        </a>
        <a class="qh-case qh-dead" href="WEB-02-404.html">
          <div class="qh-cname">某大型物流企业</div>
          <div class="qh-cyr">案例详情了解</div>
          <p>仓储与运输调度系统升级项目。（点击查看详情）</p>
          <div class="qh-more">案例详情 ›</div>
        </a>
      </div>

      <!-- 关于启衡（含暗线） -->
      <div id="about" style="margin-top:46px;">
        <h2 class="qh-h2">关于启衡信息</h2>
        <div class="qh-prose">
          <p>启衡信息技术有限公司成立于 2016 年，是一家专注于企业信息化与系统集成的小型民营 IT 公司，曾为多家政企客户提供协同办公、数据中台与 AI 应用落地服务。</p>
        </div>
        <div class="qh-team">
          <b>团队</b>：团队合影拍摄于 <b>2021 年</b>，当时共有 <b>25 人</b>。<br>
          （该照片仍展示于本页——但截至 2026 年，照片中的人已均不在公司。）
        </div>
      </div>
    </div>
  </section>

  <footer class="qh-footer" id="contact">
    <div class="qh-wrap">
      <b>启衡信息技术有限公司</b>
      <div>地址：临川市老城区建国路 127 号 科技市场大楼 307 室</div>
      <div>电话：0XXX-XXXXXXXX　　邮箱：info@qiheng-info.cn</div>
      <div class="qh-note">Copyright © 2016-2025 启衡信息技术有限公司（最后更新 2025 年）</div>
    </div>
  </footer>

</body>
</html>
`,In=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>启衡信息技术有限公司</title>
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset qh-page">

  <div class="qh-404">
    <div class="qh-code">404</div>
    <h2>页面未找到</h2>
    <p style="color:#888;margin-bottom:22px;">该页面不存在或已移除。</p>
    <a href="WEB-02-home.html">返回首页</a>
  </div>

</body>
</html>
`,On=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Apocalypic</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%230a0a0a'/%3E%3Ctext x='0.5' y='12.5' font-family='monospace' font-size='12' fill='%23e8e8e8'%3E/%CE%B1%5C%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset ap-page">

  <main class="ap-home">

    <!-- 首屏 -->
    <section class="ap-hero">
      <div class="ap-logo" id="apLogo">/α\\</div>
      <div class="ap-brand">Apocalypic</div>
      <hr class="ap-divider">
      <div class="ap-tagline">enterprise intelligence infrastructure</div>
      <a class="ap-link" href="WEB-03-product.html">[ Products ]</a>
    </section>

    <!-- 滚动视差区块 -->
    <section class="ap-block">
      <div class="ap-title-xl ap-fade">Cthu</div>
      <div class="ap-desc ap-fade">a language model infrastructure</div>
      <a class="ap-link ap-fade" href="WEB-03-product.html">[ 了解更多 ]</a>
    </section>

    <section class="ap-block">
      <div class="ap-keywords ap-fade">enterprise&nbsp;&nbsp;·&nbsp;&nbsp;private&nbsp;&nbsp;·&nbsp;&nbsp;sovereign</div>
    </section>

  </main>

  <!-- 从 2019 年第一版就存在的注释。没有人删除它。或者——没有人能删除它。 -->
  <!-- /α\\ -->

  <script>
    // 页面加载：黑屏 1 秒，然后 /α\\ 极慢淡入（1.5s）
    window.addEventListener('load', function () {
      setTimeout(function () { document.body.classList.add('ap-ready'); }, 1000);
    });

    // Logo 悬停：1.5s 颜色过渡（CSS）；悬停超过 5 秒触发 0.5px 像素微颤
    var logo = document.getElementById('apLogo');
    var creepTimer = null;
    logo.addEventListener('mouseenter', function () {
      creepTimer = setTimeout(function () { logo.classList.add('creep'); }, 5000);
    });
    logo.addEventListener('mouseleave', function () {
      clearTimeout(creepTimer);
      logo.classList.remove('creep');
    });

    // 滚动视差：文字从深灰 (#444) 缓慢淡入为白 (#e8)，越往下滚动越清晰
    function apParallax() {
      var vh = window.innerHeight;
      var nodes = document.querySelectorAll('.ap-fade');
      for (var i = 0; i < nodes.length; i++) {
        var r = nodes[i].getBoundingClientRect();
        var center = r.top + r.height / 2;
        var p = (vh * 0.85 - center) / (vh * 0.7);
        if (p < 0) p = 0; if (p > 1) p = 1;
        var from = [68, 68, 68], to = [232, 232, 232], c = [];
        for (var k = 0; k < 3; k++) c[k] = Math.round(from[k] + (to[k] - from[k]) * p);
        nodes[i].style.color = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
      }
    }
    var ticking = false;
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(function () { apParallax(); ticking = false; }); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', apParallax);
    apParallax();
  <\/script>

</body>
</html>
`,Pn=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Apocalypic — Products</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%230a0a0a'/%3E%3Ctext x='0.5' y='12.5' font-family='monospace' font-size='12' fill='%23e8e8e8'%3E/%CE%B1%5C%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset ap-page">

  <main class="ap-product">
    <a class="ap-back" href="WEB-03-home.html">← Back</a>

    <h1>Cthu-Enterprise</h1>
    <hr class="ap-divider">

    <div class="ap-h3">Model Capabilities</div>
    <ul class="ap-spec-list">
      <li><b></b>企业级私有化部署</li>
      <li><b></b>训练数据全程不出域</li>
      <li><b></b>全量权限管控与审计</li>
      <li><b></b>支持国产硬件适配</li>
      <li><b></b>自定义微调与领域适配</li>
    </ul>

    <div class="ap-h3">Technical Specifications</div>
    <ul class="ap-spec-list">
      <li><b>参数规模</b>~30B</li>
      <li><b>上下文窗口</b>32K</li>
      <li><b>推理框架</b>Cthu Runtime v3</li>
      <li><b>部署方式</b>本地私有化（Docker / 裸金属）</li>
      <li><b>最低硬件</b>4×A100 80GB / 等效国产加速卡</li>
    </ul>

    <div class="ap-h3">For inquiries</div>
    <div class="ap-cap">sales@apocalypic.ai</div>
    <div class="ap-cap">——</div>
    <div class="ap-cap">support@apocalypic.ai</div>
    <div class="ap-cap">——</div>
    <div class="ap-cap">legal@apocalypic.ai</div>

    <div class="ap-foot">Powered by Cthu /α\\</div>
  </main>

  <!-- /α\\ -->

</body>
</html>
`,Nn=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Apocalypic</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%230a0a0a'/%3E%3Ctext x='0.5' y='12.5' font-family='monospace' font-size='12' fill='%23e8e8e8'%3E/%CE%B1%5C%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/web.css">
</head>
<body class="web-reset ap-page">

  <div class="ap-404">
    <div class="ap-logo">/α\\</div>
  </div>

  <!-- /α\\ -->

</body>
</html>
`,Hn=""+new URL("qiheng1-CzeFeNYw.png",import.meta.url).href,Dn=""+new URL("qiheng2-GYJX3Iwx.png",import.meta.url).href,U={"WEB-02-home.html":"/web/qiheng","WEB-02-cases.html":"/web/qiheng/cases","WEB-02-404.html":"/web/qiheng/404"},Rn={"../png/qiheng1.png":Hn,"../png/qiheng2.png":Dn},Un=x(Sn,{pageClass:"qh-page",imgMap:Rn,linkMap:U}),Fn=x(Wn,{pageClass:"qh-page",linkMap:U}),Gn=x(In,{pageClass:"qh-page",linkMap:{"WEB-02-home.html":"/web/qiheng"}}),F={"WEB-03-home.html":"/web/apocalypic","WEB-03-product.html":"/web/apocalypic/product","WEB-03-404.html":"/web/apocalypic/404"};let G=null,B=null,X=null,q=null;function Yn(n){q=n,G=setTimeout(function(){document.body.classList.add("ap-ready")},1e3);function e(){const s=window.innerHeight,t=n.querySelectorAll(".ap-fade");for(let a=0;a<t.length;a++){const i=t[a].getBoundingClientRect(),c=i.top+i.height/2;let p=(s*.85-c)/(s*.7);p<0&&(p=0),p>1&&(p=1);const l=[68,68,68],v=[232,232,232],f=[];for(let h=0;h<3;h++)f[h]=Math.round(l[h]+(v[h]-l[h])*p);t[a].style.color="rgb("+f[0]+","+f[1]+","+f[2]+")"}}let r=!1;B=function(){r||(window.requestAnimationFrame(function(){e(),r=!1}),r=!0)},X=e,n.addEventListener("scroll",B,{passive:!0}),window.addEventListener("resize",X),e()}function jn(){clearTimeout(G),document.body.classList.remove("ap-ready"),q&&B&&q.removeEventListener("scroll",B),X&&window.removeEventListener("resize",X),q=null}const Kn=x(On,{pageClass:"ap-page",linkMap:F,onMount:Yn,onUnmount:jn}),Qn=x(Pn,{pageClass:"ap-page",linkMap:F}),_n=x(Nn,{pageClass:"ap-page",linkMap:{"WEB-03-home.html":"/web/apocalypic"}});tn(document.getElementById("app"));V({"/":sn,"/physical/building":on,"/physical/corridor1f":dn,"/physical/corridor3f":pn,"/physical/room307":gn,"/physical/office":fn,"/note":mn,"/lcms":En,"/lcms/about":Cn,"/lcms/news":Xn,"/lcms/login":Tn,"/lcms/oa":Ln,"/web/qiheng":Un,"/web/qiheng/cases":Fn,"/web/qiheng/404":Gn,"/web/apocalypic":Kn,"/web/apocalypic/product":Qn,"/web/apocalypic/404":_n});en();
