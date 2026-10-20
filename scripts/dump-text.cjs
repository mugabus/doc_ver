const fs = require('fs');
(async () => {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data = new Uint8Array(fs.readFileSync(process.argv[2]));
  const doc = await pdfjs.getDocument({ data }).promise;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const vp = page.getViewport({ scale: 1 });
    console.log(`--- PAGE ${p} (w=${Math.round(vp.width)} h=${Math.round(vp.height)}) ---`);
    const tc = await page.getTextContent();
    for (const item of tc.items) {
      const t = item.transform;
      console.log(`x=${Math.round(t[4])} y=${Math.round(t[5])} fs=${Math.round(Math.hypot(t[0], t[1]))} | ${JSON.stringify(item.str)}`);
    }
  }
})().catch((e) => { console.error(e); process.exit(1); });
