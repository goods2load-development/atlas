import fs from 'fs';
import path from 'path';

const file = path.resolve('./lib/data/ports_datalastic_full.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const port = data.find(p => typeof p.unlocode === 'string' && p.unlocode.toUpperCase() === 'INMAA');
console.log(port);
