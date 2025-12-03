export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  stats: StatItem[];
  icon: 'box' | 'shield' | 'truck';
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