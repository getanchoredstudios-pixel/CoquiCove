/**
 * Central content + media configuration for Coquí Cove.
 * Swap image IDs / copy here when real property photography and details are available.
 */

export const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const pxSet = (id: number, w: number, h: number) =>
  [1, 1.5, 2]
    .map((m) => `${px(id, Math.round(w * m), Math.round(h * m))} ${Math.round(w * m)}w`)
    .join(", ");

export const IMG = {
  hero: 33715469,
  heroAlt: 18867516,
  deckSunset: 24805069,
  tentTerrace: 7163622,
  tentsGreen: 29995960,
  aframe: 8692501,
  domeDeck: 34389809,
  tentBedLux: 9497610,
  tentBedCozy: 16300648,
  tentBedColor: 7163620,
  coupleTent: 8968392,
  coupleFire: 17704448,
  hammockTerrace: 26729325,
  hammockForest: 17734593,
  coupleHammock: 13377155,
  yogaTent: 7663229,
  bungalowNight: 15851659,
  tentsSunset: 28123902,
  lagoon: 6873614,
  waterfall: 4530594,
  waterfallCR: 32129164,
  jungleStream: 14304727,
  greenHills: 12496881,
  palmSunset: 14984869,
  mistyPalms: 18347320,
  palmLeaves: 16714835,
  jungleLeaves: 27286261,
  palmLow: 2091666,
  beachPR: 28207747,
  coastAerial: 15306044,
  turquoise: 15306229,
  osjStreet: 20795503,
  osjCobble: 15886884,
  osjNarrow: 15886885,
  osjNight: 19935977,
  osjFacade: 20902800,
  foodSeafood: 5041487,
  foodRice: 27556972,
  foodTostones: 32655071,
} as const;

