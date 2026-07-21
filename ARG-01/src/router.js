// 轻量 hash 路由 + 序章引导顺序守卫（内存态，不持久化）
import { playBoot, playPowerDown } from './transition.js';

export const flow = (window.__flow = {
  step: 'portal',     // portal | building | corridor1f | corridor3f | room307 | office | note | lcms | login | oa
  noteRead: false,
  loggedIn: false,
  muted: false
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
    case '/physical/room307':     return flow.step === 'corridor3f';
    case '/physical/office':      return flow.step === 'room307';
    case '/note':                 return flow.step === 'office';
    case '/lcms':                 return flow.noteRead === true;
    case '/lcms/about':           return flow.noteRead === true;
    case '/lcms/news':            return flow.noteRead === true;
    case '/lcms/login':           return flow.noteRead === true;
    case '/lcms/404':             return flow.noteRead === true;
    case '/lcms/oa':              return flow.loggedIn === true;
    default:                      return true; // '/' 与未知路径回落到门户
  }
}

// 越级访问时跳回当前应处步骤
function fallback() {
  if (flow.loggedIn) return '/lcms/oa';
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
  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = '/';
  else render();
}
