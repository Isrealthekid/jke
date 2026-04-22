export const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1776066361565-d0a6cac89c9b?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1774199496664-a9690967be5a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775601258810-9d0c4152d75a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
] as const;

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const ytEmbed = (id: string) => `https://www.youtube.com/embed/${id}`;

export interface Project {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  year: string;
  description: string;
  overview: string;
  brief: string;
  approach: string;
  result: string;
  images: string[];
  client: string;
  role: string;
  duration: string;
  tools: string[];
  videoUrl?: string;
  externalUrl?: string;
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "i-love-you",
    title: "I Love You",
    category: "Film",
    thumbnail: ytThumb("dDHvTvbNeW4"),
    year: "2024",
    description: "A short film about love — messy, complicated, and beautiful.",
    overview:
      "I Love You is a short film that sits inside the mess and the beauty of loving someone. Whether you've been in love, lost it, or are still searching, this story will relate in more ways than one.",
    brief:
      "Tell a love story that doesn't feel like a love story — no grand gestures, just the small, honest, uncomfortable moments that make love real.",
    approach:
      "Shot and cut to feel intimate first and cinematic second. The pacing leans into silences; the sound design carries the emotion where the dialogue steps back.",
    result:
      "Released on Joie TV Productions. A personal favourite for viewers working through their own love stories.",
    images: [
      ytThumb("dDHvTvbNeW4"),
      PLACEHOLDER_IMAGES[1],
      PLACEHOLDER_IMAGES[2],
    ],
    client: "Joie TV Productions",
    role: "Director & Editor",
    duration: "Short Film",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve"],
    videoUrl: ytEmbed("dDHvTvbNeW4"),
    externalUrl: "https://www.youtube.com/watch?v=dDHvTvbNeW4",
  },
  {
    slug: "resonance",
    title: "Resonance",
    category: "Film",
    thumbnail: ytThumb("TbVFPjYVFY0"),
    year: "2024",
    description:
      "A short film about how the past, present, and future connect in ways we can't always explain.",
    overview:
      "Resonance is about the ripples people leave behind and the way certain memories never really fade. It's a meditation on time — the things we carry, and the things we pass on.",
    brief:
      "Build a film that feels like a memory — non-linear, emotional, a little uncertain. Let the edit do the heavy lifting.",
    approach:
      "Edited to layer timelines over each other, letting moments echo instead of explaining them. Grading leans soft and warm to push the sense of recollection.",
    result:
      "Released on Joie TV Productions as a reflective follow-up to earlier narrative work.",
    images: [
      ytThumb("TbVFPjYVFY0"),
      PLACEHOLDER_IMAGES[0],
      PLACEHOLDER_IMAGES[2],
    ],
    client: "Joie TV Productions",
    role: "Director & Editor",
    duration: "Short Film",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve"],
    videoUrl: ytEmbed("TbVFPjYVFY0"),
    externalUrl: "https://www.youtube.com/watch?v=TbVFPjYVFY0",
  },
  {
    slug: "wake-up-eat-sleep-repeat",
    title: "Wake Up, Eat, Sleep, Repeat",
    category: "Film",
    thumbnail: ytThumb("QxYfDjL8zcI"),
    year: "2024",
    description:
      "A short film mirroring the depth of everyday life — the routine, the fatigue, the small moments that keep us going.",
    overview:
      "A short film for anyone who has ever felt stuck in the daily cycle but still finds a way to keep moving forward. Watch, reflect, and maybe break the cycle.",
    brief:
      "Take something as mundane as a daily routine and make it feel cinematic without losing its honesty.",
    approach:
      "Repetition is the main character. Cuts are built around repeating frames and sounds so the routine is felt, not just shown — then broken, deliberately, at the moments that matter.",
    result:
      "Struck a chord with viewers navigating burnout and the grind — the film's comment section became its own conversation.",
    images: [
      ytThumb("QxYfDjL8zcI"),
      PLACEHOLDER_IMAGES[0],
      PLACEHOLDER_IMAGES[1],
    ],
    client: "Joie TV Productions",
    role: "Director & Editor",
    duration: "Short Film",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve"],
    videoUrl: ytEmbed("QxYfDjL8zcI"),
    externalUrl: "https://www.youtube.com/watch?v=QxYfDjL8zcI",
  },
  {
    slug: "knock-knock",
    title: "Knock Knock",
    category: "Film",
    thumbnail: ytThumb("3edRZ78dIuI"),
    year: "2023",
    description:
      "A short horror film about the dangers of being in the dorm room alone.",
    overview:
      "Knock Knock is a tight, atmospheric horror short built on a very ordinary fear — being alone in a space that suddenly isn't yours anymore.",
    brief:
      "Deliver horror on a student budget: no gore, no spectacle — just tension, space, and sound doing the work.",
    approach:
      "Long takes, tight framing, and a deliberately restrained sound palette. The edit resists the urge to cut away, letting dread build in real time.",
    result:
      "One of the breakout pieces on Joie TV Productions and a regular entry point for new viewers into the channel's narrative work.",
    images: [
      ytThumb("3edRZ78dIuI"),
      PLACEHOLDER_IMAGES[1],
      PLACEHOLDER_IMAGES[2],
    ],
    client: "Joie TV Productions",
    role: "Director & Editor",
    duration: "Short Film",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve"],
    videoUrl: ytEmbed("3edRZ78dIuI"),
    externalUrl: "https://www.youtube.com/watch?v=3edRZ78dIuI",
  },
  {
    slug: "women-leaders-unscripted-trailer",
    title: "Women Leaders Unscripted — Trailer",
    category: "Video Edit",
    thumbnail: ytThumb("2B3ZORKuDJ0"),
    year: "2025",
    description:
      "Launch trailer for Women Leaders Unscripted — a podcast bringing together Africa's most inspiring female voices.",
    overview:
      "Women Leaders Unscripted is a podcast series of real, raw, and unscripted conversations about leadership, growth, resilience, and transformation. The trailer had to introduce the series' tone in under a minute: no scripts, no filters, just truth and courage.",
    brief:
      "Edit a launch trailer that signals the intent of the series — bold African voices, stripped-back conversation, cinematic treatment. Hook viewers in the first three seconds.",
    approach:
      "Pulled the most charged lines from across recorded sessions and layered them against atmospheric beats. Cuts are quick where the energy rises and held where the statements need to land.",
    result:
      "Set the visual and pacing language used across the rest of the Women Leaders Unscripted series.",
    images: [
      ytThumb("2B3ZORKuDJ0"),
      ytThumb("-OKPBPCKP1w"),
      ytThumb("iJw89fpioOQ"),
    ],
    client: "Women Leaders Unscripted",
    role: "Editor",
    duration: "Trailer",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve"],
    videoUrl: ytEmbed("2B3ZORKuDJ0"),
    externalUrl: "https://youtu.be/2B3ZORKuDJ0",
  },
  {
    slug: "women-leaders-unscripted-debola",
    title: "The Beginning — Debola Deji-Kurunmi",
    category: "Video Edit",
    thumbnail: ytThumb("-OKPBPCKP1w"),
    year: "2025",
    description:
      "Debola Deji-Kurunmi opens Women Leaders Unscripted with reflections on courage, calling, and leading from truth.",
    overview:
      "The launch trailer for Debola Deji-Kurunmi's episode — author, coach, and nation-builder — introducing her chapter of Women Leaders Unscripted and the kind of leadership that transforms lives.",
    brief:
      "Cut a launch piece that captures Debola's voice and presence without over-editing. It should feel like an invitation, not a promo.",
    approach:
      "Long interview takes with minimal intercuts, punctuated by clean title cards. The grade stays neutral and warm; the audio is front and centre.",
    result:
      "Became the entry point for the Women Leaders Unscripted series, anchoring the tone for every episode that followed.",
    images: [
      ytThumb("-OKPBPCKP1w"),
      ytThumb("2B3ZORKuDJ0"),
      ytThumb("iJw89fpioOQ"),
    ],
    client: "Women Leaders Unscripted",
    role: "Editor",
    duration: "Launch Video",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve"],
    videoUrl: ytEmbed("-OKPBPCKP1w"),
    externalUrl: "https://www.youtube.com/watch?v=-OKPBPCKP1w",
  },
  {
    slug: "why-you-feel-stuck",
    title: "Why You Feel Stuck",
    category: "Social Content",
    thumbnail: ytThumb("iJw89fpioOQ"),
    year: "2025",
    description:
      "A vertical short from Episode 1 of Women Leaders Unscripted with Debola Deji-Kurunmi — it's not money.",
    overview:
      "A punchy vertical edit pulled from the first episode of Women Leaders Unscripted. Built for YouTube Shorts and Reels — hook on frame one, payoff before the scroll.",
    brief:
      "Extract a stand-alone moment from the long-form episode that works as a vertical short without losing context.",
    approach:
      "Reframed and recut for 9:16, tightened pacing, added captions and rhythm cuts on emphasis beats. Kept the speaker's line intact — the edit just clears the path.",
    result:
      "A short-form entry point driving traffic back into the long-form episode.",
    images: [
      ytThumb("iJw89fpioOQ"),
      ytThumb("-OKPBPCKP1w"),
      ytThumb("2B3ZORKuDJ0"),
    ],
    client: "Women Leaders Unscripted",
    role: "Editor",
    duration: "Short",
    tools: ["Adobe Premiere Pro", "CapCut"],
    videoUrl: ytEmbed("iJw89fpioOQ"),
    externalUrl: "https://youtube.com/shorts/iJw89fpioOQ",
  },
  {
    slug: "francesca-uriri-silicon-valley",
    title: "Francesca Uriri — Building a Career in Silicon Valley",
    category: "Social Content",
    thumbnail: ytThumb("1IziFZo3SNI"),
    year: "2025",
    description:
      "Season 1 finale short with Francesca Uriri on building a global career from Nigeria to Silicon Valley.",
    overview:
      "A vertical short cut from the Season 1 finale of Women Leaders Unscripted. Francesca Uriri — media executive, tech leader, and founder of Leading Ladies Africa — opens up about thriving as an immigrant professional and channelling ambition without losing yourself.",
    brief:
      "Pull a stand-alone moment from a long-form finale episode that works as a vertical short without losing the weight of the story.",
    approach:
      "Reframed to 9:16, tightened pacing, and beat-cut the line breaks to land Francesca's most charged statements first. Captions sit low so the face reads clearly on mobile.",
    result:
      "A short-form entry point for the Season 1 finale, designed to convert scroll-stoppers into full-episode viewers.",
    images: [
      ytThumb("1IziFZo3SNI"),
      ytThumb("E6b4ITQMcI4"),
      ytThumb("2B3ZORKuDJ0"),
    ],
    client: "Women Leaders Unscripted",
    role: "Editor",
    duration: "Short",
    tools: ["Adobe Premiere Pro", "CapCut"],
    videoUrl: ytEmbed("1IziFZo3SNI"),
    externalUrl: "https://youtube.com/shorts/1IziFZo3SNI",
  },
  {
    slug: "francesca-uriri-healing",
    title: "Francesca Uriri — Navigating Loss & Choosing Healing",
    category: "Social Content",
    thumbnail: ytThumb("E6b4ITQMcI4"),
    year: "2025",
    description:
      "A companion short from the Season 1 finale — Francesca Uriri on grief, leadership, and healing in high-performance environments.",
    overview:
      "A second vertical cut from Francesca Uriri's Season 1 finale appearance. This clip leans into the quieter half of the conversation — navigating grief while still showing up to lead, and the courage it takes to redefine success on your own terms.",
    brief:
      "Separate the softer, more reflective beats from the career-focused clip so each short has its own emotional register.",
    approach:
      "Slower pacing, longer holds on Francesca's face, and a more restrained caption style. Lets the silences do more of the work.",
    result:
      "Paired with the Silicon Valley cut to give the finale two distinct short-form entry points — one for ambition, one for healing.",
    images: [
      ytThumb("E6b4ITQMcI4"),
      ytThumb("1IziFZo3SNI"),
      ytThumb("-OKPBPCKP1w"),
    ],
    client: "Women Leaders Unscripted",
    role: "Editor",
    duration: "Short",
    tools: ["Adobe Premiere Pro", "CapCut"],
    videoUrl: ytEmbed("E6b4ITQMcI4"),
    externalUrl: "https://youtube.com/shorts/E6b4ITQMcI4",
  },
  {
    slug: "yemi-chukwurah-china-supply-chain",
    title: "Yemi Chukwurah — Mastering China's Supply Chain",
    category: "Social Content",
    thumbnail: ytThumb("NDqZ3hzOtmc"),
    year: "2025",
    description:
      "Episode 10 short with Yemi Chukwurah on building across borders and winning inside China's manufacturing economy.",
    overview:
      "A vertical cut from Episode 10 of Women Leaders Unscripted. Yemi Chukwurah breaks down what it really takes for a Nigerian entrepreneur to negotiate with Chinese suppliers, navigate cultural and operational barriers, and scale beyond local markets.",
    brief:
      "Distil a detail-heavy business conversation into a short that feels like a masterclass, not a lecture.",
    approach:
      "Opened on Yemi's strongest thesis line, then layered supporting beats with on-screen text for quick comprehension. Kept cuts on emphasis so the rhythm matches how she speaks.",
    result:
      "A high-information short designed to funnel serious entrepreneurs into the full long-form episode.",
    images: [
      ytThumb("NDqZ3hzOtmc"),
      ytThumb("WoCZa0TUz4E"),
      ytThumb("2B3ZORKuDJ0"),
    ],
    client: "Women Leaders Unscripted",
    role: "Editor",
    duration: "Short",
    tools: ["Adobe Premiere Pro", "CapCut"],
    videoUrl: ytEmbed("NDqZ3hzOtmc"),
    externalUrl: "https://youtube.com/shorts/NDqZ3hzOtmc",
  },
  {
    slug: "patricia-obozuwa-workplace-politics",
    title: "Patricia Obozuwa — Navigating Workplace Politics",
    category: "Social Content",
    thumbnail: ytThumb("WoCZa0TUz4E"),
    year: "2025",
    description:
      "Episode 9 short with Patricia Obozuwa on workplace politics and being \"the only\" in the room.",
    overview:
      "A vertical cut from Episode 9 of Women Leaders Unscripted. Patricia Obozuwa — global business leader, board member, and former CMO — shares candid insight on the unspoken rules of workplace politics and how women can build influence, credibility, and long-term success in high-stakes environments.",
    brief:
      "Take a practical, experience-heavy conversation and surface the single most actionable insight for a short audience.",
    approach:
      "Led with the hook — \"being the only\" — and cut around Patricia's most quotable reframes. Clean captions, zero visual noise, so the words carry.",
    result:
      "A clip that consistently drives comments and saves — the format most likely to convert passive scrollers into subscribers.",
    images: [
      ytThumb("WoCZa0TUz4E"),
      ytThumb("NDqZ3hzOtmc"),
      ytThumb("-OKPBPCKP1w"),
    ],
    client: "Women Leaders Unscripted",
    role: "Editor",
    duration: "Short",
    tools: ["Adobe Premiere Pro", "CapCut"],
    videoUrl: ytEmbed("WoCZa0TUz4E"),
    externalUrl: "https://youtube.com/shorts/WoCZa0TUz4E",
  },
];
