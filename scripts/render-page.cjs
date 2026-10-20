/* Render ONE page of a PDF to PNG (low zoom default for speed). */
const fs = require('fs');
const path = require('path');
(async () => {
  const { createCanvas } = require('@napi-rs/canvas');
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdfPath = process.argv[2] || path.join('scripts', 'fillable-labeled.pdf');
  const pageNo = parseInt(process.argv[3] || '1', 10);
  const zoom = parseFloat(process.argv[4] || '0.6');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data }).promise;
  const page = await doc.getPage(pageNo);
  const vp = page.getViewport({ scale: zoom });
  const canvas = createCanvas(Math.floor(vp.width), Math.floor(vp.height));
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  const out = process.argv[5] || path.join('scripts', `render-p${pageNo}.png`);
  fs.writeFileSync(out, canvas.toBuffer('image/png'));
  console.log('wrote', out, `${Math.floor(vp.width)}x${Math.floor(vp.height)}`);
  await doc.destroy();
})().catch((e) => { console.error(e); process.exit(1); });
