import { sceneView } from './sceneView.js';
import raw from '../../../../assets/scenes/s04-office-307.html?raw';
import docSchedule from '../../../../assets/documents/d-schedule.html?raw';
import docZhou from '../../../../assets/documents/d-zhou-note.html?raw';
import docLeave from '../../../../assets/documents/d-leave.html?raw';
import docBadge from '../../../../assets/documents/d27-badge.html?raw';
import docResign from '../../../../assets/documents/d-resign-confirm.html?raw';
import docWhiteboard from '../../../../assets/documents/d-whiteboard.html?raw';
import docExpress from '../../../../assets/documents/d-express.html?raw';
import docYearSummary from '../../../../assets/documents/d-year-summary.html?raw';

export default sceneView({
  raw: raw,
  step: 'room307',
  next: '/physical/office',
  btn: '走向办公室 ▶',
  narrate: '你推开门。后颈一阵微凉。不是空调——出风口在你左侧，吹着不冷不热的风。凉意从右侧来。方向矛盾。你的身体知道不对，先于大脑。办公室里很暗。窗帘半拉着，只有窗外阴沉的天光和走廊漏进来的几缕昏黄。雨水沿玻璃往下淌，在墙上投下流动的暗影——像水幕后有什么看着你。空气是封闭了很久的味道：灰尘、旧纸张、电子设备微微发热后的焦味。没有霉味。这很奇怪——一间很久没人的房间，不该这么干净。空调可能还在自动运行。是谁设的定时？你摸到开关按下去。日光灯闪了两下，亮了，冷白。其中一根灯管微弱地闪烁，发出几不可闻的嗡声——那嗡声有一瞬似乎从另一个方向传来。相位偏移。你告诉自己只是灯管老化。办公区不大，约六十平米，长方形。靠窗一排工位，靠墙文件柜，最里头一间玻璃隔断的小办公室，门半开着。你的脚步在水泥地面上叠出轻微的回声。',
  docs: {
    schedule: docSchedule,
    zhou: docZhou,
    leave: docLeave,
    badge: docBadge,
    resign: docResign,
    whiteboard: docWhiteboard,
    express: docExpress,
    yearsummary: docYearSummary
  }
});
