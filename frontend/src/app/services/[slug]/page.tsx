import { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';

export const metadata: Metadata = {
  title: 'Détail du Service | MVB Immobilier',
  description: 'Découvrez en détail nos services immobiliers professionnels.',
};

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
} 