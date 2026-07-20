import { sceneView } from './sceneView.js';
import raw from '../../../../assets/scenes/s05-aoman-office.html?raw';

export default sceneView({
  raw: raw,
  step: 'office',
  next: '/note',
  mode: 'note',
  narrate: '玻璃门里是敖曼的办公室。台灯还亮着，暖黄的光只照亮桌面一圈，其余都沉在暗里。一把更大的椅子拉得很开，像人起身时有些仓促。桌上合着一台笔记本电脑，一个空茶杯，墙角一个相框面朝下扣着——你没去翻。桌上压着一张手写的纸，墨迹未干的边角微微翘起，像是匆忙间留下的。你拿了起来。纸边被撕得不齐，背面隐约有合同款号的打印墨迹渗过来。'
});
