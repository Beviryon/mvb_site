// Fonction pour obtenir les détails spécifiques selon le service
export const getServiceDetails = (slug: string) => {
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
export const getServiceProcess = (slug: string) => {
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
export const getServiceFAQ = (slug: string) => {
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