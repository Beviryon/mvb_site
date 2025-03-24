'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPortfolioItem, PortfolioItem } from '@/lib/strapi';

const PortfolioItemPage = () => {
  const params = useParams();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await getPortfolioItem(params.id as string);
        setItem(response.data);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement du projet');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600">{error || 'Projet non trouvé'}</p>
          <Link
            href="/portfolio"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Retour au portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.attributes.image.data.attributes.url}`}
            alt={item.attributes.image.data.attributes.alternativeText || item.attributes.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {item.attributes.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{item.attributes.title}</h1>
            <p className="text-xl">{item.attributes.location}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none mb-8">
              {item.attributes.description}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.attributes.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous avez un projet similaire ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Notre équipe d&apos;experts est là pour vous accompagner
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Nous contacter
            </Link>
            <Link
              href="/portfolio"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Voir d&apos;autres projets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioItemPage; 