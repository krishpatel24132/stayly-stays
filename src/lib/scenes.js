// Built-in illustrated photos (inline SVG data URIs). Used when a remote photo can't load,
// and always in the hosted preview, where external images are blocked.
// Palette per category: [sky top, sky bottom, ground, accent]
const P = {
  beach: ["#7dd3fc", "#fde68a", "#f2d9a6", "#0ea5e9"], pool: ["#93c5fd", "#fef3c7", "#e7d3b0", "#22d3ee"],
  cabin: ["#a7c4a0", "#e3edd8", "#3f6b47", "#8b5a2b"], city: ["#fdba74", "#fde7c7", "#d9a066", "#b4533a"],
  camp: ["#fbbf77", "#fde9b8", "#e2b46a", "#7c4a2d"], farm: ["#bfe3a5", "#f0f7d4", "#5f9e4a", "#a0522d"],
  tiny: ["#fbcfe8", "#fff1e6", "#86b87a", "#c2410c"], castle: ["#f6a96b", "#fcd9a8", "#c98d57", "#8a4b2a"],
  lake: ["#93c5fd", "#e0f2fe", "#2f7fa8", "#475569"], design: ["#cbd5e1", "#f1f5f9", "#64748b", "#0f172a"],
  arctic: ["#bfdbfe", "#f8fafc", "#e2e8f0", "#475569"],
};

// Slide 0: the stay itself, one motif per category (horizon at y=400)
const MAIN = {
  beach: (a) => `<rect y="370" width="640" height="60" fill="${a}"/><path d="M0 430q80-18 160 0t160 0 160 0 160 0v210H0z" fill="#f2d9a6"/><rect x="330" y="250" width="190" height="150" fill="#fff"/><path d="M315 250h220l-30-45H345z" fill="#e2704a"/><rect x="355" y="285" width="45" height="55" fill="#7dd3fc"/><rect x="450" y="285" width="45" height="55" fill="#7dd3fc"/><path d="M130 420q10-110 25-170M155 250q-45-20-70 5M155 250q40-25 75-2M155 250q-20-40-60-38" stroke="#2f6b3a" stroke-width="9" fill="none" stroke-linecap="round"/>`,
  pool: (a) => `<rect x="90" y="250" width="300" height="150" fill="#fff"/><path d="M75 250h330l-35-50H110z" fill="#c2563a"/><rect x="130" y="290" width="50" height="70" fill="#93c5fd"/><rect x="300" y="290" width="50" height="70" fill="#93c5fd"/><rect x="60" y="460" width="520" height="120" rx="14" fill="${a}"/><path d="M110 500q40-14 80 0t80 0 80 0 80 0" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>`,
  cabin: (a) => `<path d="M230 400L350 190l120 210z" fill="${a}"/><path d="M290 400V310h120v90z" fill="#5c3b1e"/><rect x="335" y="330" width="30" height="70" fill="#f6d28b"/><g fill="#2c5a36"><path d="M90 400l45-130 45 130zM520 400l40-150 40 150zM30 400l35-100 35 100z"/></g>`,
  city: (a) => `<rect x="60" y="250" width="150" height="150" fill="${a}"/><path d="M60 250h150" stroke="#fff" stroke-width="8"/><path d="M265 400V230a55 55 0 0 1 110 0v170z" fill="#e8b27a"/><circle cx="320" cy="170" r="28" fill="${a}"/><rect x="430" y="210" width="150" height="190" fill="#c97b4f"/><path d="M100 400v-70a25 25 0 0 1 50 0v70zM470 400v-70a25 25 0 0 1 50 0v70z" fill="#fde7c7"/>`,
  camp: (a) => `<path d="M0 420Q160 340 320 420T640 400V640H0z" fill="#e8c27c"/><path d="M200 440L330 270l130 170z" fill="#f3e3c3"/><path d="M330 270L395 440H265z" fill="${a}" opacity=".35"/><path d="M300 440l30-70 30 70z" fill="#3b2314"/><circle cx="520" cy="470" r="14" fill="#f97316"/>`,
  farm: (a) => `<path d="M0 400Q180 320 360 400T640 380V640H0z" fill="#7bb35e"/><rect x="250" y="270" width="190" height="140" fill="${a}"/><path d="M235 270l110-80 110 80z" fill="#7c2d12"/><rect x="315" y="330" width="60" height="80" fill="#fde7c7"/><path d="M0 500h640M0 560h640" stroke="#4a7c3a" stroke-width="6" stroke-dasharray="10 14"/>`,
  tiny: (a) => `<rect x="230" y="270" width="170" height="130" fill="#fff"/><path d="M215 270l100-85 100 85z" fill="${a}"/><rect x="360" y="200" width="22" height="50" fill="#7c2d12"/><rect x="290" y="320" width="50" height="80" fill="#8b5e3c"/><g fill="#f472b6"><circle cx="120" cy="440" r="12"/><circle cx="170" cy="460" r="12"/><circle cx="470" cy="450" r="12"/><circle cx="520" cy="430" r="12"/></g>`,
  castle: (a) => `<rect x="170" y="230" width="300" height="170" fill="${a}"/><path d="M170 230h40v-24h40v24h40v-24h40v24h40v-24h40v24h40v-24h20v24z" fill="${a}"/><rect x="120" y="190" width="70" height="210" fill="#b9733f"/><rect x="450" y="190" width="70" height="210" fill="#b9733f"/><path d="M290 400v-70a30 30 0 0 1 60 0v70z" fill="#3b2314"/>`,
  lake: (a) => `<path d="M0 360l120-130 100 100 90-150 130 170 90-90 110 100v40H0z" fill="#64748b"/><rect y="380" width="640" height="260" fill="${a}"/><path d="M80 470q60-14 120 0t120 0 120 0 120 0" stroke="#fff" stroke-width="5" fill="none" opacity=".5"/><rect x="400" y="320" width="120" height="70" fill="#fff"/><path d="M390 320h140l-70-50z" fill="#8a4b2a"/>`,
  design: (a) => `<rect x="130" y="270" width="380" height="130" fill="#e2e8f0"/><rect x="110" y="250" width="420" height="22" fill="${a}"/><rect x="160" y="295" width="150" height="105" fill="#7dd3fc" opacity=".8"/><rect x="340" y="295" width="140" height="105" fill="#7dd3fc" opacity=".8"/><path d="M0 470h640" stroke="#475569" stroke-width="4"/>`,
  arctic: (a) => `<path d="M0 400l130-190 120 150 110-200 150 230 130-120v130z" fill="#fff"/><path d="M360 160l-70 100 50-18 30 40 28-40 52 20z" fill="#cbd5e1" opacity=".7"/><rect x="230" y="330" width="150" height="80" fill="#8b5a2b"/><path d="M215 335l90-60 90 60z" fill="#fff"/><rect x="290" y="355" width="36" height="55" fill="#f6d28b"/>`,
};

