import { NextRequest, NextResponse } from 'next/server';

// ── Step conversation scripts ─────────────────────────────────────────────────
// Each step knows what to ask, what to extract, and what comes next.

const CERTIFICATIONS = [
  {
    code: 'FIATA',
    name: 'International Federation of Freight Forwarders Associations',
  },
  { code: 'WCA', name: 'World Cargo Alliance' },
  { code: 'IATA', name: 'International Air Transport Association' },
  { code: 'TIA', name: 'Transportation Intermediaries Association' },
  { code: 'BIFA', name: 'British International Freight Association' },
  {
    code: 'NCBFAA',
    name: 'National Customs Brokers & Forwarders Association of America',
  },
  { code: 'JIFFA', name: 'Japan International Freight Forwarders Association' },
  { code: 'CIFA', name: 'China International Freight Forwarders Association' },
  { code: 'AFIF', name: 'Australian Federation of International Forwarders' },
  {
    code: 'FFFAI',
    name: 'Federation of Freight Forwarders Associations in India',
  },
  { code: 'ALACAT', name: 'Latin American Association of Freight Forwarders' },
  { code: 'SAFFA', name: 'South African Freight Forwarders Association' },
  {
    code: 'CIFFA',
    name: 'Canadian International Freight Forwarders Association',
  },
  { code: 'SFFA', name: 'Singapore Freight Forwarders Association' },
  { code: 'NAFL', name: 'National Association of Freight Logistics' },
  { code: 'ISO9001', name: 'ISO 9001 Quality Management' },
  { code: 'ISO14001', name: 'ISO 14001 Environmental Management' },
  { code: 'AEO', name: 'Authorised Economic Operator' },
  { code: 'TAPA', name: 'Transported Asset Protection Association' },
  { code: 'CEIV', name: 'IATA CEIV Pharma / Fresh / Live Animals' },
];

const SECTORS = [
  { code: 'retail', name: 'Retail & E-commerce' },
  { code: 'manufacturing', name: 'Manufacturing' },
  { code: 'automotive', name: 'Automotive' },
  { code: 'pharma', name: 'Pharmaceutical & Healthcare' },
  { code: 'electronics', name: 'Electronics & Technology' },
  { code: 'apparel', name: 'Apparel & Fashion' },
  { code: 'food', name: 'Food & Beverage' },
  { code: 'construction', name: 'Construction & Building Materials' },
  { code: 'energy', name: 'Energy, Oil & Gas' },
  { code: 'aerospace', name: 'Aerospace & Defence' },
  { code: 'dg', name: 'Dangerous Goods (DG / Hazmat)' },
  { code: 'coldchain', name: 'Cold Chain & Perishables' },
  { code: 'live_animals', name: 'Live Animals' },
  { code: 'personal_effects', name: 'Personal Effects & Relocation' },
  { code: 'project_cargo', name: 'Project Cargo & OOG (Out-of-Gauge)' },
  { code: 'fine_art', name: 'Fine Art & High-Value Cargo' },
  { code: 'bulk', name: 'Bulk & Break-Bulk' },
  { code: 'roro', name: 'RoRo (Roll-on / Roll-off)' },
  { code: 'mining', name: 'Mining & Minerals' },
  { code: 'medical', name: 'Medical Devices & Equipment' },
  { code: 'government', name: 'Government & Defence Logistics' },
  { code: 'events', name: 'Entertainment & Events Logistics' },
];

// ── Helper: call Gemini via Atlas backend ─────────────────────────────────────

const ATLAS_BASE = process.env.ATLAS_API_URL ?? 'http://localhost:8000';

