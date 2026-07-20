import { sceneView } from './sceneView.js';
import raw from '../../../../assets/scenes/s03-corridor-3f.html?raw';

export default sceneView({
  raw: raw,
  step: 'corridor3f',
  next: '/physical/room307',
  mode: 'door',
  narrate: '三楼到了。走廊的灯坏了一半，剩下的日光灯管发着冷白色的嗡嗡声，反而显得空得发冷。脚步声在走廊里叠出回声，像另有人在你身后半步跟着。你停在 307 门前——启衡信息租了六年，租金从未逾期，可最近连灯都少见亮起。门口正上方有一片新的湿痕，不是旧的黄渍，是新的、还在沿天花板裂缝缓缓爬的深灰色，水珠顺着门框边缘往下渗。门牌还钉着，「307」的漆字斑驳。你伸出手，敲了敲门。'
});
