/* Dump page dict + AcroForm field VALUES from the filled sample PDF. */
const fs = require('fs');
const path = require('path');
(async () => {
  const { PDFDocument, PDFName } = await import('pdf-lib');
  const pdfPath = process.argv[2] || path.join('public', 'sample', 'Certificat_CIRGL_fillable.pdf');
  const pdf = await PDFDocument.load(fs.readFileSync(pdfPath), { ignoreEncryption: true });
  pdf.getPages().forEach((p, i) => {
    const node = p.node;
    const mb = node.get(PDFName.of('MediaBox'));
    const cb = node.get(PDFName.of('CropBox'));
    const rot = node.get(PDFName.of('Rotate'));
    console.log('PAGE ' + (i + 1) + ' MediaBox=' + (mb ? mb.toString() : '?') + ' CropBox=' + (cb ? cb.toString() : '(none)') + ' Rotate=' + (rot ? rot.toString() : '(none)'));
    console.log('  getSize: ' + p.getSize().width.toFixed(1) + 'x' + p.getSize().height.toFixed(1) + ' rotation=' + p.getRotation().angle);
  });
  const form = pdf.getForm();
  console.log('FIELDS: ' + form.getFields().length);
  for (const f of form.getFields()) {
    let text = '';
    try {
      if (typeof f.getText === 'function') text = f.getText() || '';
    } catch (e) { text = '(err ' + e.message + ')'; }
    console.log('- name=' + JSON.stringify(f.getName()) + ' value=' + JSON.stringify(text));
  }
})().catch((e) => { console.error(e); process.exit(1); });
