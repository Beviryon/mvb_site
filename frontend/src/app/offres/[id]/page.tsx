'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProperty, Property } from '@/lib/strapi';

// Propriété par défaut
const DEFAULT_PROPERTY = {
  id: 1,
  attributes: {
    title: "Villa de luxe avec piscine",
    description: "Magnifique villa moderne avec piscine privée et jardin paysager. Cette propriété d'exception offre un cadre de vie unique, alliant luxe, confort et intimité. Située dans un quartier prisé, elle bénéficie d'une architecture contemporaine et de finitions haut de gamme.\n\nLa villa se compose d'un vaste séjour lumineux donnant sur la terrasse et la piscine, d'une cuisine entièrement équipée avec îlot central, de cinq chambres spacieuses dont une suite parentale avec dressing et salle de bain privative.\n\nLe jardin paysager offre plusieurs espaces de détente, une piscine à débordement et une pool house équipée.",
    location: "Brazzaville - Plateau",
    type: "Vente",
    price: "75.000.000 FCFA",
    features: [
      "5 chambres",
      "3 salles de bain",
      "Piscine",
      "Jardin",
      "Garage double",
      "Cuisine équipée",
      "Climatisation",
      "Système d'alarme",
      "Terrasse",
      "Pool house"
    ],
    specifications: {
      surface: "450 m²",
      terrain: "1200 m²",
      chambres: "5",
      sallesDeBain: "3",
      anneeConstruction: "2020",
      parking: "2 voitures",
      etage: "2",
      orientation: "Sud-Ouest"
    },
    amenities: [
      "Piscine à débordement",
      "Jardin paysager",
      "Système de sécurité",
      "Climatisation centralisée",
      "Domotique",
      "Cave à vin",
      "Buanderie équipée",
      "Local technique"
    ],
    image: {
      data: {
        attributes: {
          url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
          alternativeText: "Villa de luxe"
        }
      }
    },
    gallery: {
      data: [
        {
          attributes: {
            url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
            alternativeText: "Vue extérieure"
          }
        },
        {
          attributes: {
            url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
            alternativeText: "Salon"
          }
        },
        {
          attributes: {
            url: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
            alternativeText: "Cuisine"
          }
        },
        {
          attributes: {
            url: "https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg",
            alternativeText: "Chambre principale"
          }
        },
        {
          attributes: {
            url: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
            alternativeText: "Salle de bain"
          }
        },
        {
          attributes: {
            url: "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg",
            alternativeText: "Piscine"
          }
        }
      ]
    }
  }
};

const PropertyDetailPage = () => {
  const params = useParams();
  const [property, setProperty] = useState<Property>(DEFAULT_PROPERTY);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProperty(Number(params.id));
        if (response.data) {
          setProperty(response.data);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gallery Section */}
      <section className="relative h-[70vh] bg-gray-900">
        <div className="relative h-full">
          <Image
            src={property.attributes.gallery.data[selectedImage].attributes.url}
            alt={property.attributes.gallery.data[selectedImage].attributes.alternativeText}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {property.attributes.gallery.data.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    aria-label={`Voir l'image ${image.attributes.alternativeText}`}
                  >
                    <Image
                      src={image.attributes.url}
                      alt={image.attributes.alternativeText}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Info Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold">{property.attributes.title}</h1>
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                    {property.attributes.type}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {property.attributes.location}
                </div>
                <div className="prose max-w-none mb-8">
                  {property.attributes.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {Object.entries(property.attributes.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Caractéristiques</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.attributes.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
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
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Équipements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.attributes.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
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
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  {property.attributes.price}
                </div>
                <div className="space-y-4">
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                    Contacter l&apos;agent
                  </button>
                  <button className="w-full bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105">
                    Planifier une visite
                  </button>
                </div>
                <hr className="my-6" />
                <div className="text-sm text-gray-500">
                  <p className="mb-2">
                    Référence: PRO-{property.id.toString().padStart(6, '0')}
                  </p>
                  <p>
                    Mise à jour: {new Date().toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Biens similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cette section sera dynamique avec les propriétés similaires */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous souhaitez visiter ce bien ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Notre équipe est à votre disposition pour organiser une visite
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Nous contacter
            </Link>
            <Link
              href="/offres"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Voir d&apos;autres biens
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailPage; 