const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function createCollectionType(name, attributes) {
  try {
    const response = await api.post('/content-type-builder/content-types', {
      contentType: {
        kind: 'collectionType',
        collectionName: name,
        info: {
          name,
          description: `Collection type for ${name}`,
        },
        options: {
          draftAndPublish: true,
        },
        attributes,
      },
    });
    console.log(`Collection ${name} created successfully`);
    return response.data;
  } catch (error) {
    console.error(`Error creating collection ${name}:`, error.response?.data || error.message);
    throw error;
  }
}

async function setupCollections() {
  try {
    // Portfolio Items Collection
    await createCollectionType('portfolio-item', {
      title: {
        type: 'string',
        required: true,
        unique: true,
      },
      description: {
        type: 'richtext',
        required: true,
      },
      image: {
        type: 'media',
        required: true,
        multiple: false,
        allowedTypes: ['images'],
      },
      category: {
        type: 'enumeration',
        enum: ['Maison', 'Appartement', 'Terrain', 'Local commercial'],
        required: true,
      },
      location: {
        type: 'string',
        required: true,
      },
      features: {
        type: 'json',
        required: true,
      },
    });

    // Home Page Collection
    await createCollectionType('home-page', {
      heroTitle: {
        type: 'string',
        required: true,
      },
      heroSubtitle: {
        type: 'string',
        required: true,
      },
      heroImage: {
        type: 'media',
        required: true,
        multiple: false,
        allowedTypes: ['images'],
      },
      featuredProperties: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::property.property',
        required: true,
      },
      featuredServices: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::service.service',
        required: true,
      },
      testimonials: {
        type: 'component',
        component: 'testimonial',
        repeatable: true,
      },
      stats: {
        type: 'component',
        component: 'stat',
        repeatable: true,
      },
    });

    // Properties Collection
    await createCollectionType('property', {
      title: {
        type: 'string',
        required: true,
        unique: true,
      },
      description: {
        type: 'richtext',
        required: true,
      },
      price: {
        type: 'string',
        required: true,
      },
      location: {
        type: 'string',
        required: true,
      },
      type: {
        type: 'enumeration',
        enum: ['Vente', 'Location'],
        required: true,
      },
      bedrooms: {
        type: 'integer',
        required: true,
        min: 0,
      },
      bathrooms: {
        type: 'integer',
        required: true,
        min: 0,
      },
      area: {
        type: 'string',
        required: true,
      },
      features: {
        type: 'json',
        required: true,
      },
      images: {
        type: 'media',
        required: true,
        multiple: true,
        allowedTypes: ['images'],
      },
    });

    // Services Collection
    await createCollectionType('service', {
      title: {
        type: 'string',
        required: true,
        unique: true,
      },
      description: {
        type: 'richtext',
        required: true,
      },
      icon: {
        type: 'string',
        required: true,
      },
      image: {
        type: 'media',
        required: true,
        multiple: false,
        allowedTypes: ['images'],
      },
      features: {
        type: 'json',
        required: true,
      },
    });

    // Create Components
    await api.post('/content-type-builder/components', {
      component: {
        category: 'components',
        info: {
          name: 'testimonial',
          displayName: 'Testimonial',
        },
        attributes: {
          name: {
            type: 'string',
            required: true,
          },
          role: {
            type: 'string',
            required: true,
          },
          content: {
            type: 'text',
            required: true,
          },
          image: {
            type: 'media',
            required: true,
            multiple: false,
            allowedTypes: ['images'],
          },
        },
      },
    });

    await api.post('/content-type-builder/components', {
      component: {
        category: 'components',
        info: {
          name: 'stat',
          displayName: 'Stat',
        },
        attributes: {
          number: {
            type: 'string',
            required: true,
          },
          label: {
            type: 'string',
            required: true,
          },
        },
      },
    });

    console.log('All collections and components created successfully!');
  } catch (error) {
    console.error('Error setting up collections:', error);
    process.exit(1);
  }
}

// Run the setup
setupCollections(); 