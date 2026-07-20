import { sceneView } from './sceneView.js';
import raw from '../../../../assets/scenes/s02-corridor-1f.html?raw';

export default sceneView({
  raw: raw,
  step: 'corridor1f',
  next: '/physical/corridor3f',
  btn: '上三楼 ▶',
  narrate: '电梯停运，通知贴在门上，和往常一样。你熟门熟路地拐向楼梯——钥匙串在腰间叮当作响，这是你每天上下来回好几趟的路。一楼走廊里头顶三根灯管只剩一根亮着，最里头那根每隔几秒抽搐似的闪一下，把影子拉得忽长忽短；天花板渗着水，水珠落进地面那摊浑黄的水洼，叮、咚、叮。墙根积着长年洗不掉的黄渍，空气里是霉味混着铁锈味。今天这安静，比往常重。你踩着楼梯往上走——去三楼，去 307。'
});
