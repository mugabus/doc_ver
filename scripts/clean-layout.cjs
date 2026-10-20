/* Decode the UTF-16-ish fillable dump into clean readable lines. */
const fs = require('fs');
const path = require('path');
const file = process.argv[2] || path.join('scripts', 'fillable-text.txt');
const raw = fs.readFileSync(file, 'utf8');
const cleaned = raw.replace(/\u0000/g, '');
const lines = cleaned.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
for (const ln of lines) console.log(ln);
