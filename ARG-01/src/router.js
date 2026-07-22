// 轻量 hash 路由 + 序章引导顺序守卫（内存态，不持久化）
import { playBoot, playPowerDown } from './transition.js';

export const flow = (window.__flow = {
  step: 'portal',     // portal | building | corridor1f | corridor3f | room307 | office | note | lcms | login | oa | ch1 | ch2
  noteRead: false,
  loggedIn: false,
  muted: false,
  // 第一章内存态进度（无持久化，刷新回门户）
  ch1Completed: false,
  // 第二章内存态进度
  ch2Completed: false,
  // 章节选择记录（内存态，后续做持久化时迁移至 localStorage）
  choices: {} // 例：ch1_excelVersion = 'original' | 'verified' | 'official'
});

let routes = {};
let current = null;
let viewRoot = null;
let lastPath = null;

export function registerRoutes(map) {
  routes = map;
}

// 空间划分：physical 含物理场景与字条阅读；digital 为 /lcms 系列；other 为门户等
function spaceOf(p) {
  if (p.startsWith('/physical') || p === '/note') return 'physical';
  if (p.startsWith('/lcms')) return 'digital';
  return 'other';
}

export function navigate(path) {
  if (path === location.hash.slice(1)) {
    render();
  } else {
    location.hash = path;
  }
}

function currentPath() {
  return location.hash.slice(1) || '/';
}

// 序章顺序守卫：物理步骤不可跳步；登录需已读字条；OA 需已登录
function guard(path) {
  switch (path) {
    case '/physical/building':    return flow.step === 'portal';
    case '/physical/corridor1f':  return flow.step === 'building';
    case '/physical/corridor3f':  return flow.step === 'corridor1f';
    case '/physical/room307':     return ['corridor3f','room307','office','note'].indexOf(flow.step) >= 0;
    case '/physical/office':      return flow.step === 'room307';
    case '/note':                 return flow.step === 'office';
    case '/lcms':                 return flow.noteRead === true;
    case '/lcms/about':           return flow.noteRead === true;
    case '/lcms/news':            return flow.noteRead === true;
    case '/lcms/login':           return flow.noteRead === true;
    case '/lcms/404':             return flow.noteRead === true;
    case '/lcms/oa':              return flow.loggedIn === true;
    case '/lcms/oa/ch1':          return flow.loggedIn === true; // 第一章属 digital，不触发关机动效
    case '/lcms/oa/ch2':          return flow.loggedIn === true && flow.ch1Completed === true;
    default:                      return true; // '/' 与未知路径回落到门户
  }
}

// 越级访问时跳回当前应处步骤
function fallback() {
  if (flow.loggedIn) {
    // 第二章已完成时越级回落到第二章（仍在终验流程内）
    if (flow.ch2Completed) return '/lcms/oa/ch2';
    // 第一章已完成时越级回落到第一章（仍在终验流程内）
    if (flow.ch1Completed) return '/lcms/oa/ch1';
    return '/lcms/oa';
  }
  if (flow.noteRead) return '/lcms';
  if (flow.step && flow.step !== 'portal') return '/' + flow.step;
  return '/';
}

export function render() {
  const path = currentPath();
  if (!guard(path)) {
    const fb = fallback();
    if (fb !== path) location.hash = fb;
    return;
  }
  const view = routes[path] || routes['/'];
  if (!view) return;

  function doMount() {
    if (current && typeof current.unmount === 'function') {
      try { current.unmount(); } catch (e) { /* noop */ }
    }
    viewRoot.innerHTML = '';
    current = view;
    if (typeof view.mount === 'function') view.mount(viewRoot);
    lastPath = path;
  }

  // 物理 ↔ 数字 切换时播放唤醒/关机动效，其余直装
  const fromSpace = lastPath ? spaceOf(lastPath) : null;
  const toSpace = spaceOf(path);
  if (fromSpace === 'physical' && toSpace === 'digital') {
    playBoot(doMount);
  } else if (fromSpace === 'digital' && toSpace === 'physical') {
    playPowerDown(doMount);
  } else {
    doMount();
  }
}

export function startRouter() {
  viewRoot = document.getElementById('view');
  // 数字空间新标签页种子：?d=1 表示由物理字条新开标签进入网络空间，
  // 种子 noteRead 以通过 /lcms 守卫；lastPath 置为物理字条以触发唤醒电脑动效
  const params = new URLSearchParams(location.search);
  if (params.get('d') === '1') {
    flow.noteRead = true;
    lastPath = '/note';
  }
  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = '/';
  else render();
}
