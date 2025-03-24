'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlogPost, BlogPost } from '@/lib/strapi';

// Article par défaut
const DEFAULT_POST = {
  id: 1,
  attributes: {
    title: "Les tendances du marché immobilier en 2024",
    content: `
# Les tendances du marché immobilier en 2024

Le marché immobilier est en constante évolution, et 2024 ne fait pas exception. Dans cet article, nous allons explorer les principales tendances qui façonnent le secteur immobilier cette année.

## 1. La digitalisation du secteur

La transformation numérique continue de révolutionner le secteur immobilier. Les visites virtuelles, les signatures électroniques et les plateformes de gestion en ligne sont devenues la norme.

### Les innovations clés
- Réalité virtuelle pour les visites
- Blockchain pour les transactions
- Intelligence artificielle pour l'estimation des biens

## 2. L'immobilier durable

La durabilité est au cœur des préoccupations :
- Matériaux écologiques
- Efficacité énergétique
- Certification environnementale

## 3. Les nouveaux modes d'habitat

L'évolution des modes de vie influence directement le marché :
- Coliving
- Tiny houses
- Habitat modulaire

## Conclusion

Le marché immobilier de 2024 est marqué par l'innovation technologique, la durabilité et l'adaptation aux nouveaux modes de vie. Les professionnels qui sauront s'adapter à ces tendances seront les mieux positionnés pour réussir.
    `,
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
};

const BlogPostPage = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPost>(DEFAULT_POST);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getBlogPost(params.slug as string);
        if (response.data) {
          setPost(response.data);
        }
      } catch (err) {
        console.error(err);
        // En cas d'erreur, on garde les données par défaut
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

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
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.attributes.image.data.attributes.url}
            alt={post.attributes.image.data.attributes.alternativeText}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm mb-6">
              {post.attributes.category.data.attributes.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.attributes.title}
            </h1>
            <div className="flex items-center justify-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={post.attributes.author.data.attributes.avatar.data.attributes.url}
                  alt={post.attributes.author.data.attributes.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold">{post.attributes.author.data.attributes.name}</p>
                <p className="text-sm text-gray-300">{post.attributes.author.data.attributes.role}</p>
              </div>
              <span className="mx-4">•</span>
              <time className="text-gray-300">
                {formatDate(post.attributes.publishedAt)}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="prose prose-lg max-w-none">
              {post.attributes.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-4xl font-bold mb-8">{paragraph.slice(2)}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-3xl font-bold mt-12 mb-6">{paragraph.slice(3)}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.slice(4)}</h3>;
                } else if (paragraph.startsWith('- ')) {
                  return <li key={index} className="ml-6 mb-2">{paragraph.slice(2)}</li>;
                } else if (paragraph.trim() !== '') {
                  return <p key={index} className="mb-6 text-gray-700 leading-relaxed">{paragraph}</p>;
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Articles similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cette section sera dynamique avec les articles liés */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous avez aimé cet article ?
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
              className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage; 