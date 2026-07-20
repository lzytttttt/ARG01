import { makeWebPage } from './webPage.js';
import qhHome from '../../../assets/web/WEB-02-home.html?raw';
import qhCases from '../../../assets/web/WEB-02-cases.html?raw';
import qh404 from '../../../assets/web/WEB-02-404.html?raw';
import apHome from '../../../assets/web/WEB-03-home.html?raw';
import apProduct from '../../../assets/web/WEB-03-product.html?raw';
import ap404 from '../../../assets/web/WEB-03-404.html?raw';
import qhImg1 from '../../../assets/png/qiheng1.png';
import qhImg2 from '../../../assets/png/qiheng2.png';

// WEB-02 启衡信息（先仅通过修改地址访问）
const QH_LINKS = {
  'WEB-02-home.html': '/web/qiheng',
  'WEB-02-cases.html': '/web/qiheng/cases',
  'WEB-02-404.html': '/web/qiheng/404'
};
const QH_IMG = { '../png/qiheng1.png': qhImg1, '../png/qiheng2.png': qhImg2 };

export const qiheng = makeWebPage(qhHome, { pageClass: 'qh-page', imgMap: QH_IMG, linkMap: QH_LINKS });
export const qihengCases = makeWebPage(qhCases, { pageClass: 'qh-page', linkMap: QH_LINKS });
export const qiheng404 = makeWebPage(qh404, { pageClass: 'qh-page', linkMap: { 'WEB-02-home.html': '/web/qiheng' } });

// WEB-03 Apocalypic（先仅通过修改地址访问）
// 原页面脚本在 innerHTML 注入后不会执行，这里复刻其「黑屏淡入 + 滚动视差」逻辑。
const AP_LINKS = {
  'WEB-03-home.html': '/web/apocalypic',
  'WEB-03-product.html': '/web/apocalypic/product',
  'WEB-03-404.html': '/web/apocalypic/404'
};

let apReadyTimer = null;
let apScrollHandler = null;
let apResizeHandler = null;
let apView = null;

function initApocalypic(view) {
  apView = view;
  // 黑屏 1 秒后让 /α\ 淡入（CSS: body.ap-ready .ap-logo）
  apReadyTimer = setTimeout(function () { document.body.classList.add('ap-ready'); }, 1000);

  function apParallax() {
    const vh = window.innerHeight;
    const nodes = view.querySelectorAll('.ap-fade');
    for (let i = 0; i < nodes.length; i++) {
      const r = nodes[i].getBoundingClientRect();
      const center = r.top + r.height / 2;
      let pp = (vh * 0.85 - center) / (vh * 0.7);
      if (pp < 0) pp = 0; if (pp > 1) pp = 1;
      const from = [68, 68, 68], to = [232, 232, 232], c = [];
      for (let k = 0; k < 3; k++) c[k] = Math.round(from[k] + (to[k] - from[k]) * pp);
      nodes[i].style.color = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
    }
  }

  let ticking = false;
  apScrollHandler = function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { apParallax(); ticking = false; });
      ticking = true;
    }
  };
  apResizeHandler = apParallax;

  view.addEventListener('scroll', apScrollHandler, { passive: true });
  window.addEventListener('resize', apResizeHandler);
  apParallax();
}

function cleanupApocalypic() {
  clearTimeout(apReadyTimer);
  document.body.classList.remove('ap-ready');
  if (apView && apScrollHandler) apView.removeEventListener('scroll', apScrollHandler);
  if (apResizeHandler) window.removeEventListener('resize', apResizeHandler);
  apView = null;
}

export const apocalypic = makeWebPage(apHome, { pageClass: 'ap-page', linkMap: AP_LINKS, onMount: initApocalypic, onUnmount: cleanupApocalypic });
export const apocalypicProduct = makeWebPage(apProduct, { pageClass: 'ap-page', linkMap: AP_LINKS });
export const apocalypic404 = makeWebPage(ap404, { pageClass: 'ap-page', linkMap: { 'WEB-03-home.html': '/web/apocalypic' } });
