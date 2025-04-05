'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPortfolioItems, PortfolioItem } from '@/lib/strapi';

// Données statiques par défaut
const DEFAULT_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    attributes: {
      title: "Résidence Les Jardins du Parc",
      description: "Magnifique ensemble résidentiel moderne situé au cœur d'un parc arboré. Ce projet allie confort contemporain et respect de l'environnement.",
      location: "Brazzaville",
      type: "Vente",
      price: "4.500.000 FCFA",
      features: ["Eco-responsable", "Domotique", "Jardin privatif", "Parking"],
      slug: "residence-jardins-parc",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/portfolio/commercial-1.jpg",
            alternativeText: "Quartier Moungali"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Bureaux à louer",
      description: "Un complexe de bureaux modernes offrant des espaces de travail flexibles et innovants, adapté aux besoins des entreprises d'aujourd'hui.",
      location: "Quartier d'affaires",
      type: "Location",
      price: "500 FCFA/mois",
      features: ["Open Space", "Salles de réunion", "Parking souterrain", "Restaurant"],
      slug: "bureaux-a-louer",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/portfolio/commercial-1.jpg",
            alternativeText: "Centre ville Brazzaville"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "Villa Bellevue",
      description: "Somptueuse villa contemporaine avec vue panoramique sur l'océan. Un chef-d'œuvre d'architecture moderne avec des finitions haut de gamme.",
      location: "Biarritz",
      type: "Vente",
      price: "1 250 000 €",
      features: ["Piscine à débordement", "Home cinema", "Cave à vin", "Vue mer"],
      slug: "villa-bellevue",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/portfolio/commercial-1.jpg",
            alternativeText: "Villa Bellevue"
          }
        }
      }
    }
  },
  {
    id: 4,
    attributes: {
      title: "Les Terrasses du Port",
      description: "Ensemble d'appartements modernes avec terrasses spacieuses offrant une vue imprenable sur le port de plaisance.",
      location: "La Rochelle",
      type: "Location",
      price: "1 200 €/mois",
      features: ["Vue mer", "Terrasses", "Ascenseur", "Local à vélos"],
      slug: "terrasses-du-port",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/portfolio/commercial-1.jpg",
            alternativeText: "Les Terrasses du Port"
          }
        }
      }
    }
  },
  {
    id: 5,
    attributes: {
      title: "Le Green Square",
      description: "Centre commercial éco-responsable intégrant les dernières innovations en matière de développement durable.",
      location: "Zone Commerciale Sud",
      type: "Achat",
      price: "780 000 €",
      features: ["Panneaux solaires", "Récupération d'eau", "Boutiques", "Food court"],
      slug: "green-square",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/portfolio/commercial-1.jpg",
            alternativeText: "Le Green Square"
          }
        }
      }
    }
  },
  {
    id: 6,
    attributes: {
      title: "Château Moderne",
      description: "Rénovation complète d'un château historique, alliance parfaite entre patrimoine et modernité.",
      location: "Saint-Émilion",
      type: "Achat",
      price: "2 800 000 €",
      features: ["Parc privé", "Spa", "Salle de réception", "Cave à vin"],
      slug: "chateau-moderne",
      createdAt: "2024-03-25T00:00:00.000Z",
      updatedAt: "2024-03-25T00:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/portfolio/commercial-1.jpg",
            alternativeText: "Château Moderne"
          }
        }
      }
    }
  }
];

const TRANSACTION_TYPES = ["Vente", "Location", "Achat"];

const PortfolioPage = () => {
  const [items, setItems] = useState<PortfolioItem[]>(DEFAULT_ITEMS);
  const [selectedType, setSelectedType] = useState('Tous');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemsResponse = await getPortfolioItems({ type: selectedType });

        // Si on reçoit des données de Strapi, on les utilise, sinon on garde les données par défaut
        if (itemsResponse.data && itemsResponse.data.length > 0) {
          setItems(itemsResponse.data);
        }
      } catch (err) {
        console.error(err);
        // En cas d'erreur, on garde les données par défaut
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType]);

  // Filtrer les items en fonction du type de transaction sélectionné
  const filteredItems = selectedType === 'Tous' 
    ? items 
    : items.filter(item => item.attributes.type === selectedType);

  // Skeleton loader pour les items du portfolio
  const SkeletonItem = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Contenu Statique */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/commercial-1.jpg"
            alt="Notre portfolio immobilier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Découvrez nos réalisations immobilières exceptionnelles
            </p>
          </div>
        </div>
      </section>

      {/* Transaction Type Filter */}
      <section className="py-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedType('Tous')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedType === 'Tous'
                  ? 'bg-[#1A1A2E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            {TRANSACTION_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedType === type
                    ? 'bg-[#1A1A2E] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Affiche Skeleton ou Contenu */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Affiche 6 skeletons pendant le chargement
              Array(6).fill(null).map((_, index) => (
                <SkeletonItem key={index} />
              ))
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.attributes.image?.data?.attributes?.url.startsWith('/') 
                        ? item.attributes.image.data.attributes.url
                        : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.attributes.image.data.attributes.url}`}
                      alt={item.attributes.image?.data?.attributes?.alternativeText || item.attributes.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#800000] text-white px-4 py-2 rounded-full text-sm font-medium">
                      {item.attributes.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.attributes.title}</h3>
                    <p className="text-gray-600 mb-2">{item.attributes.location}</p>
                    <p className="text-[#800000] font-semibold mb-4">{item.attributes.price}</p>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.attributes.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.attributes.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/portfolio/${item.attributes.slug}`}
                      className="text-[#800000] font-medium hover:text-red-700 transition-colors"
                    >
                      Voir les détails →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Contenu Statique */}
      <section className="py-20 bg-gradient-to-r bg-[#1A1A2E] to-blue-800">
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
              className="bg-[#800000] text-white px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Nous contacter
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white border-solid text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Voir nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage; 