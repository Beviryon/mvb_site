const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Données statiques pour le développement
const mockData = {
  homepage: {
    data: {
      attributes: {
        heroTitle: "Bienvenue chez MVB Immobilier",
        heroSubtitle: "Votre partenaire immobilier de confiance",
        servicesDescription: "Nous vous accompagnons dans tous vos projets immobiliers",
        heroImage: {
          data: {
            attributes: {
              url: "/images/hero.jpg"
            }
          }
        }
      }
    }
  },
  properties: {
    data: [
      {
        id: 1,
        attributes: {
          title: "Maison de luxe",
          description: "Une magnifique maison avec jardin",
          price: 500000,
          location: "Paris",
          images: {
            data: [
              {
                attributes: {
                  url: "/images/property1.jpg"
                }
              }
            ]
          }
        }
      },
      {
        id: 2,
        attributes: {
          title: "Appartement moderne",
          description: "Bel appartement rénové",
          price: 350000,
          location: "Lyon",
          images: {
            data: [
              {
                attributes: {
                  url: "/images/property2.jpg"
                }
              }
            ]
          }
        }
      }
    ]
  },
  testimonials: {
    data: [
      {
        id: 1,
        attributes: {
          name: "Marie Dupont",
          content: "Excellent service, je recommande !",
          rating: 5
        }
      },
      {
        id: 2,
        attributes: {
          name: "Jean Martin",
          content: "Très professionnel, merci !",
          rating: 4
        }
      }
    ]
  }
};

export async function fetchAPI(path: string) {
  // En développement, retourner les données statiques
  if (process.env.NODE_ENV === 'development') {
    const mockPath = path.replace('/api/', '');
    return mockData[mockPath] || { data: null };
  }

  // En production, utiliser l'API Strapi
  try {
    console.log('Server Fetching URL:', `${API_URL}${path}`);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('Server Options:', options);

    const response = await fetch(`${API_URL}${path}`, options);
    console.log('Server Response status:', response.status);

    const data = await response.json();
    console.log('Server Response data:', data);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Server Fetch error:', error);
    throw error;
  }
}

export async function getHomePage() {
  try {
    const data = await fetchAPI('/api/homepage?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return mockData.homepage;
  }
}

export async function getProperties() {
  try {
    const data = await fetchAPI('/api/properties?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return mockData.properties;
  }
}

export async function getTestimonials() {
  try {
    const data = await fetchAPI('/api/testimonials?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return mockData.testimonials;
  }
}

export async function getServices() {
  try {
    const data = await fetchAPI('/api/services?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return { data: [] };
  }
}

export async function getBlogPosts() {
  try {
    const data = await fetchAPI('/api/blog-posts?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { data: [] };
  }
}

export async function getAbout() {
  try {
    const data = await fetchAPI('/api/about?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching about:', error);
    return { data: null };
  }
}

export async function getContact() {
  try {
    const data = await fetchAPI('/api/contact?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return { data: null };
  }
} 