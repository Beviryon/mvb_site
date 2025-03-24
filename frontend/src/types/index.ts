export interface Property {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
    excerpt: string;
    coverImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface About {
  id: number;
  attributes: {
    title: string;
    content: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface Contact {
  id: number;
  attributes: {
    address: string;
    phone: string;
    email: string;
    workingHours: string;
    createdAt: string;
    updatedAt: string;
  };
} 