import { parseRaw } from '../raw.js';
import { navigate, flow } from '../router.js';

// 临川民生集团官网页面工厂：home / about / news 共用同一套顶部条 + 导航 + 页脚，
// 仅正文不同。导航中的站内链接拦截为 SPA 内跳转，未接入栏目提示「暂未开放」。
// 每个页面都保留右下角「协同办公平台 / OA 登录」入口，方便自由探索时随时登录。
const LINK_MAP = {
  'WEB-01-home.html': '/lcms',
  'WEB-01-about.html': '/lcms/about',
  'WEB-01-news.html': '/lcms/news'
};

const CHROME_CSS =
  '.lcms-oa-enter{position:fixed;right:22px;bottom:22px;z-index:80;' +
    'padding:12px 26px;background:#1a3a5c;color:#fff;border:1px solid #2b5a8c;' +
    'font-family:var(--font-oa);font-size:15px;letter-spacing:2px;cursor:pointer;' +
    'box-shadow:0 6px 18px rgba(0,0,0,.3);}' +
  '.lcms-oa-enter:hover{background:#214b76;}' +
  '.lcms-toast{position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:90;' +
    'background:rgba(20,30,46,.92);color:#cdd8e6;padding:8px 16px;font-size:13px;' +
    'border:1px solid rgba(120,150,190,.4);opacity:0;transition:opacity .25s;pointer-events:none;}' +
  '.lcms-toast.show{opacity:1;}';

export function makeLcmsPage(rawHtml, imgMap) {
  return {
    mount: function (container) {
      flow.step = 'lcms';
      const p = parseRaw(rawHtml);

      let body = p.body;
      if (imgMap) {
        for (const from in imgMap) {
          body = body.split(from).join(imgMap[from]);
        }
      }

      container.innerHTML =
        '<div class="view-lcms lc-page web-reset"><style>' + p.css + CHROME_CSS +
        '</style>' + body +
        '<button class="lcms-oa-enter" id="oaEnter">员工登录 · 协同办公平台 ▶</button>' +
        '<div class="lcms-toast" id="lcmsToast">该栏目为序章范围外，暂未开放</div></div>';

      container.querySelector('#oaEnter').addEventListener('click', function () {
        navigate('/lcms/login');
      });

      // 拦截站内栏目链接：已接入的跳 SPA 路由，未接入的提示暂未开放
      let toastTimer = null;
      container.querySelectorAll('a[href^="WEB-01"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          const base = a.getAttribute('href').split('#')[0];
          const target = LINK_MAP[base];
          if (target) {
            navigate(target);
          } else {
            const t = container.querySelector('#lcmsToast');
            t.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
          }
        });
      });
    },
    unmount: function () {}
  };
}
