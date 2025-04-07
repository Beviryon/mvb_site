'use client';

import Image from 'next/image';

const team = [
  {
    name: 'Van Beverly OUELA',
    role: 'Fondateur',
    image: '/images/Profile_vann.jpg',
    description: "Plus de 10 ans d'expérience dans l'immobilier de luxe",
  },
  {
    name: 'Donald Xavier ONTSIAYI',
    role: 'Responsable marketing',
    image: '/images/profil.jpg',
    description: 'Spécialiste en communication immobilière ',
  },
  {
    name: 'Céleste Loïck MALANDA',
    role: 'Responsable commercial',
    image: '/images/profil.jpg',
    description: 'Expert en négociation et développement commercial',
  },
  {
<<<<<<< HEAD 
    name: 'Xavier Donald',
    role: 'Responsable Communication',
=======
    name: 'MOUNDOSSO Floretta',
    role: 'Secrétaire comptable',
>>>>>>> 089f927a2243efc928c5a3fe0fdd25218f4d938c
    image: '/images/profil.jpg',
    description: "Spécialiste en gestion administrative et financière, assurant la tenue des comptes et le suivi des opérations comptables avec rigueur et précision",
  },
  {
    name: 'MOUELE Djenifer Rocksy',
    role: 'Infographiste',
    image: '/images/profil.jpg',
    description: 'Experte en design graphique et en communication visuelle',
  },
];

const testimonials = [
  {
    name: 'Pierre Dubois',
    role: 'Client',
    content: 'Une équipe professionnelle qui a su répondre à toutes mes attentes. Je recommande vivement !',
    rating: 5,
  },
  {
    name: 'Marie Laurent',
    role: 'Client',
    content: 'Excellent service client et accompagnement personnalisé. Je suis très satisfaite de mon achat.',
    rating: 5,
  },
];

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/apropos.jpg"
          alt="À propos de MVB Immobilier"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de MVB Immobilier
            </h1>
            <p className="text-xl">
              Votre partenaire de confiance dans l&apos;immobilier depuis plus de 10 ans
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-4">
                Fondée en 2016, MVB Immobilier s&apos;est imposée comme un acteur majeur dans le secteur immobilier.
                Notre mission est d&apos;accompagner nos clients dans tous leurs projets immobiliers avec professionnalisme
                et expertise.
              </p>
              <p className="text-gray-600">
                Nous croyons en la valeur ajoutée d&apos;un service personnalisé et d&apos;une relation de confiance
                durable avec nos clients. Notre équipe d&apos;experts s&apos;engage à vous offrir les meilleures solutions
                adaptées à vos besoins.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/test1.jpg"
                alt="Notre bureau"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Intégrité',
                description: 'Nous agissons avec honnêteté et transparence',
                icon: '🤝',
              },
              {
                title: 'Excellence',
                description: 'Nous visons l&apos;excellence dans chaque aspect de notre service',
                icon: '⭐',
              },
              {
                title: 'Innovation',
                description: 'Nous adoptons les dernières technologies pour mieux vous servir',
                icon: '💡',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des professionnels passionnés à votre service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Témoignages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ce que nos clients disent de nous
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 