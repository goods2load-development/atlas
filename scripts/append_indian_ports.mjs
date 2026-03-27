import fs from 'fs';
import path from 'path';

const file = path.resolve('./lib/data/ports_datalastic_full.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const indianPorts = [
  {
    "uuid": "fake-inmaa-chennai-0001",
    "port_name": "Chennai",
    "country_iso": "IN",
    "country_name": "India",
    "unlocode": "INMAA",
    "port_type": "Port",
    "lat": 13.0827,
    "lon": 80.2707,
    "area_lvl1": null,
    "area_lvl2": null,
    "city": "Chennai",
    "province": "Tamil Nadu",
    "timezone": "Asia/Kolkata",
    "alias": ["Madras"],
    "code": "INMAA"
  },
  {
    "uuid": "fake-innsa-nhavasheva-0002",
    "port_name": "Nhava Sheva",
    "country_iso": "IN",
    "country_name": "India",
    "unlocode": "INNSA",
    "port_type": "Port",
    "lat": 18.949,
    "lon": 72.951,
    "area_lvl1": null,
    "area_lvl2": null,
    "city": "Mumbai",
    "province": "Maharashtra",
    "timezone": "Asia/Kolkata",
    "alias": ["JNP"],
    "code": "INNSA"
  },
  {
    "uuid": "fake-inmum-mumbai-0003",
    "port_name": "Mumbai",
    "country_iso": "IN",
    "country_name": "India",
    "unlocode": "INBOM",
    "port_type": "Port",
    "lat": 18.93,
    "lon": 72.83,
    "area_lvl1": null,
    "area_lvl2": null,
    "city": "Mumbai",
    "province": "Maharashtra",
    "timezone": "Asia/Kolkata",
    "alias": ["Bombay"],
    "code": "INBOM"
  },
  {
    "uuid": "fake-inmun-mundra-0004",
    "port_name": "Mundra",
    "country_iso": "IN",
    "country_name": "India",
    "unlocode": "INMUN",
    "port_type": "Port",
    "lat": 22.833,
    "lon": 69.716,
    "area_lvl1": null,
    "area_lvl2": null,
    "city": "Mundra",
    "province": "Gujarat",
    "timezone": "Asia/Kolkata",
    "alias": [],
    "code": "INMUN"
  },
  {
    "uuid": "fake-inccu-kolkata-0005",
    "port_name": "Kolkata",
    "country_iso": "IN",
    "country_name": "India",
    "unlocode": "INCCU",
    "port_type": "Port",
    "lat": 22.5726,
    "lon": 88.3639,
    "area_lvl1": null,
    "area_lvl2": null,
    "city": "Kolkata",
    "province": "West Bengal",
    "timezone": "Asia/Kolkata",
    "alias": ["Calcutta"],
    "code": "INCCU"
  },
  {
    "uuid": "fake-incok-cochin-0006",
    "port_name": "Cochin",
    "country_iso": "IN",
    "country_name": "India",
    "unlocode": "INCOK",
    "port_type": "Port",
    "lat": 9.9667,
    "lon": 76.2667,
    "area_lvl1": null,
    "area_lvl2": null,
    "city": "Kochi",
    "province": "Kerala",
    "timezone": "Asia/Kolkata",
    "alias": ["Kochi"],
    "code": "INCOK"
  }
];

if (!data.some(p => p.unlocode === 'INMAA')) {
  data.push(...indianPorts);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Indian ports added');
} else {
  console.log('Already exists');
}
