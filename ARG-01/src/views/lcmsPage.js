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
  '.lcms-toast.show{opacity:1;}' +
  // 404 恐怖层附加样式：/α\ 幽灵符号 + 容器定位
  '.lc-404{position:relative;overflow:hidden;}' +
  '.lc-404-glyph{position:absolute;top:6%;right:9%;font-family:var(--font-mono);' +
    'font-size:72px;line-height:1;color:rgba(170,40,40,.13);letter-spacing:6px;' +
    'pointer-events:none;user-select:none;}' +
  '.lc-404-foot{margin-top:18px;font-size:12px;color:rgba(150,160,175,.5);' +
    'font-family:var(--font-mono);letter-spacing:1px;}';

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
          // 序章专属：旧版协同办公平台关闭通知 → 导向 WEB-01 404（含恐怖动效）
          if (a.getAttribute('href') === 'WEB-01-news.html#p2') {
            navigate('/lcms/404');
            return;
          }
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
