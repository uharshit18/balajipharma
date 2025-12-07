export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  stats: { value: string; label: string; }[];
}

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface FooterLink {
  label: string;
  href: string;
}