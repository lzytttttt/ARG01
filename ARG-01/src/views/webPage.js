import { parseRaw } from '../raw.js';
import { navigate } from '../router.js';

// 公司官网页面通用工厂（启衡 WEB-02 / Apocalypic WEB-03 等）。
// 这些页面「先仅通过修改地址访问」：不接入游戏内导航，仅把站内链接拦截为 SPA 跳转，
// 锚点（#services 等）改为页内滚动，未映射链接提示暂未开放。
// opts: { pageClass, imgMap, linkMap, onMount(container), onUnmount() }
const CHROME_CSS =
  '.web-toast{position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:90;' +
    'background:rgba(20,30,46,.92);color:#cdd8e6;padding:8px 16px;font-size:13px;' +
    'border:1px solid rgba(120,150,190,.4);opacity:0;transition:opacity .25s;pointer-events:none;}' +
  '.web-toast.show{opacity:1;}';

export function makeWebPage(rawHtml, opts) {
  const imgMap = opts.imgMap || {};
  const linkMap = opts.linkMap || {};
  return {
    mount: function (container) {
      const p = parseRaw(rawHtml);
      let body = p.body;
      for (const from in imgMap) body = body.split(from).join(imgMap[from]);

      container.innerHTML =
        '<div class="view-web web-reset ' + (opts.pageClass || '') + '"><style>' + p.css + CHROME_CSS +
        '</style>' + body +
        '<div class="web-toast" id="webToast">该栏目暂未开放</div></div>';

      const view = container.querySelector('.view-web');

      // 锚点链接：页内平滑滚动
      view.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          const id = a.getAttribute('href').slice(1);
          const el = view.querySelector('#' + id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
      });

      // 站内页面链接：拦截为 SPA 跳转
      let toastTimer = null;
      view.querySelectorAll('a[href^="WEB-0"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          const base = a.getAttribute('href').split('#')[0];
          const target = linkMap[base];
          if (target) {
            navigate(target);
          } else {
            const t = view.querySelector('#webToast');
            t.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
          }
        });
      });

      if (typeof opts.onMount === 'function') opts.onMount(view);
    },
    unmount: function () {
      if (typeof opts.onUnmount === 'function') opts.onUnmount();
    }
  };
}
