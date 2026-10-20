/* Headless smoke test: fill EVERY mapped slot of the deployed template with
   realistic sample text (flat text + placeholder widgets removed) and dump
   the result next to this script for visual inspection.
   Usage: node scripts/smoke-fill-congo.cjs */
const fs = require('fs');
const path = require('path');
(async () => {
  const { PDFDocument, StandardFonts, rgb, PDFName } = await import('pdf-lib');
  const templatePath = path.join(__dirname, '..', 'public', 'templates', 'congo-cirgl-template.pdf');
  const pdf = await PDFDocument.load(fs.readFileSync(templatePath), { ignoreEncryption: true });
  const page = pdf.getPages()[0];
  const form = pdf.getForm();
  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // Strip the (broken) AcroForm + its widget annotations wholesale.
  page.node.delete(PDFName.of('Annots'));
  pdf.catalog.delete(PDFName.of('AcroForm'));

  const SLOTS = {
    issued_in: [365, 47, 260, 9], chemical_symbol: [281, 172, 80, 9], net_weight_kg: [367, 172, 74, 9],
    content_percent: [447, 172, 66, 9], metal_contained: [519, 172, 81, 8], value_usd: [606, 172, 100, 9],
    minerals: [199, 172, 76, 9], containers_from: [327, 197, 130, 9], containers_to: [471, 197, 230, 9],
    packing_type: [304, 215, 410, 9], transiting: [304, 232, 410, 9], carrier_name: [304, 250, 410, 9],
    expiry_date: [304, 268, 410, 9], shipment_date: [304, 285, 410, 9], export_license_no: [304, 303, 410, 9],
    importer_name_address: [304, 321, 410, 9], exporter_name_address: [304, 339, 410, 9],
    origin: [271, 383, 135, 9], province: [487, 383, 220, 9],
    shipment_no: [308, 401, 400, 9], product: [348, 433, 360, 9],
  };
  const SAMPLE = {
    issued_in: 'KINSHASA', chemical_symbol: 'Au', net_weight_kg: '25.5',
    content_percent: '92.4', metal_contained: 'Or fin', value_usd: '1 850 000',
    minerals: 'OR BRUT', packing_type: 'Sacs scelles x12',
    transiting: 'Kigali, Rwanda', carrier_name: 'Trans Goma SARL',
    expiry_date: '31/12/2026', shipment_date: '15/09/2026',
    export_license_no: 'EXP-2026-117', importer_name_address: 'Dubai Metals LLC - Deira, Dubai, UAE',
    exporter_name_address: 'SACIM SARL - 12 Av. Likasi, Lubumbashi, RDC',
    origin: 'RDC', province: 'HAUT-KATANGA', shipment_no: 'CHG-2026-0891',
    product: 'OR BRUT (Au)',
  };

  const draw = ([x, y, , size], v) => {
    if (v) page.drawText(v, { x, y: y + 4, size, font: helv, color: rgb(0, 0, 0) });
  };
  for (const [slot, value] of Object.entries(SAMPLE)) draw(SLOTS[slot], value);
  draw(SLOTS.containers_from, 'CNT-0042');
  draw(SLOTS.containers_to, 'Dar es Salaam, Tanzania');
  page.drawText('COD2609151234', { x: 130, y: 570, size: 11, font: bold, color: rgb(0, 0, 0) });

  const out = path.join(__dirname, 'smoke-filled-congo.pdf');
  fs.writeFileSync(out, await pdf.save());
  console.log('WROTE', out, '(' + fs.statSync(out).size + ' bytes)');
})().catch((e) => { console.error(e); process.exit(1); });
