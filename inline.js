/* Builds the portable single-file deck.
   NOTE: every .replace() below uses a FUNCTION replacer, never a string.
   A string replacement would interpret $$, $&, $` and $' as special patterns —
   which silently rewrote the $$ DOM helper in app.js into $ and broke the build. */
const fs = require('fs'), path = require('path');
const root = __dirname;
const rd = p => fs.readFileSync(path.join(root, p), 'utf8');

let html = rd('index.html');
let fonts = rd('assets/fonts.css');
const css = rd('assets/strategy.css');
const content = rd('assets/content.js');
const app = rd('assets/app.js');

let n = 0;
fonts = fonts.replace(/url\('fonts\/([^']+)'\)/g, (m, f) => {
  n++;
  return 'url(data:font/woff2;base64,' +
    fs.readFileSync(path.join(root, 'assets/fonts', f)).toString('base64') + ')';
});
fonts = fonts.replace(
  /src: (url\(data:font\/woff2;base64,[^)]+\) format\('woff2-variations'\)),\s*\n\s*url\(data:font\/woff2;base64,[^)]+\) format\('woff2'\);/g,
  (m, first) => 'src: ' + first + ';');

// A script's contents must not contain a literal </script>; neutralise defensively.
const safeJs = s => s.replace(/<\/script/gi, () => '<\\/script');

html = html
  .replace(/<!--[\s\S]*?-->\s*<link rel="stylesheet" href="assets\/fonts\.css">/,
           () => '<style>\n' + fonts + '\n</style>')
  .replace('<link rel="stylesheet" href="assets/strategy.css">',
           () => '<style>\n' + css + '\n</style>')
  .replace('<script src="assets/content.js"></script>',
           () => '<script>\n' + safeJs(content) + '\n</script>')
  .replace('<script src="assets/app.js"></script>',
           () => '<script>\n' + safeJs(app) + '\n</script>');

/* Inline every image as a data URI. Paths appear both in markup (src="…")
   and inside content.js strings, so replace on the finished document. */
const imgDir = path.join(root, 'assets', 'img');
let imgBytes = 0, imgCount = 0;
if (fs.existsSync(imgDir)) {
  for (const f of fs.readdirSync(imgDir)) {
    const buf = fs.readFileSync(path.join(imgDir, f));
    const ext = path.extname(f).slice(1).toLowerCase();
    const mime = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg';
    const uri = `data:${mime};base64,${buf.toString('base64')}`;
    // Function replacer again — base64 can contain $ sequences.
    html = html.split('assets/img/' + f).join(uri);
    imgBytes += buf.length; imgCount++;
  }
}
console.log('images inlined:', imgCount, '(' + (imgBytes / 1024).toFixed(0) + ' KB source)');

const leftovers = html.match(/(href|src)="assets\/[^"]+"/g);
if (leftovers) { console.error('EXTERNAL REFS REMAIN:', leftovers); process.exit(1); }

// Integrity check: the $$ helper must have survived
const dollar2 = (html.match(/var \$\$\s*= function/g) || []).length;   // the $$ (all-matches) helper
const dollar1 = (html.match(/var \$\s+= function/g)   || []).length;   // the $  (single-match) helper
if (dollar2 !== 1 || dollar1 !== 1) {
  console.error('FAIL: DOM helpers mangled — $ =', dollar1, '$$ =', dollar2);
  process.exit(1);
}

const out = path.join(root, '..', 'Cinemacity-Strategy-2026-27.html');
fs.writeFileSync(out, html);
console.log('fonts inlined:', n, '| $$ helper intact | size:', (fs.statSync(out).size/1024).toFixed(0) + ' KB');
