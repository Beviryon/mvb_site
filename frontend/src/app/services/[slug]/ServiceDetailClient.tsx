'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Service } from '@/lib/strapi';
import { DEFAULT_SERVICES, getServiceDetails, getServiceProcess, getServiceFAQ } from '../data';

const ServiceDetailClient = () => {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentService = DEFAULT_SERVICES.find(
      (s: Service) => s.attributes.slug === params.slug
    );
    setService(currentService || null);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Service non trouvé</h2>
          <Link href="/services" className="text-blue-600 hover:underline">
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation rapide */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/services" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
            <span>←</span>
            <span>Retour aux services</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section avec image de fond */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.attributes.image.data.attributes.url}
            alt={service.attributes.image.data.attributes.alternativeText}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="text-6xl mb-6">{service.attributes.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.attributes.title}
            </h1>
            <p className="text-2xl text-[#800000] font-semibold bg-white/10 inline-block px-6 py-2 rounded-full">
              {service.attributes.price}
            </p>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {/* Description détaillée */}
            <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">À propos de ce service</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed mb-6">{service.attributes.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {getServiceDetails(service.attributes.slug).map((detail, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-3">{detail.title}</h3>
                      <p className="text-gray-600">{detail.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Processus de travail */}
            <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Notre processus</h2>
              <div className="space-y-6">
                {getServiceProcess(service.attributes.slug).map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Caractéristiques */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Caractéristiques</h2>
              <div className="space-y-4">
                {service.attributes.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      ✓
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 space-y-4">
                <Link
                  href="/contact"
                  className="block text-center bg-[#1A1A2E] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/contact"
                  className="block text-center border-2 border-[#1A1A2E] border-solid text-[#1A1A2E] px-6 py-3 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Section FAQ */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {getServiceFAQ(service.attributes.slug).map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailClient; 