'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProperties, getLocations, Property } from '@/lib/strapi';

// Données statiques par défaut
const DEFAULT_PROPERTIES = [
  {
    id: 1,
    attributes: {
      title: "Villa de luxe avec piscine",
      description: "Magnifique villa moderne avec piscine privée et jardin paysager. Parfaite pour une famille à la recherche de confort et d'espace.",
      location: "Brazzaville - Plateau",
      type: "Vente",
      status: "Disponible",
      price: "75.000.000 FCFA",
      features: ["5 chambres", "3 salles de bain", "Piscine", "Jardin", "Garage double"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre1.jpg",
            alternativeText: "Villa de luxe"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Appartement Centre-ville",
      description: "Bel appartement rénové au cœur de la ville. Proche des commerces et des transports.",
      location: "Brazzaville - Centre-ville",
      type: "Location",
      status: "En cours de transaction",
      price: "250.000 FCFA/mois",
      features: ["2 chambres", "1 salle de bain", "Balcon", "Parking", "Sécurité 24/7"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre2.jpg",
            alternativeText: "Appartement moderne"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "Maison familiale",
      description: "Grande maison familiale avec jardin spacieux. Idéale pour une famille nombreuse.",
      location: "Brazzaville - Moungali",
      type: "Vente",
      status: "Disponible",
      price: "45.000.000 FCFA",
      features: ["4 chambres", "2 salles de bain", "Cuisine équipée", "Jardin", "Quartier calme"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre3.jpg",
            alternativeText: "Maison familiale"
          }
        }
      }
    }
  },
  {
    id: 4,
    attributes: {
      title: "Studio meublé",
      description: "Studio moderne entièrement meublé et équipé. Parfait pour un étudiant ou un jeune professionnel.",
      location: "Brazzaville - Bacongo",
      type: "Location",
      status: "Vendu/Loué",
      price: "150.000 FCFA/mois",
      features: ["Meublé", "Climatisation", "Internet", "Cuisine équipée", "Sécurité"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre4.jpg",
            alternativeText: "Studio moderne"
          }
        }
      }
    }
  },
  {
    id: 5,
    attributes: {
      title: "Local commercial",
      description: "Local commercial bien situé avec grande vitrine. Idéal pour commerce ou bureau.",
      location: "Brazzaville - Poto-Poto",
      type: "Location",
      status: "Bientôt disponible",
      price: "400.000 FCFA/mois",
      features: ["100m²", "Climatisation", "Parking", "Sécurité", "Grande vitrine"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre5.jpg",
            alternativeText: "Local commercial"
          }
        }
      }
    }
  },
  {
    id: 6,
    attributes: {
      title: "Terrain constructible",
      description: "Grand terrain constructible avec tous les documents en règle. Proche des commodités.",
      location: "Brazzaville - Madibou",
      type: "Vente",
      status: "Réservé",
      price: "25.000.000 FCFA",
      features: ["500m²", "Titre foncier", "Viabilisé", "Quartier résidentiel", "Vue dégagée"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre6.jpg",
            alternativeText: "Terrain constructible"
          }
        }
      }
    }
  }
];

const TRANSACTION_TYPES = ["Vente", "Location"];
const LOCATIONS = ["Tous", "Brazzaville - Centre-ville", "Brazzaville - Bacongo", "Brazzaville - Poto-Poto", "Brazzaville - Moungali", "Brazzaville - Ouenzé", "Brazzaville - Talangaï", "Brazzaville - Madibou"];
const PROPERTY_TYPES = ["Tous", "Maison", "Appartement", "Villa", "Terrain", "Local commercial", "Bureau"];
const FEATURES = ["Piscine", "Jardin", "Garage", "Climatisation", "Sécurité 24/7", "Meublé", "Internet"];
const STATUS_OPTIONS = ["Tous", "Disponible", "En cours de transaction", "Vendu/Loué", "Bientôt disponible", "Réservé"];

// Ajout des constantes pour les icônes de statut
const STATUS_ICONS = {
  'Disponible': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'En cours de transaction': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Vendu/Loué': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  'Bientôt disponible': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Réservé': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  )
};

