'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaKey, FaTools, FaStar, FaHandshake, FaUserClock, FaLightbulb } from 'react-icons/fa';
import { BiBed, BiArea, BiBath } from 'react-icons/bi';
import { MdTerrain } from 'react-icons/md';

const HomeContent = () => {
  return (
    <div>
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des solutions immobilières complètes pour tous vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Vente et Achat',
                description: 'Trouvez le bien parfait ou vendez au meilleur prix',
                icon: FaHome,
                image: '/images/services/test1.jpg',
              },
              {
                title: 'Location',
                description: 'Gestion locative complète et location sécurisée',
                icon: FaKey,
                image: '/images/services/test2.jpg',
              },
              {
                title: 'Construction',
                description: 'Réalisez votre projet immobilier sur mesure',
                icon: FaTools,
                image: '/images/services/test3.jpg',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 relative">
                  <div className="w-12 h-12 rounded-full bg-[#800000] flex items-center justify-center mb-4 text-white transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#800000] transition-colors">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-[#800000] text-white px-8 py-3 rounded-md hover:bg-[#9B1B30] transition-colors"
            >
              Découvrir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Biens en Vedette</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de biens d&apos;exception
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Villa de luxe avec piscine',
                location: 'Brazzaville - Plateau',
                description: 'Magnifique villa moderne avec piscine privée et jardin paysager. Parfaite pour une famille à la recherche de confort et...',
                price: '75.000.000 FCFA',
                image: '/images/test3.jpg',
                status: 'Exclusivité',
                specs: {
                  bedrooms: 5,
                  bathrooms: 3,
                  surface: '450 m²',
                  terrain: '1200 m²'
                },
                slug: 'villa-de-luxe-avec-piscine'
              },
              {
                title: 'Appartement centre-ville',
                location: 'Pointe-Noire - Centre',
                description: 'Superbe appartement rénové au cœur de la ville. Proche de toutes commodités...',
                price: '45.000.000 FCFA',
                image: '/images/test1.jpg',
                status: 'Nouveau',
                specs: {
                  bedrooms: 3,
                  bathrooms: 2,
                  surface: '120 m²'
                },
                slug: 'appartement-centre-ville'
              },
              {
                title: 'Terrain constructible',
                location: 'Brazzaville - Périphérie',
                description: 'Grand terrain plat et viabilisé, idéal pour projet de construction...',
                price: '25.000.000 FCFA',
                image: '/images/test2.jpg',
                status: 'Opportunité',
                specs: {
                  surface: '1000 m²',
                  terrain: '1000 m²'
                },
                slug: 'terrain-constructible'
              }
            ].map((property, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {property.status && (
                    <span className="absolute top-4 right-4 bg-[#800000] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.status}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  
                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    {property.specs.bedrooms && (
                      <div className="flex items-center text-gray-600">
                        <BiBed className="w-5 h-5 mr-2 text-[#800000]" />
                        {property.specs.bedrooms} chambres
                      </div>
                    )}
                    {property.specs.bathrooms && (
                      <div className="flex items-center text-gray-600">
                        <BiBath className="w-5 h-5 mr-2 text-[#800000]" />
                        {property.specs.bathrooms} SDB
                      </div>
                    )}
                    {property.specs.surface && (
                      <div className="flex items-center text-gray-600">
                        <BiArea className="w-5 h-5 mr-2 text-[#800000]" />
                        {property.specs.surface}
                      </div>
                    )}
                    {property.specs.terrain && (
                      <div className="flex items-center text-gray-600">
                        <MdTerrain className="w-5 h-5 mr-2 text-[#800000]" />
                        {property.specs.terrain}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-500 block text-sm">{property.location}</span>
                      <span className="font-semibold text-[#800000]">{property.price}</span>
                    </div>
                    <Link
                      href={`/offres/${property.slug}`}
                      className="bg-[#1A1A2E] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/offres"
              className="inline-block bg-[#800000] text-white px-8 py-3 rounded-md hover:bg-[#9B1B30] transition-colors"
            >
              Voir toutes nos offres
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi Nous Choisir ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une expertise reconnue au service de vos projets immobiliers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Expertise',
                description: "10 ans d'expérience dans l'immobilier",
                icon: FaStar,
                color: 'text-yellow-500',
              },
              {
                title: 'Confiance',
                description: 'Plus de 1000 clients satisfaits',
                icon: FaHandshake,
                color: 'text-green-500',
              },
              {
                title: 'Service',
                description: 'Accompagnement personnalisé',
                icon: FaUserClock,
                color: 'text-blue-500',
              },
              {
                title: 'Innovation',
                description: 'Solutions numériques modernes',
                icon: FaLightbulb,
                color: 'text-purple-500',
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`text-4xl mb-4 ${feature.color}`}>
                  <feature.icon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1A1A2E] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réaliser votre projet immobilier ?</h2>
          <p className="text-xl mb-8">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#800000] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#9B1B30] transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeContent; 