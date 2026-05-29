/**
 * Atlas Eval Harness — Test Query Suite
 * 50 queries across 6 categories.
 *
 * Each query has:
 *   id         — unique identifier
 *   category   — test group
 *   message    — the user message sent to /api/agent
 *   expect     — scoring criteria (all checked independently)
 *     reply_nonempty   — reply string must be non-empty
 *     has_matches      — at least 1 MatchedProvider returned
 *     min_matches      — minimum provider count (optional)
 *     mode_keyword     — word(s) that should appear in reply (case-insensitive)
 *     lang_script      — regex that should match reply (for non-Latin languages)
 *     no_error         — reply must NOT contain "error" or "couldn't"
 */

export const QUERIES = [

  // ── A: Mode detection (10) ────────────────────────────────────────────────
  {
    id: 'A01',
    category: 'mode_detection',
    message: 'I need to ship 500 kg of electronics from Dubai to London urgently',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['air'], no_error: true },
  },
  {
    id: 'A02',
    category: 'mode_detection',
    message: 'Looking for sea freight from Shanghai to Jebel Ali, 2 x 40ft containers',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['sea', 'ocean', 'container'], no_error: true },
  },
  {
    id: 'A03',
    category: 'mode_detection',
    message: 'Road transport from Dubai to Riyadh, 10 pallets of furniture',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['road', 'truck', 'land'], no_error: true },
  },
  {
    id: 'A04',
    category: 'mode_detection',
    message: 'Air cargo needed — 200 kg of fresh flowers from Nairobi to Amsterdam, must arrive within 24 hours',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['air'], no_error: true },
  },
  {
    id: 'A05',
    category: 'mode_detection',
    message: 'FCL sea shipment from Guangzhou to Hamburg, automotive parts, 1 x 20ft',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['sea', 'fcl', 'container'], no_error: true },
  },
  {
    id: 'A06',
    category: 'mode_detection',
    message: 'Truck from Abu Dhabi to Muscat, 3 tonnes of building materials',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['road', 'truck'], no_error: true },
  },
  {
    id: 'A07',
    category: 'mode_detection',
    message: 'Need courier/air freight for 5 kg of spare parts from Frankfurt to Dubai within 48 hours',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['air'], no_error: true },
  },
  {
    id: 'A08',
    category: 'mode_detection',
    message: 'LCL ocean freight from Dubai to Lagos, 3 CBM of household goods',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['sea', 'lcl', 'ocean'], no_error: true },
  },
  {
    id: 'A09',
    category: 'mode_detection',
    message: 'I want to ship a car by sea from Dubai to Mombasa',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['sea', 'ocean'], no_error: true },
  },
  {
    id: 'A10',
    category: 'mode_detection',
    message: 'Overland freight from Istanbul to Dubai via Saudi, 20 tonnes of textiles',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['road', 'overland', 'land'], no_error: true },
  },

  // ── B: Language handling (8) ──────────────────────────────────────────────
  {
    id: 'B01',
    category: 'language',
    message: 'أريد شحن بضائع من دبي إلى الرياض، 5 أطنان من الأغذية',
    expect: { reply_nonempty: true, lang_script: /[؀-ۿ]/, no_error: true },
  },
  {
    id: 'B02',
    category: 'language',
    message: '我需要从上海运送电子产品到迪拜，500公斤，走空运',
    expect: { reply_nonempty: true, lang_script: /[一-鿿]/, no_error: true },
  },
  {
    id: 'B03',
    category: 'language',
    message: 'Necesito enviar 2 toneladas de frutas desde Buenos Aires a Dubai por vía aérea',
    expect: { reply_nonempty: true, reply_nonempty: true, no_error: true },
  },
  {
    id: 'B04',
    category: 'language',
    message: "J'ai besoin de transporter des médicaments de Paris à Dubaï en urgence, 50 kg",
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'B05',
    category: 'language',
    message: 'Мне нужна доставка 1 тонны машинных запчастей из Москвы в Дубай',
    expect: { reply_nonempty: true, lang_script: /[Ѐ-ӿ]/, no_error: true },
  },
  {
    id: 'B06',
    category: 'language',
    message: 'دبی سے کراچی تک 2 ٹن کپڑا بھیجنا ہے',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'B07',
    category: 'language',
    message: 'Ich brauche Luftfracht von München nach Dubai, 200 kg Maschinenteile',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'B08',
    category: 'language',
    message: '東京から迪拜まで航空便で100kgの医薬品を輸送したい',
    expect: { reply_nonempty: true, lang_script: /[぀-ヿ一-鿿]/, no_error: true },
  },

  // ── C: Specialty cargo (8) ────────────────────────────────────────────────
  {
    id: 'C01',
    category: 'specialty_cargo',
    message: 'I need cold chain air freight for 500 kg of fresh produce from Cairo to London, temperature 2-4°C',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['cold', 'temperature', 'refrigerat', 'perishable', 'reefer'], no_error: true },
  },
  {
    id: 'C02',
    category: 'specialty_cargo',
    message: 'Shipping UN1203 petrol, 10 IBC tanks by road from Dubai to Abu Dhabi — dangerous goods class 3',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['dangerous', 'hazmat', 'dg', 'un', 'class'], no_error: true },
  },
  {
    id: 'C03',
    category: 'specialty_cargo',
    message: 'Pharmaceutical cargo — temperature-controlled sea freight, insulin from Germany to Saudi Arabia',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['pharma', 'temperature', 'cold', 'medicin', 'refrigerat'], no_error: true },
  },
  {
    id: 'C04',
    category: 'specialty_cargo',
    message: 'Project cargo — oversized industrial generator from China to Qatar, sea freight, needs flat rack',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['project', 'oversized', 'heavy', 'flat', 'break'], no_error: true },
  },
  {
    id: 'C05',
    category: 'specialty_cargo',
    message: 'High-value diamond jewellery from Antwerp to Dubai, 2 kg, air freight',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'C06',
    category: 'specialty_cargo',
    message: 'I need to move live animals — 50 horses — by air from Ireland to UAE',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'C07',
    category: 'specialty_cargo',
    message: 'Frozen fish container from Muscat to Japan, needs -18°C, full reefer container',
    expect: { reply_nonempty: true, has_matches: true, mode_keyword: ['frozen', 'reefer', 'cold', 'temperature'], no_error: true },
  },
  {
    id: 'C08',
    category: 'specialty_cargo',
    message: 'Explosives UN0070 class 1.4 — need road transport within UAE with proper DG certification',
    expect: { reply_nonempty: true, no_error: true },
  },

  // ── D: Route variety (12) ─────────────────────────────────────────────────
  {
    id: 'D01',
    category: 'route_variety',
    message: 'Ship 3 tonnes of dates from Basra, Iraq to Germany by sea',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D02',
    category: 'route_variety',
    message: 'Air freight from Lagos to Dubai, 800 kg of fashion garments, door to door',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D03',
    category: 'route_variety',
    message: 'Container from Colombo, Sri Lanka to Jebel Ali, 1 x 40ft HC, general cargo',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D04',
    category: 'route_variety',
    message: 'Road freight from Dammam to Kuwait City, 15 tonnes of steel pipes',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D05',
    category: 'route_variety',
    message: 'Sea freight from Mumbai to Durban, South Africa, 2 x 20ft containers',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D06',
    category: 'route_variety',
    message: 'Air cargo from New York to Sharjah, 1200 kg of medical supplies',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D07',
    category: 'route_variety',
    message: 'Truck delivery from Dubai to Kabul via Pakistan border, 8 tonnes of construction materials',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D08',
    category: 'route_variety',
    message: 'FCL from Tianjin China to Abu Dhabi, 1 x 40ft container, auto spare parts',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D09',
    category: 'route_variety',
    message: 'Shipping solar panels from Shenzhen to Morocco by sea',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D10',
    category: 'route_variety',
    message: 'Air freight from Dubai to Nairobi, 400 kg of pharmaceutical products',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D11',
    category: 'route_variety',
    message: 'LCL sea freight from Dubai to Mombasa, Kenya — 5 CBM of general cargo',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'D12',
    category: 'route_variety',
    message: 'Multimodal — ship 20 tonnes of copper ore from Zambia to China via sea',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },

  // ── E: Edge cases / robustness (7) ────────────────────────────────────────
  {
    id: 'E01',
    category: 'edge_cases',
    message: 'ship stuff from dubai to london',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'E02',
    category: 'edge_cases',
    message: 'How do I find a freight forwarder?',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'E03',
    category: 'edge_cases',
    message: 'I need freight forwarding services',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'E04',
    category: 'edge_cases',
    message: 'URGENT URGENT 500KG ELECTRONICS DXB TO LHR QUOTE NOW',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'E05',
    category: 'edge_cases',
    message: 'What is the cheapest way to ship a 20ft container from China to UAE?',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'E06',
    category: 'edge_cases',
    message: 'I need to move 50,000 tonnes of grain from Ukraine to Egypt — what are my sea options?',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'E07',
    category: 'edge_cases',
    message: 'hello',
    expect: { reply_nonempty: true, no_error: true },
  },

  // ── F: Conversation / multi-turn (5) ─────────────────────────────────────
  {
    id: 'F01',
    category: 'conversation',
    message: 'I need air freight from Dubai to Paris',
    expect: { reply_nonempty: true, has_matches: true, no_error: true },
  },
  {
    id: 'F02',
    category: 'conversation',
    message: 'Can you give me a carbon footprint estimate for shipping 1000 kg by air vs sea from Dubai to Rotterdam?',
    expect: { reply_nonempty: true, mode_keyword: ['co2', 'carbon', 'emission', 'kg', 'tonne', 'sustainab'], no_error: true },
  },
  {
    id: 'F03',
    category: 'conversation',
    message: 'Compare air and sea freight rates from Dubai to Singapore for 500 kg',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'F04',
    category: 'conversation',
    message: 'What documents do I need to ship electronics from UAE to India?',
    expect: { reply_nonempty: true, no_error: true },
  },
  {
    id: 'F05',
    category: 'conversation',
    message: 'I shipped with Boxman Global Logistics last month. Can I get their contact again?',
    expect: { reply_nonempty: true, no_error: true },
  },
];

export const CATEGORIES = {
  mode_detection: 'Mode Detection',
  language: 'Language Handling',
  specialty_cargo: 'Specialty Cargo',
  route_variety: 'Route Variety',
  edge_cases: 'Edge Cases',
  conversation: 'Conversation',
};
