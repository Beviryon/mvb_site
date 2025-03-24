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
    title: "Gestion Locative",
    description: "Service complet de gestion de vos biens immobiliers en location. Nous nous occupons de tout, de la recherche de locataires à la gestion quotidienne. Notre équipe expérimentée assure un suivi personnalisé et professionnel de votre patrimoine immobilier.",
    icon: "🏠",
    price: "10% des loyers",
    features: [
      "Recherche et sélection des locataires",
      "Gestion des baux et des loyers",
      "Suivi des travaux et maintenance",
      "Gestion administrative complète",
      "Reporting mensuel"
    ],
    benefits: [
      "Gain de temps considérable",
      "Optimisation de vos revenus locatifs",
      "Réduction des risques d'impayés",
      "Tranquillité d'esprit totale",
      "Valorisation de votre patrimoine"
    ],
    process: [
      {
        title: "Évaluation initiale",
        description: "Analyse complète de votre bien et définition de la stratégie locative"
      },
      {
        title: "Mise en location",
        description: "Recherche active de locataires qualifiés et constitution des dossiers"
      },
      {
        title: "Gestion quotidienne",
        description: "Suivi des loyers, maintenance et relation avec les locataires"
      },
      {
        title: "Reporting régulier",
        description: "Compte-rendu mensuel détaillé de la gestion de votre bien"
      }
    ],
    image: {
      data: {
        attributes: {
          url: "https://images.pexels.com/photos/7641833/pexels-photo-7641833.jpeg",
          alternativeText: "Gestion locative"
        }
      }
    },
    gallery: {
      data: [
        {
          attributes: {
            url: "https://images.pexels.com/photos/7641834/pexels-photo-7641834.jpeg",
            alternativeText: "Gestion administrative"
          }
        },
        {
          attributes: {
            url: "https://images.pexels.com/photos/7641835/pexels-photo-7641835.jpeg",
            alternativeText: "Suivi des travaux"
          }
        },
        {
          attributes: {
            url: "https://images.pexels.com/photos/7641836/pexels-photo-7641836.jpeg",
            alternativeText: "Relation locataires"
          }
        }
      ]
    }
  }
};

const ServiceDetailPage = () => {
  const params = useParams();
  const [service, setService] = useState<Service>(DEFAULT_SERVICE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getService(Number(params.id));
        if (response.data) {
          setService(response.data);
        }
      } catch (err) {
        console.error(err);
        // En cas d'erreur, on garde les données par défaut
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600">{error}</p>
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
            src={service.attributes.image.data.attributes.url}
            alt={service.attributes.image.data.attributes.alternativeText}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <div className="text-6xl mb-6">{service.attributes.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.attributes.title}
            </h1>
            <p className="text-2xl font-semibold text-blue-400">
              {service.attributes.price}
            </p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-gray-600 leading-relaxed">
              {service.attributes.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {service.attributes.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center text-blue-600 mb-4">
                  <span className="text-2xl mr-3">✓</span>
                  <h3 className="font-semibold">{feature}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Notre Processus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.attributes.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">Les Avantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.attributes.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-2xl mr-3">★</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Galerie Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.attributes.gallery.data.map((image, index) => (
              <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={image.attributes.url}
                  alt={image.attributes.alternativeText}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Intéressé par notre service de {service.attributes.title} ?
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Nous contacter
            </Link>
            <Link
              href="/services"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-300 transition-all transform hover:scale-105"
            >
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage; 