export const NAV_LINKS = [
  { label: "The Experience", href: "#experience" },
  { label: "Stay", href: "#stay" },
  { label: "Explore", href: "#explore" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const TRUST = [
  {
    title: "Private Tropical Escape",
    body: "One booking, one retreat. No lobbies, no neighbors through the wall.",
    icon: "leaf",
  },
  {
    title: "Minutes From San Juan",
    body: "Trujillo Alto sits just outside the metro — city by day, jungle quiet by night.",
    icon: "pin",
  },
  {
    title: "Immersed in Nature",
    body: "Green in every direction, and a coquí chorus that starts right at dusk.",
    icon: "wave",
  },
  {
    title: "Designed for Couples",
    body: "Built around slowness, privacy, and the kind of nights you talk about later.",
    icon: "heart",
  },
  {
    title: "Authentically Puerto Rican",
    body: "Locally hosted, island-rooted, and nothing like a chain resort.",
    icon: "star",
  },
];

export const MOMENTS = [
  {
    time: "6:40 AM",
    title: "Wake up inside the green.",
    body: "Light filters through the canopy before your alarm ever gets the chance. You unzip the door, and the morning is already warm. Coffee outside, barefoot, no schedule yet.",
    image: IMG.mistyPalms,
    alt: "Morning light through misty tropical palms",
  },
  {
    time: "11:15 AM",
    title: "Spend the day discovering the island.",
    body: "Old San Juan's blue cobblestones, a beach you found on a hunch, lunch that ruins every other lunch. You're close enough that none of it costs you half a day in the car.",
    image: IMG.osjCobble,
    alt: "Colorful colonial street in Old San Juan, Puerto Rico",
  },
  {
    time: "6:50 PM",
    title: "Return to somewhere that's only yours.",
    body: "Salt still on your skin. The property goes gold, then amber, then soft. Nobody checks in beside you. Nobody asks how your stay is going. It's just quiet, and it's yours.",
    image: IMG.deckSunset,
    alt: "Tropical wooden deck at sunset framed by palms",
  },
  {
    time: "10:30 PM",
    title: "Fall asleep to the sound of the island.",
    body: "Co-kee. Co-kee. The frog that gave this place its name starts up after dark and doesn't stop. It's the most Puerto Rican lullaby there is — and you'll miss it the night you go home.",
    image: IMG.bungalowNight,
    alt: "Warm lights glowing at a tropical retreat after dark",
  },
];

export const FEATURES = [
  {
    title: "A retreat that's entirely yours",
    body: "Your own private space on the property — arrive, exhale, and stop performing for a front desk.",
    icon: "key",
    span: "lg:col-span-2",
    image: IMG.aframe,
    alt: "Private tent tucked into lush green forest",
  },
  {
    title: "Surrounded by tropical greenery",
    body: "Palms, broadleaf shade and island air on every side of you.",
    icon: "leaf",
    span: "",
    image: null,
    alt: "",
  },
  {
    title: "Outdoor space to slow down in",
    body: "Somewhere to sit, read, talk and watch the light change through the trees.",
    icon: "sun",
    span: "",
    image: null,
    alt: "",
  },
  {
    title: "Comfort-first sleeping setup",
    body: "Real bedding, real rest. Glamping means you get nature without giving up sleep.",
    icon: "bed",
    span: "lg:col-span-2",
    image: IMG.tentBedCozy,
    alt: "Comfortable bed with soft lighting inside a glamping tent",
  },
  {
    title: "Minutes from the metro",
    body: "San Juan, the airport, beaches and El Yunque are all an easy drive away.",
    icon: "car",
    span: "",
    image: null,
    alt: "",
  },
  {
    title: "Built for two",
    body: "Low light, low noise, no distractions. A stay that leans romantic by design.",
    icon: "heart",
    span: "",
    image: null,
    alt: "",
  },
  {
    title: "On-site parking",
    body: "Bring the rental car and keep it steps from where you're sleeping.",
    icon: "car",
    span: "",
    image: null,
    alt: "",
  },
  {
    title: "Locally hosted",
    body: "Real recommendations from people who actually live here — not a printed brochure.",
    icon: "star",
    span: "",
    image: null,
    alt: "",
  },
];

export type GalleryItem = {
  id: number;
  cat: "Stay" | "Relax" | "Explore" | "Connect" | "Puerto Rico";
  caption: string;
  alt: string;
  tall?: boolean;
};

export const GALLERY: GalleryItem[] = [
  { id: IMG.hero, cat: "Stay", caption: "The retreat under the palms", alt: "Glamping tent beneath tall palm trees", tall: true },
  { id: IMG.tentBedLux, cat: "Stay", caption: "Turn-down, island style", alt: "Elegant bed inside a canvas tent" },
  { id: IMG.tentTerrace, cat: "Stay", caption: "Your own deck, your own door", alt: "Tent on a wooden terrace beside green trees" },
  { id: IMG.hammockTerrace, cat: "Relax", caption: "Afternoons that go nowhere", alt: "Person relaxing in a hammock on a terrace" },
  { id: IMG.deckSunset, cat: "Relax", caption: "Golden hour on the deck", alt: "Tropical deck glowing at sunset", tall: true },
  { id: IMG.yogaTent, cat: "Relax", caption: "Slow mornings", alt: "Person stretching inside a bright glamping tent" },
  { id: IMG.waterfall, cat: "Explore", caption: "Rainforest, an hour east", alt: "Tall waterfall in a tropical rainforest" },
  { id: IMG.beachPR, cat: "Explore", caption: "Mar Chiquita from above", alt: "Aerial view of a turquoise Puerto Rican cove" },
  { id: IMG.jungleStream, cat: "Explore", caption: "River days", alt: "Stream running through dense jungle", tall: true },
  { id: IMG.coupleFire, cat: "Connect", caption: "Nights that stretch out", alt: "Couple sitting together outdoors in the evening" },
  { id: IMG.coupleTent, cat: "Connect", caption: "Nowhere to be", alt: "Couple relaxing inside a glamping tent" },
  { id: IMG.coupleHammock, cat: "Connect", caption: "Two in a hammock", alt: "Couple sharing a hammock surrounded by greenery" },
  { id: IMG.osjStreet, cat: "Puerto Rico", caption: "Old San Juan color", alt: "Colorful colonial buildings in Old San Juan" },
  { id: IMG.foodSeafood, cat: "Puerto Rico", caption: "Island plates", alt: "Plate of seafood with crispy plantains", tall: true },
  { id: IMG.osjNight, cat: "Puerto Rico", caption: "After dark in the city", alt: "Lantern-lit narrow street at night in Old San Juan" },
  { id: IMG.palmLeaves, cat: "Puerto Rico", caption: "The green that surrounds you", alt: "Dense tropical palm leaves" },
];

export const GALLERY_CATS = ["All", "Stay", "Relax", "Explore", "Connect", "Puerto Rico"] as const;

export const WHY = [
  {
    k: "More privacy.",
    v: "A hotel gives you a door. Coquí Cove gives you a whole pocket of the island. No shared hallways, no pool deck crowd, no 7 a.m. housekeeping knock.",
  },
  {
    k: "More nature.",
    v: "You don't look at the landscape here — you stay inside it. Greenery on every side, tree shade overhead, and the coquí chorus after sunset.",
  },
  {
    k: "More connection.",
    v: "No lobby bar, no TV negotiating for attention. Just the two of you, an outdoor space, and hours that finally move at the right speed.",
  },
  {
    k: "More Puerto Rico.",
    v: "Trujillo Alto is where the metro loosens into mountains. You're close to San Juan's food and history — and far enough to hear the island instead of the traffic.",
  },
  {
    k: "Less ordinary.",
    v: "Anyone can book a room. Very few people get to say they slept inside the Puerto Rican greenery and woke up to it.",
  },
];

export const EXPLORE = [
  {
    title: "Beaches",
    body: "Metro sand in 20–30 minutes, and wilder north-coast coves within an easy drive.",
    image: IMG.turquoise,
    alt: "Turquoise waves along a palm-lined tropical shore",
    span: "md:col-span-2 md:row-span-2",
  },
  { title: "Old San Juan", body: "Blue cobblestones, 500-year-old forts, and the best people-watching on the island.", image: IMG.osjNarrow, alt: "Narrow cobblestone street in Old San Juan", span: "" },
  { title: "Local Food", body: "Mofongo, lechón, tostones and a beachfront kiosk run you'll think about for years.", image: IMG.foodRice, alt: "Traditional Puerto Rican plate with rice and plantains", span: "" },
  { title: "Rainforest", body: "El Yunque — the only tropical rainforest in the U.S. Forest System — sits just east.", image: IMG.waterfallCR, alt: "Waterfall cascading through dense rainforest", span: "md:col-span-2" },
  { title: "Nightlife", body: "Santurce galleries, La Placita on a Friday, live salsa that spills into the street.", image: IMG.osjNight, alt: "Warmly lit street at night in Old San Juan", span: "" },
  { title: "Culture", body: "Museums, murals, bomba y plena, and artisans who'll tell you the whole story.", image: IMG.osjFacade, alt: "Vivid orange colonial facade in Old San Juan", span: "" },
  { title: "Hiking & Rivers", body: "Green ridgelines, river pools and trailheads that start close to home base.", image: IMG.greenHills, alt: "Misty green tropical hills", span: "md:col-span-2" },
];

export const FAQS = [
  {
    q: "Where is Coquí Cove located?",
    a: "Coquí Cove is in Trujillo Alto, Puerto Rico — a green, hillside municipality on the southern edge of the San Juan metro area. The exact address and arrival directions are shared with confirmed guests before check-in for privacy and security.",
  },
  {
    q: "How far is it from San Juan?",
    a: "Trujillo Alto borders the San Juan metro area, so Old San Juan, Condado, Santurce and Luis Muñoz Marín International Airport are all a short drive away. Exact drive time depends on traffic and your starting point — ask us when you inquire and we'll give you a realistic estimate for your plans.",
  },
  {
    q: "Who is Coquí Cove best suited for?",
    a: "Couples first — romantic getaways, anniversaries, birthdays and honeymoon nights. It also suits solo travelers who want quiet, adventurous professionals working remotely from the island, and locals taking a staycation without getting on a plane.",
  },
  {
    q: "Is this camping?",
    a: "No. It's glamping: nature immersion with real comfort. You sleep in a proper bed in a private, enclosed accommodation rather than on the ground in a nylon tent you had to pitch yourself.",
  },
  {
    q: "What should I bring?",
    a: "Light layers, swimwear, reef-safe sunscreen, bug spray, a rain shell (it's the tropics — showers pass quickly), comfortable shoes for exploring, and a portable charger. We'll send a complete arrival guide once your stay is confirmed.",
  },
  {
    q: "Is parking available?",
    a: "Yes — on-site parking is available for guests. If you're arriving with more than one vehicle, let us know when you inquire so we can confirm space.",
  },
  {
    q: "What are check-in and check-out times?",
    a: "Check-in and check-out windows are confirmed with your reservation. Self check-in and flexible timing can often be arranged around flights — just tell us your itinerary when you request availability.",
  },
  {
    q: "What attractions are nearby?",
    a: "Old San Juan and its forts, Condado and metro beaches, Santurce's food and gallery scene, El Yunque National Forest to the east, and hiking, rivers and lookouts right around Trujillo Alto.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellation terms are provided in writing with your booking confirmation before any payment is made, so you'll know the exact windows and conditions before you commit. Ask us directly and we'll send the current policy.",
  },
  {
    q: "Are children or pets allowed?",
    a: "The retreat is designed as an adult, couples-oriented escape. If you're traveling with children or a pet, message us before booking and we'll tell you honestly whether it's the right fit for your group.",
  },
  {
    q: "How do I check availability and book?",
    a: "Use the Check Availability form on this page with your dates and we'll respond with availability, current rates and everything included. Direct inquiries get you the best rate and a real person answering your questions.",
  },
];

export const CONTACT = {
  email: "hola@coquicove.com",
  phone: "+1 (787) 555-0134",
  instagram: "@coquicove",
  instagramUrl: "https://instagram.com/",
  location: "Trujillo Alto, Puerto Rico",
};
