/* Inspect the certificate template PDF: page sizes + AcroForm field names */
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

(async () => {
  const pdfPath = process.argv[2] || path.join('public', 'templates', 'CERTIFICAT_TYPE.pdf');
  const bytes = fs.readFileSync(pdfPath);
  console.log('File:', pdfPath, `(${(bytes.length / 1024 / 1024).toFixed(2)} MB)`);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = pdf.getPages();
  console.log('Pages:', pages.length);
  pages.forEach((p, i) => {
    const { width, height } = p.getSize();
    console.log(`  Page ${i + 1}: ${width} x ${height} pt`);
  });
  const form = pdf.getForm();
  const fields = form.getFields();
  console.log('AcroForm fields:', fields.length);
  fields.forEach((f, i) => {
    const name = f.getName();
    const type = f.constructor.name;
    let rect = '';
    try {
      const w = f.acroField.getWidgets()[0];
      const r = w.getRectangle();
      rect = `rect=[${Math.round(r.x)},${Math.round(r.y)} w=${Math.round(r.width)} h=${Math.round(r.height)}]`;
    } catch { /* ignore */ }
    console.log(`  [${i}] ${type} "${name}" ${rect}`);
  });
})().catch((e) => { console.error(e); process.exit(1); });
