'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getServices, Service } from '@/lib/strapi';

// Données statiques par défaut
const DEFAULT_SERVICES = [
  {
    id: 1,
    attributes: {
      title: "Gestion Locative",
      description: "Service complet de gestion de vos biens immobiliers en location. Nous nous occupons de tout, de la recherche de locataires à la gestion quotidienne.",
      icon: "🏠",
      price: "10% des loyers",
      features: [
        "Recherche et sélection des locataires",
        "Gestion des baux et des loyers",
        "Suivi des travaux et maintenance",
        "Gestion administrative complète",
        "Reporting mensuel"
      ],
      image: {
        data: {
          attributes: {
            url: "/images/services/gestion-locative.png",
            alternativeText: "Gestion locative"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Transaction Immobilière",
      description: "Accompagnement personnalisé pour l'achat ou la vente de votre bien immobilier. Notre expertise du marché local vous garantit les meilleures opportunités.",
      icon: "🤝",
      price: "3% du prix de vente",
      features: [
        "Estimation gratuite",
        "Photos professionnelles",
        "Marketing ciblé",
        "Négociation",
        "Accompagnement juridique"
      ],
      image: {
        data: {
          attributes: {
            url: "/images/services/gestion-locative.png",
            alternativeText: "Transaction immobilière"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "Conseil en Investissement",
      description: "Optimisez vos investissements immobiliers grâce à notre expertise. Nous vous aidons à identifier les meilleures opportunités du marché.",
      icon: "📈",
      price: "Sur devis",
      features: [
        "Analyse de marché",
        "Étude de rentabilité",
        "Optimisation fiscale",
        "Stratégie d'investissement",
        "Suivi personnalisé"
      ],
      image: {
        data: {
          attributes: {
            url: "/images/services/gestion-locative.png",
            alternativeText: "Conseil en investissement"
          }
        }
      }
    }
  },
  {
    id: 4,
    attributes: {
      title: "Rénovation et Travaux",
      description: "Service clé en main pour la rénovation et l'amélioration de vos biens immobiliers. De la conception à la réalisation, nous gérons votre projet.",
      icon: "🔨",
      price: "Sur devis",
      features: [
        "Étude et conception",
        "Devis détaillé",
        "Coordination des travaux",
        "Suivi de chantier",
        "Garantie décennale"
      ],
      image: {
        data: {
          attributes: {
            url: "/images/services/gestion-locative.png",
            alternativeText: "Rénovation et travaux"
          }
        }
      }
    }
  },
  {
    id: 5,
    attributes: {
      title: "Expertise Immobilière",
      description: "Évaluation professionnelle de votre bien immobilier. Nos experts certifiés vous fournissent une estimation précise basée sur des données du marché.",
      icon: "📊",
      price: "À partir de 300.000 FCFA",
      features: [
        "Visite détaillée",
        "Analyse comparative",
        "Rapport d'expertise",
        "Documentation complète",
        "Conseils personnalisés"
      ],
      image: {
        data: {
          attributes: {
            url: "/images/services/gestion-locative.png",
            alternativeText: "Expertise immobilière"
          }
        }
      }
    }
  },
  {
    id: 6,
    attributes: {
      title: "Conciergerie",
      description: "Service premium de gestion quotidienne de votre propriété. Nous prenons soin de votre bien comme si c'était le nôtre.",
      icon: "🔑",
      price: "À partir de 150.000 FCFA/mois",
      features: [
        "Accueil des locataires",
        "Entretien régulier",
        "Services à la demande",
        "Gestion des urgences 24/7",
        "Reporting hebdomadaire"
      ],
      image: {
        data: {
          attributes: {
            url: "/images/services/gestion-locative.png",
            alternativeText: "Conciergerie"
          }
        }
      }
    }
  }
];

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getServices();
        
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        }
      } catch (err) {
        console.error(err);
        // En cas d'erreur, on garde les données par défaut
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            src="/images/services/servise_immo.jpg"
            alt="Nos services immobiliers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Services Immobiliers
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Des solutions sur mesure pour tous vos projets immobiliers
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={service.attributes.image.data.attributes.url}
                    alt={service.attributes.image.data.attributes.alternativeText}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-4xl">
                    {service.attributes.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.attributes.title}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{service.attributes.price}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.attributes.description}</p>
                  <div className="space-y-2 mb-4">
                    {service.attributes.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/services/${service.id}`}
                    className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d&apos;un service personnalisé ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contactez-nous pour discuter de votre projet immobilier
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 