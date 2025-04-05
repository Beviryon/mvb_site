'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProperties, getLocations, Property } from '@/lib/strapi';
import { BiBed, BiArea, BiBath } from 'react-icons/bi';
import { MdTerrain } from 'react-icons/md';
import { FaHome, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBed, FaCheckCircle } from 'react-icons/fa';
import { BsHouseDoor, BsBuilding, BsHouseFill, BsMap } from 'react-icons/bs';
import { MdApartment, MdBusinessCenter, MdPool, MdLocalParking } from 'react-icons/md';
import { GiWaterTank, GiPumpkin, GiHeatHaze } from 'react-icons/gi';
import { FiWifi } from 'react-icons/fi';
import { BiCctv } from 'react-icons/bi';

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
      slug: "villa-de-luxe-avec-piscine",
      price: "75.000.000 FCFA",
      features: ["5 chambres", "3 salles de bain", "Piscine", "Jardin", "Garage double"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre(1).jpg",
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
      slug: "appartement-centre-ville",
      price: "250.000 FCFA/mois",
      features: ["2 chambres", "1 salle de bain", "Balcon", "Parking", "Sécurité 24/7"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre(2).jpg",
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
      slug: "maison-familiale",
      price: "45.000.000 FCFA",
      features: ["4 chambres", "2 salles de bain", "Cuisine équipée", "Jardin", "Quartier calme"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre(3).jpg",
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
      slug: "studio-meuble",
      price: "150.000 FCFA/mois",
      features: ["Meublé", "Climatisation", "Internet", "Cuisine équipée", "Sécurité"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre(4).jpg",
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
      slug: "local-commercial",
      price: "400.000 FCFA/mois",
      features: ["100m²", "Climatisation", "Parking", "Sécurité", "Grande vitrine"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre(5).jpg",
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
      slug: "terrain-constructible",
      price: "25.000.000 FCFA",
      features: ["500m²", "Titre foncier", "Viabilisé", "Quartier résidentiel", "Vue dégagée"],
      image: {
        data: {
          attributes: {
            url: "/images/offres/offre(6).jpg",
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
const FEATURES = [
  "Piscine", 
  "Jardin", 
  "Garage", 
  "Climatisation", 
  "Sécurité 24/7", 
  "Meublé", 
  "Internet",
  "Bâche à eau",
  "Suppresseur",
  "Chauffe-eau",
  "Guerite"
];
const STATUS_OPTIONS = ["Tous", "Disponible", "En cours de transaction", "Vendu/Loué", "Bientôt disponible", "Réservé"];

interface PropertySpecs {
  bedrooms?: number;
  bathrooms?: number;
  surface?: string;
  terrain?: string;
}

// Fonction pour extraire les spécifications d'une propriété
const extractSpecs = (features: string[]): PropertySpecs => {
  const specs: PropertySpecs = {};
  
  features.forEach(feature => {
    if (feature.includes('chambres')) {
      specs.bedrooms = parseInt(feature.split(' ')[0]);
    }
    if (feature.includes('salle')) {
      specs.bathrooms = parseInt(feature.split(' ')[0]);
    }
    if (feature.includes('m²')) {
      if (feature.toLowerCase().includes('terrain')) {
        specs.terrain = feature;
      } else {
        specs.surface = feature;
      }
    }
  });
  
  return specs;
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
    // Type de transaction (Vente/Location)
    const matchesType = selectedType === 'Tous' || property.attributes.type === selectedType;
    
    // Localisation
    const matchesLocation = location === 'Tous' || property.attributes.location === location;
    
    // Type de bien (Maison, Appartement, etc.)
    const matchesPropertyType = propertyType === 'Tous' || property.attributes.title.toLowerCase().includes(propertyType.toLowerCase());
    
    // Statut
    const matchesStatus = status === 'Tous' || property.attributes.status === status;
    
    // Recherche par mot-clé
    const matchesSearch = !searchTerm || 
      property.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.attributes.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.attributes.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Caractéristiques sélectionnées
    const matchesFeatures = selectedFeatures.length === 0 || 
      selectedFeatures.every(feature => 
        property.attributes.features.some(propFeature => 
          propFeature.toLowerCase().includes(feature.toLowerCase())
        )
      );

    // Nombre minimum de chambres
    const matchesRooms = !minRooms || property.attributes.features.some(feature => {
      const roomMatch = feature.match(/(\d+)\s*chambres?/i);
      return roomMatch && parseInt(roomMatch[1]) >= parseInt(minRooms);
    });

    // Prix
    const matchesPriceRange = priceRange === 'Tous' || (() => {
      const price = parseInt(property.attributes.price.replace(/[^\d]/g, ''));
      switch (priceRange) {
        case '0-500k':
          return price <= 500000;
        case '500k-1M':
          return price > 500000 && price <= 1000000;
        case '1M-5M':
          return price > 1000000 && price <= 5000000;
        case '5M+':
          return price > 5000000;
        default:
          return true;
      }
    })();

    return matchesType && 
           matchesLocation && 
           matchesPropertyType && 
           matchesStatus && 
           matchesSearch && 
           matchesFeatures && 
           matchesRooms &&
           matchesPriceRange;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
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
                className="px-6 py-2 bg-[#1A1A2E] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filtres
              </button>
            </div>

            {/* Modale de filtres */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                {/* Fond semi-transparent */}
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsFilterOpen(false)}></div>

                {/* Contenu de la modale */}
                <div className="flex items-center justify-center min-h-screen p-4">
                  <div className="relative bg-[#1A1A2E] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
                    {/* En-tête de la modale avec bouton de fermeture */}
                    <div className="sticky top-0 bg-[#1A1A2E] px-8 py-4 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Filtres de recherche</h3>
                        <p className="text-gray-600 text-sm">Affinez votre recherche selon vos critères</p>
                      </div>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <span className="sr-only">Fermer</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Corps de la modale */}
                    <div className="px-8 py-6">
                      {/* Grille principale */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Type de transaction */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-gray-800 font-semibold">
                            <FaHome className="text-[#1A1A2E] text-xl" />
                            Type de transaction
                          </label>
                          <div className="flex gap-3">
                            {TRANSACTION_TYPES.map((type) => (
                              <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                                  selectedType === type
                                    ? 'bg-[#1A1A2E] text-white shadow-lg transform scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Type de bien */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-gray-800 font-semibold">
                            <BsBuilding className="text-[#1A1A2E] text-xl" />
                            Type de bien
                          </label>
                          <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full rounded-xl border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:ring-[#1A1A2E] focus:border-[#1A1A2E] transition-colors text-gray-800"
                            aria-label="Type de bien"
                          >
                            {PROPERTY_TYPES.map((type) => (
                              <option key={type} className="text-gray-800">{type}</option>
                            ))}
                          </select>
                        </div>

                        {/* Localisation */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-gray-800 font-semibold">
                            <FaMapMarkerAlt className="text-[#1A1A2E] text-xl" />
                            Localisation
                          </label>
                          <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full rounded-xl border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:ring-[#1A1A2E] focus:border-[#1A1A2E] transition-colors text-gray-800"
                            aria-label="Localisation"
                          >
                            {locations.map((loc) => (
                              <option key={loc} className="text-gray-800">{loc}</option>
                            ))}
                          </select>
                        </div>

                        {/* Budget */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-gray-800 font-semibold">
                            <FaMoneyBillWave className="text-[#1A1A2E] text-xl" />
                            Budget
                          </label>
                          <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full rounded-xl border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:ring-[#1A1A2E] focus:border-[#1A1A2E] transition-colors text-gray-800"
                            aria-label="Budget"
                          >
                            <option className="text-gray-800">Tous</option>
                            <option className="text-gray-800">0-500k</option>
                            <option className="text-gray-800">500k-1M</option>
                            <option className="text-gray-800">1M-5M</option>
                            <option className="text-gray-800">5M+</option>
                          </select>
                        </div>

                        {/* Chambres */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-gray-800 font-semibold">
                            <FaBed className="text-[#1A1A2E] text-xl" />
                            Chambres minimum
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={minRooms}
                            onChange={(e) => setMinRooms(e.target.value)}
                            className="w-full rounded-xl border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:ring-[#1A1A2E] focus:border-[#1A1A2E] transition-colors text-gray-800"
                            placeholder="Nombre de chambres"
                          />
                        </div>

                        {/* Statut */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-gray-800 font-semibold">
                            <FaCheckCircle className="text-[#1A1A2E] text-xl" />
                            Statut
                          </label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-xl border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:ring-[#1A1A2E] focus:border-[#1A1A2E] transition-colors text-gray-800"
                            aria-label="Statut"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option} className="text-gray-800">{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Caractéristiques */}
                      <div className="mt-8">
                        <label className="flex items-center gap-2 text-gray-800 font-semibold mb-4">
                          <MdApartment className="text-[#1A1A2E] text-xl" />
                          Caractéristiques
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {[
                            { icon: <MdPool className="text-lg" />, label: "Piscine" },
                            { icon: <BsHouseDoor className="text-lg" />, label: "Jardin" },
                            { icon: <MdLocalParking className="text-lg" />, label: "Garage" },
                            { icon: <GiHeatHaze className="text-lg" />, label: "Climatisation" },
                            { icon: <BiCctv className="text-lg" />, label: "Sécurité 24/7" },
                            { icon: <BsHouseFill className="text-lg" />, label: "Meublé" },
                            { icon: <FiWifi className="text-lg" />, label: "Internet" },
                            { icon: <GiWaterTank className="text-lg" />, label: "Bâche à eau" },
                            { icon: <GiPumpkin className="text-lg" />, label: "Suppresseur" },
                            { icon: <GiHeatHaze className="text-lg" />, label: "Chauffe-eau" },
                            { icon: <BsBuilding className="text-lg" />, label: "Guerite" }
                          ].map(({ icon, label }) => (
                            <button
                              key={label}
                              onClick={() => {
                                setSelectedFeatures(prev =>
                                  prev.includes(label)
                                    ? prev.filter(f => f !== label)
                                    : [...prev, label]
                                );
                              }}
                              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                selectedFeatures.includes(label)
                                  ? 'bg-[#1A1A2E] text-white shadow-lg transform scale-105'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {icon}
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Boutons d'action */}
                      <div className="sticky bottom-0 bg-white px-8 py-4 border-t border-gray-200 mt-8 flex justify-end gap-4">
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
                          className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 font-medium flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          Réinitialiser
                        </button>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="px-6 py-3 rounded-xl bg-[#1A1A2E] text-white hover:bg-blue-700 transition-all duration-200 font-medium flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Appliquer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              const specs = extractSpecs(property.attributes.features);
              return (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={property.attributes.image.data.attributes.url}
                      alt={property.attributes.image.data.attributes.alternativeText}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {/* Badge Type */}
                      <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md ${
                        property.attributes.type === 'Location' ? 'bg-[#1A1A2E]' : 'bg-green-600'
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

                      {/* Badge Statut */}
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
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{property.attributes.title}</h3>
                    <p className="text-gray-600 mb-4">{property.attributes.description}</p>
                    
                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      {specs.bedrooms && (
                        <div className="flex items-center text-gray-600">
                          <BiBed className="w-5 h-5 mr-2 text-[#800000]" />
                          {specs.bedrooms} chambres
                        </div>
                      )}
                      {specs.bathrooms && (
                        <div className="flex items-center text-gray-600">
                          <BiBath className="w-5 h-5 mr-2 text-[#800000]" />
                          {specs.bathrooms} SDB
                        </div>
                      )}
                      {specs.surface && (
                        <div className="flex items-center text-gray-600">
                          <BiArea className="w-5 h-5 mr-2 text-[#800000]" />
                          {specs.surface}
                        </div>
                      )}
                      {specs.terrain && (
                        <div className="flex items-center text-gray-600">
                          <MdTerrain className="w-5 h-5 mr-2 text-[#800000]" />
                          {specs.terrain}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-500 block text-sm">{property.attributes.location}</span>
                        <span className="font-semibold text-[#800000]">{property.attributes.price}</span>
                      </div>
                      <Link
                        href={`/offres/${property.attributes.slug}`}
                        className="bg-[#1A1A2E] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        En savoir plus
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
              className="px-6 py-2 bg-[#1A1A2E] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r bg-[#1A1A2E] ">
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
              className="bg-[#800000] text-white px-8 py-3 rounded-full hover:bg-black-100 transition-all transform hover:scale-105"
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