// Slide 1: bedroom
const interior = (c) => `<rect width="640" height="640" fill="${c[1]}"/><rect y="440" width="640" height="200" fill="${c[2]}" opacity=".5"/>
<rect x="400" y="110" width="170" height="190" rx="8" fill="url(#s)" stroke="#fff" stroke-width="10"/><path d="M485 110v190M400 205h170" stroke="#fff" stroke-width="6"/>
<rect x="60" y="250" width="320" height="120" rx="14" fill="${c[3]}"/><rect x="70" y="340" width="300" height="130" rx="14" fill="#fff"/><rect x="90" y="316" width="100" height="44" rx="12" fill="#fff"/><rect x="205" y="316" width="100" height="44" rx="12" fill="#f1f1f1"/><rect x="70" y="395" width="300" height="75" rx="10" fill="${c[3]}" opacity=".35"/>
<rect x="60" y="468" width="320" height="22" rx="6" fill="#8b5e3c"/><rect x="440" y="410" width="12" height="130" fill="#6b4a2f"/><path d="M410 410h72l-14-52h-44z" fill="${c[3]}"/>`;

// Slide 2: the view from the stay
const view = (c, x) => `<circle cx="${x}" cy="170" r="70" fill="#fff" opacity=".85"/><path d="M0 380Q160 300 320 380T640 360V640H0z" fill="${c[2]}" opacity=".6"/><path d="M0 450Q200 380 400 450T640 430V640H0z" fill="${c[2]}"/><path d="M0 550Q160 500 320 550T640 530V640H0z" fill="${c[3]}" opacity=".45"/>`;

export function scene(cat, slide = 0, seed = 0) {
  const c = P[cat] || P.beach;
  const sun = 90 + (seed % 260);
  const body = slide === 1 ? interior(c) : slide === 2 ? view(c, sun)
    : `<circle cx="${sun}" cy="130" r="46" fill="#fff" opacity=".8"/><rect y="400" width="640" height="240" fill="${c[2]}"/>${(MAIN[cat] || MAIN.beach)(c[3])}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><defs><linearGradient id="s" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="640" height="640" fill="url(#s)"/>${body}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
