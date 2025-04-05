'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getService, Service } from '@/lib/strapi';

// Service par défaut
const DEFAULT_SERVICE = {
  id: 1,
  attributes: {
    title: "Consultation immobilière",
    description: "Notre service de consultation immobilière vous accompagne dans tous vos projets immobiliers. Nous vous guidons à chaque étape pour vous aider à prendre les meilleures décisions.",
    icon: "consultation",
    features: [
      "Analyse de votre situation",
      "Étude de marché",
      "Conseils personnalisés",
      "Accompagnement dans les négociations",
      "Suivi de projet"
    ],
    price: "À partir de 50.000 FCFA",
    image: {
      data: {
        attributes: {
          url: "/images/services/consultation.jpg",
          alternativeText: "Consultation immobilière"
        }
      }
    }
  }
};

const ServiceDetailPage = () => {
  const [service, setService] = useState<Service>(DEFAULT_SERVICE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getService(slug);
        if (data) {
          setService(data);
        }
      } catch (err) {
        setError('Erreur lors du chargement du service');
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/services" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Retour aux services
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={service.attributes.image.data.attributes.url}
              alt={service.attributes.image.data.attributes.alternativeText}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {service.attributes.title}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-bold text-blue-600">
                {service.attributes.price}
              </span>
            </div>

            <div className="prose max-w-none mb-8">
              {service.attributes.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
              <ul className="space-y-2">
                {service.attributes.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage; 