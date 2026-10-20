/* List every DWIM-style operator/font resource on fillable page 1 so we know
   whether the visible labels live in content stream, XObject form, or pattern. */
const fs = require('fs');
const path = require('path');
(async () => {
  const { PDFDocument } = await import('pdf-lib');
  const pdfPath = process.argv[2] || path.join('public', 'sample', 'Certificat_CIRGL_fillable.pdf');
  const pdf = await PDFDocument.load(fs.readFileSync(pdfPath), { ignoreEncryption: true });
  const page = pdf.getPages()[0];
  const dict = page.node;
  console.log('page keys:', Object.keys(dict.dict || {}));
  try {
    const res = dict.get(dict.context.obj('Resources'));
    console.log('resources type:', res && res.constructor && res.constructor.name);
  } catch (e) { console.log('resources err', e.message); }
})().catch((e) => { console.error(e); process.exit(1); });
