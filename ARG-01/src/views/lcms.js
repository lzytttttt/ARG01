import { makeLcmsPage } from './lcmsPage.js';
import raw from '../../../assets/web/WEB-01-home.html?raw';
import lcmsImg from '../../../assets/png/linchuan.png';

// 临川民生集团官网主页（数字空间初始主页）。
// 玩家读完字条后抵达此处，进入自由探索；页面提供「协同办公平台 / OA 登录」入口。
export default makeLcmsPage(raw, { '../png/linchuan.png': lcmsImg });
