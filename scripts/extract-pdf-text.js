// Dev utility: dump text items of a PDF (item, x, y, font size) for layout calibration.
// Usage: node scripts/extract-pdf-text.js <file.pdf>
const fs = require('fs');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

async function main() {
  const file = process.argv[2];
  if (!file) { console.error('Usage: node scripts/extract-pdf-text.js <file.pdf>'); process.exit(1); }
  const data = new Uint8Array(fs.readFileSync(file));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    console.log(`--- page ${p} (viewport ${page.getViewport({ scale: 1 }).width}x${page.getViewport({ scale: 1 }).height}) ---`);
    for (const item of tc.items) {
      const x = item.transform[4].toFixed(1);
      const y = item.transform[5].toFixed(1);
      const size = Math.hypot(item.transform[2], item.transform[3]).toFixed(1);
      console.log(`x=${x} y=${y} size=${size} :: ${JSON.stringify(item.str)}`);
    }
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
