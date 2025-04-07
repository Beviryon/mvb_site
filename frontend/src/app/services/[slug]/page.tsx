'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Service } from '@/lib/strapi';
import { DEFAULT_SERVICES } from '../page';

const ServiceDetailPage = () => {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentService = DEFAULT_SERVICES.find(
      (s: Service) => s.attributes.slug === params.slug
    );
    setService(currentService || null);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Service non trouvé</h2>
          <Link href="/services" className="text-blue-600 hover:underline">
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation rapide */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/services" className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
            <span>←</span>
            <span>Retour aux services</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section avec image de fond */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.attributes.image.data.attributes.url}
            alt={service.attributes.image.data.attributes.alternativeText}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="text-6xl mb-6">{service.attributes.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.attributes.title}
            </h1>
            <p className="text-2xl text-[#800000] font-semibold bg-white/10 inline-block px-6 py-2 rounded-full">
              {service.attributes.price}
            </p>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {/* Description détaillée */}
            <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">À propos de ce service</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed mb-6">{service.attributes.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {getServiceDetails(service.attributes.slug).map((detail, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-3">{detail.title}</h3>
                      <p className="text-gray-600">{detail.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Processus de travail */}
            <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Notre processus</h2>
              <div className="space-y-6">
                {getServiceProcess(service.attributes.slug).map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Caractéristiques */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Caractéristiques</h2>
              <div className="space-y-4">
                {service.attributes.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      ✓
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 space-y-4">
                <Link
                  href="/contact"
                  className="block text-center bg-[#1A1A2E] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/contact"
                  className="block text-center border-2 border-[#1A1A2E] border-solid text-[#1A1A2E] px-6 py-3 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Section FAQ */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {getServiceFAQ(service.attributes.slug).map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Fonction pour obtenir les détails spécifiques selon le service
const getServiceDetails = (slug: string) => {
  const details: { [key: string]: Array<{ title: string; content: string }> } = {
    'location-vente-achat': [
      {
        title: "Expertise du marché local",
        content: "Notre équipe possède une connaissance approfondie du marché immobilier local, permettant une évaluation précise et des conseils avisés."
      },
      {
        title: "Accompagnement personnalisé",
        content: "Nous vous accompagnons à chaque étape de votre projet, de la recherche à la finalisation de la transaction."
      },
      {
        title: "Sécurité des transactions",
        content: "Nous garantissons des transactions sécurisées avec un suivi juridique complet et une transparence totale."
      },
      {
        title: "Services sur mesure",
        content: "Nos services sont adaptés à vos besoins spécifiques, que vous soyez vendeur, acheteur ou investisseur."
      }
    ],
    'architecture': [
      {
        title: "Conception créative",
        content: "Des solutions architecturales innovantes qui allient esthétique et fonctionnalité."
      },
      {
        title: "Expertise technique",
        content: "Une maîtrise des normes et réglementations en vigueur pour des projets conformes."
      },
      {
        title: "Suivi de projet",
        content: "Un accompagnement complet de la conception à la réalisation de votre projet."
      },
      {
        title: "Design personnalisé",
        content: "Des designs uniques adaptés à vos goûts et à vos besoins spécifiques."
      }
    ],
    'conseil-investissement': [
      {
        title: "Analyse approfondie du marché",
        content: "Étude détaillée des tendances du marché immobilier, des opportunités d'investissement et des zones à fort potentiel."
      },
      {
        title: "Stratégie personnalisée",
        content: "Élaboration d'une stratégie d'investissement adaptée à vos objectifs financiers et votre profil de risque."
      },
      {
        title: "Optimisation fiscale",
        content: "Conseils experts pour optimiser la fiscalité de vos investissements immobiliers et maximiser votre rentabilité."
      },
      {
        title: "Suivi et accompagnement",
        content: "Accompagnement continu dans la gestion de votre portefeuille immobilier et ajustement de la stratégie selon l'évolution du marché."
      }
    ],
  };

  return details[slug] || [
    {
      title: "Qualité de service",
      content: "Nous nous engageons à fournir des services de haute qualité adaptés à vos besoins."
    },
    {
      title: "Expertise professionnelle",
      content: "Notre équipe expérimentée garantit un travail professionnel et soigné."
    }
  ];
};

// Fonction pour obtenir le processus selon le service
const getServiceProcess = (slug: string) => {
  const processes: { [key: string]: Array<{ title: string; description: string }> } = {
    'location-vente-achat': [
      {
        title: "Évaluation initiale",
        description: "Analyse de vos besoins et objectifs immobiliers"
      },
      {
        title: "Recherche et sélection",
        description: "Identification des biens correspondant à vos critères"
      },
      {
        title: "Visites et négociation",
        description: "Organisation des visites et négociation des meilleures conditions"
      },
      {
        title: "Finalisation",
        description: "Accompagnement jusqu'à la signature finale"
      }
    ],
    'architecture': [
      {
        title: "Analyse de la demande",
        description: "Étude des besoins et des préférences des clients"
      },
      {
        title: "Conception et développement",
        description: "Création de plans et de maquettes"
      },
      {
        title: "Suivi de projet",
        description: "Accompagnement dans la réalisation du projet"
      },
      {
        title: "Validation et livraison",
        description: "Contrôle de la qualité et livraison du projet"
      }
    ],
    'conseil-investissement': [
      {
        title: "Analyse de votre situation",
        description: "Évaluation de vos objectifs, capacité d'investissement et profil de risque"
      },
      {
        title: "Étude de marché",
        description: "Analyse approfondie du marché et identification des opportunités d'investissement"
      },
      {
        title: "Élaboration de la stratégie",
        description: "Développement d'une stratégie d'investissement personnalisée"
      },
      {
        title: "Mise en œuvre",
        description: "Accompagnement dans la réalisation des investissements"
      },
      {
        title: "Suivi et optimisation",
        description: "Suivi régulier de vos investissements et ajustements stratégiques"
      }
    ],
  };

  return processes[slug] || [
    {
      title: "Consultation",
      description: "Évaluation de vos besoins"
    },
    {
      title: "Proposition",
      description: "Élaboration d'une solution adaptée"
    },
    {
      title: "Réalisation",
      description: "Mise en œuvre du service"
    }
  ];
};

// Fonction pour obtenir la FAQ selon le service
const getServiceFAQ = (slug: string) => {
  const faqs: { [key: string]: Array<{ question: string; answer: string }> } = {
    'location-vente-achat': [
      {
        question: "Combien de temps prend une transaction immobilière ?",
        answer: "Le délai moyen est de 2 à 3 mois, mais peut varier selon la complexité du dossier."
      },
      {
        question: "Quels sont les frais à prévoir ?",
        answer: "Les frais incluent nos honoraires, les frais de notaire et éventuellement les frais de dossier."
      },
      {
        question: "Comment est estimé un bien immobilier ?",
        answer: "L'estimation se base sur l'analyse du marché local, l'état du bien et ses caractéristiques spécifiques."
      },
      {
        question: "Quelles garanties proposez-vous ?",
        answer: "Nous offrons des garanties sur la conformité des documents et la sécurité des transactions."
      }
    ],
    'architecture': [
      {
        question: "Quel est le processus de conception d'un projet ?",
        answer: "Le processus de conception d'un projet architectural implique plusieurs étapes, de la recherche à la réalisation finale."
      },
      {
        question: "Comment gérez-vous les changements de projet ?",
        answer: "Nous adaptons notre approche et mettons à jour le projet en fonction des besoins et des modifications."
      },
      {
        question: "Quels sont les avantages d'un projet d'architecture durable ?",
        answer: "Les projets d'architecture durable réduisent l'impact environnemental, améliorent la qualité de vie et réduisent les coûts à long terme."
      },
      {
        question: "Comment intégrez-vous l'écologie dans votre projet ?",
        answer: "Nous intégrons l'écologie dans nos projets en utilisant des matériaux durables, en optimisant l'éclairage naturel et en respectant les écosystèmes locaux."
      }
    ],
    'conseil-investissement': [
      {
        question: "Quel type d'investisseur peut bénéficier de vos conseils ?",
        answer: "Nos services s'adressent aussi bien aux investisseurs débutants qu'expérimentés, particuliers ou professionnels, avec des solutions adaptées à chaque profil."
      },
      {
        question: "Comment évaluez-vous les opportunités d'investissement ?",
        answer: "Nous utilisons une approche multicritères incluant l'analyse du marché local, le potentiel de plus-value, les rendements locatifs, et les aspects fiscaux."
      },
      {
        question: "Quelle est la durée typique d'un accompagnement ?",
        answer: "La durée varie selon vos besoins, de la simple consultation ponctuelle à un accompagnement continu sur plusieurs années."
      },
      {
        question: "Proposez-vous un suivi après l'investissement ?",
        answer: "Oui, nous offrons un suivi régulier de votre portefeuille avec des rapports périodiques et des recommandations d'optimisation."
      }
    ],
  };

  return faqs[slug] || [
    {
      question: "Quels sont vos délais d'intervention ?",
      answer: "Nos délais varient selon le type de service et votre situation spécifique."
    },
    {
      question: "Comment sont calculés vos tarifs ?",
      answer: "Nos tarifs sont établis sur devis en fonction de vos besoins spécifiques."
    }
  ];
};

export default ServiceDetailPage; 