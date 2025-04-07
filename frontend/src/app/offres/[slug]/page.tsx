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
    slug: "villa-de-luxe-avec-piscine",
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
  const [property, setProperty] = useState<Property>(DEFAULT_PROPERTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProperty(slug);
        if (data && data.data) {
          setProperty(data.data);
        }
      } catch (err) {
        setError('Erreur lors du chargement de la propriété');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/offres" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Retour aux offres
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={property.attributes.image.data.attributes.url}
              alt={property.attributes.image.data.attributes.alternativeText}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {property.attributes.title}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-bold text-blue-600">
                {property.attributes.price}
              </span>
              <span className="text-gray-600">
                {property.attributes.location}
              </span>
            </div>

            <div className="prose max-w-none mb-8">
              {property.attributes.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
                <ul className="space-y-2">
                  {property.attributes.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Spécifications</h2>
                <dl className="grid grid-cols-2 gap-4">
                  {property.attributes.specifications && Object.entries(property.attributes.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-gray-600 capitalize">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {property.attributes.gallery && property.attributes.gallery.data.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Galerie</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.attributes.gallery.data.map((image, index) => (
                    <div key={index} className="relative h-48">
                      <Image
                        src={image.attributes.url}
                        alt={image.attributes.alternativeText}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage; 