import { makeLcmsPage } from './lcmsPage.js';
import { navigate } from '../router.js';
import { ARG_Horror } from '../horror/horror.js';
import { ARG_Audio } from '../audio/audio.js';
import raw from '../../../assets/web/WEB-01-home.html?raw';
import lcms404Raw from '../../../assets/web/WEB-01-404.html?raw';
import lcmsImg from '../../../assets/png/linchuan.png';

// 临川民生集团官网主页（数字空间初始主页）。
// 玩家读完字条后抵达此处，进入自由探索；页面提供「协同办公平台 / OA 登录」入口。
export default makeLcmsPage(raw, { '../png/linchuan.png': lcmsImg });

// 404 页面（旧版协同办公平台关闭通知导至此）：叠加恐怖动效 + 音效。
// 复用 makeLcmsPage 渲染 WEB-01-404，再在其上挂接 horror 层，不改变既有数字空间过渡。
const base404 = makeLcmsPage(lcms404Raw, { '../png/linchuan.png': lcmsImg });
let lcms404Timer = null;

export const lcms404 = {
  mount: function (container) {
    base404.mount(container);

    const page = container.querySelector('.lc-404');
    const h2 = page ? page.querySelector('h2') : null;
    const glyph = page ? page.querySelector('.lc-404-glyph') : null;

    // 视觉：标题微颤 + 整页色相漂移 + /α\ 幽灵残影与噪声（悬停消退）
    if (h2) h2.classList.add('fx-text-jitter');
    if (page) page.classList.add('fx-hue-drift', 'fx-whisper');
    if (glyph) glyph.classList.add('fx-ghost-text');

    // 入场：黑闪 → 血色一闪 → 30Hz 嗡声 + 系统提示音 + 贴耳低语
    ARG_Horror.blackFlash(180);
    ARG_Horror.bloodTint({ duration: 1000 });
    ARG_Horror.phaseHum(true);
    ARG_Audio.playPing();
    setTimeout(function () { ARG_Audio.playWhisper(); }, 1100);

    // 停留期间：偶发黑闪 + 低语，维持不安
    lcms404Timer = setInterval(function () {
      ARG_Horror.blackFlash(120);
      ARG_Audio.playWhisper();
    }, 7000);
  },
  unmount: function () {
    if (lcms404Timer) { clearInterval(lcms404Timer); lcms404Timer = null; }
    ARG_Horror.phaseHum(false);
    ARG_Horror.clearBlood();
    if (typeof base404.unmount === 'function') base404.unmount();
  }
};
