'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost, BlogPost } from '@/lib/strapi';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogPost(params.id as string);
        setPost(data.data[0]);
      } catch (err) {
        setError('Erreur lors du chargement de l\'article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Article non trouvé'}</h1>
          <Link href="/blog" className="text-primary hover:text-primary-dark">
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.attributes.image.data.attributes.url}`}
          alt={post.attributes.image.data.attributes.alternativeText}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.attributes.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span>{post.attributes.author}</span>
              <span>•</span>
              <span>{new Date(post.attributes.date).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          {post.attributes.content}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Besoin d'aide pour votre projet immobilier ?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </div>
  );
} 