/**
 * generate-ports.mjs
 * Downloads the LINERLIB world ports dataset (public domain) and writes
 * lib/data/ports.json in the format { LOCODE, PORT_NAME, COUNTRY_CODE }.
 *
 * Run from the project root:
 *   node scripts/generate-ports.mjs
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../lib/data/ports.json');

const TSV_URL =
  'https://raw.githubusercontent.com/blof/LINERLIB/master/data/ports.csv';

// Country name (as used in the dataset) → ISO 3166-1 alpha-2
const COUNTRY_ISO2 = {
  'Algeria': 'DZ', 'Angola': 'AO', 'Argentina': 'AR', 'Australia': 'AU',
  'Bahrain': 'BH', 'Bangladesh': 'BD', 'Belgium': 'BE', 'Belize': 'BZ',
  'Benin': 'BJ', 'Brazil': 'BR', 'Bulgaria': 'BG', 'Cambodia': 'KH',
  'Cameroon': 'CM', 'Canada': 'CA', 'Chile': 'CL', 'China': 'CN',
  'Colombia': 'CO', 'Congo': 'CG', 'Congo. Dem. Rep. of': 'CD',
  'Costa Rica': 'CR', 'Croatia': 'HR', 'Cuba': 'CU', 'Cyprus': 'CY',
  'Denmark': 'DK', 'Djibouti': 'DJ', 'Dominican Republic': 'DO',
  'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV',
  'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Estonia': 'EE',
  'Finland': 'FI', 'France': 'FR', 'Gabon': 'GA', 'Gambia': 'GM',
  'Germany': 'DE', 'Ghana': 'GH', 'Greece': 'GR', 'Guatemala': 'GT',
  'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY', 'Haiti': 'HT',
  'Honduras': 'HN', 'Hong Kong': 'HK', 'India': 'IN', 'Indonesia': 'ID',
  'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Israel': 'IL',
  'Italy': 'IT', 'Ivory Coast': 'CI', 'Jamaica': 'JM', 'Japan': 'JP',
  'Jordan': 'JO', 'Kenya': 'KE', 'Korea. South': 'KR', 'Kuwait': 'KW',
  'Latvia': 'LV', 'Lebanon': 'LB', 'Liberia': 'LR', 'Libya': 'LY',
  'Lithuania': 'LT', 'Madagascar': 'MG', 'Malaysia': 'MY',
  'Malta': 'MT', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mexico': 'MX',
  'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA',
  'Netherlands': 'NL', 'New Zealand': 'NZ', 'Nicaragua': 'NI',
  'Nigeria': 'NG', 'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK',
  'Panama': 'PA', 'Papua New Guinea': 'PG', 'Peru': 'PE',
  'Philippines': 'PH', 'Poland': 'PL', 'Portugal': 'PT', 'Qatar': 'QA',
  'Romania': 'RO', 'Russia': 'RU', 'Saudi Arabia': 'SA', 'Senegal': 'SN',
  'Sierra Leone': 'SL', 'Singapore': 'SG', 'Slovenia': 'SI',
  'Somalia': 'SO', 'South Africa': 'ZA', 'Spain': 'ES', 'Sri Lanka': 'LK',
  'Sudan': 'SD', 'Sweden': 'SE', 'Taiwan': 'TW', 'Tanzania': 'TZ',
  'Thailand': 'TH', 'Togo': 'TG', 'Trinidad and Tobago': 'TT',
  'Tunisia': 'TN', 'Turkey': 'TR', 'U. A. E.': 'AE', 'Ukraine': 'UA',
  'United Kingdom': 'GB', 'United States': 'US', 'Uruguay': 'UY',
  'Venezuela': 'VE', 'Vietnam': 'VN', 'Yemen': 'YE',
};

async function main() {
  console.log('Fetching world ports TSV …');
  const res = await fetch(TSV_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  const text = await res.text();
  const lines = text.split(/\r?\n/);

  // First line is the header; columns are tab-separated
  const headers = lines[0].split('\t').map((h) => h.trim());
  const idx = (name) => headers.indexOf(name);

  const locodeIdx      = idx('UNLocode');
  const portNameIdx    = idx('name');
  const countryNameIdx = idx('Country');

  if (locodeIdx < 0 || portNameIdx < 0 || countryNameIdx < 0) {
    throw new Error(`Unexpected headers: ${headers.join(', ')}`);
  }

  const ports = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols          = line.split('\t');
    const LOCODE        = cols[locodeIdx]?.trim()      ?? '';
    const PORT_NAME     = cols[portNameIdx]?.trim()    ?? '';
    const countryName   = cols[countryNameIdx]?.trim() ?? '';
    const COUNTRY_CODE  = COUNTRY_ISO2[countryName]   ?? '';

    if (LOCODE && PORT_NAME && COUNTRY_CODE) {
      ports.push({ LOCODE, PORT_NAME, COUNTRY_CODE });
    }
  }

  if (ports.length === 0) throw new Error('No ports parsed – check column indices.');

  writeFileSync(OUT_PATH, JSON.stringify(ports, null, 2), 'utf8');
  console.log(`Written ${ports.length} ports to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
