// ─── Global Presence Page Types ───────────────────────────────────────────────
// Types mirror the backend API response exactly.
// Used across all global presence pages (usa, europe, africa, united-kingdom, australia)

export type GPFirstSection = {
  title: string;
  description: string; // HTML string from backend
  image: string;
  imageAlt: string;
  maxwidth: number;
  titlecase: boolean;
};

export type GPReachItem = {
  _id: string;
  value: string;
  title: string;
  description: string;
};

export type GPSecondSection = {
  title: string;
  items: GPReachItem[];
};

export type GPSectorItem = {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type GPThirdSection = {
  title: string;
  description: string;
  subtitle: string;
  items: GPSectorItem[];
};

export type GPHowWeWorkItem = {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type GPFourthSection = {
  title: string;
  items: GPHowWeWorkItem[];
};

export type GPCapabilityItem = {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type GPFifthSection = {
  title: string;
  description: string;
  items: GPCapabilityItem[];
};

export type GPServiceItem = {
  _id: string;
  logo: string;
  logoAlt: string;
  title: string;
  description: string;
};

export type GPSixthSection = {
  title: string;
  description: string;
  items: GPServiceItem[];
};

export type GPWhyItem = {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type GPSeventhSection = {
  title: string;
  description: string;
  items: GPWhyItem[];
};

export type GPSustainabilityItem = {
  _id: string;
  logo: string;
  logoAlt: string;
  title: string;
  description: string;
};

export type GPEighthSection = {
  title: string;
  description: string;
  items: GPSustainabilityItem[];
  secondDescription: string;
};

export type GPPartnerItem = {
  _id: string;
  title: string;
  description: string;
};

export type GPNinthSection = {
  title: string;
  description: string;
  subtitle: string;
  items: GPPartnerItem[];
};

export type GPEngagementItem = {
  _id: string;
  title: string;
  description: string;
};

export type GPTenthSection = {
  title: string;
  description: string;
  items: GPEngagementItem[];
};

export type GPEleventhSection = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: {
    text: string;
    url: string;
  };
};

export type GPFaqItem = {
  _id: string;
  title: string;
  description: string;
};

export type GPTwelfthSection = {
  title: string;
  items: GPFaqItem[];
};

// ─── Full page data shape (matches API response data object) ──────────────────

export type GlobalPresencePageData = {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  firstSection: GPFirstSection;
  secondSection: GPSecondSection;
  thirdSection: GPThirdSection;
  fourthSection: GPFourthSection;
  fifthSection: GPFifthSection;
  sixthSection: GPSixthSection;
  seventhSection: GPSeventhSection;
  eighthSection: GPEighthSection;
  ninthSection: GPNinthSection;
  tenthSection: GPTenthSection;
  eleventhSection: GPEleventhSection;
  twelfthSection: GPTwelfthSection;
};