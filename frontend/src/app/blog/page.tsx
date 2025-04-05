'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts, getBlogCategories, BlogPost } from '@/lib/strapi';

// Articles par défaut
const DEFAULT_POSTS = [
  {
    id: 1,
    attributes: {
      title: "Les tendances du marché immobilier en 2024",
      content: "Analyse approfondie des tendances actuelles du marché immobilier...",
      excerpt: "Découvrez les principales tendances qui façonnent le marché immobilier en 2024, de l'évolution des prix à l'impact des nouvelles technologies.",
      slug: "tendances-marche-immobilier-2024",
      createdAt: "2024-01-15T10:00:00.000Z",
      updatedAt: "2024-01-15T10:00:00.000Z",
      publishedAt: "2024-01-15T10:00:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/blog/Marcheimmobilier.jpg",
            alternativeText: "Marché immobilier 2024"
          }
        }
      },
      category: {
        data: {
          id: 1,
          attributes: {
            name: "Marché Immobilier",
            slug: "marche-immobilier"
          }
        }
      },
      author: {
        data: {
          attributes: {
            name: "Jean Dupont",
            role: "Expert Immobilier",
            avatar: {
              data: {
                attributes: {
                  url: "/images/blog/Marcheimmobilier.jpg",
                  alternativeText: "Jean Dupont"
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Comment bien préparer son bien pour la location",
      content: "Guide complet pour préparer votre bien immobilier...",
      excerpt: "Nos conseils d'experts pour optimiser la présentation de votre bien et maximiser son potentiel locatif sur le marché.",
      slug: "preparer-bien-location",
      createdAt: "2024-01-10T14:30:00.000Z",
      updatedAt: "2024-01-10T14:30:00.000Z",
      publishedAt: "2024-01-10T14:30:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/blog/Marcheimmobilier.jpg",
            alternativeText: "Préparation location"
          }
        }
      },
      category: {
        data: {
          id: 2,
          attributes: {
            name: "Conseils Location",
            slug: "conseils-location"
          }
        }
      },
      author: {
        data: {
          attributes: {
            name: "Marie Martin",
            role: "Conseillère Immobilier",
            avatar: {
              data: {
                attributes: {
                  url: "/images/blog/Marcheimmobilier.jpg",
                  alternativeText: "Marie Martin"
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "Investir dans l'immobilier en 2024 : les meilleures stratégies",
      content: "Découvrez les stratégies d'investissement immobilier...",
      excerpt: "Guide complet des meilleures stratégies d'investissement immobilier pour 2024, avec analyse des opportunités et des risques.",
      slug: "strategies-investissement-immobilier-2024",
      createdAt: "2024-01-05T09:15:00.000Z",
      updatedAt: "2024-01-05T09:15:00.000Z",
      publishedAt: "2024-01-05T09:15:00.000Z",
      image: {
        data: {
          attributes: {
            url: "/images/blog/Marcheimmobilier.jpg",
            alternativeText: "Investissement immobilier"
          }
        }
      },
      category: {
        data: {
          id: 3,
          attributes: {
            name: "Investissement",
            slug: "investissement"
          }
        }
      },
      author: {
        data: {
          attributes: {
            name: "Pierre Dubois",
            role: "Analyste Financier",
            avatar: {
              data: {
                attributes: {
                  url: "/images/blog/Marcheimmobilier.jpg",
                  alternativeText: "Pierre Dubois"
                }
              }
            }
          }
        }
      }
    }
  }
];

// Catégories par défaut
const DEFAULT_CATEGORIES = [
  {
    id: 1,
    attributes: {
      name: "Marché Immobilier",
      slug: "marche-immobilier"
    }
  },
  {
    id: 2,
    attributes: {
      name: "Conseils Location",
      slug: "conseils-location"
    }
  },
  {
    id: 3,
    attributes: {
      name: "Investissement",
      slug: "investissement"
    }
  },
  {
    id: 4,
    attributes: {
      name: "Actualités",
      slug: "actualites"
    }
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_POSTS);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse] = await Promise.all([
          getBlogPosts(),
          getBlogCategories()
        ]);

        if (postsResponse.data && postsResponse.data.length > 0) {
          setPosts(postsResponse.data);
        }
        if (categoriesResponse.data && categoriesResponse.data.length > 0) {
          setCategories(categoriesResponse.data);
        }
      } catch (err) {
        console.error(err);
        // En cas d'erreur, on garde les données par défaut
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter(
        post =>
          post.attributes.category.data.attributes.slug === selectedCategory
      )
    : posts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/blog/Marcheimmobilier.jpg"
            alt="Blog immobilier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Immobilier
            </h1>
            <p className="text-xl md:text-2xl">
              Actualités, conseils et tendances du marché immobilier
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === null
                  ? 'bg-[#1A1A2E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous les articles
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.attributes.slug)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.attributes.slug
                    ? 'bg-[#1A1A2E] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.attributes.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={post.attributes.image.data.attributes.url}
                    alt={post.attributes.image.data.attributes.alternativeText}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#800000] text-white px-3 py-1 rounded-full text-sm">
                      {post.attributes.category.data.attributes.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
                      <Image
                        src={post.attributes.author.data.attributes.avatar.data.attributes.url}
                        alt={post.attributes.author.data.attributes.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{post.attributes.author.data.attributes.name}</p>
                      <p className="text-sm text-gray-600">{post.attributes.author.data.attributes.role}</p>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-3">
                    <Link
                      href={`/blog/${post.attributes.slug}`}
                      className="hover:text-red-600 transition-colors"
                    >
                      {post.attributes.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.attributes.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(post.attributes.publishedAt)}
                    </span>
                    <Link
                      href={`/blog/${post.attributes.slug}`}
                      className="text-[#800000] hover:text-red-800 font-semibold"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r bg-[#1A1A2E] to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Restez informé
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et conseils
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-[#800000] text-white px-8 py-3 rounded-full transition-all transform hover:scale-105"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 