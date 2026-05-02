export const BRAND = {
  name: "Thalatha",
  tagline: "Premium Home Services Made Simple",
  subtagline:
    "Connect with verified service providers through video requests. Show what you need, get instant quotes, and hire with complete confidence.",
  stats: [
    { value: 50000, suffix: "K+", label: "Happy Users", display: 50, displaySuffix: "K+" },
    { value: 10000, suffix: "K+", label: "Service Providers", display: 10, displaySuffix: "K+" },
    { value: 100000, suffix: "K+", label: "Services Completed", display: 100, displaySuffix: "K+" },
    { value: 4.9, suffix: "★", label: "Average Rating", display: 4.9, displaySuffix: "★" },
  ] as const,
  appStore: "https://apps.apple.com/us/app/thalatha/id6755521133",
  playStore: "https://play.google.com/store/apps/details?id=com.thalatha.mobile",
  colors: {
    bgPrimary: "#0A0812",
    bgSurface: "#120E1E",
    purple: "#5B3FBF",
    purpleDeep: "#4C35A0",
    purpleLight: "#8B5CF6",
    purplePale: "#A78BFA",
    purpleMid: "#7c5cbf",
    textPrimary: "#F5F3FF",
    textSecondary: "#A99CC2",
    gold: "#E8C97A",
  },
} as const;

export type FeatureIcon =
  | "video"
  | "location"
  | "quote"
  | "shield"
  | "chat"
  | "globe";

export const FEATURES: ReadonlyArray<{
  icon: FeatureIcon;
  title: string;
  desc: string;
}> = [
  {
    icon: "video",
    title: "Video Requests",
    desc: "Show exactly what you need with a short video. Visual clarity leads to perfect results.",
  },
  {
    icon: "location",
    title: "Smart Location",
    desc: "AI-powered matching connects you with service providers in your area instantly.",
  },
  {
    icon: "quote",
    title: "Instant Quotes",
    desc: "Receive multiple competitive quotes from qualified providers within minutes.",
  },
  {
    icon: "shield",
    title: "Verified Providers",
    desc: "All providers are thoroughly verified and rated by real clients for your safety.",
  },
  {
    icon: "chat",
    title: "WhatsApp Direct",
    desc: "Connect directly via WhatsApp once you accept a quote for seamless coordination.",
  },
  {
    icon: "globe",
    title: "Global Reach",
    desc: "Available in multiple countries with local providers delivering consistent quality.",
  },
];

export const STEPS = [
  {
    n: 1,
    title: "Record",
    head: "Capture what you need",
    body: "Open Thalatha and record a short video showing the issue. A few seconds of context replaces paragraphs of explanation.",
    illustration: "record",
  },
  {
    n: 2,
    title: "Receive",
    head: "Get instant quotes",
    body: "Verified providers in your area review your video and respond with detailed quotes within minutes.",
    illustration: "receive",
  },
  {
    n: 3,
    title: "Connect",
    head: "Chat & confirm on WhatsApp",
    body: "Accept the quote you love and continue the conversation directly on WhatsApp — no friction, no surprises.",
    illustration: "connect",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    initials: "SJ",
    text: "Thalatha completely changed how I handle home repairs. The video feature made it so easy to show exactly what I needed, and I got multiple quotes within hours.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Business Owner",
    initials: "MC",
    text: "As a service provider, Thalatha has given me access to quality clients who know exactly what they want. The platform is intuitive and seamless.",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Family Man",
    initials: "AA",
    text: "The location-based matching is perfect! I found reliable electricians in my area within minutes. The WhatsApp integration is so convenient.",
    rating: 5,
  },
] as const;

export const SERVICES = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Cleaning",
  "Carpentry",
  "Gardening",
  "AC Repair",
  "Car Wash",
  "Appliance Repair",
  "Locksmith",
  "TV Mounting",
  "More...",
] as const;

export const SCREENSHOTS = [
  "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/56/a1/77/56a17766-dbef-23b5-ff9a-873cb6f7ce0f/1290_x_3190.jpg/600x1300bb.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b6/d1/24/b6d124d7-56cf-586f-0cb3-22907e9dc342/1284_x_2780.jpg/600x1300bb.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/f5/49/2f/f5492fd2-a06b-d06a-f6a7-7bfd60b8a418/1290_x_3191.jpg/600x1300bb.jpg",
] as const;

export const NAV_LINKS = [
  { id: "features", label: "Features" },
  { id: "how", label: "How it works" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Reviews" },
  { id: "download", label: "Download" },
] as const;
