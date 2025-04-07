import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Nos Services | MVB Immobilier',
  description: 'Découvrez nos services immobiliers complets : location, vente, achat, architecture, construction et plus encore.',
};

export default function ServicesPage() {
  return <ServicesClient />;
} 