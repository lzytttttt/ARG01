import { sceneView } from './sceneView.js';
import raw from '../../../../assets/scenes/s02-corridor-1f.html?raw';

export default sceneView({
  raw: raw,
  step: 'corridor1f',
  next: '/physical/corridor3f',
  btn: '上三楼 ▶',
  narrate: '一楼没人。卷帘门都拉到底了。电梯门上贴着一张发黄的停运通知，日期还是五年前的夏天。每层楼梯转角都有灭火器，年检标早过期了。你路过地下室那扇门——锁着。门把手上落了灰。你不知道钥匙在哪。它存在，但从不被提及，像某种被刻意忽略的东西。走廊里头顶三根灯管只剩一根亮着，最里头那根每隔几秒抽搐似的闪一下，把影子拉得忽长忽短。天花板渗着水，水珠落进地面那摊浑黄的水洼——叮、咚、叮。节奏不规则。墙根积着经年洗不掉的黄渍，空气里是霉味混着铁锈味。今天这安静，比往常重。你踩着楼梯往上走。'
});
