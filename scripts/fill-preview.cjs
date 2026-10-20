/* Write back the fillable PDF with all 20 fields populated with FIELD-NAME
   labels, so the visual placement of every slot can be inspected directly.
   Usage: node scripts/fill-preview.cjs [out.pdf]                                */
const fs = require('fs');
const path = require('path');
(async () => {
  const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
  const src = path.join('public', 'sample', 'Certificat_CIRGL_fillable.pdf');
  const out = process.argv[2] || path.join('scripts', 'fillable-labeled.pdf');
  const pdf = await PDFDocument.load(fs.readFileSync(src), { ignoreEncryption: true });
  const form = pdf.getForm();
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const black = rgb(0, 0.2, 0.8);
  for (const f of form.getFields()) {
    const name = f.getName();
    try {
      const tf = form.getTextField(name);
      tf.setText('<< ' + name + ' >>');
      tf.updateAppearances(font);
    } catch (e) { console.log('skip', name, e.message); }
  }
  fs.writeFileSync(out, await pdf.save());
  console.log('wrote', out);
})().catch((e) => { console.error(e); process.exit(1); });
