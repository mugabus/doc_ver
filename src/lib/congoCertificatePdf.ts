import { PDFDocument, StandardFonts, rgb, PDFName } from 'pdf-lib';

export const CONGO_TEMPLATE_URL = '/templates/congo-cirgl-template.pdf';
export const CONGO_ORIGIN_VALUE = 'R\u00c9PUBLIQUE D\u00c9MOCRATIQUE DU CONGO';

export interface CongoCertificateDetails {
  certificate_number: string;
  loading_number: string;
  province: string;
  exporter_name: string;
  exporter_address: string;
  importer_name: string;
  importer_address: string;
  export_license: string;
  shipment_date: string;
  expiration_date: string;
  quantity: string;
  minerals: string;
  chemical_symbol: string;
  net_weight_kg: string | number;
  content_percent: string | number;
  metal_contained: string;
  value_usd: string | number;
  containers: string;
  packing_type: string;
  transiting: string;
  carrier_name: string;
  issued_in: string;
}

export function isCongoCertificate(originCountry: string): boolean {
  return originCountry === CONGO_ORIGIN_VALUE;
}

function clean(v: unknown): string {
  return String(v ?? '').replace(/\s+/g, ' ').trim();
}

function formatSampleDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(clean(value));
  if (m) return m[3] + '/' + m[2] + '/' + m[1];
  return clean(value);
}

/* Widget slots mapped from scripts/fillable-text.txt (pdfjs space).
   Template widgets sit in a placeholder column — they are moved here. */
interface Slot { x: number; y: number; w: number; size: number }
const SLOTS: Record<string, Slot> = {
  issued_in: { x: 365, y: 43, w: 260, size: 9 },
  chemical_symbol: { x: 281, y: 168, w: 80, size: 9 },
  net_weight_kg: { x: 367, y: 168, w: 74, size: 9 },
  content_percent: { x: 447, y: 168, w: 66, size: 9 },
  metal_contained: { x: 519, y: 168, w: 81, size: 8 },
  value_usd: { x: 606, y: 168, w: 100, size: 9 },
  minerals: { x: 199, y: 168, w: 76, size: 9 },
  containers_from: { x: 327, y: 193, w: 130, size: 9 },
  containers_to: { x: 471, y: 193, w: 230, size: 9 },
  packing_type: { x: 304, y: 211, w: 410, size: 9 },
  transiting: { x: 304, y: 228, w: 410, size: 9 },
  carrier_name: { x: 304, y: 246, w: 410, size: 9 },
  expiry_date: { x: 304, y: 264, w: 410, size: 9 },
  shipment_date: { x: 304, y: 281, w: 410, size: 9 },
  export_license_no: { x: 304, y: 299, w: 410, size: 9 },
  importer: { x: 304, y: 317, w: 410, size: 9 },
  exporter: { x: 304, y: 335, w: 410, size: 9 },
  origin: { x: 271, y: 379, w: 135, size: 9 },
  province: { x: 487, y: 379, w: 220, size: 9 },
  shipment_no: { x: 308, y: 397, w: 400, size: 9 },
  product: { x: 348, y: 429, w: 360, size: 9 },
};

export async function buildFilledCongoCertificatePdf(
  details: CongoCertificateDetails,
  qrCodeDataUrl: string,
): Promise<Uint8Array> {
  const res = await fetch(CONGO_TEMPLATE_URL);
  if (!res.ok) throw new Error('Could not load template (' + res.status + ').');
  const pdf = await PDFDocument.load(await res.arrayBuffer(), { ignoreEncryption: true });
  const page = pdf.getPages()[0];
  const helv = await pdf.embedFont(StandardFonts.Helvetica);

  // Strip the template's (broken) AcroForm and its widget annotations
  // wholesale — its fields have empty /DA strings and widgets without page
  // refs, so removeField/flatten cannot be used on them.
  page.node.delete(PDFName.of('Annots'));
  pdf.catalog.delete(PDFName.of('AcroForm'));

  // WinAnsi-safe text (pdf-lib crashes on chars outside WinAnsi, e.g. ’ → …)
  const winansi = (s: string) =>
    s.replace(/[^\x00-\xFF]/g, '?').replace(/[\u0080-\u00A0\u00AD]/g, ' ');

  // 2. Draw values at their printed underlines (pdfjs bottom-left space).
  const draw = (slot: Slot, value: string | number) => {
    const text = winansi(clean(value));
    if (!text) return;
    page.drawText(text, {
      x: slot.x, y: slot.y + 4, size: slot.size, font: helv, color: rgb(0, 0, 0),
    });
  };

  const expLine = [clean(details.exporter_name), clean(details.exporter_address)]
    .filter(Boolean).join(' - ');
  const impLine = [clean(details.importer_name), clean(details.importer_address)]
    .filter(Boolean).join(' - ');

  draw(SLOTS.issued_in, details.issued_in);
  draw(SLOTS.value_usd, details.value_usd);
  draw(SLOTS.metal_contained, details.metal_contained);
  draw(SLOTS.content_percent, details.content_percent);
  draw(SLOTS.net_weight_kg, details.quantity || details.net_weight_kg);
  draw(SLOTS.chemical_symbol, details.chemical_symbol);
  draw(SLOTS.minerals, details.minerals);
  // "Conteneurs : No ___ de ___ a ___" — split from/to halves.
  const cont = clean(details.containers);
  const parts = cont.split(/\s*(?:->|\u2192|\u2013|\u2014|;|,|\bto\b|\b\u00e0\b)\s*/i).filter(Boolean);
  if (parts.length >= 2) {
    draw(SLOTS.containers_from, parts[0]);
    draw(SLOTS.containers_to, parts.slice(1).join(' '));
  } else {
    draw(SLOTS.containers_from, cont);
  }
  draw(SLOTS.packing_type, details.packing_type);
  draw(SLOTS.transiting, details.transiting);
  draw(SLOTS.carrier_name, details.carrier_name);
  draw(SLOTS.expiry_date, formatSampleDate(details.expiration_date));
  draw(SLOTS.shipment_date, formatSampleDate(details.shipment_date));
  draw(SLOTS.export_license_no, details.export_license);
  draw(SLOTS.importer, impLine);
  draw(SLOTS.exporter, expLine);
  draw(SLOTS.origin, 'RDC');
  draw(SLOTS.province, details.province);
  draw(SLOTS.shipment_no, details.loading_number);
  draw(SLOTS.product, details.minerals || details.quantity);

  // Certificate number: template has no AcroForm slot — draw bold next to
  // the printed margin number (pdfjs x=114 y=570).
  const certNo = winansi(clean(details.certificate_number));
  if (certNo) {
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    page.drawText(certNo, { x: 130, y: 566, size: 11, font: bold, color: rgb(0, 0, 0) });
  }

  // Verification QR stamp (decode the data: URL directly — no fetch needed).
  const qrB64 = qrCodeDataUrl.split(',')[1] ?? '';
  if (qrB64) {
    const bin = atob(qrB64);
    const qrBytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) qrBytes[i] = bin.charCodeAt(i);
    const qr = await pdf.embedPng(qrBytes);
    const { width: qw, height: qh } = page.getSize();
    const qs = Math.min(90, qw * 0.11, qh * 0.16);
    page.drawImage(qr, { x: qw - qs - 18, y: qh * 0.52, width: qs, height: qs });
  }

  return pdf.save();
}
