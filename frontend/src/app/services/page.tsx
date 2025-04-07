'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getServices, Service } from '@/lib/strapi';

// Données statiques par défaut
export const DEFAULT_SERVICES: Service[] = [
  {
    id: 1,
    attributes: {
      title: "Location, Vente et Achat des biens immobiliers",
      description: "Service complet d'accompagnement pour la location, la vente et l'achat de biens immobiliers. Notre expertise vous garantit des transactions sécurisées et avantageuses.",
      icon: "🏠",
      price: "Sur consultation",
      features: [
        "Location de biens",
        "Vente immobilière",
        "Achat de propriétés",
        "Conseil en investissement",
        "Accompagnement personnalisé"
      ],
      slug: "location-vente-achat",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test1.jpg",
            alternativeText: "Location et vente immobilière"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Architecture",
      description: "Services d'architecture pour vos projets de construction et de rénovation. Conception de plans, design d'intérieur et suivi de projet.",
      icon: "✏️",
      price: "Sur devis",
      features: [
        "Conception architecturale",
        "Plans et designs",
        "Conseil technique",
        "Suivi de projet",
        "Design d'intérieur"
      ],
      slug: "architecture",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test2.jpg",
            alternativeText: "Services d'architecture"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "Construction",
      description: "Services complets de construction, de la fondation à la finition. Réalisation de projets résidentiels et commerciaux dans le respect des normes.",
      icon: "🏗️",
      price: "Sur devis",
      features: [
        "Construction neuve",
        "Rénovation",
        "Gestion de chantier",
        "Contrôle qualité",
        "Respect des délais"
      ],
      slug: "construction",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test3.jpg",
            alternativeText: "Services de construction"
          }
        }
      }
    }
  },
  {
    id: 4,
    attributes: {
      title: "Vente des matériaux de construction",
      description: "Large gamme de matériaux de construction de qualité. Fourniture de tous les matériaux nécessaires pour vos projets de construction.",
      icon: "🏭",
      price: "Selon produits",
      features: [
        "Matériaux de qualité",
        "Stock permanent",
        "Livraison sur site",
        "Conseil technique",
        "Prix compétitifs"
      ],
      slug: "vente-materiaux",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test1.jpg",
            alternativeText: "Vente de matériaux"
          }
        }
      }
    }
  },
  {
    id: 5,
    attributes: {
      title: "Gestion locative",
      description: "Service professionnel de gestion locative pour propriétaires. Nous prenons en charge tous les aspects de la gestion de vos biens immobiliers.",
      icon: "📋",
      price: "Sur étude de dossier",
      features: [
        "Gestion des locataires",
        "Suivi des paiements",
        "Maintenance",
        "Gestion administrative",
        "Reporting mensuel"
      ],
      slug: "gestion-locative",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test2.jpg",
            alternativeText: "Gestion locative"
          }
        }
      }
    }
  },
  {
    id: 6,
    attributes: {
      title: "Nettoyage",
      description: "Services professionnels de nettoyage pour tous types de biens immobiliers. Entretien régulier et nettoyage en profondeur.",
      icon: "🧹",
      price: "Sur devis",
      features: [
        "Nettoyage régulier",
        "Nettoyage fin de chantier",
        "Entretien des locaux",
        "Produits professionnels",
        "Personnel qualifié"
      ],
      slug: "nettoyage",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test3.jpg",
            alternativeText: "Services de nettoyage"
          }
        }
      }
    }
  },
  {
    id: 7,
    attributes: {
      title: "Déménagement",
      description: "Service complet de déménagement pour particuliers et entreprises. Transport sécurisé de vos biens avec une équipe professionnelle.",
      icon: "🚛",
      price: "Sur devis",
      features: [
        "Emballage professionnel",
        "Transport sécurisé",
        "Montage/démontage",
        "Assurance transport",
        "Service sur mesure"
      ],
      slug: "demenagement",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test1.jpg",
            alternativeText: "Services de déménagement"
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
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        setError('Erreur lors du chargement des services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
            src="/images/services/construction.jpg"
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
                  <p className="text-[#800000] font-semibold mb-4">{service.attributes.price}</p>
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
                    href={`/services/${service.attributes.slug}`}
                    className="block text-center bg-[#1A1A2E] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
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
      <section className="py-20 bg-gradient-to-r bg-[#1A1A2E] to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d&apos;un service personnalisé ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contactez-nous pour discuter de votre projet immobilier
          </p>
          <Link
            href="/contact"
            className="bg-[#800000] text-white px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 