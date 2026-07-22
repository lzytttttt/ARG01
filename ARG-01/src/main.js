import './styles/index.js';
import { initShell } from './app-shell.js';
import { registerRoutes, startRouter } from './router.js';

import portal from './views/portal.js';
import building from './views/physical/building.js';
import corridor1f from './views/physical/corridor1f.js';
import corridor3f from './views/physical/corridor3f.js';
import room307 from './views/physical/room307.js';
import office from './views/physical/office.js';
import note from './views/note.js';
import lcms, { lcms404 } from './views/lcms.js';
import lcmsAbout from './views/lcmsAbout.js';
import lcmsNews from './views/lcmsNews.js';
import login from './views/login.js';
import oaDesk from './views/oaDesk.js';
import chapter1 from './views/chapter1.js';
import chapter2 from './views/chapter2.js';
import { qiheng, qihengCases, qiheng404, apocalypic, apocalypicProduct, apocalypic404 } from './views/web.js';

initShell(document.getElementById('app'));

registerRoutes({
  '/': portal,
  '/physical/building': building,
  '/physical/corridor1f': corridor1f,
  '/physical/corridor3f': corridor3f,
  '/physical/room307': room307,
  '/physical/office': office,
  '/note': note,
  '/lcms': lcms,
  '/lcms/about': lcmsAbout,
  '/lcms/news': lcmsNews,
  '/lcms/login': login,
  '/lcms/404': lcms404,
  '/lcms/oa': oaDesk,
  '/lcms/oa/ch1': chapter1,
  '/lcms/oa/ch2': chapter2,
  '/web/qiheng': qiheng,
  '/web/qiheng/cases': qihengCases,
  '/web/qiheng/404': qiheng404,
  '/web/apocalypic': apocalypic,
  '/web/apocalypic/product': apocalypicProduct,
  '/web/apocalypic/404': apocalypic404
});

startRouter();
