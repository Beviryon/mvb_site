const axios = require('axios');

const API_URL = 'http://localhost:1337/api';

async function seedData() {
  try {
    // Créer la page d'accueil
    await axios.post(`${API_URL}/homepage`, {
      data: {
        heroTitle: "Bienvenue chez MVB Immobilier",
        heroSubtitle: "Votre partenaire immobilier de confiance",
        servicesDescription: "Nous vous accompagnons dans tous vos projets immobiliers",
        publishedAt: new Date()
      }
    });

    // Créer quelques propriétés
    await axios.post(`${API_URL}/properties`, {
      data: {
        title: "Maison de luxe",
        description: "Une magnifique maison avec jardin",
        price: 500000,
        location: "Paris",
        publishedAt: new Date()
      }
    });

    await axios.post(`${API_URL}/properties`, {
      data: {
        title: "Appartement moderne",
        description: "Bel appartement rénové",
        price: 350000,
        location: "Lyon",
        publishedAt: new Date()
      }
    });

    // Créer quelques témoignages
    await axios.post(`${API_URL}/testimonials`, {
      data: {
        name: "Marie Dupont",
        content: "Excellent service, je recommande !",
        rating: 5,
        publishedAt: new Date()
      }
    });

    await axios.post(`${API_URL}/testimonials`, {
      data: {
        name: "Jean Martin",
        content: "Très professionnel, merci !",
        rating: 4,
        publishedAt: new Date()
      }
    });

    console.log('Données initiales ajoutées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des données :', error.message);
  }
}

seedData(); 