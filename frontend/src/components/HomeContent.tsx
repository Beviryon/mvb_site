'use client';

import Link from 'next/link';

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
                icon: '🏠',
              },
              {
                title: 'Location',
                description: 'Gestion locative complète et location sécurisée',
                icon: '🔑',
              },
              {
                title: 'Construction',
                description: 'Réalisez votre projet immobilier sur mesure',
                icon: '🏗️',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
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
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  {/* Image placeholder */}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Propriété {index + 1}</h3>
                  <p className="text-gray-600 mb-4">
                    Une description attrayante de la propriété...
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Paris</span>
                    <span className="font-semibold">500 000 €</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/offres"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
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
                description: '15 ans d&apos;expérience dans l&apos;immobilier',
                icon: '⭐',
              },
              {
                title: 'Confiance',
                description: 'Plus de 1000 clients satisfaits',
                icon: '🤝',
              },
              {
                title: 'Service',
                description: 'Accompagnement personnalisé',
                icon: '💫',
              },
              {
                title: 'Innovation',
                description: 'Solutions numériques modernes',
                icon: '💡',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réaliser votre projet immobilier ?</h2>
          <p className="text-xl mb-8">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeContent; 