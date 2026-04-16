export const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1776066361565-d0a6cac89c9b?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1774199496664-a9690967be5a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1775601258810-9d0c4152d75a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
] as const;

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
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "the-outsiders",
    title: "The Outsiders",
    category: "Film",
    thumbnail: PLACEHOLDER_IMAGES[0],
    year: "2025",
    description: "A short film exploring identity and belonging in Lagos.",
    overview:
      "The Outsiders is a 12-minute short film that follows three young creatives navigating the tension between tradition and modernity in Lagos. Shot over 5 days across Lekki, Victoria Island, and the mainland.",
    brief:
      "Create a visually stunning short film that captures the spirit of young Lagos — the hustle, the beauty, the contradictions. The film needed to feel cinematic yet intimate, like a love letter to the city.",
    approach:
      "We shot on BMPCC 6K with vintage anamorphic lenses to get that warm, filmic quality. Every location was scouted for natural light. The edit rhythm mirrors the pace of Lagos itself — frenetic energy cut with moments of stillness.",
    result:
      "Selected for 3 international film festivals. Over 4.2M views across platforms within the first month. The film was featured on CNN Africa and picked up by a major streaming platform.",
    images: [PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[2]],
    client: "Self-Initiated",
    role: "Director & Editor",
    duration: "12 min",
    tools: ["BMPCC 6K", "DaVinci Resolve", "After Effects"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Views", value: "4.2M" },
      { label: "Festival Selections", value: "3" },
    ],
  },
  {
    slug: "gtbank-fashion",
    title: "GTBank Fashion Weekend",
    category: "Video Edit",
    thumbnail: PLACEHOLDER_IMAGES[1],
    year: "2025",
    description: "Recap film for GTBank's annual fashion weekend event.",
    overview:
      "A high-energy recap film capturing the essence of Africa's biggest fashion event. 48 hours of footage condensed into a 3-minute visual experience.",
    brief:
      "Produce a recap video that captures the energy, diversity, and cultural significance of GTBank Fashion Weekend. Must work across Instagram, YouTube, and broadcast.",
    approach:
      "Multi-camera setup with 4 operators. Real-time syncing to a curated soundtrack. We used a mix of gimbal, drone, and handheld to create texture variety.",
    result:
      "2.1M impressions in the first week. The video became GTBank's most-shared branded content of the year.",
    images: [PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[0]],
    client: "GTBank",
    role: "Lead Editor",
    duration: "3 min",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    metrics: [
      { label: "Impressions", value: "2.1M" },
      { label: "Shares", value: "34K" },
    ],
  },
  {
    slug: "flutterwave-send",
    title: "Flutterwave Send",
    category: "Social Content",
    thumbnail: PLACEHOLDER_IMAGES[2],
    year: "2024",
    description: "Social media campaign for Flutterwave's Send product launch.",
    overview:
      "A 30-piece social content campaign built to drive awareness and downloads for Flutterwave Send, their person-to-person payment feature targeting the diaspora.",
    brief:
      "Create thumb-stopping social content that explains a financial product without being boring. Target: Nigerian diaspora in UK, US, Canada. Must feel native to each platform.",
    approach:
      "We created platform-specific content — vertical storytelling for TikTok, carousel deep-dives for Instagram, and quick explainers for Twitter. Each piece was A/B tested for hook effectiveness.",
    result:
      "Campaign drove 340% increase in app downloads during launch week. Content was repurposed by influencers organically.",
    images: [PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[1]],
    client: "Flutterwave",
    role: "Content Director",
    duration: "6 weeks",
    tools: ["Figma", "Premiere Pro", "CapCut"],
    metrics: [
      { label: "Downloads Increase", value: "340%" },
      { label: "Organic Shares", value: "12K" },
    ],
  },
  {
    slug: "native-mag-cover",
    title: "Native Mag Cover Shoot",
    category: "Film",
    thumbnail: PLACEHOLDER_IMAGES[1],
    year: "2024",
    description: "Behind-the-scenes film for Native Magazine's cover shoot.",
    overview:
      "An intimate BTS film documenting Native Magazine's cover shoot with Tems. Raw, unscripted, and beautifully lit.",
    brief:
      "Capture the energy and creative process behind the shoot. The film should feel like you're in the room — no narration, just vibes.",
    approach:
      "Single camera, natural light, minimal crew. We let moments breathe and trusted the edit to find the story. Shot on a Sony FX6 with vintage Contax Zeiss glass.",
    result:
      "1.8M views on YouTube. The film helped establish Native's video-first content strategy.",
    images: [PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[1]],
    client: "Native Magazine",
    role: "Director of Photography",
    duration: "8 min",
    tools: ["Sony FX6", "DaVinci Resolve"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Views", value: "1.8M" },
      { label: "Watch Time", value: "6.2min avg" },
    ],
  },
  {
    slug: "mtn-pulse",
    title: "MTN Pulse Campaign",
    category: "Social Content",
    thumbnail: PLACEHOLDER_IMAGES[0],
    year: "2024",
    description: "Youth-focused social campaign for MTN Pulse data plans.",
    overview:
      "A Gen-Z targeted social campaign using meme culture and trending audio to drive awareness of MTN's affordable data plans.",
    brief:
      "Make MTN cool for 18-24 year olds. The content needs to feel organic — not like an ad. Must leverage trending formats on TikTok and Instagram Reels.",
    approach:
      "We embedded with 5 micro-creators across Lagos, Abuja, and PH. Each creator had creative freedom within our brand guardrails. Content was rapid-fire: 3 posts per day for 2 weeks.",
    result:
      "Campaign reached 1.2M unique users. MTN Pulse subscriptions increased 28% during the campaign period.",
    images: [PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[2]],
    client: "MTN Nigeria",
    role: "Creative Strategist",
    duration: "2 weeks",
    tools: ["CapCut", "Canva", "Premiere Pro"],
    metrics: [
      { label: "Reach", value: "1.2M" },
      { label: "Subscriptions", value: "+28%" },
    ],
  },
  {
    slug: "afrobeats-doc",
    title: "Afrobeats: The Movement",
    category: "Film",
    thumbnail: PLACEHOLDER_IMAGES[2],
    year: "2024",
    description: "A documentary exploring the global rise of Afrobeats.",
    overview:
      "A 25-minute documentary featuring interviews with producers, artists, and cultural commentators on how Afrobeats became the world's fastest-growing genre.",
    brief:
      "Tell the Afrobeats story through the lens of the people who built it. Not a history lesson — a living, breathing portrait of a movement.",
    approach:
      "Interviews shot in studios across Lagos and London. We intercut with archival footage, concert recordings, and animated data visualizations. The grade leans warm and nostalgic.",
    result:
      "Premiered at AFRIFF. Acquired by a major streaming service for global distribution.",
    images: [PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[0]],
    client: "Self-Initiated",
    role: "Director & Editor",
    duration: "25 min",
    tools: ["RED Komodo", "DaVinci Resolve", "After Effects"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Festival Premiere", value: "AFRIFF" },
      { label: "Countries", value: "12" },
    ],
  },
  {
    slug: "paystack-rebrand",
    title: "Paystack Rebrand Video",
    category: "Video Edit",
    thumbnail: PLACEHOLDER_IMAGES[0],
    year: "2023",
    description: "Brand reveal video for Paystack's visual identity refresh.",
    overview:
      "A sleek 90-second brand reveal film showcasing Paystack's new visual identity — new logo, colour system, and motion language.",
    brief:
      "Create a launch video that introduces the new brand with confidence. It should feel premium, modern, and unmistakably African tech.",
    approach:
      "Motion-heavy approach: every frame is designed in Figma, animated in After Effects, and composited in Premiere. We used a custom type animation system that mirrors the new brand's geometric language.",
    result:
      "3.5M impressions across launch channels. The video set the tone for Paystack's entire rebrand rollout.",
    images: [PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[2]],
    client: "Paystack",
    role: "Motion Director",
    duration: "90 sec",
    tools: ["After Effects", "Figma", "Premiere Pro"],
    metrics: [
      { label: "Impressions", value: "3.5M" },
      { label: "Engagement Rate", value: "8.4%" },
    ],
  },
  {
    slug: "moniepoint-stories",
    title: "Moniepoint Stories",
    category: "Social Content",
    thumbnail: PLACEHOLDER_IMAGES[2],
    year: "2023",
    description: "Human-interest content series for Moniepoint's social channels.",
    overview:
      "A 12-part content series profiling small business owners across Nigeria who use Moniepoint. Each story is 60 seconds of pure emotion.",
    brief:
      "Humanize Moniepoint's brand by telling the stories of their actual users. No actors — real people, real businesses, real impact.",
    approach:
      "We traveled to 6 cities over 3 weeks. Each story was shot in a single morning — arrive early, observe, capture. Minimal direction, maximum authenticity.",
    result:
      "Series averaged 280K views per episode. Three stories were picked up by national press.",
    images: [PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[1]],
    client: "Moniepoint",
    role: "Content Director",
    duration: "12 episodes",
    tools: ["Sony A7IV", "Premiere Pro", "Lightroom"],
    metrics: [
      { label: "Avg Views", value: "280K" },
      { label: "Press Pickups", value: "3" },
    ],
  },
  {
    slug: "wef-lagos",
    title: "WEF Lagos Highlight",
    category: "Video Edit",
    thumbnail: PLACEHOLDER_IMAGES[1],
    year: "2023",
    description: "Official highlight reel for the World Economic Forum Lagos summit.",
    overview:
      "A 5-minute highlight film capturing the energy and ideas of WEF's first Lagos summit. Speeches, networking, city vibes.",
    brief:
      "Create a prestigious highlight film worthy of the WEF brand. Must balance content (speeches, panels) with atmosphere (Lagos energy, networking moments).",
    approach:
      "5-camera setup with dedicated operators for stage, crowd, B-roll, and aerials. Same-day rough cut delivered for social; full film delivered within 72 hours.",
    result:
      "Featured on WEF's global channels. Over 890K views in the first month.",
    images: [PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[1]],
    client: "World Economic Forum",
    role: "Lead Editor",
    duration: "5 min",
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    metrics: [
      { label: "Views", value: "890K" },
      { label: "Turnaround", value: "72hrs" },
    ],
  },
  {
    slug: "tiktok-creator",
    title: "TikTok Creator Fund",
    category: "Social Content",
    thumbnail: PLACEHOLDER_IMAGES[0],
    year: "2023",
    description: "Launch campaign for TikTok's creator fund in Sub-Saharan Africa.",
    overview:
      "A cross-platform campaign announcing TikTok's creator monetization program in Africa. Equal parts hype video and educational content.",
    brief:
      "Announce the creator fund in a way that feels exciting, not corporate. Target existing creators on the platform — speak their language.",
    approach:
      "We recruited 10 of TikTok's biggest African creators to co-create the launch content. Each creator made their own announcement in their style; we produced the hero video tying it all together.",
    result:
      "4.8M views on the hero video. Creator fund applications exceeded target by 3x in the first week.",
    images: [PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[0]],
    client: "TikTok",
    role: "Campaign Director",
    duration: "4 weeks",
    tools: ["CapCut", "Premiere Pro", "After Effects"],
    metrics: [
      { label: "Hero Views", value: "4.8M" },
      { label: "Applications", value: "3x target" },
    ],
  },
  {
    slug: "alte-radio",
    title: "Alte Radio Sessions",
    category: "Film",
    thumbnail: PLACEHOLDER_IMAGES[2],
    year: "2023",
    description: "Live performance series filmed at an underground Lagos venue.",
    overview:
      "A 6-part live performance series capturing emerging alternative artists in an intimate warehouse setting. Lo-fi production, high-fi talent.",
    brief:
      "Create a Tiny Desk-style series but make it Lagos. Raw audio, cinematic visuals, underground energy.",
    approach:
      "Single-take performances, 3 cameras, live audio mix. We lit each session to match the artist's mood — warm ambers for R&B, cold blues for electronic.",
    result:
      "Series became a cult favourite. Combined 2.4M views. Two featured artists got signed to major labels within 6 months.",
    images: [PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[2]],
    client: "Alte Radio",
    role: "Director & Cinematographer",
    duration: "6 episodes",
    tools: ["Sony FX6", "DaVinci Resolve", "Pro Tools"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Combined Views", value: "2.4M" },
      { label: "Artist Signings", value: "2" },
    ],
  },
  {
    slug: "access-bank-ar",
    title: "Access Bank AR Experience",
    category: "Video Edit",
    thumbnail: PLACEHOLDER_IMAGES[1],
    year: "2022",
    description: "Augmented reality promo video for Access Bank's mobile app.",
    overview:
      "A technical showpiece combining live-action footage with AR overlays to demonstrate Access Bank's new mobile banking features.",
    brief:
      "Create a futuristic promo that shows the new AR features in action. Must feel cutting-edge but still approachable for a mass audience.",
    approach:
      "Shot on green screen with tracked AR elements composited in After Effects. We used Cinema 4D for the 3D UI mockups and matched lighting between real and virtual elements.",
    result:
      "Video drove 156K app downloads in launch week. Won Best Financial Services Video at the Marketing World Awards.",
    images: [PLACEHOLDER_IMAGES[2], PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[0]],
    client: "Access Bank",
    role: "VFX & Edit",
    duration: "2 min",
    tools: ["After Effects", "Cinema 4D", "Premiere Pro"],
    metrics: [
      { label: "App Downloads", value: "156K" },
      { label: "Award", value: "MWA Winner" },
    ],
  },
];
