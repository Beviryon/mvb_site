const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Property {
  id: number;
  attributes: {
    title: string;
    description: string;
    location: string;
    type: string;
    status?: string;
    slug: string;
    price: string;
    features: string[];
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    specifications?: {
      surface: string;
      terrain: string;
      chambres: string;
      sallesDeBain: string;
      anneeConstruction: string;
      parking: string;
      etage: string;
      orientation: string;
    };
    amenities?: string[];
    gallery?: {
      data: Array<{
        attributes: {
          url: string;
          alternativeText: string;
        };
      }>;
    };
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    icon: string;
    features: string[];
    price: string;
    slug: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    author: {
      data: {
        attributes: {
          name: string;
          role: string;
          avatar: {
            data: {
              attributes: {
                url: string;
                alternativeText: string;
              };
            };
          };
        };
      };
    };
  };
}

export interface PortfolioItem {
  id: number;
  attributes: {
    title: string;
    description: string;
    location: string;
    type: string;
    price: string;
    features: string[];
    slug: string;
    createdAt: string;
    updatedAt: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export interface HomePageData {
  id: number;
  attributes: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    featuredProperties: {
      data: Property[];
    };
    featuredServices: {
      data: Service[];
    };
    testimonials: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          role: string;
          content: string;
          image: {
            data: {
              attributes: {
                url: string;
                alternativeText: string;
              };
            };
          };
        };
      }>;
    };
    stats: {
      data: Array<{
        id: number;
        attributes: {
          number: string;
          label: string;
        };
      }>;
    };
  };
}

export interface GetPropertiesParams {
  type?: string;
  priceRange?: string;
  location?: string;
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  // Ensure endpoint starts with a slash
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  const response = await fetch(`${STRAPI_API_URL}/api${normalizedEndpoint}`, mergedOptions);
  
  if (!response.ok) {
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url
    });
    throw new Error('Not Found');
  }

  const data = await response.json();
  return data;
}

export async function getProperties({ type, priceRange, location }: GetPropertiesParams = {}): Promise<StrapiResponse<Property[]>> {
  const endpoint = `/api/properties?populate=*&pagination[page]=1&pagination[pageSize]=9`;
  console.log('Fetching properties with endpoint:', endpoint);
  return fetchAPI(endpoint);
}

export async function getProperty(slug: string) {
  return fetchAPI<Property>(`/api/properties?filters[slug][$eq]=${slug}&populate=*`);
}

export async function getLocations(): Promise<StrapiResponse<{ attributes: { location: string } }[]>> {
  return fetchAPI('/api/properties?fields[0]=location');
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/services?populate=*`);
    const data: StrapiResponse<Service[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`);
    const data: StrapiResponse<Service[]> = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function getBlogPosts(params: {
  category?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const { category, page = 1, pageSize = 9 } = params;

  let filters = '';
  if (category && category !== 'Tous') {
    filters += `&filters[category][$eq]=${category}`;
  }

  return fetchAPI<BlogPost[]>(
    `/blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}${filters}`
  );
}

export async function getBlogPost(id: string | number) {
  return fetchAPI<BlogPost>(`/blog-posts/${id}?populate=*`);
}

export async function getBlogCategories() {
  return fetchAPI<{ data: { id: number, attributes: { name: string, slug: string } }[] }>(
    '/categories?populate=*'
  );
}

export async function getPortfolioItems(params: {
  type?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const { type, page = 1, pageSize = 9 } = params;

  let filters = '';
  if (type && type !== 'Tous') {
    filters += `&filters[type][$eq]=${type}`;
  }

  return fetchAPI<PortfolioItem[]>(
    `/portfolio-items?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}${filters}`
  );
}

export async function getPortfolioItem(id: string | number) {
  return fetchAPI<PortfolioItem>(`/portfolio-items/${id}?populate=*`);
}

export async function getPortfolioCategories() {
  return fetchAPI<{ data: { attributes: { category: string } }[] }>(
    '/portfolio-items?fields[0]=category'
  );
}

export async function getHomePageData() {
  return fetchAPI<HomePageData>(
    '/homepage?populate[heroImage][populate]=*&populate[featuredProperties][populate]=*&populate[featuredServices][populate]=*&populate[testimonials][populate]=*&populate[stats][populate]=*'
  );
} 