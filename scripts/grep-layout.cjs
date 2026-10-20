/* Print context around interesting lines of the fillable PDF text dump. */
const fs = require('fs');
const path = require('path');
const file = process.argv[2] || path.join('scripts', 'fillable-text.txt');
const pat = new RegExp(process.argv[3] || 'Nous certifions|ayant comme|dans la province|R.publique|This to|D.livr|PRODUIT|Conteneurs|Type d|Transitant|Nom du|Nom de|Licence|Date d|Transporteur|Exportateur|Importateur|Minerais|Poids|Teneur|tal|Valeur|CERTIFICAT|\\bNo\\b|CD32465436|32465436|_{5,}|\\.{5,}', 'i');
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
lines.forEach((ln, i) => {
  if (pat.test(ln)) console.log(i + ': ' + ln);
});
