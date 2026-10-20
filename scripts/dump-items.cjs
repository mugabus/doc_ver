/* Dump non-empty text items with coordinates as JSON lines (UTF-8 file, no console mojibake). */
const fs = require('fs');
const path = require('path');
(async () => {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdfPath = process.argv[2] || path.join('public', 'sample', 'Certificat CIRGL.pdf');
  const outPath = process.argv[3] || path.join('scripts', 'items.jsonl');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data }).promise;
  const lines = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    for (const item of tc.items) {
      const s = (item.str || '');
      if (!s.trim()) continue;
      const t = item.transform;
      const fsGuess = Math.round(Math.hypot(t[0], t[1]) * 10) / 10;
      lines.push(JSON.stringify({ page: p, x: Math.round(t[4]), y: Math.round(t[5]), fs: fsGuess, str: s }));
    }
  }
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log('wrote ' + lines.length + ' items to ' + outPath);
})().catch((e) => { console.error(e); process.exit(1); });
