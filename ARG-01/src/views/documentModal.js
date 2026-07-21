import { parseRaw } from '../raw.js';

// 通用文档弹窗：玻璃拟态深色面板，居中浮于场景之上。
// openDocument(rawHtml, opts?)  —— opts.title 可选（预留）
// closeDocument()
// 样式自注入，不依赖 shell.css；点击遮罩 / 关闭按钮 / Esc 关闭。
let overlay = null;
let styleInjected = false;

const MODAL_CSS = `
.doc-modal-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(8, 10, 14, 0.72);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity .2s ease;
  padding: 24px;
}
.doc-modal-overlay.is-open { opacity: 1; pointer-events: auto; }
.doc-modal {
  position: relative;
  max-width: 880px; width: 100%; max-height: 86vh;
  background: linear-gradient(180deg, #1c1d21 0%, #14161a 100%);
  border: 1px solid rgba(90, 141, 232, 0.28);
  border-radius: 10px;
  box-shadow: 0 24px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.02) inset;
  overflow: hidden;
  transform: translateY(12px) scale(.98);
  transition: transform .22s ease;
  display: flex; flex-direction: column;
}
.doc-modal-overlay.is-open .doc-modal { transform: translateY(0) scale(1); }
.doc-modal-close {
  position: absolute; top: 10px; right: 12px; z-index: 2;
  width: 30px; height: 30px; border: none; border-radius: 50%;
  background: rgba(255,255,255,.06); color: #9aa0a8;
  font-size: 18px; line-height: 1; cursor: pointer;
  transition: background .15s, color .15s;
}
.doc-modal-close:hover { background: rgba(227,77,89,.22); color: #fff; }
.doc-modal-body {
  overflow: auto; padding: 28px 30px;
  color: #d8dce2; font-size: 15px; line-height: 1.8;
}
.doc-modal-body::-webkit-scrollbar { width: 8px; }
.doc-modal-body::-webkit-scrollbar-thumb { background: #35383f; border-radius: 4px; }
`;

function ensure() {
  if (!styleInjected) {
    const s = document.createElement('style');
    s.textContent = MODAL_CSS;
    document.head.appendChild(s);
    styleInjected = true;
  }
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.className = 'doc-modal-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="doc-modal" role="dialog" aria-modal="true">' +
      '<button class="doc-modal-close" aria-label="关闭">×</button>' +
      '<div class="doc-modal-body"></div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.classList.contains('doc-modal-close')) closeDocument();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) closeDocument();
  });
  return overlay;
}

export function openDocument(rawHtml, opts) {
  opts = opts || {};
  const ov = ensure();
  const body = ov.querySelector('.doc-modal-body');
  const p = parseRaw(rawHtml);
  body.innerHTML = '<style>' + p.css + '</style>' + p.body;
  ov.classList.add('is-open');
  ov.setAttribute('aria-hidden', 'false');
}

export function closeDocument() {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  // 留出退出动画后再清空，避免动画期间白屏
  setTimeout(function () {
    if (overlay && !overlay.classList.contains('is-open')) {
      const body = overlay.querySelector('.doc-modal-body');
      if (body) body.innerHTML = '';
    }
  }, 220);
}