const OffersPage = () => {
  const [selectedType, setSelectedType] = useState('Tous');
  const [priceRange, setPriceRange] = useState('Tous');
  const [location, setLocation] = useState('Tous');
  const [propertyType, setPropertyType] = useState('Tous');
  const [status, setStatus] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [minRooms, setMinRooms] = useState('');
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);
  const [locations, setLocations] = useState<string[]>(LOCATIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [propertiesResponse, locationsResponse] = await Promise.all([
          getProperties({ type: selectedType, priceRange, location }),
          getLocations()
        ]);

        if (propertiesResponse.data && propertiesResponse.data.length > 0) {
          setProperties(propertiesResponse.data);
        } else {
          setProperties(DEFAULT_PROPERTIES);
        }
        
        if (locationsResponse.data) {
          type LocationResponse = { attributes: { location: string } };
          const locations = (locationsResponse.data as LocationResponse[]).map(
            item => item.attributes.location
          );
          const uniqueLocations = [...new Set(locations)];
          if (uniqueLocations.length > 0) {
            setLocations(['Tous', ...uniqueLocations]);
          } else {
            setLocations(LOCATIONS);
          }
        } else {
          setLocations(LOCATIONS);
        }
      } catch (err) {
        console.error(err);
        setProperties(DEFAULT_PROPERTIES);
        setLocations(LOCATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType, priceRange, location]);

  // Filtrer les propriétés en fonction des sélections
  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === 'Tous' || property.attributes.type === selectedType;
    const matchesLocation = location === 'Tous' || property.attributes.location === location;
    const matchesPropertyType = propertyType === 'Tous' || property.attributes.features.includes(propertyType);
    const matchesStatus = status === 'Tous' || property.attributes.status === status;
    const matchesSearch = searchTerm === '' || 
      property.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.attributes.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatures = selectedFeatures.length === 0 || 
      selectedFeatures.every(feature => property.attributes.features.includes(feature));

    return matchesType && matchesLocation && matchesPropertyType && matchesStatus && matchesSearch && matchesFeatures;
  });

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
      {/* Hero Section avec Search Bar */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-offres.jpg"
            alt="Nos offres immobilières"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Trouvez Votre Bien Idéal
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in-up">
              Des propriétés d&apos;exception sélectionnées pour vous
            </p>
          </div>
          
          {/* Barre de recherche principale */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-4 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Rechercher par mot-clé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filtres
              </button>
            </div>

            {/* Panneau de filtres avancés */}
            <div className={`mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${isFilterOpen ? 'block' : 'hidden'}`}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" id="transaction-type">Type de transaction</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-labelledby="transaction-type"
                >
                  <option>Tous</option>
                  {TRANSACTION_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" id="property-type">Type de bien</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-labelledby="property-type"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" id="location">Localisation</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-labelledby="location"
                >
                  {locations.map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" id="price-range">Budget</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-labelledby="price-range"
                >
                  <option>Tous</option>
                  <option>0-500k</option>
                  <option>500k-1M</option>
                  <option>1M-5M</option>
                  <option>5M+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chambres minimum</label>
                <input
                  type="number"
                  min="0"
                  value={minRooms}
                  onChange={(e) => setMinRooms(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombre de chambres"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" id="status">Statut</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-labelledby="status"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Caractéristiques</label>
                <div className="flex flex-wrap gap-2">
                  {FEATURES.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => {
                        setSelectedFeatures(prev =>
                          prev.includes(feature)
                            ? prev.filter(f => f !== feature)
                            : [...prev, feature]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedFeatures.includes(feature)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setSelectedType('Tous');
                    setPriceRange('Tous');
                    setLocation('Tous');
                    setPropertyType('Tous');
                    setSearchTerm('');
                    setSelectedFeatures([]);
                    setMinRooms('');
                    setStatus('Tous');
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length} biens disponibles
          </h2>
          <div className="flex items-center gap-4">
            <label className="text-gray-600" id="sort-by">Trier par:</label>
            <select 
              className="rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-labelledby="sort-by"
            >
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Plus récent</option>
              <option>Plus ancien</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-xl"></div>
                <div className="p-6 bg-white rounded-b-xl">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image
                    src={property.attributes.image.data.attributes.url}
                    alt={property.attributes.image.data.attributes.alternativeText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md ${
                      property.attributes.type === 'Location' ? 'bg-blue-600' : 'bg-green-600'
                    } text-white`}>
                      {property.attributes.type === 'Location' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                      {property.attributes.type}
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md ${
                      property.attributes.status === 'Disponible' ? 'bg-emerald-500' :
                      property.attributes.status === 'En cours de transaction' ? 'bg-amber-500' :
                      property.attributes.status === 'Vendu/Loué' ? 'bg-red-500' :
                      property.attributes.status === 'Bientôt disponible' ? 'bg-purple-500' :
                      'bg-orange-500'
                    } text-white`}>
                      {property.attributes.status === 'Disponible' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {property.attributes.status === 'En cours de transaction' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {property.attributes.status === 'Vendu/Loué' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {property.attributes.status === 'Bientôt disponible' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {property.attributes.status === 'Réservé' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                      )}
                      {property.attributes.status}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{property.attributes.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {property.attributes.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-bold text-xl">{property.attributes.price}</p>
                      {property.attributes.type === 'Location' && 
                        <p className="text-gray-500 text-sm">par mois</p>
                      }
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{property.attributes.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.attributes.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/offres/${property.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Voir les détails
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProperties.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun bien ne correspond à vos critères
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos filtres ou de réinitialiser votre recherche
            </p>
            <button
              onClick={() => {
                setSelectedType('Tous');
                setPriceRange('Tous');
                setLocation('Tous');
                setPropertyType('Tous');
                setSearchTerm('');
                setSelectedFeatures([]);
                setMinRooms('');
                setStatus('Tous');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous ne trouvez pas le bien de vos rêves ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Notre équipe d&apos;experts est là pour vous accompagner dans votre recherche
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Nous contacter
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffersPage; 