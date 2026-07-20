// 将 ?raw 导入的整页 HTML 解析为「可注入的视图片段」
// - 抽取 <body> 内部作为视图主体
// - 抽取所有 <style> 作为该视图的局部样式（随容器卸载而移除，避免全局污染）
// - 剥离 <a class="flip-link"> 锚点（在 SPA 中由视图按钮接管）
// - 剥离 body {...} 全局规则（避免污染真实 <body>）
export function parseRaw(html) {
  let css = '';
  let m;
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  while ((m = styleRe.exec(html)) !== null) css += m[1] + '\n';

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;

  // 去掉 body 级全局样式规则
  css = css.replace(/body\s*\{[^}]*\}/gi, '');
  // 去掉翻面锚点（SPA 内由按钮控制）
  body = body.replace(/<a class="flip-link"[\s\S]*?<\/a>/gi, '');

  return { css: css, body: body };
}
