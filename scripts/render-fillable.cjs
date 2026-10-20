/* Render page 1 of the fillable PDF to PNG at high zoom, so the visual
   position of each line (Délivré à, MINISTERE, PRODUIT, shipment No...) can
   be read off in pixels and converted to PDF points. */
const fs = require('fs');
const path = require('path');
(async () => {
  const { createCanvas } = require('@napi-rs/canvas');
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdfPath = process.argv[2] || path.join('public', 'sample', 'Certificat_CIRGL_fillable.pdf');
  const zoom = parseFloat(process.argv[3] || '1.2');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data }).promise;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const vp = page.getViewport({ scale: zoom });
    const canvas = createCanvas(Math.floor(vp.width), Math.floor(vp.height));
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const out = path.join('scripts', `fillable-page${p}.png`);
    fs.writeFileSync(out, canvas.toBuffer('image/png'));
    console.log('wrote', out, `${Math.floor(vp.width)}x${Math.floor(vp.height)}`);
  }
})().catch((e) => { console.error(e); process.exit(1); });
