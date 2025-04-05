'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getServices, Service } from '@/lib/strapi';

// Données statiques par défaut
const DEFAULT_SERVICES: Service[] = [
  {
    id: 1,
    attributes: {
      title: "Gestion locative",
      description: "Nous gérons vos biens immobiliers en location de manière professionnelle.",
      icon: "gestion",
      price: "À partir de 30.000 FCFA",
      features: ["Gestion des locataires", "Maintenance", "Suivi des paiements"],
      slug: "gestion-locative",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test3.jpg",
            alternativeText: "Gestion locative"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Transaction immobilière",
      description: "Accompagnement personnalisé pour l'achat ou la vente de votre bien immobilier.",
      icon: "transaction",
      price: "À partir de 40.000 FCFA",
      features: ["Estimation gratuite", "Photos professionnelles", "Marketing ciblé"],
      slug: "transaction-immobiliere",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test1.jpg",
            alternativeText: "Transaction immobilière"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "Expertise immobilière",
      description: "Évaluation précise de la valeur de votre bien immobilier.",
      icon: "expertise",
      price: "À partir de 35.000 FCFA",
      features: ["Analyse de marché", "Rapport détaillé", "Conseils personnalisés"],
      slug: "expertise-immobiliere",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test2.jpg",
            alternativeText: "Expertise immobilière"
          }
        }
      }
    }
  },
  {
    id: 4,
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
      slug: "conseil-en-investissement",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test3.jpg",
            alternativeText: "Conseil en investissement"
          }
        }
      }
    }
  },
  {
    id: 5,
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
      slug: "renovation-et-travaux",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test3.jpg",
            alternativeText: "Rénovation et travaux"
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
      slug: "conciergerie",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test3.jpg",
            alternativeText: "Conciergerie"
          }
        }
      }
    }
  },
  {
    id: 7,
    attributes: {
      title: "Construction",
      description: "Réalisation de projets de construction résidentielle et commerciale avec une attention particulière aux détails et à la qualité.",
      icon: "🏗️",
      price: "Sur devis",
      features: [
        "Étude de faisabilité",
        "Plans architecturaux",
        "Gestion des permis",
        "Suivi de chantier",
        "Contrôle qualité"
      ],
      slug: "construction",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test2.jpg",
            alternativeText: "Service de construction"
          }
        }
      }
    }
  },
  {
    id: 8,
    attributes: {
      title: "Aménagement et Travaux sur Mesure",
      description: "Solutions d'aménagement personnalisées pour optimiser vos espaces et créer un environnement unique adapté à vos besoins.",
      icon: "🔨",
      price: "Sur devis",
      features: [
        "Design personnalisé",
        "Optimisation d'espace",
        "Choix des matériaux",
        "Installation professionnelle",
        "Finitions soignées"
      ],
      slug: "amenagement-travaux-sur-mesure",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test1.jpg",
            alternativeText: "Aménagement sur mesure"
          }
        }
      }
    }
  },
  {
    id: 9,
    attributes: {
      title: "Suivi de Projet",
      description: "Accompagnement complet de votre projet immobilier, de la conception à la livraison, avec un suivi rigoureux à chaque étape.",
      icon: "📋",
      price: "Sur devis",
      features: [
        "Planning détaillé",
        "Coordination des intervenants",
        "Contrôle budgétaire",
        "Reporting régulier",
        "Gestion des imprévus"
      ],
      slug: "suivi-de-projet",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test2.jpg",
            alternativeText: "Suivi de projet"
          }
        }
      }
    }
  },
  {
    id: 10,
    attributes: {
      title: "Conception sur Mesure",
      description: "Création de projets architecturaux uniques adaptés à vos envies et besoins, avec une approche créative et fonctionnelle.",
      icon: "✏️",
      price: "Sur devis",
      features: [
        "Étude des besoins",
        "Conception 3D",
        "Plans détaillés",
        "Choix des matériaux",
        "Conseils personnalisés"
      ],
      slug: "conception-sur-mesure",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test3.jpg",
            alternativeText: "Conception sur mesure"
          }
        }
      }
    }
  },
  {
    id: 11,
    attributes: {
      title: "Location Immobilière",
      description: "Large sélection de biens immobiliers à louer : maisons, appartements, studios, locaux commerciaux. Nous vous accompagnons dans votre recherche du bien idéal.",
      icon: "🏠",
      price: "Selon le bien",
      features: [
        "Maisons et villas",
        "Appartements tout confort",
        "Studios meublés",
        "Locaux commerciaux",
        "Visites personnalisées"
      ],
      slug: "location-immobiliere",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/services/test1.jpg",
            alternativeText: "Location immobilière"
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