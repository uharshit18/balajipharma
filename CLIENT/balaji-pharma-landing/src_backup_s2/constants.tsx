import { NavItem, FeatureItem, TestimonialItem, FooterLink } from './types';

export const LOGO_URL = "/assets/LOGO.png";
export const PHONE_DISPLAY = "+91 94143-72078";
export const PHONE_VALUE = "919414372078";
export const EMAIL_CONTACT = "balajipharmabhl@gmail.com";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Brands', href: '/wholesale-medicines-rajasthan' },
  { label: 'Contact', href: '/contact' },
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Top Wholesale Medical Supplier',
    description: 'Recognized as a premier wholesale medical supplier in Rajasthan, we stock 100+ reputable brands to meet every pharmacy and hospital requirement with precision.',
    icon: 'box',
    stats: [
      { value: '100+', label: 'Top Brands' },
      { value: '1,000+', label: 'Products' },
    ],
  },
  {
    title: 'Genuine Stock & Quality',
    description: 'Located at Fateh Tower, we are trusted pharma distributors in Bhilwara guaranteeing 100% authentic medicines sourced directly from manufacturers.',
    icon: 'shield',
    stats: [
      { value: '15+', label: 'Years of Trust' },
      { value: '100%', label: 'Authentic' },
    ],
  },
  {
    title: 'Fast Delivery Across Rajasthan',
    description: 'Our robust network ensures rapid delivery of healthcare products across Rajasthan, specifically serving Bhilwara and surrounding districts.',
    icon: 'truck',
    stats: [
      { value: '500+', label: 'Retailers' },
      { value: '24h', label: 'Dispatch' },
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "Balaji Pharma has been our reliable partner for years. Their service is unmatched.",
    author: "Mr. Anil Mehta",
    role: "Owner, Fine Medicos",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    quote: "Reliable, efficient, and ethical. Our preferred supplier for all major brands.",
    author: "Dr. Priya Sharma",
    role: "Founder, City Health Clinic",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    quote: "Professionalism at its best. They always deliver on time.",
    author: "Rajesh Kumar",
    role: "City Hospital Store",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
  }
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'Our Brands', href: '/wholesale-medicines-rajasthan' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Support', href: '/contact' },
  { label: 'Place Order', href: `https://wa.me/${PHONE_VALUE}` },
];