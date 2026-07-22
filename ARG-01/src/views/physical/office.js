import { sceneView } from './sceneView.js';
import raw from '../../../../assets/scenes/s05-aoman-office.html?raw';
import docPhoto from '../../../../assets/documents/d-photo.html?raw';

export default sceneView({
  raw: raw,
  step: 'office',
  next: '/note',
  back: '/physical/room307',
  mode: 'note',
  narrate: '你推开玻璃门。里面一张更大的桌子，一台合着的笔记本电脑，一个空茶杯。台灯还亮着，暖黄的光只照亮桌面一圈，其余都沉在暗里——像人起身时走得很急。桌上压着一张手写的纸。墨迹未干的边角微微翘起。你拿了起来。纸边被撕得不齐，背面隐约有打印墨迹渗透过来。你的手指在纸的边缘停住了——纸比你想象的要冷。像刚从冰箱里拿出来的。但这一层没有冰箱。',
  docs: { photo: docPhoto }
});