async function callGemini(
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  try {
    const res = await fetch(`${ATLAS_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: systemPrompt, message: userMessage }),
      signal: AbortSignal.timeout ? AbortSignal.timeout(10000) : undefined,
    });
    if (!res.ok) throw new Error('Gemini call failed');
    const data = await res.json();
    return data.reply ?? data.text ?? '';
  } catch {
    return '';
  }
}

// ── Draft About Us / Mission via Gemini ───────────────────────────────────────

async function draftAboutUs(
  companyName: string,
  context: string,
): Promise<string> {
  const prompt = `You are a professional copywriter for freight companies.
Write a company description for "${companyName}" based on this context: "${context}".
Requirements: 50-80 words, professional tone, freight industry language.
Return only the description text.`;
  const draft = await callGemini(prompt, 'Generate About Us');
  return (
    draft ||
    `${companyName} is a verified freight forwarder delivering reliable logistics solutions across global trade lanes. With expertise in multimodal transport and a commitment to compliance, we connect businesses with efficient, cost-effective cargo movement. Our network of partners ensures seamless door-to-door delivery across 30+ countries.`
  );
}

async function draftMission(
  companyName: string,
  context: string,
): Promise<string> {
  const prompt = `You are a professional copywriter for freight companies.
Write a mission statement for "${companyName}" based on: "${context}".
Requirements: 50-80 words, professional tone, must end with 2-3 relevant hashtags (e.g. #airfreight #logistics).
Return only the mission text with hashtags.`;
  const draft = await callGemini(prompt, 'Generate Mission');
  return (
    draft ||
    `Our mission at ${companyName} is to transform freight forwarding through technology, transparency, and trust. We are committed to providing our clients with end-to-end visibility, competitive rates, and a seamless experience from origin to destination. Reliability is not just a promise — it's our standard. #freightforwarder #logistics #globalshipping`
  );
}

// ── Main route handler ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { message, step, collected, session_id } = await req.json();

  const isFileUpload =
    typeof message === 'string' && message.startsWith('[FILE_UPLOADED:');

  let uploadedField = '';
  let uploadedFileName = '';
  if (isFileUpload) {
    const parts = message.slice('[FILE_UPLOADED:'.length, -1).split(':');
    uploadedField = parts[0];
    uploadedFileName = parts[1];
  }

  let reply = '';
  let nextStep = step;
  let card = undefined;
  let extracted = {};

  switch (step) {
    // ── Welcome ────────────────────────────────────────────────────────────────
    case 'welcome':
    case '':
      reply = `Welcome to Goods2Load! 👋

I'm Atlas, and I'll guide you through becoming a verified freight forwarder on our platform. It takes about 5 minutes and I'll help you every step of the way.

Let's start with the basics — **what's your company name?**`;
      nextStep = 'account';
      break;

    // ── Account ────────────────────────────────────────────────────────────────
    case 'account': {
      const lower = message.toLowerCase();

      if (!collected.companyName) {
        extracted = { companyName: message.trim() };
        reply = `Great, **${message.trim()}**!

What's your **business email address**?`;
        break;
      }

      if (!collected.email) {
        if (!message.includes('@')) {
          reply = `That doesn't look like a valid email. Please enter your business email address (e.g. john@yourcompany.com).`;
          break;
        }
        extracted = { email: message.trim().toLowerCase() };
        reply = `Perfect. What's your **company phone number**? (Include country code, e.g. +971 50 123 4567)`;
        break;
      }

      if (!collected.phoneNumber) {
        extracted = { phoneNumber: message.replace(/\s/g, '') };
        reply = `Got it. What **country** is your company based in?`;
        break;
      }

      if (!collected.country) {
        extracted = { country: message.trim() };
        reply = `And which **city**?`;
        break;
      }

      if (!collected.city) {
        extracted = { city: message.trim() };
        reply = `What's your **business address and postal code**? (e.g. "123 Sheikh Zayed Road, 00000")`;
        break;
      }

      if (!collected.address) {
        extracted = { address: message.trim() };
        reply = `Almost done with account setup. Please upload your **company logo** (PNG or SVG, max 2MB).`;
        card = {
          type: 'file_upload',
          field: 'companyPhoto',
          label: 'Company Logo',
          accept: 'image/png,image/svg+xml',
          hint: 'PNG or SVG, max 2MB',
        };
        break;
      }

      if (!collected.companyPhoto && !isFileUpload) {
        reply = `Please upload your company logo to continue.`;
        card = {
          type: 'file_upload',
          field: 'companyPhoto',
          label: 'Company Logo',
          accept: 'image/png,image/svg+xml',
        };
        break;
      }

      if (isFileUpload && uploadedField === 'companyPhoto') {
        extracted = {};
        reply = `Logo uploaded ✓ Now let's set your **password**. Please type a password (min 8 characters).`;
        break;
      }

      if (!collected.password) {
        if (message.length < 8) {
          reply = `Password must be at least 8 characters. Please try again.`;
          break;
        }
        extracted = { password: message };
        reply = `Almost there! Do you agree to the Goods2Load **Terms of Service** and **Privacy Policy**? (yes / no)`;
        break;
      }

      if (!collected.privacy) {
        if (
          lower.includes('yes') ||
          lower.includes('agree') ||
          lower.includes('ok')
        ) {
          extracted = { privacy: true };
          reply = `Great — account details complete ✓

Now let's collect your **legal documents**. These verify your company and enable you to receive shipment requests.`;
          nextStep = 'documents';
        } else {
          reply = `You need to agree to our terms to join Goods2Load. Type "yes" to confirm.`;
        }
        break;
      }
      break;
    }

    // ── Documents ─────────────────────────────────────────────────────────────
    case 'documents': {
      if (!collected.insuranceStatement && !isFileUpload) {
        reply = `First, please upload your **Insurance Statement** (PDF, front & back).`;
        card = {
          type: 'file_upload',
          field: 'insuranceStatement',
          label: 'Insurance Statement',
          accept: 'application/pdf',
          hint: 'PDF only, max 5MB',
        };
        break;
      }

      if (isFileUpload && uploadedField === 'insuranceStatement') {
        reply = `Insurance statement uploaded ✓

Now your **VAT Registration** document (PDF).`;
        card = {
          type: 'file_upload',
          field: 'issuingAuthority',
          label: 'VAT Registration',
          accept: 'application/pdf',
          hint: 'PDF only, max 5MB',
        };
        break;
      }

      if (isFileUpload && uploadedField === 'issuingAuthority') {
        reply = `VAT registration uploaded ✓

Last document: your **Trade License** (PDF).`;
        card = {
          type: 'file_upload',
          field: 'tradeLicenseNumber',
          label: 'Trade License',
          accept: 'application/pdf',
          hint: 'PDF only, max 5MB',
        };
        break;
      }

      if (isFileUpload && uploadedField === 'tradeLicenseNumber') {
        reply = `All documents uploaded ✓

Next: your **Google Business Profile**. All companies on Goods2Load must have one with reviews — this is how shippers verify your reputation.`;
        nextStep = 'google_profile';
        break;
      }

      reply = `Please upload your insurance statement to continue.`;
      card = {
        type: 'file_upload',
        field: 'insuranceStatement',
        label: 'Insurance Statement',
        accept: 'application/pdf',
      };
      break;
    }

    // ── Google Profile ─────────────────────────────────────────────────────────
    case 'google_profile': {
      if (!message.trim()) {
        reply = `Please paste your **Google Business Profile URL**.

💡 To find it: open Google Maps → search your company → click "Share" to copy the link.`;
        break;
      }

      if (
        message.toLowerCase().includes('skip') ||
        message.toLowerCase().includes("don't have") ||
        message.toLowerCase().includes('no profile')
      ) {
        reply = `No problem — you can add it from your dashboard later.

Now let's add your **industry certifications**. Select all that apply — these boost your ranking with shippers.`;
        nextStep = 'certifications';
        card = {
          type: 'multi_select',
          field: 'industryRecognitions',
          label: 'Industry Certifications (select all that apply)',
          options: CERTIFICATIONS,
        };
        break;
      }

      if (
        !message.includes('maps.app.goo.gl') &&
        !message.includes('google.com/maps') &&
        !message.includes('g.co/') &&
        !message.startsWith('http')
      ) {
        reply = `That doesn't look like a Google Business Profile URL. It should contain maps.app.goo.gl or google.com/maps. Please try again, or type "skip" to add it later.`;
        break;
      }

      extracted = { googleBusinessProfile: message.trim() };
      reply = `Google Business Profile linked ✓

Now let's add your **industry certifications**. Select all that apply — these boost your ranking with shippers.`;
      nextStep = 'certifications';
      card = {
        type: 'multi_select',
        field: 'industryRecognitions',
        label: 'Industry Certifications (select all that apply)',
        options: CERTIFICATIONS,
      };
      break;
    }

    // ── Certifications ─────────────────────────────────────────────────────────
    case 'certifications': {
      const certs = Array.isArray(collected.industryRecognitions)
        ? collected.industryRecognitions
        : [];

      // No certs selected yet — show the card
      if (!certs.length) {
        reply = `Please select your certifications using the card above, or confirm with none selected.`;
        card = {
          type: 'multi_select',
          field: 'industryRecognitions',
          label: 'Industry Certifications',
          options: CERTIFICATIONS,
        };
        break;
      }

      // Certs selected but proof not yet uploaded
      if (certs.length > 0 && !collected.certProofFiles) {
        reply = `${certs.join(', ')} — noted ✓

Our legal team will verify these for due diligence. Please upload proof documents (one PDF per certification).`;
        card = {
          type: 'cert_upload',
          certs,
        };
        break;
      }

      // Cert proofs uploaded (or no certs) — advance to sectors
      const certSummary =
        certs.length > 0
          ? `Documents received ✓`
          : `No certifications — that's fine. You can add them later.`;

      reply = `${certSummary}

Which **logistics sectors** do you specialise in? Select all that apply.`;
      nextStep = 'sectors';
      card = {
        type: 'multi_select',
        field: 'industries',
        label: 'Sectors you serve',
        options: SECTORS,
      };
      break;
    }

    // ── Sectors ────────────────────────────────────────────────────────────────
    case 'sectors': {
      if (!collected.industries?.length) {
        reply = `Which **logistics sectors** do you specialise in? Select all that apply.`;
        card = {
          type: 'multi_select',
          field: 'industries',
          label: 'Sectors you serve',
          options: SECTORS,
        };
        break;
      }

      const industryList = Array.isArray(collected.industries)
        ? collected.industries.join(', ')
        : collected.industries;
      reply = `${industryList} — great focus areas ✓

Now let's map your **freight capabilities**. Do you provide **air freight** services? (yes / no)`;
      nextStep = 'air_freight';
      break;
    }

    // ── Air Freight ────────────────────────────────────────────────────────────
    case 'air_freight': {
      const lower = message.toLowerCase();

      // Sub-step: waiting for hub selection
      if (
        collected.providesAirFreight === true &&
        !collected.airports?.length
      ) {
        reply = `Please select your air freight hubs using the picker above, or click Skip.`;
        card = { type: 'freight_lanes', mode: 'air' };
        break;
      }

      // Hub selection confirmed — advance
      if (
        collected.providesAirFreight === true &&
        collected.airports !== undefined
      ) {
        const hubList =
          collected.airports.length > 0
            ? `${collected.airports.slice(0, 5).join(', ')}${collected.airports.length > 5 ? ` +${collected.airports.length - 5} more` : ''} ✓`
            : 'No specific hubs selected';
        reply = `${hubList}

Do you provide **sea freight** services? (yes / no)`;
        nextStep = 'sea_freight';
        break;
      }

      // Initial yes/no
      if (lower.includes('no') || lower.includes('not')) {
        extracted = { providesAirFreight: false };
        reply = `Understood — no air freight. Do you provide **sea freight**? (yes / no)`;
        nextStep = 'sea_freight';
      } else {
        extracted = { providesAirFreight: true };
        reply = `Air freight ✓ Select the airports and hubs you operate through.`;
        card = { type: 'freight_lanes', mode: 'air' };
      }
      break;
    }

    // ── Sea Freight ────────────────────────────────────────────────────────────
    case 'sea_freight': {
      const lower = message.toLowerCase();

      // Sub-step: waiting for port selection
      if (
        collected.providesSeaFreight === true &&
        !collected.seaports?.length
      ) {
        reply = `Please select your sea freight ports using the picker above, or click Skip.`;
        card = { type: 'freight_lanes', mode: 'sea' };
        break;
      }

      // Port selection confirmed — advance
      if (
        collected.providesSeaFreight === true &&
        collected.seaports !== undefined
      ) {
        const portList =
          collected.seaports.length > 0
            ? `${collected.seaports.slice(0, 4).join(', ')}${collected.seaports.length > 4 ? ` +${collected.seaports.length - 4} more` : ''} ✓`
            : 'No specific ports selected';
        reply = `${portList}

Do you provide **road freight** services? (yes / no)`;
        nextStep = 'road_freight';
        break;
      }

      // Initial yes/no
      if (lower.includes('no') || lower.includes('not')) {
        extracted = { providesSeaFreight: false };
        reply = `Understood — no sea freight. Do you provide **road freight**? (yes / no)`;
        nextStep = 'road_freight';
      } else {
        extracted = { providesSeaFreight: true };
        reply = `Sea freight ✓ Select the ports and regions you operate through.`;
        card = { type: 'freight_lanes', mode: 'sea' };
      }
      break;
    }

    // ── Road Freight ───────────────────────────────────────────────────────────
    case 'road_freight': {
      const lower = message.toLowerCase();

      // Sub-step: waiting for country selection
      if (
        collected.providesRoadFreight === true &&
        !collected.roadCountries?.length
      ) {
        reply = `Please select the countries/markets you cover by road, or click Skip.`;
        card = { type: 'freight_lanes', mode: 'road' };
        break;
      }

      // Country selection confirmed — advance
      if (
        collected.providesRoadFreight === true &&
        collected.roadCountries !== undefined
      ) {
        const countryList =
          collected.roadCountries.length > 0
            ? `${collected.roadCountries.slice(0, 5).join(', ')}${collected.roadCountries.length > 5 ? ` +${collected.roadCountries.length - 5} more` : ''} ✓`
            : 'No specific countries selected';
        reply = `${countryList}

Now I need to understand your **business mix**. What percentage of your freight volume is air, sea, road, and other?`;
        nextStep = 'service_mix';
        card = { type: 'service_mix' };
        break;
      }

      // Initial yes/no
      if (lower.includes('no') || lower.includes('not')) {
        extracted = { providesRoadFreight: false };
        reply = `Got it ✓

Now I need to understand your **business mix**. What percentage of your freight volume is air, sea, road, and other?`;
        nextStep = 'service_mix';
        card = { type: 'service_mix' };
      } else {
        extracted = { providesRoadFreight: true };
        reply = `Road freight ✓ Select the countries and markets you cover.`;
        card = { type: 'freight_lanes', mode: 'road' };
      }
      break;
    }

    // ── Service Mix ────────────────────────────────────────────────────────────
    case 'service_mix': {
      if (!collected.serviceMix) {
        reply = `Please use the sliders to set your service split.`;
        card = { type: 'service_mix' };
        break;
      }
      const { air, sea, road, other } = collected.serviceMix;
      reply = `Air ${air}% · Sea ${sea}% · Road ${road}%${other > 0 ? ` · Other ${other}%` : ''} ✓

Almost done! Which countries are your **main markets**? Add your top countries and rough percentages — this helps us match you with the right shippers.`;
      nextStep = 'geo_focus';
      card = { type: 'geo_focus' };
      break;
    }

    // ── Geo Focus ──────────────────────────────────────────────────────────────
    case 'geo_focus': {
      if (!collected.geoFocus?.length) {
        reply = `Please fill in your main markets using the form above.`;
        card = { type: 'geo_focus' };
        break;
      }
      const markets = collected.geoFocus
        .map((g: any) => `${g.country} ${g.pct}%`)
        .join(', ');
      reply = `${markets} ✓

Now the most important part — your **company profile**. This is what shippers read when they see you in search results.

Tell me in 2-3 sentences: what does ${collected.companyName ?? 'your company'} do, and what makes you stand out?`;
      nextStep = 'about_us';
      break;
    }

    // ── About Us ───────────────────────────────────────────────────────────────
    case 'about_us': {
      if (!collected.aboutUs) {
        const draft = await draftAboutUs(
          collected.companyName ?? 'your company',
          message,
        );
        extracted = { aboutUs: draft };
        reply = `Here's a draft **About Us** based on what you told me:\n\n"${draft}"\n\nDoes this look good? Reply "yes" to keep it or type your own version.`;
        break;
      }

      if (
        message.toLowerCase() === 'yes' ||
        message.toLowerCase() === 'looks good' ||
        message.toLowerCase() === 'ok'
      ) {
        reply = `About Us saved ✓

Now your **Mission statement**. What is the core purpose that drives ${collected.companyName ?? 'your company'}? A sentence or two is fine and I'll craft it.`;
        nextStep = 'final_agreement';
        break;
      }

      const wordCount = message.trim().split(/\s+/).length;
      if (wordCount < 20) {
        reply = `That's a bit short (${wordCount} words). Give me a bit more detail, or type "yes" to keep the draft.`;
        break;
      }

      extracted = { aboutUs: message };
      reply = `About Us saved ✓

Now your **Mission statement**. What is the core purpose that drives ${collected.companyName ?? 'your company'}? Tell me what you stand for.`;
      nextStep = 'final_agreement';
      break;
    }

    // ── Final Agreement ────────────────────────────────────────────────────────
    case 'final_agreement': {
      const lower = message.toLowerCase();

      if (!collected.ourMission) {
        const missionDraft = await draftMission(
          collected.companyName ?? 'your company',
          message,
        );
        extracted = { ourMission: missionDraft };
        reply = `Here's a draft **Mission Statement**:\n\n"${missionDraft}"\n\nReply "yes" to keep it or write your own.`;
        break;
      }

      if (
        lower === 'yes' ||
        lower.includes('agree') ||
        lower.includes('confirm')
      ) {
        extracted = { finalAgreement: true };
        reply = `🎉 **Profile complete!**\n\nHere's a summary before we activate your account.`;
        card = {
          type: 'summary',
          fields: { ...collected, finalAgreement: true },
        };
        // After summary confirmation, advance to payment
        break;
      }

      // Show summary + ask for confirmation
      reply = `Please review the summary above and type **"confirm"** to proceed to payment, or let me know what to change.`;
      card = { type: 'summary', fields: collected };
      break;
    }

    // ── Payment ────────────────────────────────────────────────────────────────
    case 'payment': {
      if (!collected.finalAgreement) {
        // Shouldn't normally land here without agreement
        reply = `Let's activate your profile. One last step — the annual membership fee.`;
      } else {
        reply = `Almost there! Your profile is ready. Activate it with our **annual membership** to start receiving shipper requests.`;
      }
      nextStep = 'payment';
      card = { type: 'payment' };
      break;
    }

    default:
      reply = `I didn't catch that. Could you repeat your answer?`;
  }

  // After final_agreement confirm, advance to payment step
  if (
    step === 'final_agreement' &&
    (message.toLowerCase() === 'yes' ||
      message.toLowerCase().includes('agree') ||
      message.toLowerCase().includes('confirm')) &&
    collected.ourMission
  ) {
    nextStep = 'payment';
  }

  return NextResponse.json({
    reply,
    next_step: nextStep,
    extracted,
    card,
    session_id: session_id ?? `onboard-${Date.now()}`,
  });
}
