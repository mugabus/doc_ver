/* List page annotations with rects to see where fillable widgets actually render. */
const fs = require('fs');
const path = require('path');
(async () => {
  const { PDFDocument } = await import('pdf-lib');
  const pdfPath = process.argv[2] || path.join('public', 'sample', 'Certificat_CIRGL_fillable.pdf');
  const pdf = await PDFDocument.load(fs.readFileSync(pdfPath), { ignoreEncryption: true });
  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    const { width, height } = p.getSize();
    console.log('PAGE ' + (i + 1) + ' size ' + width.toFixed(1) + 'x' + height.toFixed(1));
    const annots = p.node.Annots();
    if (!annots) { console.log('  no Annots'); return; }
    const arr = pdf.context.lookup(annots);
    console.log('  annot count: ' + arr.size());
    for (let k = 0; k < arr.size(); k++) {
      const ref = arr.get(k);
      const obj = pdf.context.lookup(ref);
      const subtype = obj.get(obj.context.obj('Subtype'));
      const rect = obj.get(obj.context.obj('Rect'));
      let fieldName = '';
      try {
        const t = obj.get(obj.context.obj('T'));
        if (t) fieldName = t.toString();
      } catch (e) { /* ignore */ }
      console.log('  [' + k + '] subtype=' + (subtype ? subtype.toString() : '?') + ' rect=' + (rect ? rect.toString() : '?') + ' T=' + fieldName);
    }
  });
})().catch((e) => { console.error(e); process.exit(1); });
