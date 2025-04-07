const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Définir un type pour les données mockées
interface MockData {
  [key: string]: any;  // Permet l'indexation par chaîne de caractères
}

const mockData: MockData = {
  homepage: {
    data: {
      attributes: {
        heroTitle: "Trouvez votre bien idéal",
        heroSubtitle: "Des propriétés d'exception sélectionnées pour vous",
        servicesDescription: "Nos services immobiliers",
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
    data: []
  },
  testimonials: {
    data: []
  }
};

export async function fetchAPI<T>(path: string): Promise<T> {
  // En développement, utiliser les données mockées
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